
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface MessageComposerProps {
  onSendMessage: (message: string, frequency: number) => void;
  className?: string;
}

const MessageComposer: React.FC<MessageComposerProps> = ({ onSendMessage, className }) => {
  const [message, setMessage] = useState<string>("");
  const [frequency, setFrequency] = useState<number>(50);
  const [isSending, setIsSending] = useState<boolean>(false);
  
  const handleSend = async () => {
    if (!message.trim()) return;
    
    setIsSending(true);
    
    // Simulate sending with a delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onSendMessage(message, frequency);
    setMessage("");
    setIsSending(false);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="space-y-2">
        <label className="text-sm font-medium text-cosmic-glow">
          Transmission Message
        </label>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message to the mycelial network..."
          className="cosmic-border bg-opacity-20 bg-cosmic-base border-cosmic-purple focus:border-cosmic-glow resize-none min-h-28"
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-cosmic-glow">
            Wave Frequency
          </label>
          <span className="text-sm text-cosmic-glow/70">
            {frequency}Hz
          </span>
        </div>
        <Slider
          value={[frequency]}
          min={10}
          max={100}
          step={1}
          className="py-2"
          onValueChange={(values) => setFrequency(values[0])}
        />
      </div>
      
      <Button 
        onClick={handleSend} 
        disabled={!message.trim() || isSending}
        className="w-full bg-cosmic-purple hover:bg-cosmic-glow text-white transition-all duration-300"
      >
        {isSending ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
            <span>Transmitting...</span>
          </div>
        ) : (
          "Send Transmission"
        )}
      </Button>
    </div>
  );
};

export default MessageComposer;
