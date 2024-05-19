import { useState } from 'react';
import { Artwork } from "@/types/artwork";

interface RequestCertificateExtractionButtonProps {
  artwork: Artwork;
  refreshData: () => void;
}

export default function RequestCertificateExtractionButton({ artwork, refreshData }: RequestCertificateExtractionButtonProps) {
  const [isRequesting, setIsRequesting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    } catch (err) {
      console.error(err);
      setError((err as Error).message);
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <>
      <div onClick={handleRequest} className='cursor-pointer'>
        {isRequesting ? 'Requesting...' : 'Request Certificate Extraction'}
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}
