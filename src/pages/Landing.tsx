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
      
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/ada8ee7b-6dfc-4343-a6a6-24b3a46b8179.png"
          alt="Tactical Operator"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
      </div>
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-end pb-16 px-4">
        {/* Index Label */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
          <h1 className="text-4xl font-bold">Index</h1>
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
            <a href="#" className="text-green-700 hover:underline">Términos de uso</a>
            {' '}y nuestra{' '}
            <a href="#" className="text-green-700 hover:underline">Política de privacidad</a>
          </p>
          <p className="mt-2">
            ¿Necesitas ayuda?{' '}
            <a href="#" className="text-green-700 hover:underline">Contáctanos</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;