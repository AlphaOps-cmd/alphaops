import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, ArrowLeft, ArrowRight } from "lucide-react";

interface Recommendation {
  type: string;
  icon: string;
  message: string;
  color: string;
}

interface AIRecommendationsProps {
  recommendation: Recommendation;
  onPrev: () => void;
  onNext: () => void;
}

const AIRecommendations = ({ recommendation, onPrev, onNext }: AIRecommendationsProps) => {
  return (
    <div className="relative">
      <Card className={`border ${recommendation.color}`}>
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <span className="text-2xl">{recommendation.icon}</span>
            <div className="flex-1">
              <p className="text-sm">{recommendation.message}</p>
              <div className="flex gap-2 mt-2">
                <Button variant="ghost" size="sm">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  Útil
                </Button>
                <Button variant="ghost" size="sm">
                  <ThumbsDown className="h-4 w-4 mr-1" />
                  No útil
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="absolute inset-y-0 left-0 flex items-center">
        <Button variant="ghost" size="icon" onClick={onPrev}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <Button variant="ghost" size="icon" onClick={onNext}>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default AIRecommendations;