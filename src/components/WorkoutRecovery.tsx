
import { Activity } from 'lucide-react';

interface WorkoutRecoveryProps {
  recovery: string | null | undefined;
}

const WorkoutRecovery = ({ recovery }: WorkoutRecoveryProps) => {
  const defaultRecovery = [
    "Caminata suave - 3-5 minutos",
    "Estiramientos estáticos de piernas - 30 segundos por grupo muscular",
    "Foam rolling para cuádriceps y pantorrillas - 1 minuto por grupo",
    "Ejercicios de respiración profunda - 2 minutos",
    "Estiramientos de hombros y espalda - 2 minutos"
  ];

  // Check if recovery is null, undefined, or empty and use default if needed
  const recoveryLines = recovery ? 
    (typeof recovery === 'string' ? recovery.split('\n') : defaultRecovery) : 
    defaultRecovery;

  return (
    <section className="mt-8 bg-card rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="h-6 w-6 text-primary" />
        <h2 className="text-xl font-bold">COOL DOWN & RECOVERY</h2>
      </div>
      <div className="space-y-3 ml-4">
        {recoveryLines.map((instruction, index) => (
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
