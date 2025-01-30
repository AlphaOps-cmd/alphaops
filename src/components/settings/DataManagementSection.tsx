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

  const handleBodyWeightUpdate = () => {
    if (bodyWeight) {
      toast({
        title: "Weight updated",
        description: `Your weight has been updated to ${bodyWeight}${units}`,
      });
    }
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
        <div className="space-y-2">
          <Label>Backup Settings</Label>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => {
              toast({
                title: "Backup created",
                description: "Your settings have been backed up successfully.",
              });
            }}
          >
            Create Backup
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};