import { Button } from '@/components/ui/button';
import { Loader2 } from "lucide-react"


interface LoadingButtonProps {
    onClick: () => void;
    isLoading: boolean;
    disabled?: boolean;
    children: React.ReactNode;
    className?: string;
  }
  
  const LoadingButton: React.FC<LoadingButtonProps> = ({ onClick, isLoading, disabled, children, className }) => {
    return (
      <Button onClick={onClick} disabled={isLoading || disabled } className={className}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving ...
          </>
        ) : (
          children
        )}
      </Button>
    );
  };
  
  export default LoadingButton;