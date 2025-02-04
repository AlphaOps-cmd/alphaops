import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Auth = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Back button */}
      <button 
        onClick={() => navigate(-1)}
        className="p-4 text-orange-500 flex items-center gap-2 hover:text-orange-400 transition-colors"
      >
        <ArrowLeft className="w-6 h-6" />
        <span className="text-lg">Atrás</span>
      </button>

      <div className="flex flex-col items-center px-4 pt-8">
        {/* Main image */}
        <div className="relative w-full max-w-md mb-8">
          <img 
            src="/lovable-uploads/ada8ee7b-6dfc-4343-a6a6-24b3a46b8179.png"
            alt="Tactical Operator"
            className="w-full object-cover"
          />
        </div>

        {/* Main text */}
        <h1 className="text-3xl font-bold text-center mb-12">
          Dile "Sí" a tener{' '}
          <span className="text-blue-600">cuerpo</span> y{' '}
          <span className="text-blue-600">mente sanos</span>
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Inicia sesión para comenzar a hacer ejercicio y realizar un seguimiento de tu progreso
        </p>

        {/* Auth buttons */}
        <div className="w-full max-w-md space-y-4">
          <Button 
            variant="outline" 
            className="w-full py-6 flex items-center justify-center gap-3"
          >
            <img src="/apple-logo.png" alt="Apple" className="w-5 h-5" />
            Continuar con Apple
          </Button>

          <Button 
            variant="outline" 
            className="w-full py-6 flex items-center justify-center gap-3"
          >
            <img src="/google-logo.png" alt="Google" className="w-5 h-5" />
            Continúa con Google
          </Button>

          <Button 
            variant="outline" 
            className="w-full py-6 flex items-center justify-center gap-3"
          >
            <img src="/facebook-logo.png" alt="Facebook" className="w-5 h-5" />
            Continúa con Facebook
          </Button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-700" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-black px-4 text-sm text-gray-400">o</span>
            </div>
          </div>

          <Button 
            variant="secondary"
            className="w-full py-6"
          >
            Continuar con correo electrónico
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

export default Auth;