import { useState } from 'react';
import { Artwork } from '@/types/artwork';

interface DeployWorkButtonProps {
  artwork: Artwork;
  refreshData: () => void;
}

export default function DeployWorkButton({ artwork, refreshData }: DeployWorkButtonProps) {
  const [isDeploying, setIsDeploying] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    } catch (err) {
      console.error('Error deploying work:', err);
      setError((err as Error).message);
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <>
      <div onClick={handleDeploy} className='cursor-pointer'>
        {isDeploying ? 'Deploying...' : 'Deploy'}
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}
