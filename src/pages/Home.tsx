import { useState } from 'react';
import WeeklyCalendar from '@/components/WeeklyCalendar';
import WorkoutProgram from '@/components/WorkoutProgram';
import BottomNav from '@/components/BottomNav';
import Header from '@/components/Header';

const Home = () => {
  const [selectedDay, setSelectedDay] = useState('24');

  return (
    <div className="min-h-screen pb-20">
      <Header />
      <WeeklyCalendar selectedDay={selectedDay} onSelectDay={setSelectedDay} />
      <WorkoutProgram selectedDay={selectedDay} />
      <BottomNav />
    </div>
  );
};

export default Home;