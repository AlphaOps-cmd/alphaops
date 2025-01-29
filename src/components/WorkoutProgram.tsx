import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { Button } from './ui/button';
import WorkoutTimer from './WorkoutTimer';
import WorkoutSelector from './WorkoutSelector';

// Base de datos mejorada de entrenamientos
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
          { name: 'Movilidad de hombros', reps: '2 min' },
          { name: 'Movilidad de caderas', reps: '2 min' },
          { name: 'Saltar a la comba', reps: '3 min' },
          { name: 'Sentadillas sin peso', reps: '15 reps' }
        ],
        workout: {
          type: 'rounds',
          rounds: 3,
          exercises: [
            { name: 'Thrusters con mancuernas', reps: '10 reps @ 5kg' },
            { name: 'Dominadas asistidas con goma', reps: '8 reps' },
            { name: 'Wall Balls', reps: '12 reps @ 4kg' }
          ]
        },
        recovery: '5 minutos de estiramientos'
      },
      '45 min': {
        warmup: [
          { name: 'Remo', reps: '500m ritmo suave' },
          { name: 'Movilidad general', reps: '5 min' },
          { name: 'Burpees', reps: '10 reps' },
          { name: 'Push Ups con rodillas', reps: '10 reps' }
        ],
        workout: {
          type: 'rounds',
          rounds: 4,
          exercises: [
            { name: 'Peso muerto', reps: '12 reps @ 30kg' },
            { name: 'Remo con mancuerna', reps: '12 reps cada lado @ 10kg' },
            { name: 'Box Step-ups', reps: '15 reps cada pierna' }
          ]
        },
        recovery: '8 minutos de estiramientos y foam roller'
      },
      '60 min': {
        warmup: [
          { name: 'Bicicleta estática', reps: '5 min' },
          { name: 'Movilidad completa', reps: '8 min' },
          { name: 'Mountain Climbers', reps: '30 reps' },
          { name: 'Air Squats', reps: '20 reps' }
        ],
        workout: {
          type: 'fortime',
          exercises: [
            { name: 'Clean con barra', reps: '30 reps @ 25kg' },
            { name: 'Wall Balls', reps: '40 reps @ 4kg' },
            { name: 'Calories Remo', reps: '40 cal' }
          ]
        },
        recovery: '10 minutos de estiramientos y movilidad'
      }
    },
    'Intermediate': {
      '30 min': {
        warmup: [
          { name: 'Saltar a la comba', reps: '5 min' },
          { name: 'Movilidad específica', reps: '5 min' },
          { name: 'Push Ups', reps: '15 reps' },
          { name: 'Pull Ups con banda', reps: '10 reps' }
        ],
        workout: {
          type: 'rounds',
          rounds: 4,
          exercises: [
            { name: 'Power Clean', reps: '8 reps @ 40kg' },
            { name: 'Muscle Ups con banda', reps: '5 reps' },
            { name: 'Double Unders', reps: '50 reps' }
          ]
        },
        recovery: '7 minutos de estiramientos'
      },
      '45 min': {
        warmup: [
          { name: 'Remo', reps: '1000m' },
          { name: 'Movilidad de hombros', reps: '5 min' },
          { name: 'Kipping Swings', reps: '20 reps' },
          { name: 'Strict Pull Ups', reps: '8 reps' }
        ],
        workout: {
          type: 'fortime',
          exercises: [
            { name: 'Snatch', reps: '30 reps @ 35kg' },
            { name: 'Bar Muscle Ups', reps: '20 reps' },
            { name: 'Overhead Squats', reps: '30 reps @ 30kg' }
          ]
        },
        recovery: '10 minutos de movilidad y estiramientos'
      },
      '60 min': {
        warmup: [
          { name: 'Assault Bike', reps: '5 min' },
          { name: 'Movilidad completa', reps: '10 min' },
          { name: 'Handstand Hold', reps: '30 seg x 3' },
          { name: 'Muscle Ups práctica', reps: '5 min' }
        ],
        workout: {
          type: 'rounds',
          rounds: 5,
          exercises: [
            { name: 'Clean and Jerk', reps: '6 reps @ 50kg' },
            { name: 'Ring Muscle Ups', reps: '4 reps' },
            { name: 'Devils Press', reps: '12 reps @ 22.5kg' }
          ]
        },
        recovery: '12 minutos de movilidad y estiramientos'
      }
    },
    'Advanced': {
      '30 min': {
        warmup: [
          { name: 'Técnica de Muscle Ups', reps: '10 min' },
          { name: 'Movilidad específica', reps: '5 min' },
          { name: 'Handstand Push Ups', reps: '10 reps' },
          { name: 'Clean & Jerk técnica', reps: '5 min' }
        ],
        workout: {
          type: 'rounds',
          rounds: 4,
          exercises: [
            { name: 'Ring Muscle Ups', reps: '6 reps' },
            { name: 'Clean & Jerk', reps: '4 reps @ 80kg' },
            { name: 'Pistols', reps: '10 reps cada pierna' }
          ]
        },
        recovery: '8 minutos de movilidad'
      },
      '45 min': {
        warmup: [
          { name: 'Gimnásticos skill work', reps: '10 min' },
          { name: 'Snatch technique', reps: '8 min' },
          { name: 'Handstand Walk', reps: '20m x 3' },
          { name: 'Bar Muscle Ups', reps: '5 reps' }
        ],
        workout: {
          type: 'fortime',
          exercises: [
            { name: 'Squat Snatch', reps: '30 reps @ 60kg' },
            { name: 'Bar Muscle Ups', reps: '30 reps' },
            { name: 'Handstand Push Ups', reps: '30 reps' }
          ]
        },
        recovery: '10 minutos de movilidad y técnica'
      },
      '60 min': {
        warmup: [
          { name: 'Complejo de movilidad', reps: '15 min' },
          { name: 'Muscle Up practice', reps: '10 min' },
          { name: 'Snatch Balance', reps: '5 reps @ 70kg' },
          { name: 'Handstand Walk', reps: '30m x 3' }
        ],
        workout: {
          type: 'rounds',
          rounds: 5,
          exercises: [
            { name: 'Ring Muscle Ups', reps: '3-3-3' },
            { name: 'Squat Snatch', reps: '2-2-2 @ 80kg' },
            { name: 'Bar Muscle Ups', reps: '3-3-3' }
          ]
        },
        recovery: '15 minutos de movilidad y técnica'
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

  // Obtener el workout basado en las preferencias seleccionadas
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
        <p className="text-muted-foreground mb-4">Complete the following</p>
        <div className="space-y-4">
          {workout.warmup.map((exercise: any, index: number) => (
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
          {workout.workout.exercises.map((exercise: any, index: number) => (
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
          className="bg-primary text-primary-foreground hover:bg-primary/90 w-48 h-12 text-lg"
        >
          Start Workout
        </Button>
      </div>
    </div>
  );
};

export default WorkoutProgram;
