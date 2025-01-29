import { Play } from 'lucide-react';

interface Exercise {
  name: string;
  reps: string;
}

interface WorkoutPhase {
  type: 'rounds' | 'fortime';
  rounds?: number;
  exercises: Exercise[];
}

interface WorkoutMainProps {
  workout: WorkoutPhase;
}

const WorkoutMain = ({ workout }: WorkoutMainProps) => {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold mb-4">WORKOUT:</h2>
      {workout.type === 'rounds' ? (
        <p className="text-muted-foreground mb-4">Complete {workout.rounds} rounds of:</p>
      ) : (
        <p className="text-muted-foreground mb-4">For time:</p>
      )}
      <div className="space-y-4">
        {workout.exercises.map((exercise, index) => (
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

export default WorkoutMain;