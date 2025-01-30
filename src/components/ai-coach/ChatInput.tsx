import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic } from "lucide-react";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
}

const ChatInput = ({ value, onChange, onSend }: ChatInputProps) => {
  return (
    <div className="flex gap-2 mt-auto flex-shrink-0">
      <Button variant="outline" size="icon">
        <Mic className="h-4 w-4" />
      </Button>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Escribe tu mensaje..."
        onKeyPress={(e) => e.key === 'Enter' && onSend()}
        className="flex-1"
      />
      <Button onClick={onSend}>Enviar</Button>
    </div>
  );
};

export default ChatInput;