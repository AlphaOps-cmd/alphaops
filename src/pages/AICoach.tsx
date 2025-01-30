import { useState } from "react";
import { Brain, Settings, Mic, ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import PremiumFeatureModal from "@/components/PremiumFeatureModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const mockChartData = [
  { month: 'Jan', squat: 100, deadlift: 140, consistency: 85 },
  { month: 'Feb', squat: 110, deadlift: 150, consistency: 90 },
  { month: 'Mar', squat: 120, deadlift: 160, consistency: 88 },
];

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
  role: 'user' | 'ai';
  content: string;
}

const AICoach = () => {
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const isPremiumUser = true; // This should be replaced with actual premium status check

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const newMessages = [
      ...messages,
      { role: 'user', content: inputMessage },
      { role: 'ai', content: "Gracias por tu mensaje. Esta es una respuesta de ejemplo de la IA. En la implementación final, esto se conectará con un servicio de IA real." }
    ];
    
    setMessages(newMessages);
    setInputMessage("");
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
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
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">AlphaOps AI Coach</h1>
        </div>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      <div className="container mx-auto p-4 space-y-6">
        {/* Recommendations Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Recomendaciones Inteligentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockRecommendations.map((rec, index) => (
              <Card key={index} className={`border ${rec.color}`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">{rec.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm">{rec.message}</p>
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
            ))}
          </div>
        </section>

        {/* Chat Section */}
        <section className="grid md:grid-cols-[1fr_300px] gap-4">
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
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="icon">
                  <Mic className="h-4 w-4" />
                </Button>
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button onClick={handleSendMessage}>Enviar</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preguntas Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handleQuickQuestion(question)}
                >
                  {question}
                </Button>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Analytics Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Análisis de Progreso</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Tendencias de Fuerza</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="squat" stroke="#10b981" name="Squat" />
                    <Line type="monotone" dataKey="deadlift" stroke="#3b82f6" name="Deadlift" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Consistencia de Entrenamiento</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="consistency" stroke="#f59e0b" name="Consistencia %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      <BottomNav />
    </div>
  );
};

export default AICoach;