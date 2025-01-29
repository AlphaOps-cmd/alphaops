import React from 'react';
import { ArrowLeft, Play } from 'lucide-react';
import { Button } from './ui/button';

const exercises = [
  { name: 'Ski', reps: '10 calorie' },
  { name: 'Push Ups', reps: '15x' },
  { name: 'Hanging Leg Raises', reps: '10x' },
  { name: 'Chest to Floor Walkouts', reps: '5x' },
];

const WorkoutProgram = () => {
  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-center">247 PROGRAMME</h1>
          <p className="text-muted-foreground text-center">Fri 24th | Week 3</p>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="text-xl font-bold mb-4">WARM UP:</h2>
        <p className="text-muted-foreground mb-4">Each Complete 4 rounds of the following</p>
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

      <section className="mt-8">
        <h2 className="text-xl font-bold mb-4">MAIN SESSION - STRENGTH 1:</h2>
        <p className="text-muted-foreground mb-4">2 minutes rest between sets.</p>
        <p className="text-sm text-muted-foreground mb-6">
          *Complete a set of pull ups after each set - always leaving 2 reps in the tank*
        </p>
        <div className="space-y-4">
          {[1, 2, 3].map((set) => (
            <div key={set} className="exercise-item">
              <Play className="h-5 w-5 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">Bench Presses</h3>
                <p className="text-muted-foreground">- 1 x {12 - (set * 2)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WorkoutProgram;