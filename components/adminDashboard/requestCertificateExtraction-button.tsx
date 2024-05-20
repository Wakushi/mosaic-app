import { useState, forwardRef } from 'react';
import { Artwork } from "@/types/artwork";
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

interface RequestCertificateExtractionButtonProps {
  artwork: Artwork;
  refreshData: () => void;
}

const RequestCertificateExtractionButton = forwardRef<HTMLDivElement, RequestCertificateExtractionButtonProps>(({ artwork, refreshData }, ref) => {
  const [isRequesting, setIsRequesting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const { toast } = useToast();

  const handleRequest = async () => {
    setIsRequesting(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/requestCertificateExtraction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ args: [artwork.title] }), 
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to request certificate extraction');
      }

      console.log('Certificate extraction requested successfully:', result);
      refreshData();

      toast({
        title: "Success",
        description: "Certificate extraction requested successfully",
      });
    } catch (err) {
      console.error(err);
      setError((err as Error).message);

      toast({
        title: "Error",
        description: "Failed to request certificate extraction: " + (err as Error).message,
      });
    } finally {
      setIsRequesting(false);
      setAlertOpen(false); 
    }
  };

  return (
    <>
      <div ref={ref} onClick={() => setAlertOpen(true)} className='p-1 text-sm cursor-pointer'>Request Certificate Extraction</div>
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will request the certificate extraction. It cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRequest}>
              {isRequesting ? 'Requesting...' : 'Continue'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
});

RequestCertificateExtractionButton.displayName = 'RequestCertificateExtractionButton';

export default RequestCertificateExtractionButton;

