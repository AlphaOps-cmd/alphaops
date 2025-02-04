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
import type { WorkoutType, DifficultyLevel, WorkoutData } from '@/integrations/supabase/types';

const WorkoutProgram = ({ selectedDay = '24' }: { selectedDay?: string }) => {
  const { toast } = useToast();
  const [showTimer, setShowTimer] = useState(false);
  const [workoutType, setWorkoutType] = useState<WorkoutType>('CrossFit');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Intermediate');

  const { data: workout, isLoading, refetch } = useQuery({
    queryKey: ['workout', selectedDay, workoutType, difficulty],
    queryFn: async () => {
      try {
        console.log('Fetching workout with params:', { selectedDay, workoutType, difficulty });
        const date = new Date();
        date.setDate(parseInt(selectedDay));
        const formattedDate = date.toISOString().split('T')[0];

        const { data: baseWorkout, error } = await supabase
          .from('cached_workouts')
          .select('workout_data')
          .eq('date', formattedDate)
          .eq('workout_type', workoutType)
          .maybeSingle();

        if (error) {
          console.error('Error fetching workout:', error);
          throw error;
        }

        if (!baseWorkout) {
          console.log('No workout found for:', { formattedDate, workoutType });
          return {
            workout_sections: [
              {
                section_type: 'warmup',
                content: { exercises: [] }
              },
              {
                section_type: 'wod',
                content: { type: 'rounds', rounds: 3, exercises: [] }
              },
              {
                section_type: 'recovery',
                content: 'Cool down and stretch for 5-10 minutes'
              }
            ]
          } as WorkoutData;
        }

        console.log('Base workout found:', baseWorkout);
        return baseWorkout.workout_data as WorkoutData;
      } catch (error) {
        console.error('Error in workout fetch:', error);
        return {
          workout_sections: [
            {
              section_type: 'warmup',
              content: { exercises: [] }
            },
            {
              section_type: 'wod',
              content: { type: 'rounds', rounds: 3, exercises: [] }
            },
            {
              section_type: 'recovery',
              content: 'Cool down and stretch for 5-10 minutes'
            }
          ]
        } as WorkoutData;
      }
    }
  });

  const handleDifficultyChange = async (newDifficulty: DifficultyLevel) => {
    setDifficulty(newDifficulty);
    toast({
      title: "Adjusting workout difficulty",
      description: "Modifying the workout for " + newDifficulty + " level",
    });
    await refetch();
  };

  const handleWorkoutTypeChange = async (newType: WorkoutType) => {
    setWorkoutType(newType);
    toast({
      title: "Changing workout type",
      description: "Loading " + newType + " workout",
    });
    await refetch();
  };

  const formatWorkoutSections = () => {
    if (!workout?.workout_sections) {
      console.log('No workout sections found');
      return {
        warmup: [],
        workout: { type: 'rounds', rounds: 3, exercises: [] },
        recovery: '',
        strength: null
      };
    }

    console.log('Formatting workout sections:', workout.workout_sections);
    const sections = workout.workout_sections.reduce((acc: any, section: any) => {
      acc[section.section_type] = section.content;
      return acc;
    }, {});

    return {
      warmup: sections.warmup?.exercises || [],
      workout: sections.wod || { type: 'rounds', rounds: 3, exercises: [] },
      recovery: sections.recovery || '',
      strength: sections.strength
    };
  };

  const currentWorkout = formatWorkoutSections();

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
          onWorkoutTypeChange={handleWorkoutTypeChange}
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
                {currentWorkout.strength.exercises.map((exercise: any, index: number) => (
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
