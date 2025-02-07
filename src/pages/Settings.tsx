
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ProfileSection } from "@/components/settings/ProfileSection";
import { DataManagementSection } from "@/components/settings/DataManagementSection";
import { TrainingPreferencesSection } from "@/components/settings/TrainingPreferencesSection";
import { NotificationsSection } from "@/components/settings/NotificationsSection";
import { AppPersonalizationSection } from "@/components/settings/AppPersonalizationSection";
import { SupportFeedbackSection } from "@/components/settings/SupportFeedbackSection";
import { AccountSection } from "@/components/settings/AccountSection";

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSaveChanges = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <button 
        onClick={() => navigate('/home')} 
        className="fixed top-4 left-4 p-2 text-muted-foreground hover:text-foreground z-50"
      >
        <ArrowLeft className="h-6 w-6" />
      </button>

      <div className="bg-black p-4 flex items-center justify-center gap-2 sticky top-0 z-40">
        <h1 className="text-xl font-bold">Settings</h1>
      </div>

      <div className="container max-w-2xl mx-auto p-4 space-y-6">
        <ProfileSection />
        <DataManagementSection units="kg" />
        <TrainingPreferencesSection />
        <NotificationsSection />
        <AppPersonalizationSection />
        <SupportFeedbackSection />
        
        <Button className="w-full" onClick={handleSaveChanges}>
          Save Changes
        </Button>
        
        <AccountSection />
      </div>
    </div>
  );
};

export default Settings;
