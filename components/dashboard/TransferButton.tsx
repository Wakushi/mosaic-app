import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"; 
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { xChainWorkTokenTransfer } from "@/utils/user-contract-interactions";
import { useToast } from "@/components/ui/use-toast";
import Loader from "@/components/clientUi/Loader";
import { Artwork } from "@/types/artwork";

interface TransferTokenButtonProps {
  artwork: Artwork;
}

const TransferTokenButton: React.FC<TransferTokenButtonProps> = ({ artwork }) => {
  const { register, handleSubmit, reset } = useForm();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onSubmit = async (data: any) => {
    const { recipientAddress, newOwnerName, targetChain } = data;
    const tokenizationRequestId = Number(artwork.tokenizationRequestId);

    if (isNaN(tokenizationRequestId)) {
      toast({
        title: "Error",
        description: "Invalid tokenization request ID.",
      });
      return;
    }

    setIsLoading(true);
    try {
      await xChainWorkTokenTransfer(
        recipientAddress,
        newOwnerName,
        tokenizationRequestId,
        targetChain
      );
      toast({
        title: "Success",
        description: "Token transferred successfully!",
      });
      reset();
      setOpen(false);
    } catch (error) {
      console.error("Error transferring token:", error);
      toast({
        title: "Error",
        description: "Error transferring token. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div onClick={() => setOpen(true)} className="p-1 text-sm cursor-pointer">Transfer Token</div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transfer Token to Another Chain</DialogTitle>
          </DialogHeader>
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <Loader />
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <Input
                type="text"
                placeholder="Recipient Address"
                {...register("recipientAddress", { required: true })}
              />
              <Input
                type="text"
                placeholder="New Owner Name"
                {...register("newOwnerName", { required: true })}
              />
              <Select {...register("targetChain", { required: true })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Target Chain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Optimism">Optimism</SelectItem>
                  <SelectItem value="Polygon">Polygon</SelectItem>
                </SelectContent>
              </Select>
              <Button type="submit">Submit</Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TransferTokenButton;

