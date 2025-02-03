import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { Button } from './ui/button';
import WorkoutTimer from './WorkoutTimer';
import WorkoutSelector from './WorkoutSelector';
import WorkoutWarmup from './WorkoutWarmup';
import WorkoutMain from './WorkoutMain';
import WorkoutRecovery from './WorkoutRecovery';
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from '@tanstack/react-query';
import { useToast } from "@/hooks/use-toast";
import { Database } from '@/integrations/supabase/types';

type WorkoutType = Database['public']['Enums']['workout_type'];
type DifficultyLevel = Database['public']['Enums']['difficulty_level'];

interface WorkoutSection {
  section_type: string;
  content: any;
}

interface WorkoutData {
  workout_sections: WorkoutSection[];
}

const WorkoutProgram = ({ selectedDay = '24' }: { selectedDay?: string }) => {
  const { toast } = useToast();
  const [showTimer, setShowTimer] = useState(false);
  const [workoutType, setWorkoutType] = useState<WorkoutType>('CrossFit');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Intermediate');

  // Fetch workout from database
  const { data: workout, isLoading, error } = useQuery({
    queryKey: ['workout', selectedDay, workoutType, difficulty],
    queryFn: async () => {
      console.log('Fetching workout for:', { selectedDay, workoutType, difficulty });
      
      // Format the date correctly for the current month and year
      const currentDate = new Date();
      const formattedDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        parseInt(selectedDay)
      ).toISOString().split('T')[0];

      console.log('Formatted date:', formattedDate);

      const { data: workoutData, error } = await supabase
        .from('cached_workouts')
        .select('workout_data')
        .eq('date', formattedDate)
        .eq('workout_type', workoutType)
        .eq('difficulty', difficulty)
        .maybeSingle();

      if (error) {
        console.error('Supabase error:', error);
        throw new Error('Failed to fetch workout data');
      }

      if (!workoutData) {
        console.log('No workout found for:', { formattedDate, workoutType, difficulty });
        toast({
          title: "No workout available",
          description: `No workout found for ${formattedDate}. Try a different date or workout type.`,
          variant: "destructive"
        });
        throw new Error('No workout found for this date');
      }

      console.log('Found workout:', workoutData);
      // First cast to unknown, then to WorkoutData to satisfy TypeScript
      const parsedWorkout = workoutData.workout_data as unknown as WorkoutData;
      
      // Validate the structure
      if (!parsedWorkout || !Array.isArray(parsedWorkout.workout_sections)) {
        console.error('Invalid workout data structure:', parsedWorkout);
        toast({
          title: "Invalid workout data",
          description: "The workout data is not in the correct format. Please try a different workout.",
          variant: "destructive"
        });
        throw new Error('Invalid workout data structure');
      }

      return parsedWorkout;
    },
    retry: 1
  });

  const handleDifficultyChange = async (newDifficulty: DifficultyLevel) => {
    setDifficulty(newDifficulty);
    toast({
      title: "Adjusting workout difficulty",
      description: "Modifying the workout for " + newDifficulty + " level",
    });
  };

  // Format workout sections for display
  const formatWorkoutSections = () => {
    if (!workout?.workout_sections) {
      console.log('No workout sections found:', workout);
      return null;
    }

    const sections = workout.workout_sections.reduce((acc: Record<string, any>, section) => {
      acc[section.section_type] = section.content;
      return acc;
    }, {});

    console.log('Formatted sections:', sections);

    return {
      warmup: sections.warmup?.exercises || [],
      workout: sections.wod || { type: 'rounds', rounds: 3, exercises: [] },
      recovery: sections.recovery || '',
      strength: sections.strength
    };
  };

  const currentWorkout = formatWorkoutSections() || {
    warmup: [],
    workout: { type: 'rounds', rounds: 3, exercises: [] },
    recovery: '',
    strength: null
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <p className="text-red-500 mb-4">No workout available for this date.</p>
        <p className="text-muted-foreground">Try selecting a different date or workout type.</p>
      </div>
    );
  }

  if (showTimer) {
    return <WorkoutTimer 
      onClose={() => setShowTimer(false)} 
      warmup={currentWorkout.warmup}
      workout={currentWorkout.workout}
    />;
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-center">TODAY'S WORKOUT</h1>
        <p className="text-muted-foreground text-center mb-4">Week 3</p>
        <WorkoutSelector
          workoutType={workoutType}
          difficulty={difficulty}
          onWorkoutTypeChange={setWorkoutType}
          onDifficultyChange={handleDifficultyChange}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <WorkoutWarmup warmup={currentWorkout.warmup} />
          {currentWorkout.strength && (
            <section className="mt-8">
              <h2 className="text-xl font-bold mb-4">STRENGTH:</h2>
              <div className="space-y-4">
                {currentWorkout.strength.exercises.map((exercise, index) => (
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
          )}
          <WorkoutMain workout={currentWorkout.workout} />
          <WorkoutRecovery recovery={currentWorkout.recovery} />
        </>
      )}

      <div className="mt-8 flex justify-center">
        <Button 
          onClick={() => setShowTimer(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 w-48 h-12 text-lg"
        >
          Start Workout
        </Button>
      </div>
    </div>
  );
};

export default WorkoutProgram;