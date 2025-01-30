import { Bell, Database, HelpCircle, LogOut, Moon, Settings as SettingsIcon, Sun, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [darkMode, setDarkMode] = useState(true);
  const [selectedWorkoutType, setSelectedWorkoutType] = useState("crossfit");
  const [difficulty, setDifficulty] = useState("intermediate");
  const [duration, setDuration] = useState("medium");
  const [units, setUnits] = useState("kg");
  const [notifications, setNotifications] = useState(true);
  const [haptics, setHaptics] = useState(true);
  const [trainingDays, setTrainingDays] = useState<string[]>(["MON", "TUE", "THU", "FRI"]);

  const handleSaveChanges = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Header */}
      <div className="bg-black p-4 flex items-center gap-2 sticky top-0 z-50">
        <SettingsIcon className="h-5 w-5" />
        <h1 className="text-xl font-bold">Settings</h1>
      </div>

      <div className="container max-w-2xl mx-auto p-4 space-y-6">
        {/* User Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                <User className="h-12 w-12 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label>Full Name</Label>
                <Input placeholder="John Doe" />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" placeholder="john@example.com" />
              </div>
              <div>
                <Label>Membership</Label>
                <Input value="Premium" disabled />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Training Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Training Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Preferred Workout Type</Label>
              <Select value={selectedWorkoutType} onValueChange={setSelectedWorkoutType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="crossfit">CrossFit</SelectItem>
                  <SelectItem value="special-forces">Special Forces</SelectItem>
                  <SelectItem value="hyrox">Hyrox</SelectItem>
                  <SelectItem value="home">Home Workout</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Difficulty Level</Label>
              <RadioGroup value={difficulty} onValueChange={setDifficulty}>
                <div className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="beginner" id="beginner" />
                    <Label htmlFor="beginner">Beginner</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="intermediate" id="intermediate" />
                    <Label htmlFor="intermediate">Intermediate</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="advanced" id="advanced" />
                    <Label htmlFor="advanced">Advanced</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Workout Duration</Label>
              <RadioGroup value={duration} onValueChange={setDuration}>
                <div className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="short" id="short" />
                    <Label htmlFor="short">Short (-20min)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="medium" />
                    <Label htmlFor="medium">Medium (20-40min)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="long" id="long" />
                    <Label htmlFor="long">Long (+40min)</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Training Days</Label>
              <ToggleGroup type="multiple" value={trainingDays} onValueChange={setTrainingDays}>
                {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
                  <ToggleGroupItem key={day} value={day} aria-label={day}>
                    {day}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Training Reminders</Label>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>
              <div className="flex items-center justify-between">
                <Label>Progress Updates</Label>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>
              <div className="flex items-center justify-between">
                <Label>AI Coach Insights</Label>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* App Personalization */}
        <Card>
          <CardHeader>
            <CardTitle>App Personalization</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                <Label>Dark Mode</Label>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>

            <div className="space-y-2">
              <Label>Units</Label>
              <RadioGroup value={units} onValueChange={setUnits}>
                <div className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="kg" id="kg" />
                    <Label htmlFor="kg">Kg/Km</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="lb" id="lb" />
                    <Label htmlFor="lb">Lb/Mi</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center justify-between">
              <Label>Haptic Feedback</Label>
              <Switch checked={haptics} onCheckedChange={setHaptics} />
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Data Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full">Export Training Data</Button>
            <Button variant="outline" className="w-full">Update Personal Records</Button>
            <Button variant="outline" className="w-full">Modify Monthly Goals</Button>
          </CardContent>
        </Card>

        {/* Support */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Support
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full">FAQ & Help Center</Button>
            <Button variant="outline" className="w-full">Report a Problem</Button>
            <Button variant="outline" className="w-full">Suggest a Feature</Button>
          </CardContent>
        </Card>

        {/* Account Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LogOut className="h-5 w-5" />
              Account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full">Sign Out</Button>
            <Button variant="destructive" className="w-full">Delete Account</Button>
          </CardContent>
        </Card>

        {/* Save Changes */}
        <Button className="w-full" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default Settings;