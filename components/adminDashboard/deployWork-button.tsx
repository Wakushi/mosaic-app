import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Artwork } from '@/types/artwork';

interface DeployWorkButtonProps {
  artwork: Artwork;
}

export default function DeployWorkButton({ artwork }: DeployWorkButtonProps) {
  const [isDeploying, setIsDeploying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeploy = async () => {
    setIsDeploying(true);
    setError(null);

    try {
      const response = await fetch('/api/deployWork', {
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
    } catch (err) {
      console.error('Error deploying work:', err);
      setError('Failed to deploy work. See console for details.');
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <>
      <Button onClick={handleDeploy} disabled={isDeploying}>
        {isDeploying ? 'Deploying...' : 'Deploy'}
      </Button>
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}
