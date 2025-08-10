"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { FileText, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type * as THREE from "three";

interface Dot {
  left: string;
  top: string;
  delay: string;
  duration: string;
}

// 3D Rotating Crypto Object Component
function CryptoObject() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { clock } = useThree();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.3) * 0.2;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group>
      {/* Main crypto object */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <dodecahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial
          color="#8b5cf6"
          metalness={0.8}
          roughness={0.2}
          emissive="#4c1d95"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Orbiting smaller objects */}
      <mesh position={[3, 0, 0]} rotation={[0, clock.elapsedTime * 0.5, 0]}>
        <octahedronGeometry args={[0.3]} />
        <meshStandardMaterial
          color="#3b82f6"
          metalness={0.9}
          roughness={0.1}
          emissive="#1e40af"
          emissiveIntensity={0.2}
        />
      </mesh>

      <mesh position={[-3, 0, 0]} rotation={[0, -clock.elapsedTime * 0.3, 0]}>
        <tetrahedronGeometry args={[0.4]} />
        <meshStandardMaterial
          color="#06b6d4"
          metalness={0.9}
          roughness={0.1}
          emissive="#0891b2"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
}

export default function CryptoHero() {
  const [dots, setDots] = useState<Dot[]>([]);

  useEffect(() => {
    const generatedDots = Array.from({ length: 50 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
      duration: `${2 + Math.random() * 3}s`,
    }));
    setDots(generatedDots);
  }, []);

  return (
    <div className=" bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />

      {/* Floating Particles (hydration-safe) */}
      <div className="absolute inset-0">
        {dots.map((dot, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full animate-pulse"
            style={{
              left: dot.left,
              top: dot.top,
              animationDelay: dot.delay,
              animationDuration: dot.duration,
            }}
          />
        ))}
      </div>

      {/* Glowing Waves */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse" />
        <div
          className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 pt-20 lg:pt-32">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Label */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-sm border border-purple-500/20 rounded-full px-4 py-2">
              <span className="text-purple-300 text-sm font-medium tracking-wide">
                A NEW SMART BLOCKCHAIN
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight">
                <span className="text-white">Investing in things</span>
                <br />
                <span className="text-white">backed by </span>
                <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent relative">
                  real products
                  <div className="absolute inset-0 bg-gradient-to-r from-white via-purple-200 to-blue-200 blur-lg opacity-30 -z-10" />
                </span>
              </h1>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 md:pt-8">
              <Button className="bg-blue-600 hover:bg-purple-700  text-white border-0 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 px-4 md:px-8 py-3 md:py-6 text-lg relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 blur-xl group-hover:blur-2xl transition-all duration-300" />
                <FileText className="w-5 h-5 mr-1 sm:mr-2 relative z-10" />
                <span className="relative z-10">Whitepaper</span>
              </Button>

              <Button
                variant="outline"
                className="border-gray-600 bg-gray-900/50 hover:bg-purple-700 text-white  duration-300 backdrop-blur-sm px-4 md:px-8 py-3 md:py-6 text-lg relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
                <Zap className="w-5 h-5 mr-1 sm:mr-2 relative z-10" />
                <span className="relative z-10">Purchase Token</span>
              </Button>
            </div>
          </div>

          {/* Right 3D Element */}
          <div className="relative h-[300px] max-md:w-[300px] md:h-[700px]">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl" />
            <Canvas
              camera={{ position: [0, 0, 8], fov: 50 }}
              className="w-full h-full"
              style={{ background: "transparent" }}
            >
              {/* Enhanced Lighting */}
              <ambientLight intensity={0.4} />
              <directionalLight
                position={[10, 10, 5]}
                intensity={1}
                color="#8b5cf6"
              />
              <pointLight
                position={[10, 10, 10]}
                intensity={0.8}
                color="#8b5cf6"
              />
              <pointLight
                position={[-10, -10, -10]}
                intensity={0.6}
                color="#3b82f6"
              />
              <spotLight
                position={[0, 10, 0]}
                intensity={0.5}
                color="#06b6d4"
              />

              <CryptoObject />
              <Environment preset="night" />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.5}
              />
            </Canvas>
          </div>
        </div>
      </div>

      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-32 bg-gradient-to-t from-purple-600/20 to-transparent blur-3xl" />
    </div>
  );
}
