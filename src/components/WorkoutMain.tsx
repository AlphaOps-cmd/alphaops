import { Dumbbell } from 'lucide-react';

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
  const exercises = workout?.exercises || [];

  return (
    <section className="mt-8 bg-card rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Dumbbell className="h-6 w-6 text-primary" />
        <h2 className="text-xl font-bold">WORKOUT</h2>
      </div>
      
      {workout?.type === 'rounds' ? (
        <p className="text-muted-foreground mb-4 ml-4">
          Complete {workout.rounds} rounds of:
        </p>
      ) : (
        <p className="text-muted-foreground mb-4 ml-4">For time:</p>
      )}

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

export default WorkoutMain;