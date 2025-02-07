
import { Database, Weight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const DataManagementSection = ({ units }: { units: string }) => {
  const { toast } = useToast();
  const [bodyWeight, setBodyWeight] = useState("");
  const [personalRecords, setPersonalRecords] = useState<{[key: string]: string}>({});

  useEffect(() => {
    fetchPersonalRecords();
  }, []);

  const fetchPersonalRecords = async () => {
    const { data, error } = await supabase
      .from('personal_records')
      .select('*');
    
    if (error) {
      console.error('Error fetching personal records:', error);
      return;
    }

    const records: {[key: string]: string} = {};
    data.forEach(record => {
      records[record.exercise_name] = record.one_rm?.toString() || '';
    });
    setPersonalRecords(records);
  };

  const handlePersonalRecordUpdate = async (exercise: string, value: string) => {
    const { error } = await supabase
      .from('personal_records')
      .upsert({ 
        exercise_name: exercise,
        one_rm: value ? parseFloat(value) : null
      });

    if (error) {
      console.error('Error updating personal record:', error);
      toast({
        title: "Error",
        description: "Failed to update personal record",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Personal record updated",
      description: `Your ${exercise} PR has been updated to ${value}${units}`,
    });
  };

  const exercises = [
    'Back Squat',
    'Front Squat',
    'Deadlift',
    'Bench Press',
    'Strict Press',
    'Clean',
    'Snatch',
    'Power Clean',
    'Clean and Jerk',
    'Push Press',
    'Thruster'
  ];

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
            <Button onClick={() => {
              toast({
                title: "Weight updated",
                description: `Your weight has been updated to ${bodyWeight}${units}`,
              });
            }}>Update</Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label>Personal Records (1RM)</Label>
          <div className="space-y-3">
            {exercises.map((exercise) => (
              <div key={exercise} className="flex gap-2">
                <Input
                  type="number"
                  placeholder={`${exercise} (${units})`}
                  value={personalRecords[exercise] || ''}
                  onChange={(e) => {
                    setPersonalRecords(prev => ({
                      ...prev,
                      [exercise]: e.target.value
                    }));
                  }}
                />
                <Button onClick={() => handlePersonalRecordUpdate(exercise, personalRecords[exercise])}>
                  Update
                </Button>
              </div>
            ))}
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
