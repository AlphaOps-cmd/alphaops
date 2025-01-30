import { Database, Weight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const DataManagementSection = ({ units }: { units: string }) => {
  const { toast } = useToast();
  const [bodyWeight, setBodyWeight] = useState("");
  const [benchPress, setBenchPress] = useState("");
  const [squat, setSquat] = useState("");
  const [deadlift, setDeadlift] = useState("");

  const handleBodyWeightUpdate = () => {
    if (bodyWeight) {
      toast({
        title: "Weight updated",
        description: `Your weight has been updated to ${bodyWeight}${units}`,
      });
    }
  };

  const handlePersonalRecordUpdate = (exercise: string, value: string) => {
    toast({
      title: "Personal record updated",
      description: `Your ${exercise} PR has been updated to ${value}${units}`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Data Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Body Weight</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder={`Enter weight in ${units}`}
              value={bodyWeight}
              onChange={(e) => setBodyWeight(e.target.value)}
            />
            <Button onClick={handleBodyWeightUpdate}>Update</Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label>Personal Records</Label>
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder={`Bench Press (${units})`}
                value={benchPress}
                onChange={(e) => setBenchPress(e.target.value)}
              />
              <Button onClick={() => handlePersonalRecordUpdate("Bench Press", benchPress)}>
                Update
              </Button>
            </div>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder={`Squat (${units})`}
                value={squat}
                onChange={(e) => setSquat(e.target.value)}
              />
              <Button onClick={() => handlePersonalRecordUpdate("Squat", squat)}>
                Update
              </Button>
            </div>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder={`Deadlift (${units})`}
                value={deadlift}
                onChange={(e) => setDeadlift(e.target.value)}
              />
              <Button onClick={() => handlePersonalRecordUpdate("Deadlift", deadlift)}>
                Update
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Export Data</Label>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => {
              toast({
                title: "Data export initiated",
                description: "Your data will be prepared for download shortly.",
              });
            }}
          >
            Export Training History
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};