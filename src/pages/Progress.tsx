import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Heart, ArrowUp, ArrowDown, User, ChartBar, ChartLine } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import BottomNav from '@/components/BottomNav';

const mockData = {
  prs: [
    { name: 'Squat', value: '150kg', trend: 'up' },
    { name: 'Pull-ups', value: '20 reps', trend: 'up' },
    { name: 'Deadlift', value: '180kg', trend: 'down' },
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
  ]
};

const Progress = () => {
  return (
    <div className="min-h-screen pb-20 p-4 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
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

      {/* Motivational Message */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
        <CardContent className="p-4">
          <p className="text-lg font-medium">🔥 ¡Estás en tu mejor racha!</p>
        </CardContent>
      </Card>

      {/* PRs Section */}
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
                <p className="text-2xl font-bold">{pr.value}</p>
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

      {/* Recent Workouts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChartBar className="h-5 w-5 text-primary" />
            Recent Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData.workouts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="performance" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Physical Stats */}
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

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChartLine className="h-5 w-5 text-primary" />
            AlphaOps Coach
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-3 bg-card/50 rounded-lg">
            <p className="text-sm">
              🏋️ Te recomendamos aumentar el peso en Deadlifts un 5% esta semana.
            </p>
          </div>
          <div className="p-3 bg-card/50 rounded-lg">
            <p className="text-sm">
              🔥 ¡Llevas 3 entrenamientos seguidos, mantén el ritmo!
            </p>
          </div>
        </CardContent>
      </Card>

      <BottomNav />
    </div>
  );
};

export default Progress;