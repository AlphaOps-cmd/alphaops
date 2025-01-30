import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import PremiumFeatureModal from "@/components/PremiumFeatureModal";

const AICoach = () => {
  const navigate = useNavigate();
  const [showPremiumModal, setShowPremiumModal] = useState(true);
  const isPremiumUser = false; // This should be replaced with actual premium status check

  // If user is not premium, show modal and redirect to home
  const handleClosePremiumModal = () => {
    setShowPremiumModal(false);
    navigate("/");
  };

  if (!isPremiumUser) {
    return (
      <PremiumFeatureModal
        isOpen={showPremiumModal}
        onClose={handleClosePremiumModal}
      />
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">AlphaOps AI Coach</h1>
        {/* AI Coach chat interface will go here */}
        <div className="rounded-lg border p-4">
          <p className="text-muted-foreground">AI Coach chat interface coming soon...</p>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default AICoach;