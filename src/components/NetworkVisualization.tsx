
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface NetworkVisualizationProps {
  connectionStrength: number; // 0 to 100
  className?: string;
}

const NetworkVisualization: React.FC<NetworkVisualizationProps> = ({
  connectionStrength = 50,
  className
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const resizeCanvas = () => {
      const parentRect = canvas.parentElement?.getBoundingClientRect();
      if (parentRect) {
        canvas.width = parentRect.width;
        canvas.height = parentRect.height;
      }
    };
    
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    
    // Number of nodes based on connection strength
    const nodeCount = Math.max(5, Math.floor(connectionStrength / 10));
    const nodes: { x: number; y: number; size: number; connections: number[]; pulse: number }[] = [];
    
    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
      const margin = 50;
      nodes.push({
        x: margin + Math.random() * (canvas.width - margin * 2),
        y: margin + Math.random() * (canvas.height - margin * 2),
        size: Math.random() * 4 + 2,
        connections: [],
        pulse: Math.random() * Math.PI * 2 // Random start position for pulse animation
      });
    }
    
    // Create connections between nodes
    // The higher the connection strength, the more connections
    const connectionDensity = connectionStrength / 100;
    for (let i = 0; i < nodes.length; i++) {
      const maxConnections = Math.ceil(nodes.length * connectionDensity);
      const connectionCount = Math.floor(Math.random() * maxConnections) + 1;
      
      // Create random connections
      for (let j = 0; j < connectionCount; j++) {
        if (nodes[i].connections.length >= maxConnections) break;
        
        const targetIndex = Math.floor(Math.random() * nodes.length);
        if (targetIndex !== i && !nodes[i].connections.includes(targetIndex)) {
          nodes[i].connections.push(targetIndex);
        }
      }
    }
    
    // Animation loop
    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections first
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        for (const connectionIndex of node.connections) {
          const targetNode = nodes[connectionIndex];
          
          // Calculate distance for line opacity
          const dx = targetNode.x - node.x;
          const dy = targetNode.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = Math.min(canvas.width, canvas.height) / 2;
          const opacity = 1 - Math.min(distance / maxDistance, 0.9);
          
          // Draw line
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          
          // Create energy pulse effect along the line
          const time = Date.now() / 1000;
          const pulsePosition = (Math.sin(time + node.pulse) + 1) / 2; // 0 to 1
          
          const pulseX = node.x + dx * pulsePosition;
          const pulseY = node.y + dy * pulsePosition;
          
          ctx.lineTo(targetNode.x, targetNode.y);
          ctx.strokeStyle = `rgba(155, 135, 245, ${opacity * 0.5})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          
          // Draw pulse
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(217, 70, 239, 0.8)";
          ctx.fill();
        }
      }
      
      // Then draw nodes
      for (const node of nodes) {
        // Create glowing effect
        const glowRadius = node.size * 2;
        const glow = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, glowRadius
        );
        
        glow.addColorStop(0, "rgba(139, 92, 246, 0.8)");
        glow.addColorStop(1, "rgba(139, 92, 246, 0)");
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
        
        // Draw actual node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = "#9b87f5";
        ctx.fill();
      }
    };
    
    animate();
    
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(frame);
    };
  }, [connectionStrength]);
  
  return (
    <div className={cn("relative w-full h-full min-h-[200px] rounded-lg overflow-hidden", className)}>
      <canvas 
        ref={canvasRef}
        className="absolute inset-0"
      />
    </div>
  );
};

export default NetworkVisualization;
