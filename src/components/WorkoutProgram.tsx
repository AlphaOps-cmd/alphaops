import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { Button } from './ui/button';
import WorkoutTimer from './WorkoutTimer';
import WorkoutSelector from './WorkoutSelector';

const workoutTemplates: Record<string, Record<string, Record<string, {
  warmup: Array<{ name: string, reps: string }>,
  workout: {
    type: 'rounds' | 'fortime',
    rounds?: number,
    exercises: Array<{ name: string, reps: string }>
  },
  recovery: string
}>>> = {
  'CrossFit': {
    'Beginner': {
      '30 min': {
        warmup: [
          { name: 'Jump Rope', reps: '2 min' },
          { name: 'Air Squats', reps: '15x' },
          { name: 'Push Ups', reps: '10x' },
        ],
        workout: {
          type: 'rounds',
          rounds: 3,
          exercises: [
            { name: 'Wall Balls', reps: '10x' },
            { name: 'Ring Rows', reps: '8x' },
            { name: 'Box Step-ups', reps: '12x each' },
          ]
        },
        recovery: '5 minutes of stretching'
      },
      '45 min': {
        warmup: [
          { name: 'Row', reps: '500m' },
          { name: 'Air Squats', reps: '20x' },
          { name: 'Push Ups', reps: '15x' },
          { name: 'Mountain Climbers', reps: '30x' },
        ],
        workout: {
          type: 'rounds',
          rounds: 4,
          exercises: [
            { name: 'Wall Balls', reps: '15x' },
            { name: 'Ring Rows', reps: '12x' },
            { name: 'Box Step-ups', reps: '15x each' },
          ]
        },
        recovery: '8 minutes of stretching and mobility'
      },
      '60 min': {
        warmup: [
          { name: 'Row', reps: '1000m' },
          { name: 'Air Squats', reps: '25x' },
          { name: 'Push Ups', reps: '20x' },
          { name: 'Mountain Climbers', reps: '40x' },
        ],
        workout: {
          type: 'rounds',
          rounds: 5,
          exercises: [
            { name: 'Wall Balls', reps: '20x' },
            { name: 'Ring Rows', reps: '15x' },
            { name: 'Box Step-ups', reps: '20x each' },
          ]
        },
        recovery: '10 minutes of stretching and mobility'
      }
    },
    'Intermediate': {
      '30 min': {
        warmup: [
          { name: 'Burpees', reps: '20x' },
          { name: 'Air Squats', reps: '30x' },
          { name: 'Push Ups', reps: '15x' },
          { name: 'Mountain Climbers', reps: '40x' },
        ],
        workout: {
          type: 'rounds',
          rounds: 3,
          exercises: [
            { name: 'Thrusters', reps: '15x' },
            { name: 'Box Jumps', reps: '20x' },
            { name: 'Pull Ups', reps: '10x' },
          ]
        },
        recovery: '10 minutes of light stretching'
      },
      '45 min': {
        warmup: [
          { name: 'Pull Ups', reps: '10x' },
          { name: 'Deadlifts', reps: '12x @ 60kg' },
          { name: 'Box Jumps', reps: '20x' },
          { name: 'Kettlebell Swings', reps: '25x' },
        ],
        workout: {
          type: 'fortime',
          exercises: [
            { name: 'Clean and Jerks', reps: '30x' },
            { name: 'Double Unders', reps: '100x' },
            { name: 'Wall Balls', reps: '50x' },
          ]
        },
        recovery: '15 minutes of mobility work'
      },
      '60 min': {
        warmup: [
          { name: 'Row', reps: '1000m' },
          { name: 'Thrusters', reps: '20x' },
          { name: 'Pull Ups', reps: '15x' },
          { name: 'Box Jumps', reps: '30x' },
        ],
        workout: {
          type: 'rounds',
          rounds: 5,
          exercises: [
            { name: 'Clean and Jerks', reps: '12x' },
            { name: 'Muscle Ups', reps: '5x' },
            { name: 'Handstand Push Ups', reps: '8x' },
          ]
        },
        recovery: '15 minutes of mobility and stretching'
      }
    },
    'Advanced': {
      '30 min': {
        warmup: [
          { name: 'Muscle Ups', reps: '5x' },
          { name: 'Handstand Push Ups', reps: '10x' },
          { name: 'Clean and Jerks', reps: '10x' },
          { name: 'Double Unders', reps: '100x' },
        ],
        workout: {
          type: 'rounds',
          rounds: 4,
          exercises: [
            { name: 'Ring Muscle Ups', reps: '8x' },
            { name: 'Snatch', reps: '10x' },
            { name: 'Bar Muscle Ups', reps: '6x' },
          ]
        },
        recovery: '10 minutes of mobility work'
      },
      '45 min': {
        warmup: [
          { name: 'Ring Muscle Ups', reps: '8x' },
          { name: 'Snatch', reps: '15x' },
          { name: 'Handstand Walk', reps: '20m' },
          { name: 'Double Unders', reps: '150x' },
        ],
        workout: {
          type: 'fortime',
          exercises: [
            { name: 'Clean and Jerks', reps: '40x' },
            { name: 'Bar Muscle Ups', reps: '30x' },
            { name: 'Handstand Push Ups', reps: '50x' },
          ]
        },
        recovery: '15 minutes of mobility and recovery'
      },
      '60 min': {
        warmup: [
          { name: 'Ring Muscle Ups', reps: '10x' },
          { name: 'Snatch', reps: '20x' },
          { name: 'Handstand Walk', reps: '30m' },
          { name: 'Double Unders', reps: '200x' },
        ],
        workout: {
          type: 'rounds',
          rounds: 6,
          exercises: [
            { name: 'Clean and Jerks', reps: '15x' },
            { name: 'Ring Muscle Ups', reps: '8x' },
            { name: 'Snatch', reps: '12x' },
          ]
        },
        recovery: '20 minutes of mobility and recovery'
      }
    }
  },
  'Special Forces': {
    'Beginner': {
      '30 min': {
        warmup: [
          { name: 'Running', reps: '400m' },
          { name: 'Mountain Climbers', reps: '30x' },
          { name: 'Jumping Jacks', reps: '50x' },
        ],
        workout: {
          type: 'rounds',
          rounds: 4,
          exercises: [
            { name: 'Push Ups', reps: '15x' },
            { name: 'Sit Ups', reps: '20x' },
            { name: 'Burpees', reps: '10x' },
          ]
        },
        recovery: '10 minutes of mobility work'
      },
      '45 min': {
        warmup: [
          { name: 'Running', reps: '800m' },
          { name: 'Mountain Climbers', reps: '40x' },
          { name: 'Jumping Jacks', reps: '60x' },
          { name: 'Push Ups', reps: '20x' },
        ],
        workout: {
          type: 'rounds',
          rounds: 5,
          exercises: [
            { name: 'Push Ups', reps: '20x' },
            { name: 'Sit Ups', reps: '25x' },
            { name: 'Burpees', reps: '15x' },
          ]
        },
        recovery: '12 minutes of mobility work'
      },
      '60 min': {
        warmup: [
          { name: 'Running', reps: '1200m' },
          { name: 'Mountain Climbers', reps: '50x' },
          { name: 'Jumping Jacks', reps: '70x' },
          { name: 'Push Ups', reps: '25x' },
        ],
        workout: {
          type: 'rounds',
          rounds: 6,
          exercises: [
            { name: 'Push Ups', reps: '25x' },
            { name: 'Sit Ups', reps: '30x' },
            { name: 'Burpees', reps: '20x' },
          ]
        },
        recovery: '15 minutes of mobility work'
      }
    },
    'Intermediate': {
      '30 min': {
        warmup: [
          { name: 'Running', reps: '800m' },
          { name: 'Burpees', reps: '20x' },
          { name: 'Pull Ups', reps: '10x' },
        ],
        workout: {
          type: 'rounds',
          rounds: 4,
          exercises: [
            { name: 'Sandbag Carries', reps: '200m' },
            { name: 'Pull Ups', reps: '12x' },
            { name: 'Ruck Run', reps: '400m' },
          ]
        },
        recovery: '10 minutes of stretching'
      },
      '45 min': {
        warmup: [
          { name: 'Running', reps: '1200m' },
          { name: 'Burpees', reps: '25x' },
          { name: 'Pull Ups', reps: '15x' },
          { name: 'Push Ups', reps: '30x' },
        ],
        workout: {
          type: 'rounds',
          rounds: 5,
          exercises: [
            { name: 'Sandbag Carries', reps: '300m' },
            { name: 'Pull Ups', reps: '15x' },
            { name: 'Ruck Run', reps: '600m' },
          ]
        },
        recovery: '15 minutes of stretching'
      },
      '60 min': {
        warmup: [
          { name: 'Running', reps: '1600m' },
          { name: 'Burpees', reps: '30x' },
          { name: 'Pull Ups', reps: '20x' },
          { name: 'Push Ups', reps: '40x' },
        ],
        workout: {
          type: 'rounds',
          rounds: 6,
          exercises: [
            { name: 'Sandbag Carries', reps: '400m' },
            { name: 'Pull Ups', reps: '20x' },
            { name: 'Ruck Run', reps: '800m' },
          ]
        },
        recovery: '20 minutes of stretching'
      }
    },
    'Advanced': {
      '30 min': {
        warmup: [
          { name: 'Running', reps: '1600m' },
          { name: 'Burpees', reps: '30x' },
          { name: 'Muscle Ups', reps: '5x' },
        ],
        workout: {
          type: 'rounds',
          rounds: 4,
          exercises: [
            { name: 'Heavy Sandbag Carries', reps: '400m' },
            { name: 'Muscle Ups', reps: '8x' },
            { name: 'Weighted Ruck Run', reps: '800m' },
          ]
        },
        recovery: '10 minutes of mobility'
      },
      '45 min': {
        warmup: [
          { name: 'Running', reps: '2000m' },
          { name: 'Burpees', reps: '40x' },
          { name: 'Muscle Ups', reps: '8x' },
          { name: 'Handstand Push Ups', reps: '15x' },
        ],
        workout: {
          type: 'rounds',
          rounds: 5,
          exercises: [
            { name: 'Heavy Sandbag Carries', reps: '500m' },
            { name: 'Muscle Ups', reps: '10x' },
            { name: 'Weighted Ruck Run', reps: '1000m' },
          ]
        },
        recovery: '15 minutes of mobility'
      },
      '60 min': {
        warmup: [
          { name: 'Running', reps: '2400m' },
          { name: 'Burpees', reps: '50x' },
          { name: 'Muscle Ups', reps: '10x' },
          { name: 'Handstand Push Ups', reps: '20x' },
        ],
        workout: {
          type: 'rounds',
          rounds: 6,
          exercises: [
            { name: 'Heavy Sandbag Carries', reps: '600m' },
            { name: 'Muscle Ups', reps: '12x' },
            { name: 'Weighted Ruck Run', reps: '1200m' },
          ]
        },
        recovery: '20 minutes of mobility'
      }
    }
  },
  'Hyrox': {
    'Beginner': {
      '30 min': {
        warmup: [
          { name: 'Row', reps: '500m' },
          { name: 'Lunges', reps: '20x each' },
          { name: 'Push Ups', reps: '10x' },
        ],
        workout: {
          type: 'rounds',
          rounds: 3,
          exercises: [
            { name: 'Ski Erg', reps: '200m' },
            { name: 'Sled Push', reps: '10m' },
            { name: 'Farmers Carry', reps: '20m' },
          ]
        },
        recovery: '10 minutes of stretching'
      },
      '45 min': {
        warmup: [
          { name: 'Row', reps: '750m' },
          { name: 'Lunges', reps: '25x each' },
          { name: 'Push Ups', reps: '15x' },
          { name: 'Wall Balls', reps: '20x' },
        ],
        workout: {
          type: 'rounds',
          rounds: 4,
          exercises: [
            { name: 'Ski Erg', reps: '300m' },
            { name: 'Sled Push', reps: '15m' },
            { name: 'Farmers Carry', reps: '30m' },
          ]
        },
        recovery: '12 minutes of stretching'
      },
      '60 min': {
        warmup: [
          { name: 'Row', reps: '1000m' },
          { name: 'Lunges', reps: '30x each' },
          { name: 'Push Ups', reps: '20x' },
          { name: 'Wall Balls', reps: '25x' },
        ],
        workout: {
          type: 'rounds',
          rounds: 5,
          exercises: [
            { name: 'Ski Erg', reps: '400m' },
            { name: 'Sled Push', reps: '20m' },
            { name: 'Farmers Carry', reps: '40m' },
          ]
        },
        recovery: '15 minutes of stretching'
      }
    },
    'Intermediate': {
      '30 min': {
        warmup: [
          { name: 'Row', reps: '1000m' },
          { name: 'Wall Balls', reps: '30x' },
          { name: 'Burpees', reps: '20x' },
        ],
        workout: {
          type: 'rounds',
          rounds: 4,
          exercises: [
            { name: 'Ski Erg', reps: '500m' },
            { name: 'Sled Push Heavy', reps: '20m' },
            { name: 'Sandbag Lunges', reps: '40m' },
          ]
        },
        recovery: '10 minutes of mobility'
      },
      '45 min': {
        warmup: [
          { name: 'Row', reps: '1500m' },
          { name: 'Wall Balls', reps: '40x' },
          { name: 'Burpees', reps: '25x' },
          { name: 'Box Jumps', reps: '20x' },
        ],
        workout: {
          type: 'rounds',
          rounds: 5,
          exercises: [
            { name: 'Ski Erg', reps: '600m' },
            { name: 'Sled Push Heavy', reps: '25m' },
            { name: 'Sandbag Lunges', reps: '50m' },
          ]
        },
        recovery: '15 minutes of mobility'
      },
      '60 min': {
        warmup: [
          { name: 'Row', reps: '2000m' },
          { name: 'Wall Balls', reps: '50x' },
          { name: 'Burpees', reps: '30x' },
          { name: 'Box Jumps', reps: '25x' },
        ],
        workout: {
          type: 'rounds',
          rounds: 6,
          exercises: [
            { name: 'Ski Erg', reps: '700m' },
            { name: 'Sled Push Heavy', reps: '30m' },
            { name: 'Sandbag Lunges', reps: '60m' },
          ]
        },
        recovery: '20 minutes of mobility'
      }
    },
    'Advanced': {
      '30 min': {
        warmup: [
          { name: 'Row', reps: '2000m' },
          { name: 'Wall Balls', reps: '50x' },
          { name: 'Burpees', reps: '30x' },
        ],
        workout: {
          type: 'rounds',
          rounds: 4,
          exercises: [
            { name: 'Ski Erg', reps: '1000m' },
            { name: 'Sled Push Max', reps: '30m' },
            { name: 'Weighted Lunges', reps: '60m' },
          ]
        },
        recovery: '10 minutes of recovery'
      },
      '45 min': {
        warmup: [
          { name: 'Row', reps: '2500m' },
          { name: 'Wall Balls', reps: '60x' },
          { name: 'Burpees', reps: '40x' },
          { name: 'Box Jumps', reps: '30x' },
        ],
        workout: {
          type: 'rounds',
          rounds: 5,
          exercises: [
            { name: 'Ski Erg', reps: '1200m' },
            { name: 'Sled Push Max', reps: '40m' },
            { name: 'Weighted Lunges', reps: '80m' },
          ]
        },
        recovery: '15 minutes of recovery'
      },
      '60 min': {
        warmup: [
          { name: 'Row', reps: '3000m' },
          { name: 'Wall Balls', reps: '70x' },
          { name: 'Burpees', reps: '50x' },
          { name: 'Box Jumps', reps: '40x' },
        ],
        workout: {
          type: 'rounds',
          rounds: 6,
          exercises: [
            { name: 'Ski Erg', reps: '1500m' },
            { name: 'Sled Push Max', reps: '50m' },
            { name: 'Weighted Lunges', reps: '100m' },
          ]
        },
        recovery: '20 minutes of recovery'
      }
    }
  },
  'Home Workout': {
    'Beginner': {
      '30 min': {
        warmup: [
          { name: 'Jumping Jacks', reps: '50x' },
          { name: 'Air Squats', reps: '20x' },
          { name: 'Push Ups on Knees', reps: '10x' },
        ],
        workout: {
          type: 'rounds',
          rounds: 3,
          exercises: [
            { name: 'Push Ups', reps: '5x' },
            { name: 'Squats', reps: '15x' },
            { name: 'Sit Ups', reps: '20x' },
          ]
        },
        recovery: '5 minutes of stretching'
      },
      '45 min': {
        warmup: [
          { name: 'Jumping Jacks', reps: '60x' },
          { name: 'Air Squats', reps: '25x' },
          { name: 'Push Ups on Knees', reps: '15x' },
          { name: 'High Knees', reps: '30s' },
        ],
        workout: {
          type: 'rounds',
          rounds: 4,
          exercises: [
            { name: 'Push Ups', reps: '8x' },
            { name: 'Squats', reps: '20x' },
            { name: 'Sit Ups', reps: '25x' },
          ]
        },
        recovery: '8 minutes of stretching'
      },
      '60 min': {
        warmup: [
          { name: 'Jumping Jacks', reps: '70x' },
          { name: 'Air Squats', reps: '30x' },
          { name: 'Push Ups on Knees', reps: '20x' },
          { name: 'High Knees', reps: '45s' },
        ],
        workout: {
          type: 'rounds',
          rounds: 5,
          exercises: [
            { name: 'Push Ups', reps: '10x' },
            { name: 'Squats', reps: '25x' },
            { name: 'Sit Ups', reps: '30x' },
          ]
        },
        recovery: '10 minutes of stretching'
      }
    },
    'Intermediate': {
      '30 min': {
        warmup: [
          { name: 'Mountain Climbers', reps: '30x' },
          { name: 'Jump Squats', reps: '20x' },
          { name: 'Push Ups', reps: '15x' },
        ],
        workout: {
          type: 'rounds',
          rounds: 4,
          exercises: [
            { name: 'Burpees', reps: '10x' },
            { name: 'Pistol Squats', reps: '5x each' },
            { name: 'V-Ups', reps: '15x' },
          ]
        },
        recovery: '8 minutes of mobility'
      },
      '45 min': {
        warmup: [
          { name: 'Mountain Climbers', reps: '40x' },
          { name: 'Jump Squats', reps: '25x' },
          { name: 'Push Ups', reps: '20x' },
          { name: 'Jumping Lunges', reps: '20x' },
        ],
        workout: {
          type: 'rounds',
          rounds: 5,
          exercises: [
            { name: 'Burpees', reps: '12x' },
            { name: 'Pistol Squats', reps: '8x each' },
            { name: 'V-Ups', reps: '20x' },
          ]
        },
        recovery: '10 minutes of mobility'
      },
      '60 min': {
        warmup: [
          { name: 'Mountain Climbers', reps: '50x' },
          { name: 'Jump Squats', reps: '30x' },
          { name: 'Push Ups', reps: '25x' },
          { name: 'Jumping Lunges', reps: '30x' },
        ],
        workout: {
          type: 'rounds',
          rounds: 6,
          exercises: [
            { name: 'Burpees', reps: '15x' },
            { name: 'Pistol Squats', reps: '10x each' },
            { name: 'V-Ups', reps: '25x' },
          ]
        },
        recovery: '12 minutes of mobility'
      }
    },
    'Advanced': {
      '30 min': {
        warmup: [
          { name: 'Handstand Hold', reps: '30s' },
          { name: 'Plyo Lunges', reps: '20x each' },
          { name: 'Diamond Push Ups', reps: '20x' },
        ],
        workout: {
          type: 'rounds',
          rounds: 4,
          exercises: [
            { name: 'Handstand Push Ups', reps: '8x' },
            { name: 'Pistol Squats', reps: '10x each' },
            { name: 'L-Sit Hold', reps: '30s' },
          ]
        },
        recovery: '10 minutes of mobility'
      },
      '45 min': {
        warmup: [
          { name: 'Handstand Hold', reps: '45s' },
          { name: 'Plyo Lunges', reps: '25x each' },
          { name: 'Diamond Push Ups', reps: '25x' },
          { name: 'Tuck Planche Hold', reps: '20s' },
        ],
        workout: {
          type: 'rounds',
          rounds: 5,
          exercises: [
            { name: 'Handstand Push Ups', reps: '10x' },
            { name: 'Pistol Squats', reps: '12x each' },
            { name: 'L-Sit Hold', reps: '45s' },
          ]
        },
        recovery: '12 minutes of mobility'
      },
      '60 min': {
        warmup: [
          { name: 'Handstand Hold', reps: '60s' },
          { name: 'Plyo Lunges', reps: '30x each' },
          { name: 'Diamond Push Ups', reps: '30x' },
          { name: 'Tuck Planche Hold', reps: '30s' },
        ],
        workout: {
          type: 'rounds',
          rounds: 6,
          exercises: [
            { name: 'Handstand Push Ups', reps: '12x' },
            { name: 'Pistol Squats', reps: '15x each' },
            { name: 'L-Sit Hold', reps: '60s' },
          ]
        },
        recovery: '15 minutes of mobility'
      }
    }
  }
};

const WorkoutProgram = ({ selectedDay = '24' }: { selectedDay?: string }) => {
  const [showTimer, setShowTimer] = useState(false);
  const [workoutType, setWorkoutType] = useState('CrossFit');
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [duration, setDuration] = useState('45 min');

  const workout = workoutTemplates[workoutType]?.[difficulty]?.[duration] || workoutTemplates['CrossFit']['Intermediate']['45 min'];

  if (showTimer) {
    return <WorkoutTimer 
      onClose={() => setShowTimer(false)} 
      warmup={workout.warmup}
      workout={workout.workout}
    />;
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-center">TODAY'S WORKOUT</h1>
        <p className="text-muted-foreground text-center mb-4">Week 3</p>
        <WorkoutSelector
          workoutType={workoutType}
          difficulty={difficulty}
          duration={duration}
          onWorkoutTypeChange={setWorkoutType}
          onDifficultyChange={setDifficulty}
          onDurationChange={setDuration}
        />
      </div>

      <section className="mt-8">
        <h2 className="text-xl font-bold mb-4">WARM UP:</h2>
        <p className="text-muted-foreground mb-4">Complete 4 rounds of the following</p>
        <div className="space-y-4">
          {workout.warmup.map((exercise, index) => (
            <div key={index} className="exercise-item">
              <Play className="h-5 w-5 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">{exercise.name}</h3>
                <p className="text-muted-foreground">- {exercise.reps}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold mb-4">WORKOUT:</h2>
        {workout.workout.type === 'rounds' ? (
          <p className="text-muted-foreground mb-4">Complete {workout.workout.rounds} rounds of:</p>
        ) : (
          <p className="text-muted-foreground mb-4">For time:</p>
        )}
        <div className="space-y-4">
          {workout.workout.exercises.map((exercise, index) => (
            <div key={index} className="exercise-item">
              <Play className="h-5 w-5 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">{exercise.name}</h3>
                <p className="text-muted-foreground">- {exercise.reps}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold mb-4">RECOVERY:</h2>
        <div className="exercise-item">
          <Play className="h-5 w-5 text-primary mt-1" />
          <div>
            <h3 className="font-semibold">Cool Down</h3>
            <p className="text-muted-foreground">- {workout.recovery}</p>
          </div>
        </div>
      </section>

      <div className="mt-8 flex justify-center">
        <Button 
          onClick={() => setShowTimer(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Start Workout
        </Button>
      </div>
    </div>
  );
};

export default WorkoutProgram;