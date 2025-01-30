import { useState } from "react";
import { Brain, Mic, ThumbsUp, ThumbsDown, MessageSquare, ArrowLeft, ArrowRight } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import PremiumFeatureModal from "@/components/PremiumFeatureModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  "Dame un plan de entrenamiento para Special Forces"
];

interface Message {
  role: "user" | "ai";
  content: string;
}

const AICoach = () => {
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [currentRecommendation, setCurrentRecommendation] = useState(0);
  const isPremiumUser = true;

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

  if (!isPremiumUser) {
    return (
      <PremiumFeatureModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
      />
    );
  }

  return (
    <div className="min-h-screen pb-20 bg-background">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">AlphaOps AI Coach</h1>
        </div>
      </div>

      <div className="container mx-auto p-4 space-y-6 max-w-3xl">
        {/* Recommendations Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Recomendaciones Inteligentes</h2>
          <div className="relative">
            <Card className={`border ${mockRecommendations[currentRecommendation].color}`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <span className="text-2xl">{mockRecommendations[currentRecommendation].icon}</span>
                  <div className="flex-1">
                    <p className="text-sm">{mockRecommendations[currentRecommendation].message}</p>
                    <div className="flex gap-2 mt-2">
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        Útil
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ThumbsDown className="h-4 w-4 mr-1" />
                        No útil
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="absolute inset-y-0 left-0 flex items-center">
              <Button variant="ghost" size="icon" onClick={handlePrevRecommendation}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <Button variant="ghost" size="icon" onClick={handleNextRecommendation}>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Chat Section */}
        <Card className="h-[500px] flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Chat con AlphaOps AI
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 pr-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 ${
                    message.role === 'user' ? 'ml-auto' : 'mr-auto'
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg max-w-[80%] ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground ml-auto'
                        : 'bg-muted'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </ScrollArea>
            
            {/* Quick Questions - Updated styling */}
            <div className="grid gap-2 mb-4">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-sm h-auto py-3 px-4 bg-card hover:bg-card/80"
                  onClick={() => handleSendMessage(question)}
                >
                  {question}
                </Button>
              ))}
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Mic className="h-4 w-4" />
              </Button>
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Escribe tu mensaje..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button onClick={() => handleSendMessage()}>Enviar</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
};

export default AICoach;