import { Flame } from 'lucide-react';

interface WarmupExercise {
  name: string;
  reps: string;
}

interface WorkoutWarmupProps {
  warmup: WarmupExercise[];
}

const WorkoutWarmup = ({ warmup }: WorkoutWarmupProps) => {
  const defaultWarmup = [
    { name: "Trote ligero y movilidad articular", reps: "5 minutos" },
    { name: "Estiramientos dinámicos", reps: "3 minutos" }
  ];

  const exercises = warmup?.length > 0 ? warmup : defaultWarmup;

  return (
    <section className="mt-8 bg-card rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Flame className="h-6 w-6 text-primary" />
        <h2 className="text-xl font-bold">WARM UP</h2>
      </div>
      <div className="space-y-3 ml-4">
        {exercises.map((exercise, index) => (
          <div key={index} className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <div>
              <span className="font-medium">{exercise.name}</span>
              <span className="text-muted-foreground"> - {exercise.reps}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkoutWarmup;