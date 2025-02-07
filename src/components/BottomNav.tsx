
import React from 'react';
import { Home, BarChart, Settings, Brain } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <div className="grid grid-cols-4 gap-1 p-2">
        <button 
          className={`bottom-nav-item ${location.pathname === '/home' ? 'text-primary' : 'text-muted-foreground'}`}
          onClick={() => navigate('/home')}
        >
          <Home className="h-6 w-6" />
          <span>Home</span>
        </button>
        <button 
          className={`bottom-nav-item ${location.pathname === '/progress' ? 'text-primary' : 'text-muted-foreground'}`}
          onClick={() => navigate('/progress')}
        >
          <BarChart className="h-6 w-6" />
          <span>Progress</span>
        </button>
        <button 
          className={`bottom-nav-item ${location.pathname === '/ai-coach' ? 'text-primary' : 'text-muted-foreground'}`}
          onClick={() => navigate('/ai-coach')}
        >
          <Brain className="h-6 w-6" />
          <span>AI Coach</span>
        </button>
        <button 
          className={`bottom-nav-item ${location.pathname === '/settings' ? 'text-primary' : 'text-muted-foreground'}`}
          onClick={() => navigate('/settings')}
        >
          <Settings className="h-6 w-6" />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNav;
