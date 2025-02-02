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

const WorkoutProgram = ({ selectedDay = '24' }: { selectedDay?: string }) => {
  const [showTimer, setShowTimer] = useState(false);
  const [workoutType, setWorkoutType] = useState('CrossFit');
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [duration, setDuration] = useState('45 min');

  // Fetch workout from database and process with AI if needed
  const { data: workout, isLoading } = useQuery({
    queryKey: ['workout', selectedDay],
    queryFn: async () => {
      const date = new Date();
      date.setDate(parseInt(selectedDay));
      const formattedDate = date.toISOString().split('T')[0];

      const response = await supabase.functions.invoke('process-workout', {
        body: { date: formattedDate }
      });

      if (response.error) throw response.error;
      return response.data;
    }
  });

  // Format workout sections for display
  const formatWorkoutSections = () => {
    if (!workout?.workout_sections) return null;

    const sections = workout.workout_sections.reduce((acc, section) => {
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

  const currentWorkout = formatWorkoutSections() || {
    warmup: [],
    workout: { type: 'rounds', rounds: 3, exercises: [] },
    recovery: '',
    strength: null
  };

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
          duration={duration}
          onWorkoutTypeChange={setWorkoutType}
          onDifficultyChange={setDifficulty}
          onDurationChange={setDuration}
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