
import React, { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  decoded: boolean;
}

interface MessageReceiverProps {
  className?: string;
  connectionStrength: number; // 0 to 100
}

const MessageReceiver: React.FC<MessageReceiverProps> = ({ 
  className,
  connectionStrength = 50
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const intervalRef = useRef<number | null>(null);
  
  // Dark matter responses
  const possibleResponses = [
    "Signal detected in quantum filament structure...",
    "Mycelial network vibration pattern identified...",
    "Dark matter flux responding to transmission...",
    "Detected cosmic harmonic resonance...",
    "Quantum entanglement signal strengthening...",
    "Network nodes activating in response...",
    "Decoding ethereal wave patterns...",
    "Cosmic substrate transmission received...",
    "Void echo patterns detected in response...",
    "Cosmic web strand resonating with message...",
  ];
  
  useEffect(() => {
    // Generate random incoming messages based on connection strength
    const messageFrequency = Math.max(10000 - connectionStrength * 80, 3000);
    
    intervalRef.current = window.setInterval(() => {
      const shouldReceiveMessage = Math.random() * 100 < connectionStrength;
      
      if (shouldReceiveMessage) {
        // Select a random response
        const responseIndex = Math.floor(Math.random() * possibleResponses.length);
        const initialMessage = possibleResponses[responseIndex];
        
        // Add message in undecoded state
        const newMessage: Message = {
          id: Date.now().toString(),
          text: initialMessage,
          timestamp: new Date(),
          decoded: false
        };
        
        setMessages(prev => [newMessage, ...prev].slice(0, 15));
        
        // After some time, decode the message
        setTimeout(() => {
          setMessages(prev => 
            prev.map(msg => 
              msg.id === newMessage.id ? { ...msg, decoded: true } : msg
            )
          );
        }, 3000 + Math.random() * 2000);
      }
    }, messageFrequency);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [connectionStrength]);
  
  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };
  
  return (
    <Card className={cn("cosmic-border bg-cosmic-base/50 backdrop-blur-sm", className)}>
      <div className="p-4 border-b border-cosmic-purple/30">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-cosmic-glow">Incoming Transmissions</h3>
          <div className="flex items-center gap-2">
            <div 
              className={cn(
                "h-2 w-2 rounded-full",
                messages.length > 0 ? "bg-cosmic-glow animate-pulse" : "bg-cosmic-purple/50"
              )}
            />
            <span className="text-sm text-cosmic-glow/70">
              {messages.length > 0 ? "Active" : "Idle"}
            </span>
          </div>
        </div>
      </div>
      
      <ScrollArea className="h-[300px]">
        <div className="p-4 space-y-3">
          {messages.length === 0 ? (
            <div className="text-center py-8 text-cosmic-glow/50 italic">
              Awaiting transmissions from the mycelial network...
            </div>
          ) : (
            messages.map((message) => (
              <div 
                key={message.id}
                className={cn(
                  "p-3 rounded-lg transition-all duration-500",
                  "border border-cosmic-purple/30",
                  message.decoded 
                    ? "bg-cosmic-purple/20" 
                    : "bg-cosmic-base/50 animate-pulse"
                )}
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "h-2 w-2 rounded-full",
                      message.decoded ? "bg-cosmic-glow" : "bg-cosmic-accent animate-pulse"
                    )} />
                    <span className={cn(
                      "text-xs font-medium",
                      message.decoded ? "text-cosmic-glow" : "text-cosmic-accent"
                    )}>
                      {message.decoded ? "Decoded" : "Decoding..."}
                    </span>
                  </div>
                  <span className="text-xs text-cosmic-glow/50">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
                
                <p className="text-sm text-cosmic-glow/90 font-medium tracking-wide">
                  {message.text}
                </p>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default MessageReceiver;
