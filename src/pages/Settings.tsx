import { Bell, Database, HelpCircle, LogOut, Moon, Settings as SettingsIcon, Sun, User, ArrowLeft, Camera, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const passwordSchema = z.object({
  currentPassword: z.string().min(6, "Password must be at least 6 characters"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Settings = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);
  const [selectedWorkoutType, setSelectedWorkoutType] = useState("crossfit");
  const [difficulty, setDifficulty] = useState("intermediate");
  const [duration, setDuration] = useState("medium");
  const [units, setUnits] = useState("kg");
  const [notifications, setNotifications] = useState(true);
  const [haptics, setHaptics] = useState(true);
  const [trainingDays, setTrainingDays] = useState<string[]>(["MON", "TUE", "THU", "FRI"]);
  const [weight, setWeight] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [bodyWeight, setBodyWeight] = useState("");
  const [squatRM, setSquatRM] = useState("");
  const [deadliftRM, setDeadliftRM] = useState("");
  const [benchRM, setBenchRM] = useState("");
  const [cleanRM, setCleanRM] = useState("");
  const [snatchRM, setSnatchRM] = useState("");

  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handlePasswordChange = (values: z.infer<typeof passwordSchema>) => {
    // Here you would typically make an API call to change the password
    console.log("Password change values:", values);
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    });
    setIsPasswordDialogOpen(false);
    form.reset();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
  };

  const handleSaveChanges = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const updateMetric = (value: string, setter: (value: string) => void, metricName: string) => {
    setter(value);
    toast({
      title: `${metricName} updated`,
      description: `Your ${metricName.toLowerCase()} has been updated to ${value} ${units}.`,
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Back Button */}
      <button 
        onClick={() => navigate('/')} 
        className="fixed top-4 left-4 p-2 text-muted-foreground hover:text-foreground z-50"
      >
        <ArrowLeft className="h-6 w-6" />
      </button>

      {/* Header */}
      <div className="bg-black p-4 flex items-center justify-center gap-2 sticky top-0 z-40">
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
              <Dialog>
                <DialogTrigger>
                  <div className="relative group">
                    <Avatar className="w-24 h-24 cursor-pointer">
                      <AvatarImage src={profileImage || undefined} />
                      <AvatarFallback>
                        <User className="h-12 w-12" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Camera className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Update Profile Picture</DialogTitle>
                    <DialogDescription>
                      Choose a new profile picture or remove the current one
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                    {profileImage && (
                      <Button
                        variant="destructive"
                        onClick={handleRemoveImage}
                        className="w-full"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove Picture
                      </Button>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
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

            {/* Password Change Dialog */}
            <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  Change Password
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change Password</DialogTitle>
                  <DialogDescription>
                    Enter your current password and choose a new one
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handlePasswordChange)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">Update Password</Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
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
              <div className="grid grid-cols-7 gap-1">
                {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
                  <button
                    key={day}
                    onClick={() => {
                      setTrainingDays(prev =>
                        prev.includes(day)
                          ? prev.filter(d => d !== day)
                          : [...prev, day]
                      );
                    }}
                    className={`p-2 text-xs font-medium rounded-lg transition-colors ${
                      trainingDays.includes(day)
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
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
            <div className="space-y-2">
              <Label>Body Weight ({units})</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Enter weight"
                  value={bodyWeight}
                  onChange={(e) => updateMetric(e.target.value, setBodyWeight, "Body Weight")}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Back Squat 1RM ({units})</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Enter weight"
                  value={squatRM}
                  onChange={(e) => updateMetric(e.target.value, setSquatRM, "Back Squat 1RM")}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Deadlift 1RM ({units})</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Enter weight"
                  value={deadliftRM}
                  onChange={(e) => updateMetric(e.target.value, setDeadliftRM, "Deadlift 1RM")}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Bench Press 1RM ({units})</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Enter weight"
                  value={benchRM}
                  onChange={(e) => updateMetric(e.target.value, setBenchRM, "Bench Press 1RM")}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Clean 1RM ({units})</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Enter weight"
                  value={cleanRM}
                  onChange={(e) => updateMetric(e.target.value, setCleanRM, "Clean 1RM")}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Snatch 1RM ({units})</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Enter weight"
                  value={snatchRM}
                  onChange={(e) => updateMetric(e.target.value, setSnatchRM, "Snatch 1RM")}
                />
              </div>
            </div>
            <Button variant="outline" className="w-full">Export Training Data</Button>
          </CardContent>
        </Card>

        {/* Save Changes Button */}
        <Button className="w-full" onClick={handleSaveChanges}>
          Save Changes
        </Button>

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
      </div>
    </div>
  );
};

export default Settings;
