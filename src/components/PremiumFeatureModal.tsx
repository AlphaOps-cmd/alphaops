import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PremiumFeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PremiumFeatureModal = ({ isOpen, onClose }: PremiumFeatureModalProps) => {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    navigate("/");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-yellow-500" />
            AlphaOps AI Coach - Característica Premium
          </DialogTitle>
          <DialogDescription>
            Obtén recomendaciones de entrenamiento personalizadas y feedback en tiempo real de nuestro avanzado entrenador AI. Desbloquea esta característica actualizando a premium.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="rounded-lg bg-muted p-4">
            <h4 className="font-semibold mb-2">Lo que obtendrás:</h4>
            <ul className="space-y-2 text-sm">
              <li>• Recomendaciones de entrenamiento personalizadas</li>
              <li>• Correcciones de forma en tiempo real</li>
              <li>• Seguimiento detallado de tu progreso</li>
              <li>• Consejos de nutrición</li>
            </ul>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={handleClose}>
              Quizás más tarde
            </Button>
            <Button>
              Actualizar a Premium
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumFeatureModal;