import React from 'react';
import { Button } from './ui/button';
import { Slash, Timer, Dumbbell } from 'lucide-react';

interface WorkoutSelectorProps {
  workoutType: string;
  difficulty: string;
  duration: string;
  onWorkoutTypeChange: (type: string) => void;
  onDifficultyChange: (difficulty: string) => void;
  onDurationChange: (duration: string) => void;
}

const workoutTypes = ['CrossFit', 'Special Forces', 'Hyrox', 'Home Workout'];
const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
const durations = ['30 min', '45 min', '60 min'];

const WorkoutSelector = ({
  workoutType,
  difficulty,
  duration,
  onWorkoutTypeChange,
  onDifficultyChange,
  onDurationChange,
}: WorkoutSelectorProps) => {
  const cycleValue = (current: string, options: string[]) => {
    const currentIndex = options.indexOf(current);
    const nextIndex = (currentIndex + 1) % options.length;
    return options[nextIndex];
  };

  return (
    <div className="flex justify-between gap-2 mb-8 max-w-[400px] mx-auto w-full">
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
      <Button
        variant="outline"
        size="sm"
        className="bg-transparent border-white text-white hover:bg-white/10 flex-1 min-w-0"
        onClick={() => onDurationChange(cycleValue(duration, durations))}
      >
        <Timer className="w-4 h-4 mr-2 shrink-0" />
        <span className="truncate">{duration}</span>
      </Button>
    </div>
  );
};

export default WorkoutSelector;