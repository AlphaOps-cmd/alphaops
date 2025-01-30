import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const TrainingPreferencesSection = () => {
  const { toast } = useToast();
  const [monthlyGoal, setMonthlyGoal] = useState("15");
  const [trainingStyle, setTrainingStyle] = useState("strength");
  const [difficulty, setDifficulty] = useState("intermediate");
  const [workoutDuration, setWorkoutDuration] = useState("60");
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

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Training Style</Label>
            <Select
              value={trainingStyle}
              onValueChange={(value) => {
                setTrainingStyle(value);
                toast({
                  title: "Training style updated",
                  description: `Your training style has been set to ${value}`,
                });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select training style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="strength">Strength Training</SelectItem>
                <SelectItem value="hypertrophy">Hypertrophy</SelectItem>
                <SelectItem value="endurance">Endurance</SelectItem>
                <SelectItem value="powerlifting">Powerlifting</SelectItem>
                <SelectItem value="crossfit">CrossFit</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Difficulty Level</Label>
            <Select
              value={difficulty}
              onValueChange={(value) => {
                setDifficulty(value);
                toast({
                  title: "Difficulty updated",
                  description: `Your training difficulty has been set to ${value}`,
                });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
                <SelectItem value="expert">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Workout Duration (minutes)</Label>
            <Select
              value={workoutDuration}
              onValueChange={(value) => {
                setWorkoutDuration(value);
                toast({
                  title: "Workout duration updated",
                  description: `Your workout duration has been set to ${value} minutes`,
                });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="45">45 minutes</SelectItem>
                <SelectItem value="60">60 minutes</SelectItem>
                <SelectItem value="90">90 minutes</SelectItem>
                <SelectItem value="120">120 minutes</SelectItem>
              </SelectContent>
            </Select>
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