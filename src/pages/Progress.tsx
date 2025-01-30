import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Heart, ArrowUp, ArrowDown, User, ChartBar, ChartLine, Dumbbell, Brain, Calendar } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import BottomNav from '@/components/BottomNav';

const mockData = {
  prs: [
    { name: 'Back Squat', value: '150kg', trend: 'up', date: '2024-03-15' },
    { name: 'Deadlift', value: '180kg', trend: 'down', date: '2024-03-10' },
    { name: 'Clean & Jerk', value: '110kg', trend: 'up', date: '2024-03-08' },
    { name: 'Pull-ups', value: '20 reps', trend: 'up', date: '2024-03-05' },
    { name: 'Snatch', value: '95kg', trend: 'up', date: '2024-03-01' },
    { name: 'Bench Press', value: '120kg', trend: 'up', date: '2024-02-28' }
  ],
  workouts: [
    { date: '2024-01', performance: 65 },
    { date: '2024-02', performance: 75 },
    { date: '2024-03', performance: 85 },
  ],
  physicalStats: [
    { date: '2024-01', weight: 75, bodyFat: 18, bmi: 23 },
    { date: '2024-02', weight: 74, bodyFat: 17, bmi: 22.5 },
    { date: '2024-03', weight: 73, bodyFat: 16, bmi: 22 },
  ],
  recentWorkouts: [
    { date: '2024-03-15', type: 'CrossFit', duration: '45 min', score: 'For Time - 8:30 min' },
    { date: '2024-03-14', type: 'Hyrox', duration: '60 min', score: 'EMOM - 12 rounds' },
    { date: '2024-03-13', type: 'Special Forces', duration: '90 min', score: 'Completed' },
  ]
};

const aiRecommendations = [
  {
    type: 'load',
    icon: '🏋️‍♂️',
    message: "Te recomendamos aumentar tu peso en Squat un 5% esta semana basándonos en tu progreso."
  },
  {
    type: 'performance',
    icon: '📈',
    message: "Tus tiempos en los WODs han mejorado un 10% en las últimas 3 semanas, sigue así."
  },
  {
    type: 'recovery',
    icon: '🛌',
    message: "Tu frecuencia de entrenamientos es muy alta, te sugerimos tomar un día de descanso activo."
  },
  {
    type: 'nutrition',
    icon: '🍗',
    message: "Basado en tu peso y entrenamientos, podrías beneficiarte de un aumento de 200 kcal diarias."
  }
];

const Progress = () => {
  return (
    <div className="min-h-screen pb-20 p-4 space-y-6">
      {/* User Profile Header */}
      <div className="flex items-center justify-between mb-6 bg-card rounded-lg p-4">
        <div className="flex items-center gap-2">
          <User className="h-8 w-8 text-primary" />
          <div>
            <h2 className="text-xl font-bold">John Doe</h2>
            <p className="text-sm text-muted-foreground">Premium Member</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold">80%</p>
          <p className="text-sm text-muted-foreground">Monthly Consistency</p>
        </div>
      </div>

      {/* Quick Progress Summary */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
        <CardContent className="p-4 space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-lg font-medium">🎯 Monthly Progress</p>
            <Trophy className="h-5 w-5 text-primary" />
          </div>
          <p className="text-2xl font-bold">12 / 20</p>
          <p className="text-sm text-muted-foreground">Workouts Completed</p>
          <div className="flex items-center gap-2">
            <span className="text-sm">🔥</span>
            <p className="text-sm">3 days streak</p>
          </div>
        </CardContent>
      </Card>

      {/* Personal Records */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Personal Records
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          {mockData.prs.map((pr) => (
            <div key={pr.name} className="flex items-center justify-between p-3 bg-card/50 rounded-lg">
              <div>
                <p className="font-medium">{pr.name}</p>
                <p className="text-xl font-bold">{pr.value}</p>
                <p className="text-xs text-muted-foreground">{pr.date}</p>
              </div>
              {pr.trend === 'up' ? (
                <ArrowUp className="h-5 w-5 text-green-500" />
              ) : (
                <ArrowDown className="h-5 w-5 text-red-500" />
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* AlphaOps AI Coach */}
      <Card className="bg-black text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Brain className="h-5 w-5" />
            AlphaOps Coach
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {aiRecommendations.map((rec, index) => (
            <div key={index} className="p-3 bg-zinc-900 rounded-lg border border-zinc-800">
              <div className="flex items-start gap-3">
                <span className="text-xl">{rec.icon}</span>
                <p className="text-sm text-zinc-200">
                  {rec.message}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Physical Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            Physical Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData.physicalStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="weight" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="bodyFat" 
                stroke="hsl(var(--destructive))" 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="bmi" 
                stroke="hsl(var(--muted-foreground))" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Workout History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Recent Workouts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockData.recentWorkouts.map((workout, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-card/50 rounded-lg">
              <div>
                <p className="font-medium">{workout.type}</p>
                <p className="text-sm text-muted-foreground">{workout.date}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{workout.score}</p>
                <p className="text-sm text-muted-foreground">{workout.duration}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <BottomNav />
    </div>
  );
};

export default Progress;