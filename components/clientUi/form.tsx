import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

interface FormFieldData {
  name: string;
  label: string;
  description: string;
  type?: string; 
  options?: { id: string, label: string }[]; 
}

interface ReusableFormProps {
  schema: z.ZodSchema;
  defaultValues: Record<string, any>;
  onSubmit: (values: any) => void;
  fields: FormFieldData[];
}

export const ReusableForm: React.FC<ReusableFormProps> = ({ schema, defaultValues, onSubmit, fields }) => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {fields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  {field.type === 'radio' && field.options ? (
                    <RadioGroup
                      onValueChange={formField.onChange}
                      defaultValue={formField.value}
                      className="flex flex-col space-y-1"
                    >
                      {field.options.map(option => (
                        <FormItem key={option.id} className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={option.id} />
                          </FormControl>
                          <FormLabel className="font-normal">{option.label}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  ) : (
                    <Input type={field.type || 'text'} {...formField} />
                  )}
                </FormControl>
                <FormDescription>
                  {field.description}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
