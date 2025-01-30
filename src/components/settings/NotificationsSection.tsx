import { Bell } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const NotificationsSection = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState({
    trainingReminders: true,
    monthlyProgress: true,
    aiCoachInsights: true,
    promotionalOffers: false
  });

  const handleNotificationChange = (key: keyof typeof notifications, checked: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: checked
    }));
    toast({
      title: "Notification settings updated",
      description: "Your notification preferences have been saved.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notifications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Training Reminders</Label>
            <p className="text-sm text-muted-foreground">
              Daily/weekly notifications based on your habits
            </p>
          </div>
          <Switch
            checked={notifications.trainingReminders}
            onCheckedChange={(checked) => handleNotificationChange('trainingReminders', checked)}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Monthly Progress</Label>
            <p className="text-sm text-muted-foreground">
              Get notified at 50% and 100% of your monthly goal
            </p>
          </div>
          <Switch
            checked={notifications.monthlyProgress}
            onCheckedChange={(checked) => handleNotificationChange('monthlyProgress', checked)}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>AI Coach Insights</Label>
            <p className="text-sm text-muted-foreground">
              Personalized suggestions based on your performance
            </p>
          </div>
          <Switch
            checked={notifications.aiCoachInsights}
            onCheckedChange={(checked) => handleNotificationChange('aiCoachInsights', checked)}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Promotional Offers</Label>
            <p className="text-sm text-muted-foreground">
              Special offers and promotions
            </p>
          </div>
          <Switch
            checked={notifications.promotionalOffers}
            onCheckedChange={(checked) => handleNotificationChange('promotionalOffers', checked)}
          />
        </div>
      </CardContent>
    </Card>
  );
};