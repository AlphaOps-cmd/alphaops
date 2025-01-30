import { Settings as SettingsIcon, Moon, Sun, Globe } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export const AppPersonalizationSection = () => {
  const { toast } = useToast();
  const [darkMode, setDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });
  const [language, setLanguage] = useState("es");
  const [haptics, setHaptics] = useState(true);
  const [units, setUnits] = useState("kg");

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const handleDarkModeToggle = (checked: boolean) => {
    setDarkMode(checked);
    toast({
      title: checked ? "Dark mode enabled" : "Light mode enabled",
      description: "Your preference has been saved.",
    });
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    localStorage.setItem('language', value);
    toast({
      title: "Language updated",
      description: `App language changed to ${value === 'es' ? 'Spanish' : 'English'}`,
    });
  };

  const handleUnitsChange = (value: string) => {
    setUnits(value);
    localStorage.setItem('units', value);
    toast({
      title: "Units updated",
      description: `Measurement units changed to ${value.toUpperCase()}`,
    });
  };

  const handleHapticsChange = (checked: boolean) => {
    setHaptics(checked);
    localStorage.setItem('haptics', String(checked));
    toast({
      title: checked ? "Haptics enabled" : "Haptics disabled",
      description: "Your haptic feedback preference has been saved.",
    });
  };

  return (
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
  );
};