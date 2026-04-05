// lib/data.ts

export type StackItem = {
  title: string;
  description: string;
  capabilities: string[];
  tech: string[];
};

export const capabilityStack: StackItem[] = [
  {
    title: "1. The Physical Interface",
    description: "Bridging code and hardware to create intelligent physical ecosystems. I build responsive logic that interfaces directly with microcontrollers and sensors.",
    capabilities: [
      "Microcontroller Firmware Development (STM32, ESP32, AVR)",
      "Real-Time OS (FreeRTOS) Integration & Task Scheduling",
      "Peripheral Communication Protocols: I2C, SPI, UART, CAN, Modbus",
      "Custom PCBA Design & Simulation (Altium, KiCad)",
      "Hardware-Abstracted IoT Architecture Design"
    ],
    tech: ["C", "C++", "FreeRTOS", "Altium Designer", "Arduino"]
  },
  {
    title: "2. The Algorithmic Core",
    description: "Where raw logic meets execution. I define the core system behavior, from pathfinding algorithms to real-time rendering logic and machine learning integration.",
    capabilities: [
      "Algorithm Design & Optimization: Pathfinding (A*, Dijkstra), Sorting, Data Structures",
      "Machine Learning Model Integration & Deployment for Inference",
      "Computer Graphics rendering logic and shader programming",
      "Computational Fluid Dynamics (CFD) simulation math",
      "Control Systems Engineering & Tuning (PID, MPC)"
    ],
    tech: ["Python", "C++", "MATLAB/Simulink", "TensorFlow", "OpenGL/ShaderLab"]
  },
  {
    title: "3. The Digital Ecosystem",
    description: "Architecting modern, scalable applications to present and interact with complex logic. I develop resilient full-stack systems with fluid user experiences.",
    capabilities: [
      "Modern Web Development (Next.js, React, TypeScript)",
      "Scalable Serverless & Microservices Architecture Design (AWS, GCP)",
      "State Management & Data Persistence Solutions (Redux, PostgreSQL, Redis)",
      "Real-time Data Communication & WebSockets (Socket.io)",
      "Responsive, cinematic interface design & animations (Tailwind, Framer Motion)"
    ],
    tech: ["Next.js", "React", "TypeScript", "Python (Django/FastAPI)", "PostgreSQL"]
  },
];