import { useState, useEffect } from "react";
import { Brain } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChatMessages from "@/components/ai-coach/ChatMessages";
import QuickQuestions from "@/components/ai-coach/QuickQuestions";
import ChatInput from "@/components/ai-coach/ChatInput";
import AIRecommendations from "@/components/ai-coach/AIRecommendations";
import PremiumFeatureModal from "@/components/PremiumFeatureModal";
import { useNavigate } from "react-router-dom";

const mockRecommendations = [
  {
    type: 'strength',
    icon: '🏋️‍♂️',
    message: "Aumenta tu peso en Squat un 5% la próxima sesión.",
    color: "bg-emerald-500/10 border-emerald-500/20"
  },
  {
    type: 'recovery',
    icon: '⏳',
    message: "Tu recuperación muscular está en el 80%, puedes entrenar con intensidad hoy.",
    color: "bg-blue-500/10 border-blue-500/20"
  },
  {
    type: 'training',
    icon: '🔥',
    message: "Llevas 4 días consecutivos de entrenamiento, considera un día de descanso activo.",
    color: "bg-yellow-500/10 border-yellow-500/20"
  },
  {
    type: 'nutrition',
    icon: '🍽',
    message: "Tu consumo calórico es bajo para el volumen de entrenamiento, aumenta tu ingesta de proteínas.",
    color: "bg-red-500/10 border-red-500/20"
  }
];

const quickQuestions = [
  "¿Cómo mejoro mi resistencia en Hyrox?",
  "Dime cómo mejorar mi técnica en Muscle-ups",
  "Dame un plan de entrenamiento para Special Forces",
  "¿Cuál es el mejor ejercicio para ganar fuerza?",
  "¿Cómo puedo mejorar mi recuperación?",
];

interface Message {
  role: "user" | "ai";
  content: string;
}

const AICoach = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content: "¡Hola! Soy tu entrenador personal de AlphaOps AI. Puedo ayudarte con:\n\n" +
        "• Recomendaciones personalizadas de entrenamiento\n" +
        "• Correcciones de técnica en tiempo real\n" +
        "• Planes de nutrición adaptados a tus objetivos\n" +
        "• Seguimiento de tu progreso\n" +
        "• Consejos de recuperación\n\n" +
        "¿En qué puedo ayudarte hoy?"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [currentRecommendation, setCurrentRecommendation] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  // Simulating user type check - replace with your actual user type check
  const userType = "standard"; // This should come from your auth system

  useEffect(() => {
    if (userType === "standard") {
      setShowPremiumModal(true);
    }
  }, [userType]);

  const handlePremiumModalClose = () => {
    setShowPremiumModal(false);
    navigate("/"); // Navigate back to home when modal is closed
  };

  const handleSendMessage = (message: string = inputMessage) => {
    if (!message.trim()) return;
    
    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: message },
      { role: "ai", content: "Gracias por tu mensaje. Esta es una respuesta de ejemplo de la IA. En la implementación final, esto se conectará con un servicio de IA real." }
    ];
    
    setMessages(newMessages);
    setInputMessage("");
  };

  const handleNextRecommendation = () => {
    setCurrentRecommendation((prev) => 
      prev === mockRecommendations.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevRecommendation = () => {
    setCurrentRecommendation((prev) => 
      prev === 0 ? mockRecommendations.length - 1 : prev - 1
    );
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prev) =>
      prev === quickQuestions.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex((prev) =>
      prev === 0 ? quickQuestions.length - 1 : prev - 1
    );
  };

  if (userType === "standard") {
    return <PremiumFeatureModal isOpen={showPremiumModal} onClose={handlePremiumModalClose} />;
  }

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">AlphaOps AI Coach</h1>
        </div>
      </div>

      <div className="container mx-auto p-4 space-y-6 max-w-3xl">
        <section>
          <h2 className="text-xl font-semibold mb-4">Recomendaciones Inteligentes</h2>
          <AIRecommendations
            recommendation={mockRecommendations[currentRecommendation]}
            onPrev={handlePrevRecommendation}
            onNext={handleNextRecommendation}
          />
        </section>

        <Card className="h-[500px] flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Chat con AlphaOps AI
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col overflow-hidden">
            <ChatMessages messages={messages} />
            <QuickQuestions
              currentQuestion={quickQuestions[currentQuestionIndex]}
              onPrevQuestion={handlePrevQuestion}
              onNextQuestion={handleNextQuestion}
              onSelectQuestion={handleSendMessage}
            />
            <ChatInput
              value={inputMessage}
              onChange={setInputMessage}
              onSend={() => handleSendMessage()}
            />
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
};

export default AICoach;
