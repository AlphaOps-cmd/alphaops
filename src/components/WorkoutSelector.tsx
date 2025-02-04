import React from 'react';
import { Button } from './ui/button';
import { Slash, Dumbbell } from 'lucide-react';

interface WorkoutSelectorProps {
  workoutType: 'CrossFit' | 'Special Forces' | 'Hyrox';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  onWorkoutTypeChange: (type: 'CrossFit' | 'Special Forces' | 'Hyrox') => void;
  onDifficultyChange: (difficulty: 'Beginner' | 'Intermediate' | 'Advanced') => void;
}

const workoutTypes = ['CrossFit', 'Special Forces', 'Hyrox'] as const;
const difficulties = ['Beginner', 'Intermediate', 'Advanced'] as const;

const WorkoutSelector = ({
  workoutType,
  difficulty,
  onWorkoutTypeChange,
  onDifficultyChange,
}: WorkoutSelectorProps) => {
  const cycleValue = <T extends string>(current: T, options: readonly T[]): T => {
    const currentIndex = options.indexOf(current);
    const nextIndex = (currentIndex + 1) % options.length;
    return options[nextIndex];
  };

  return (
    <div className="flex justify-center gap-4 mb-8 max-w-[400px] mx-auto w-full">
      <Button
        variant="outline"
        size="sm"
        className="bg-transparent border-white text-white hover:bg-white/10 flex-1 min-w-0"
        onClick={() => onWorkoutTypeChange(cycleValue(workoutType, workoutTypes))}
      >
        <Dumbbell className="w-4 h-4 mr-2 shrink-0" />
        <span className="truncate">{workoutType}</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="bg-transparent border-white text-white hover:bg-white/10 flex-1 min-w-0"
        onClick={() => onDifficultyChange(cycleValue(difficulty, difficulties))}
      >
        <Slash className="w-4 h-4 mr-2 shrink-0" />
        <span className="truncate">{difficulty}</span>
      </Button>
    </div>
  );
};

export default WorkoutSelector;