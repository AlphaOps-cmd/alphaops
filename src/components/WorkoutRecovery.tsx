import { Play } from 'lucide-react';

interface WorkoutRecoveryProps {
  recovery: string;
}

const WorkoutRecovery = ({ recovery }: WorkoutRecoveryProps) => {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold mb-4">RECOVERY:</h2>
      <div className="exercise-item">
        <Play className="h-5 w-5 text-primary mt-1" />
        <div>
          <h3 className="font-semibold">Cool Down</h3>
          <p className="text-muted-foreground">- {recovery}</p>
        </div>
      </div>
    </section>
  );
};

export default WorkoutRecovery;