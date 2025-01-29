import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { Button } from './ui/button';
import WorkoutTimer from './WorkoutTimer';

const workoutsByDay: Record<string, Array<{ name: string, reps: string }>> = {
  '20': [
    { name: 'Burpees', reps: '20x' },
    { name: 'Air Squats', reps: '30x' },
    { name: 'Push Ups', reps: '15x' },
    { name: 'Mountain Climbers', reps: '40x' },
  ],
  '21': [
    { name: 'Pull Ups', reps: '10x' },
    { name: 'Deadlifts', reps: '12x @ 60kg' },
    { name: 'Box Jumps', reps: '20x' },
    { name: 'Kettlebell Swings', reps: '25x' },
  ],
  '22': [
    { name: 'Thrusters', reps: '15x' },
    { name: 'Row', reps: '500m' },
    { name: 'Wall Balls', reps: '20x' },
    { name: 'Sit Ups', reps: '30x' },
  ],
  '23': [
    { name: 'Double Unders', reps: '50x' },
    { name: 'Clean and Jerks', reps: '10x' },
    { name: 'Ring Dips', reps: '12x' },
    { name: 'Running', reps: '400m' },
  ],
  '24': [
    { name: 'Ski', reps: '10 calorie' },
    { name: 'Push Ups', reps: '15x' },
    { name: 'Hanging Leg Raises', reps: '10x' },
    { name: 'Chest to Floor Walkouts', reps: '5x' },
  ],
  '25': [
    { name: 'Assault Bike', reps: '15 cal' },
    { name: 'Devil Press', reps: '12x' },
    { name: 'Toes to Bar', reps: '15x' },
    { name: 'Lunges', reps: '20x each leg' },
  ],
  '26': [
    { name: 'Rope Climbs', reps: '3x' },
    { name: 'Power Cleans', reps: '10x' },
    { name: 'Handstand Push Ups', reps: '8x' },
    { name: 'Box Step Overs', reps: '24x' },
  ],
};

const WorkoutProgram = ({ selectedDay = '24' }: { selectedDay?: string }) => {
  const [showTimer, setShowTimer] = useState(false);
  const exercises = workoutsByDay[selectedDay] || workoutsByDay['24'];

  if (showTimer) {
    return <WorkoutTimer onClose={() => setShowTimer(false)} exercises={exercises} />;
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-center">TODAY'S WORKOUT</h1>
        <p className="text-muted-foreground text-center">Week 3</p>
      </div>

      <section className="mt-8">
        <h2 className="text-xl font-bold mb-4">WARM UP:</h2>
        <p className="text-muted-foreground mb-4">Complete 4 rounds of the following</p>
        <div className="space-y-4">
          {exercises.map((exercise, index) => (
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

      <Button 
        className="mt-8 w-full"
        onClick={() => setShowTimer(true)}
      >
        Start Workout
      </Button>
    </div>
  );
};

export default WorkoutProgram;