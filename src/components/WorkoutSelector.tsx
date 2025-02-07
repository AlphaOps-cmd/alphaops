
import React from 'react';
import { Button } from './ui/button';
import { Dumbbell } from 'lucide-react';

const WorkoutSelector = () => {
  return (
    <div className="flex justify-center gap-4 mb-8 max-w-[400px] mx-auto w-full">
      <Button
        variant="outline"
        size="sm"
        className="bg-transparent border-white text-white hover:bg-white/10 flex-1 min-w-0"
      >
        <Dumbbell className="w-4 h-4 mr-2 shrink-0" />
        <span className="truncate">Hybrid Functional</span>
      </Button>
    </div>
  );
};

export default WorkoutSelector;
