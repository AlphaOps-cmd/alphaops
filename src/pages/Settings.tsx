import { Bell, Database, HelpCircle, LogOut, Moon, Settings as SettingsIcon, Sun, User, ArrowLeft, Camera, Trash2, MessageSquare, Calendar, Weight, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";

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
  const [notifications, setNotifications] = useState({
    trainingReminders: true,
    monthlyProgress: true,
    aiCoachInsights: true,
    promotionalOffers: false
  });
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState("es");
  const [monthlyGoal, setMonthlyGoal] = useState("15");
  const [haptics, setHaptics] = useState(true);
  const [units, setUnits] = useState("kg");
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [bodyWeight, setBodyWeight] = useState("");
  const [trainingDays, setTrainingDays] = useState({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false,
  });

  // Effect to handle dark mode changes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handlePasswordChange = (values: z.infer<typeof passwordSchema>) => {
    console.log("Password change values:", values);
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    });
    setIsPasswordDialogOpen(false);
    form.reset();
  };

  const handleDarkModeToggle = (checked: boolean) => {
    setDarkMode(checked);
    document.documentElement.classList.toggle('dark', checked);
    toast({
      title: checked ? "Dark mode enabled" : "Light mode enabled",
      description: "Your preference has been saved.",
    });
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    toast({
      title: "Language updated",
      description: `App language changed to ${value === 'es' ? 'Spanish' : 'English'}`,
    });
    console.log("Language changed to:", value);
  };

  const handleUnitsChange = (value: string) => {
    setUnits(value);
    toast({
      title: "Units updated",
      description: `Measurement units changed to ${value.toUpperCase()}`,
    });
  };

  const handleBodyWeightUpdate = () => {
    if (bodyWeight) {
      toast({
        title: "Weight updated",
        description: `Your weight has been updated to ${bodyWeight}${units}`,
      });
    }
  };

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

  const handleHapticsChange = (checked: boolean) => {
    setHaptics(checked);
    toast({
      title: checked ? "Haptics enabled" : "Haptics disabled",
      description: "Your haptic feedback preference has been saved.",
    });
  };

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

  const handleSaveChanges = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleFeedbackSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const type = formData.get('type');
    const description = formData.get('description');

    console.log("Feedback submitted:", { type, description });

    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback. We'll review it shortly.",
    });

    (event.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <button 
        onClick={() => navigate('/')} 
        className="fixed top-4 left-4 p-2 text-muted-foreground hover:text-foreground z-50"
      >
        <ArrowLeft className="h-6 w-6" />
      </button>

      <div className="bg-black p-4 flex items-center justify-center gap-2 sticky top-0 z-40">
        <SettingsIcon className="h-5 w-5" />
        <h1 className="text-xl font-bold">Settings</h1>
      </div>

      <div className="container max-w-2xl mx-auto p-4 space-y-6">
        {/* Profile Section */}
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
                      <AvatarImage src={undefined} />
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
                    />
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

        {/* Data Management Section */}
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
              <Button variant="outline" className="w-full" onClick={() => {
                toast({
                  title: "Data export initiated",
                  description: "Your data will be prepared for download shortly.",
                });
              }}>
                Export Training History
              </Button>
            </div>
            <div className="space-y-2">
              <Label>Backup Settings</Label>
              <Button variant="outline" className="w-full" onClick={() => {
                toast({
                  title: "Backup created",
                  description: "Your settings have been backed up successfully.",
                });
              }}>
                Create Backup
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Training Preferences Section */}
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

        {/* Notifications Section */}
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

        {/* App Personalization */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5" />
              App Personalization
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dark Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Toggle between dark and light mode
                </p>
              </div>
              <Switch
                checked={darkMode}
                onCheckedChange={handleDarkModeToggle}
              />
            </div>
            <div className="space-y-2">
              <Label>Units of Measurement</Label>
              <Select value={units} onValueChange={handleUnitsChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">Kilograms (kg)</SelectItem>
                  <SelectItem value="lb">Pounds (lb)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Haptic Feedback</Label>
                <p className="text-sm text-muted-foreground">
                  Vibration for repetitions and timer alerts
                </p>
              </div>
              <Switch
                checked={haptics}
                onCheckedChange={handleHapticsChange}
              />
            </div>
            <div className="space-y-2">
              <Label>Language</Label>
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Support & Feedback */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Support & Feedback
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Type</Label>
                <Select defaultValue="bug" name="type">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bug">Report a Bug</SelectItem>
                    <SelectItem value="feature">Suggest a Feature</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  name="description"
                  placeholder="Describe the issue or suggestion..."
                  className="min-h-[100px]"
                />
              </div>
              <Button type="submit" className="w-full">
                Send Feedback
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Save Changes Button */}
        <Button className="w-full" onClick={handleSaveChanges}>
          Save Changes
        </Button>

        {/* Account Section */}
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
