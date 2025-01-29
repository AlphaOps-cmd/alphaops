import React from 'react';

const days = [
  { day: 'Mon', date: '20' },
  { day: 'Tue', date: '21' },
  { day: 'Wed', date: '22' },
  { day: 'Thu', date: '23' },
  { day: 'Fri', date: '24' },
  { day: 'Sat', date: '25' },
  { day: 'Sun', date: '26' },
];

const WeeklyCalendar = ({ selectedDay = '24', onSelectDay }: { selectedDay?: string, onSelectDay?: (date: string) => void }) => {
  return (
    <div className="grid grid-cols-7 gap-2 p-4 bg-card rounded-lg">
      {days.map((item, index) => (
        <button
          key={index}
          onClick={() => onSelectDay?.(item.date)}
          className={`calendar-day ${item.date === selectedDay ? 'active' : ''}`}
        >
          <span className="text-sm">{item.day}</span>
          <span className="text-lg font-bold">{item.date}</span>
        </button>
      ))}
    </div>
  );
};

export default WeeklyCalendar;