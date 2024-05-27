import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import Loader from "@/components/clientUi/Loader";
import { useToast } from "@/components/ui/use-toast"; 

interface BuyShareDialogProps {
  sharesTokenId: number;
  sharePriceUsd: number;
}

const BuyShareDialog: React.FC<BuyShareDialogProps> = ({ sharesTokenId, sharePriceUsd }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const { toast } = useToast(); 

  const onSubmit = async (data: any) => {
    const { shareAmount } = data;
    const value = shareAmount * sharePriceUsd * 1e18;

    setIsLoading(true);
    try {
      const response = await fetch('/api/shares', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sharesTokenId,
          shareAmount: parseInt(shareAmount),
          value: value.toString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to buy share');
      }

      toast({
        title: "Success",
        description: "Share purchased successfully!",
      });

      reset();
      setOpen(false);
    } catch (error) {
      console.error('Error buying share:', error);
      toast({
        title: "Error",
        description: "Error buying share. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} className="w-full">Buy</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Buy Share</DialogTitle>
          </DialogHeader>
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <Loader />
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <div className="flex flex-col gap-5">
                  <label htmlFor="shareAmount" className="block text-sm font-medium text-gray-700">
                    Share Amount
                  </label>
                  <Input
                    type="number"
                    id="shareAmount"
                    {...register("shareAmount", { required: true, min: 1 })}
                  />
                </div>
                <Button type="submit" className="left-0">Submit</Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BuyShareDialog;
