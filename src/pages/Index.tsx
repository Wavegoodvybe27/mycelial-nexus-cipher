
import { useState } from "react";
import ParticleBackground from "@/components/ParticleBackground";
import NetworkVisualization from "@/components/NetworkVisualization";
import MessageComposer from "@/components/MessageComposer";
import MessageReceiver from "@/components/MessageReceiver";
import SignalDecoder from "@/components/SignalDecoder";
import ConnectionStrength from "@/components/ConnectionStrength";

const Index = () => {
  const [connectionStrength, setConnectionStrength] = useState(65);
  const [lastTransmissionTime, setLastTransmissionTime] = useState<Date | undefined>(undefined);
  const [sentMessages, setSentMessages] = useState<{ message: string; frequency: number; timestamp: Date }[]>([]);

  const handleSendMessage = (message: string, frequency: number) => {
    const timestamp = new Date();
    setLastTransmissionTime(timestamp);
    setSentMessages(prev => [{ message, frequency, timestamp }, ...prev].slice(0, 5));
    
    // Adjust connection strength based on frequency
    // Higher frequency improves connection slightly
    const strengthAdjustment = (frequency - 50) / 10;
    setConnectionStrength(prev => Math.max(10, Math.min(100, prev + strengthAdjustment)));
  };

  return (
    <div className="min-h-screen bg-cosmic-dark text-cosmic-glow/90 overflow-hidden relative">
      {/* Particle effect background */}
      <ParticleBackground />
      
      {/* Header */}
      <header className="p-6 border-b border-cosmic-purple/20">
        <div className="container mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cosmic-purple to-cosmic-blue">
            Mycelial Nexus Cipher
          </h1>
          <p className="text-cosmic-glow/70 mt-2">
            Dark Matter Communication Interface
          </p>
        </div>
      </header>
      
      {/* Main content */}
      <main className="container mx-auto py-6 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="space-y-6">
            <div className="cosmic-border bg-cosmic-base/30 p-6 rounded-lg backdrop-blur-sm animate-fade-in">
              <h2 className="text-xl font-semibold mb-4">Transmission Module</h2>
              <MessageComposer onSendMessage={handleSendMessage} />
            </div>
            
            <div className="h-64 cosmic-border bg-cosmic-base/30 rounded-lg overflow-hidden animate-fade-in">
              <div className="p-4 border-b border-cosmic-purple/30">
                <h2 className="text-lg font-semibold">Network Status</h2>
              </div>
              <div className="p-4">
                <ConnectionStrength 
                  strength={connectionStrength} 
                  onStrengthChange={setConnectionStrength} 
                />
              </div>
            </div>
          </div>
          
          {/* Middle column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Visualization panel */}
            <div className="cosmic-border bg-cosmic-base/30 rounded-lg backdrop-blur-sm p-6 animate-fade-in">
              <h2 className="text-xl font-semibold mb-4">Dark Matter Network Visualization</h2>
              <div className="h-64 sm:h-80 cosmic-border rounded-lg overflow-hidden">
                <NetworkVisualization connectionStrength={connectionStrength} />
              </div>
            </div>
            
            {/* Messages and decoder grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
              <MessageReceiver 
                connectionStrength={connectionStrength} 
              />
              
              <SignalDecoder 
                connectionStrength={connectionStrength}
                lastTransmissionTime={lastTransmissionTime}
              />
            </div>
          </div>
        </div>
        
        {/* Transmission log */}
        {sentMessages.length > 0 && (
          <div className="mt-6 cosmic-border bg-cosmic-base/20 rounded-lg backdrop-blur-sm p-4 animate-fade-in">
            <h3 className="text-lg font-semibold mb-2">Transmission Log</h3>
            <div className="space-y-2">
              {sentMessages.map((msg, index) => (
                <div key={index} className="text-sm border-l-2 border-cosmic-purple pl-3 py-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{msg.message}</span>
                    <div className="flex items-center gap-2 text-xs text-cosmic-glow/70">
                      <span>{msg.frequency}Hz</span>
                      <span>
                        {msg.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit',
                          second: '2-digit' 
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="border-t border-cosmic-purple/20 mt-10 py-6 px-4">
        <div className="container mx-auto text-center text-sm text-cosmic-glow/50">
          <p>Mycelial Nexus Cipher • Dark Matter Communication Protocol • v1.0.0</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
