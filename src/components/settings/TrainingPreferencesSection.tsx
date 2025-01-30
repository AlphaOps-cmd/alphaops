import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const TrainingPreferencesSection = () => {
  const { toast } = useToast();
  const [monthlyGoal, setMonthlyGoal] = useState("15");
  const [trainingDays, setTrainingDays] = useState({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false,
  });

  const handleTrainingDaysChange = (day: string) => {
    setTrainingDays(prev => ({
      ...prev,
      [day]: !prev[day as keyof typeof prev]
    }));
    toast({
      title: "Training schedule updated",
      description: "Your training schedule has been updated successfully.",
    });
  };

  const handleMonthlyGoalChange = (value: string) => {
    setMonthlyGoal(value);
    toast({
      title: "Monthly goal updated",
      description: `Your monthly training goal has been set to ${value} workouts`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Training Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Training Days</Label>
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
            {Object.entries(trainingDays).map(([day, isActive]) => (
              <Button
                key={day}
                variant={isActive ? "default" : "outline"}
                className="w-full"
                onClick={() => handleTrainingDaysChange(day)}
              >
                {day.charAt(0).toUpperCase() + day.slice(1, 3)}
              </Button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label>Monthly Training Goal</Label>
          <Input
            type="number"
            value={monthlyGoal}
            onChange={(e) => handleMonthlyGoalChange(e.target.value)}
            min="1"
            max="31"
            placeholder="Enter number of workouts"
          />
          <p className="text-sm text-muted-foreground">
            Set your target number of workouts for this month
          </p>
        </div>
      </CardContent>
    </Card>
  );
};