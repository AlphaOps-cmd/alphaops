import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";

interface PremiumFeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PremiumFeatureModal = ({ isOpen, onClose }: PremiumFeatureModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-yellow-500" />
            AlphaOps AI Coach - Premium Feature
          </DialogTitle>
          <DialogDescription>
            Get personalized training recommendations and real-time feedback from our advanced AI coach. Unlock this feature by upgrading to premium.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="rounded-lg bg-muted p-4">
            <h4 className="font-semibold mb-2">What you'll get:</h4>
            <ul className="space-y-2 text-sm">
              <li>• Personalized workout recommendations</li>
              <li>• Real-time form corrections</li>
              <li>• Progress tracking insights</li>
              <li>• Nutrition advice</li>
            </ul>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Maybe Later
            </Button>
            <Button>
              Upgrade to Premium
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumFeatureModal;