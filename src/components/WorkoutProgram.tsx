import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { Button } from './ui/button';
import WorkoutTimer from './WorkoutTimer';

const workoutsByDay: Record<string, {
  warmup: Array<{ name: string, reps: string }>,
  workout: {
    type: 'rounds' | 'fortime',
    rounds?: number,
    exercises: Array<{ name: string, reps: string }>
  }
}> = {
  '20': {
    warmup: [
      { name: 'Burpees', reps: '20x' },
      { name: 'Air Squats', reps: '30x' },
      { name: 'Push Ups', reps: '15x' },
      { name: 'Mountain Climbers', reps: '40x' },
    ],
    workout: {
      type: 'rounds',
      rounds: 3,
      exercises: [
        { name: 'Thrusters', reps: '15x' },
        { name: 'Box Jumps', reps: '20x' },
        { name: 'Pull Ups', reps: '10x' },
      ]
    }
  },
  '21': {
    warmup: [
      { name: 'Pull Ups', reps: '10x' },
      { name: 'Deadlifts', reps: '12x @ 60kg' },
      { name: 'Box Jumps', reps: '20x' },
      { name: 'Kettlebell Swings', reps: '25x' },
    ],
    workout: {
      type: 'fortime',
      exercises: [
        { name: 'Clean and Jerks', reps: '30x' },
        { name: 'Double Unders', reps: '100x' },
        { name: 'Wall Balls', reps: '50x' },
      ]
    }
  },
  '22': {
    warmup: [
      { name: 'Thrusters', reps: '15x' },
      { name: 'Row', reps: '500m' },
      { name: 'Wall Balls', reps: '20x' },
      { name: 'Sit Ups', reps: '30x' },
    ],
    workout: {
      type: 'rounds',
      rounds: 5,
      exercises: [
        { name: 'Power Cleans', reps: '10x' },
        { name: 'Burpees', reps: '15x' },
        { name: 'Ring Rows', reps: '12x' },
      ]
    }
  },
  '23': {
    warmup: [
      { name: 'Double Unders', reps: '50x' },
      { name: 'Clean and Jerks', reps: '10x' },
      { name: 'Ring Dips', reps: '12x' },
      { name: 'Running', reps: '400m' },
    ],
    workout: {
      type: 'fortime',
      exercises: [
        { name: 'Assault Bike', reps: '50 cal' },
        { name: 'Deadlifts', reps: '40x' },
        { name: 'Handstand Push Ups', reps: '30x' },
      ]
    }
  },
  '24': {
    warmup: [
      { name: 'Ski', reps: '10 calorie' },
      { name: 'Push Ups', reps: '15x' },
      { name: 'Hanging Leg Raises', reps: '10x' },
      { name: 'Chest to Floor Walkouts', reps: '5x' },
    ],
    workout: {
      type: 'rounds',
      rounds: 4,
      exercises: [
        { name: 'Thrusters', reps: '12x' },
        { name: 'Pull Ups', reps: '8x' },
        { name: 'Box Jumps', reps: '15x' },
      ]
    }
  },
  '25': {
    warmup: [
      { name: 'Assault Bike', reps: '15 cal' },
      { name: 'Devil Press', reps: '12x' },
      { name: 'Toes to Bar', reps: '15x' },
      { name: 'Lunges', reps: '20x each leg' },
    ],
    workout: {
      type: 'fortime',
      exercises: [
        { name: 'Row', reps: '1000m' },
        { name: 'Wall Balls', reps: '50x' },
        { name: 'Burpees', reps: '30x' },
      ]
    }
  },
  '26': {
    warmup: [
      { name: 'Rope Climbs', reps: '3x' },
      { name: 'Power Cleans', reps: '10x' },
      { name: 'Handstand Push Ups', reps: '8x' },
      { name: 'Box Step Overs', reps: '24x' },
    ],
    workout: {
      type: 'rounds',
      rounds: 3,
      exercises: [
        { name: 'Clean and Jerks', reps: '15x' },
        { name: 'Ring Muscle Ups', reps: '5x' },
        { name: 'Overhead Squats', reps: '10x' },
      ]
    }
  },
};

const WorkoutProgram = ({ selectedDay = '24' }: { selectedDay?: string }) => {
  const [showTimer, setShowTimer] = useState(false);
  const workout = workoutsByDay[selectedDay] || workoutsByDay['24'];

  if (showTimer) {
    return <WorkoutTimer 
      onClose={() => setShowTimer(false)} 
      warmup={workout.warmup}
      workout={workout.workout}
    />;
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
          {workout.warmup.map((exercise, index) => (
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

      <section className="mt-8">
        <h2 className="text-xl font-bold mb-4">WORKOUT:</h2>
        {workout.workout.type === 'rounds' ? (
          <p className="text-muted-foreground mb-4">Complete {workout.workout.rounds} rounds of:</p>
        ) : (
          <p className="text-muted-foreground mb-4">For time:</p>
        )}
        <div className="space-y-4">
          {workout.workout.exercises.map((exercise, index) => (
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