import { Activity } from 'lucide-react';

interface WorkoutRecoveryProps {
  recovery: string;
}

const WorkoutRecovery = ({ recovery }: WorkoutRecoveryProps) => {
  const defaultRecovery = "Estiramientos estáticos - 5 minutos\nFoam rolling - 5 minutos";
  const recoveryText = recovery || defaultRecovery;

  return (
    <section className="mt-8 bg-card rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="h-6 w-6 text-primary" />
        <h2 className="text-xl font-bold">COOL DOWN & RECOVERY</h2>
      </div>
      <div className="space-y-3 ml-4">
        {recoveryText.split('\n').map((instruction, index) => (
          instruction.trim() && (
            <div key={index} className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span className="text-muted-foreground">{instruction.trim()}</span>
            </div>
          )
        ))}
      </div>
    </section>
  );
};

export default WorkoutRecovery;