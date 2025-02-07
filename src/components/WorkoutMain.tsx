
import { Dumbbell } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";

interface Exercise {
  name: string;
  reps: string;
  percentage?: number; // Optional percentage of 1RM
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

  // Fetch personal records for the user
  const { data: personalRecords } = useQuery({
    queryKey: ['personal-records'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return [];
      
      const { data, error } = await supabase
        .from('personal_records')
        .select('*')
        .eq('user_id', session.user.id);
      
      if (error) throw error;
      return data || [];
    }
  });

  const getWeightRecommendation = (exercise: Exercise) => {
    if (!personalRecords) return null;

    const record = personalRecords.find(
      pr => pr.exercise_name.toLowerCase() === exercise.name.toLowerCase()
    );

    if (!record?.one_rm) return null;

    // If there's a specific percentage defined in the exercise
    if (exercise.percentage) {
      const weight = Math.round(record.one_rm * (exercise.percentage / 100));
      return `${weight}kg (${exercise.percentage}% of 1RM)`;
    }

    // Default recommendations based on rep ranges
    const reps = exercise.reps.match(/\d+/);
    if (reps) {
      const repCount = parseInt(reps[0]);
      let percentage;
      if (repCount <= 3) percentage = 0.9;
      else if (repCount <= 5) percentage = 0.85;
      else if (repCount <= 8) percentage = 0.8;
      else if (repCount <= 12) percentage = 0.75;
      else percentage = 0.7;

      const weight = Math.round(record.one_rm * percentage);
      return `${weight}kg (${Math.round(percentage * 100)}% of 1RM)`;
    }

    return null;
  };

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
        {exercises.map((exercise, index) => {
          const weightRecommendation = getWeightRecommendation(exercise);
          return (
            <div key={index} className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <div>
                <span className="font-medium">{exercise.name}</span>
                <span className="text-muted-foreground"> - {exercise.reps}</span>
                {weightRecommendation && (
                  <span className="text-primary ml-2">@ {weightRecommendation}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WorkoutMain;

