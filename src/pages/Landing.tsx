import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background text */}
      <div className="absolute inset-0 opacity-5 text-[200px] font-bold leading-none whitespace-nowrap rotate-[-45deg] select-none pointer-events-none">
        ENTRENAMIENTO RESISTENCIA FUERZA DISCIPLINA PODER
      </div>
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Main image */}
        <div className="relative w-full max-w-md mb-8">
          <img 
            src="/lovable-uploads/ada8ee7b-6dfc-4343-a6a6-24b3a46b8179.png"
            alt="Tactical Operator"
            className="w-full object-cover"
          />
        </div>

        {/* Text */}
        <h1 className="text-4xl font-bold mb-2">Ganar músculo</h1>
        <h2 className="text-4xl font-bold mb-8 text-blue-600">Perder peso</h2>

        {/* Buttons */}
        <div className="w-full max-w-md space-y-4">
          <Button 
            className="w-full bg-green-800 hover:bg-green-700 text-white py-6 text-lg"
            onClick={() => navigate('/auth')}
          >
            Crear mi programa de entrenamiento
          </Button>
          <Button 
            variant="secondary"
            className="w-full py-6 text-lg"
            onClick={() => navigate('/auth')}
          >
            Ya tengo una cuenta
          </Button>
        </div>

        {/* Legal text */}
        <div className="mt-8 text-sm text-gray-400 text-center">
          <p>
            Al continuar, aceptas nuestros{' '}
            <a href="#" className="text-orange-500 hover:underline">Términos de uso</a>
            {' '}y nuestra{' '}
            <a href="#" className="text-orange-500 hover:underline">Política de privacidad</a>
          </p>
          <p className="mt-2">
            ¿Necesitas ayuda?{' '}
            <a href="#" className="text-orange-500 hover:underline">Contáctanos</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;