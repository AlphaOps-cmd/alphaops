import { Camera, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export const ProfileSection = () => {
  const { toast } = useToast();
  const [membership, setMembership] = useState(() => {
    return localStorage.getItem('membership') || 'standard';
  });

  const handleChangePassword = () => {
    toast({
      title: "Change password",
      description: "Password change functionality will be implemented soon.",
    });
  };

  const handleMembershipChange = (value: string) => {
    setMembership(value);
    localStorage.setItem('membership', value);
    toast({
      title: "Membership updated",
      description: `Your membership has been updated to ${value}`,
    });
  };

  return (
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
                <Input type="file" accept="image/*" />
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
            <Select value={membership} onValueChange={handleMembershipChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleChangePassword}
          >
            Change Password
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};