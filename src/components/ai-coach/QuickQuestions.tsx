import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface QuickQuestionsProps {
  currentQuestion: string;
  onPrevQuestion: () => void;
  onNextQuestion: () => void;
  onSelectQuestion: (question: string) => void;
}

const QuickQuestions = ({
  currentQuestion,
  onPrevQuestion,
  onNextQuestion,
  onSelectQuestion,
}: QuickQuestionsProps) => {
  return (
    <div className="relative mb-4 h-12 flex-shrink-0">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={onPrevQuestion}
          className="absolute left-0 z-10"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="w-full mx-8 justify-start text-sm text-left truncate px-3"
          onClick={() => onSelectQuestion(currentQuestion)}
        >
          <span className="truncate block">
            {currentQuestion}
          </span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onNextQuestion}
          className="absolute right-0 z-10"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default QuickQuestions;