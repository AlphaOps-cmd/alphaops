import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const AccountSection = () => {
  return (
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
  );
};