import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface PerformUpkeepButtonProps {
  tokenizationRequestId: string | number;
  refreshData: () => void;
}

const PerformUpkeepButton: React.FC<PerformUpkeepButtonProps> = ({ tokenizationRequestId, refreshData }) => {
  const [isRequesting, setIsRequesting] = useState(false);
  const { toast } = useToast();

  const handlePerformUpkeep = async () => {
    setIsRequesting(true);
    try {
      const response = await fetch('/api/performUpkeep', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tokenizationRequestId: Number(tokenizationRequestId) }),
      });

      if (!response.ok) {
        throw new Error('Failed to perform upkeep');
      }

      const result = await response.json();
      toast({
        title: 'Success',
        description: 'Upkeep performed successfully',
      });

      refreshData();
    } catch (error) {
      console.error('Error performing upkeep:', error);
      toast({
        title: 'Error',
        description: 'Error performing upkeep. Please try again.',
      });
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <Button onClick={handlePerformUpkeep} disabled={isRequesting || !tokenizationRequestId}>
      {isRequesting ? 'Performing...' : 'Perform Upkeep'}
    </Button>
  );
};

export default PerformUpkeepButton;
