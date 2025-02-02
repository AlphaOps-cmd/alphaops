import { useState, useEffect } from "react";
import { Brain } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChatMessages from "@/components/ai-coach/ChatMessages";
import QuickQuestions from "@/components/ai-coach/QuickQuestions";
import ChatInput from "@/components/ai-coach/ChatInput";
import AIRecommendations from "@/components/ai-coach/AIRecommendations";
import PremiumFeatureModal from "@/components/PremiumFeatureModal";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "ai";
  content: string;
}

interface Recommendation {
  type: string;
  icon: string;
  message: string;
  color: string;
}

const AICoach = () => {
  const { toast } = useToast();
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
  const [membership, setMembership] = useState('standard');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(true);

  useEffect(() => {
    const storedMembership = localStorage.getItem('membership');
    if (storedMembership) {
      setMembership(storedMembership);
    }
    if (storedMembership === 'standard') {
      setShowPremiumModal(true);
    }
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('get-ai-recommendations');
      if (error) throw error;
      setRecommendations(data.recommendations);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las recomendaciones",
        variant: "destructive",
      });
    } finally {
      setIsLoadingRecommendations(false);
    }
  };

  const handleSendMessage = async (message: string = inputMessage) => {
    if (!message.trim()) return;
    
    const newMessages = [...messages, { role: "user", content: message }];
    setMessages(newMessages);
    setInputMessage("");
    
    try {
      const { data, error } = await supabase.functions.invoke('chat-with-ai', {
        body: { message }
      });
      
      if (error) throw error;
      
      setMessages([...newMessages, { role: "ai", content: data.response }]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "No se pudo enviar el mensaje",
        variant: "destructive",
      });
    }
  };

  const handleNextRecommendation = () => {
    setCurrentRecommendation((prev) => 
      prev === recommendations.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevRecommendation = () => {
    setCurrentRecommendation((prev) => 
      prev === 0 ? recommendations.length - 1 : prev - 1
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

  return (
    <>
      {membership === 'standard' && showPremiumModal ? (
        <PremiumFeatureModal isOpen={showPremiumModal} onClose={() => setShowPremiumModal(false)} />
      ) : (
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
              {isLoadingRecommendations ? (
                <div className="flex justify-center items-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : recommendations.length > 0 ? (
                <AIRecommendations
                  recommendation={recommendations[currentRecommendation]}
                  onPrev={handlePrevRecommendation}
                  onNext={handleNextRecommendation}
                />
              ) : (
                <Card>
                  <CardContent className="p-4">
                    <p className="text-center text-muted-foreground">
                      No hay recomendaciones disponibles
                    </p>
                  </CardContent>
                </Card>
              )}
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
      )}
    </>
  );
};

export default AICoach;