import WeeklyCalendar from '@/components/WeeklyCalendar';
import WorkoutProgram from '@/components/WorkoutProgram';
import BottomNav from '@/components/BottomNav';

const Index = () => {
  return (
    <div className="min-h-screen pb-20">
      <WeeklyCalendar />
      <WorkoutProgram />
      <BottomNav />
    </div>
  );
};

export default Index;