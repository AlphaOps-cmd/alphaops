import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

const WorkoutTimer = ({ onClose, exercises }: { onClose: () => void, exercises: Array<{ name: string, reps: string }> }) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [completedExercises, setCompletedExercises] = useState<Set<number>>(new Set());
  const [round, setRound] = useState(1);

  useEffect(() => {
    let interval: number | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(t => t + 1);
      }, 1000) as unknown as number;
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const toggleExercise = (index: number) => {
    const newCompleted = new Set(completedExercises);
    if (newCompleted.has(index)) {
      newCompleted.delete(index);
    } else {
      newCompleted.add(index);
    }
    setCompletedExercises(newCompleted);
  };

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col p-4">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={onClose}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h2 className="text-xl font-bold">FOR TIME</h2>
      </div>

      <div className="flex flex-col items-center justify-center flex-1 gap-8">
        <div className="text-6xl font-bold">{formatTime(time)}</div>
        <p className="text-muted-foreground">tap to pause</p>
        
        <div className="absolute bottom-24 right-8 flex items-center justify-center w-12 h-12 rounded-full border-2 border-primary">
          <span className="text-xl font-bold">{round}</span>
        </div>
      </div>

      <div className="space-y-4 mb-20">
        {exercises.map((exercise, index) => (
          <div
            key={index}
            className={`exercise-item cursor-pointer ${
              completedExercises.has(index) ? 'opacity-50' : ''
            }`}
            onClick={() => toggleExercise(index)}
          >
            <div className="flex-1">
              <h3 className="font-semibold">{exercise.name}</h3>
              <p className="text-muted-foreground">- {exercise.reps}</p>
            </div>
            {completedExercises.has(index) && (
              <span className="text-primary">✓</span>
            )}
          </div>
        ))}
      </div>

      <Button 
        className="fixed bottom-4 left-4 right-4"
        onClick={() => setRound(r => r + 1)}
      >
        Complete Round
      </Button>
    </div>
  );
};

export default WorkoutTimer;