import React from 'react';

const days = [
  { day: 'Mon', date: '10' },
  { day: 'Tue', date: '11' },
  { day: 'Wed', date: '12' },
  { day: 'Thu', date: '13' },
  { day: 'Fri', date: '14' },
  { day: 'Sat', date: '15' },
  { day: 'Sun', date: '16' },
];

const WeeklyCalendar = ({ selectedDay = '14', onSelectDay }: { selectedDay?: string, onSelectDay?: (date: string) => void }) => {
  return (
    <div className="grid grid-cols-7 gap-2 p-4 bg-card rounded-lg">
      {days.map((item, index) => (
        <button
          key={index}
          onClick={() => onSelectDay?.(item.date)}
          className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
            item.date === selectedDay 
              ? 'bg-primary text-primary-foreground' 
              : 'hover:bg-muted'
          }`}
        >
          <span className="text-sm">{item.day}</span>
          <span className="text-lg font-bold">{item.date}</span>
        </button>
      ))}
    </div>
  );
};

export default WeeklyCalendar;