import { Play } from 'lucide-react';

interface WarmupExercise {
  name: string;
  reps: string;
}

interface WorkoutWarmupProps {
  warmup: WarmupExercise[];
}

const WorkoutWarmup = ({ warmup }: WorkoutWarmupProps) => {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold mb-4">WARM UP:</h2>
      <p className="text-muted-foreground mb-4">Complete the following</p>
      <div className="space-y-4">
        {warmup.map((exercise, index) => (
          <div key={index} className="exercise-item">
            <Play className="h-5 w-5 text-primary mt-1" />
            <div>
              <h3 className="font-semibold">{exercise.name}</h3>
              <p className="text-muted-foreground">- {exercise.reps}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkoutWarmup;