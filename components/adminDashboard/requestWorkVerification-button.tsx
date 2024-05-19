import { useState } from 'react';
import { Artwork } from "@/types/artwork";

interface RequestWorkVerificationButtonProps {
  artwork: Artwork;
  refreshData: () => void;
}

export default function RequestWorkVerificationButton({ artwork, refreshData }: RequestWorkVerificationButtonProps) {
  const [isRequesting, setIsRequesting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRequest = async () => {
    setIsRequesting(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/requestWorkVerification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: artwork.title }), 
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to request work verification');
      }

      console.log('Work verification requested successfully:', result);
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
        {isRequesting ? 'Requesting...' : 'Request Work Verification'}
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}
