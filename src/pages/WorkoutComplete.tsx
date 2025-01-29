import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Trophy, Share, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

interface WorkoutStats {
  totalTime: number;
  roundTimes?: number[];
  exercises: Array<{
    name: string;
    reps: string;
    weight?: string;
  }>;
  type: 'rounds' | 'fortime';
  rounds?: number;
}

const WorkoutComplete = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const workoutStats = location.state?.workoutStats as WorkoutStats;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleShare = async () => {
    try {
      const shareData = {
        title: 'Workout Completed!',
        text: `I just completed my workout in ${formatTime(workoutStats.totalTime)}! 💪`,
        url: window.location.href,
      };
      await navigator.share(shareData);
    } catch (err) {
      console.log('Error sharing:', err);
    }
  };

  if (!workoutStats) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <p className="text-xl text-muted-foreground">No workout data available</p>
        <Button className="mt-4" onClick={() => navigate('/')}>
          <ArrowLeft className="mr-2" /> Go Home
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen p-4 gap-6">
      <div className="flex flex-col items-center text-center gap-4">
        <Badge className="w-16 h-16 rounded-full flex items-center justify-center bg-primary">
          <Trophy className="w-8 h-8" />
        </Badge>
        <h1 className="text-3xl font-bold">Congratulations!</h1>
        <p className="text-xl text-muted-foreground">
          You've crushed another workout! Keep pushing your limits! 💪
        </p>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <h2 className="text-2xl font-semibold">Workout Stats</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Total Time:</span>
            <span className="text-xl font-bold">{formatTime(workoutStats.totalTime)}</span>
          </div>
          
          {workoutStats.type === 'rounds' && workoutStats.roundTimes && (
            <div className="space-y-2">
              <h3 className="font-semibold">Round Times:</h3>
              {workoutStats.roundTimes.map((time, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-muted-foreground">Round {index + 1}:</span>
                  <span>{formatTime(time)}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold">Workout Details</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          {workoutStats.exercises.map((exercise, index) => (
            <div key={index} className="flex flex-col gap-2 p-3 border rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">{exercise.name}</span>
                <span className="text-muted-foreground">{exercise.reps}</span>
              </div>
              {exercise.weight && (
                <div className="text-sm text-muted-foreground">
                  Weight used: {exercise.weight}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex flex-col gap-3 mt-6">
        <Button onClick={handleShare}>
          <Share className="mr-2" /> Share Achievement
        </Button>
        <Button variant="outline" onClick={() => navigate('/progress')}>
          <ArrowRight className="mr-2" /> View Progress
        </Button>
        <Button variant="secondary" onClick={() => navigate('/')}>
          <ArrowLeft className="mr-2" /> Back to Home
        </Button>
      </div>
    </div>
  );
};

export default WorkoutComplete;