import { Play } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

interface WorkoutRecoveryProps {
  recovery: string;
}

const WorkoutRecovery = ({ recovery }: WorkoutRecoveryProps) => {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold mb-4">RECOVERY:</h2>
      <Card>
        <CardContent className="p-4">
          <div className="exercise-item">
            <Play className="h-5 w-5 text-primary mt-1" />
            <div>
              <h3 className="font-semibold">Cool Down & Recovery</h3>
              <p className="text-muted-foreground whitespace-pre-line">
                {recovery.split('. ').map((instruction, index) => (
                  instruction.trim() && (
                    <span key={index} className="block mb-2">
                      • {instruction.trim()}
                    </span>
                  )
                ))}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default WorkoutRecovery;