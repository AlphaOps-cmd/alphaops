import React from 'react';
import { Home, BarChart, Settings } from 'lucide-react';

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <div className="grid grid-cols-3 gap-1 p-2">
        <button className="bottom-nav-item text-primary">
          <Home className="h-6 w-6" />
          <span>Home</span>
        </button>
        <button className="bottom-nav-item text-muted-foreground">
          <BarChart className="h-6 w-6" />
          <span>Progress</span>
        </button>
        <button className="bottom-nav-item text-muted-foreground">
          <Settings className="h-6 w-6" />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNav;