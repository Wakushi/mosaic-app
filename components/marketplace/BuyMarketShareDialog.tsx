import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import Loader from "@/components/clientUi/Loader";
import { useToast } from "@/components/ui/use-toast";
import { buyMarketShareItem } from "@/utils/user-contract-interactions";

interface BuyMarketShareDialogProps {
  marketShareItemId: number;
}

const BuyMarketShareDialog: React.FC<BuyMarketShareDialogProps> = ({
  marketShareItemId,
}) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const { toast } = useToast();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await buyMarketShareItem(marketShareItemId);
      toast({
        title: "Success",
        description: "Market share item purchased successfully!",
      });

      reset();
      setOpen(false);
    } catch (error) {
      console.error("Error buying market share item:", error);
      toast({
        title: "Error",
        description: "Error buying market share item. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} className="w-full">
        Buy Market Share Item
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Buy Market Share Item</DialogTitle>
          </DialogHeader>
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <Loader />
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col gap-5">
                  <label
                    htmlFor="marketShareItemId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Market Share Item ID
                  </label>
                  <Input
                    type="number"
                    id="marketShareItemId"
                    {...register("marketShareItemId", { required: true })}
                    value={marketShareItemId}
                    readOnly
                  />
                </div>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BuyMarketShareDialog;
