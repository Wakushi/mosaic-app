import { useState, forwardRef } from 'react';
import { Artwork } from '@/types/artwork';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

interface DeployWorkButtonProps {
  artwork: Artwork;
  refreshData: () => void;
}

const DeployWorkButton = forwardRef<HTMLDivElement, DeployWorkButtonProps>(({ artwork, refreshData }, ref) => {
  const [isDeploying, setIsDeploying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const { toast } = useToast();

  const handleDeploy = async () => {
    setIsDeploying(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/deployWork', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientAddress: artwork.clientAddress,
          workName: artwork.title,
          workSymbol: artwork.title.slice(0, 3).toUpperCase(),
          customerSubmissionIPFSHash: 'hashes.hashArtwork',
          appraiserReportIPFSHash: 'hashes.hashReport'
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to deploy work');
      }

      console.log('Work deployed successfully', result);
      refreshData();

      toast({
        title: "Success",
        description: "Work deployed successfully",
      });
    } catch (err) {
      console.error('Error deploying work:', err);
      setError((err as Error).message);

      toast({
        title: "Error",
        description: "Failed to deploy work: " + (err as Error).message,
      });
    } finally {
      setIsDeploying(false);
      setAlertOpen(false); 
    }
  };

  return (
    <>
      <div ref={ref} onClick={() => setAlertOpen(true)} className='p-1 text-sm cursor-pointer'>Deploy</div>
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will deploy the work.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeploy}>
              {isDeploying ? 'Deploying...' : 'Continue'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
});

DeployWorkButton.displayName = 'DeployWorkButton';

export default DeployWorkButton;


