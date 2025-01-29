import React from 'react';
import { Dumbbell, LineChart, ShoppingBag } from 'lucide-react';

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <div className="grid grid-cols-3 gap-1 p-2">
        <button className="bottom-nav-item text-primary">
          <Dumbbell className="h-6 w-6" />
          <span>247 Programme</span>
        </button>
        <button className="bottom-nav-item text-muted-foreground">
          <LineChart className="h-6 w-6" />
          <span>Progress</span>
        </button>
        <button className="bottom-nav-item text-muted-foreground">
          <ShoppingBag className="h-6 w-6" />
          <span>Shop247</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNav;