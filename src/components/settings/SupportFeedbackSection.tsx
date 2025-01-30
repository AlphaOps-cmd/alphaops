import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export const SupportFeedbackSection = () => {
  const { toast } = useToast();

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
  );
};