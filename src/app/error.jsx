"use client";
import Typography from "@/components/libs/Typography";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowRotateLeft } from "react-icons/fa6";
import Button from "../components/libs/Button";

export default function Error500Page() {
  const [isShaking, setIsShaking] = useState(false);
  const [particles, setParticles] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const particleData = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 4 + 3,
      size: Math.random() * 4 + 2,
    }));
    setParticles(particleData);
    setMounted(true);

    const shakeInterval = setInterval(() => {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 600);
    }, 4000);

    return () => clearInterval(shakeInterval);
  }, []);

  const handleRetry = () => window.location.reload();

  return (
    <div className="relative min-h-screen bg-background flex items-center justify-center overflow-hidden">
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute bg-error rounded-full opacity-60 animate-float"
              style={{
                left: `${p.left}%`,
                top: "100%",
                width: `${p.size}px`,
                height: `${p.size}px`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
              }}
            ></div>
          ))}
        </div>
      )}

      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 400 400">
          <defs>
            <pattern
              id="circuit"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M20 10 L20 20 L30 20 L30 30 L10 30 L10 20 L20 20"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
                opacity="0.3"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <div className="mb-8">
          <div
            className={`inline-flex items-center justify-center w-32 h-32 mb-6 rounded-full bg-gradient-to-br from-error to-green-400 shadow-xl transition-transform ${
              isShaking ? "animate-shake" : ""
            }`}
          >
            <span className="text-6xl">⚠️</span>
          </div>
          <Typography
            variant="h1"
            align="center"
            color="error"
            className={`${isShaking ? "animate-glitch" : ""}`}
          >
            500
          </Typography>
        </div>

        <div className="mb-8">
          <Typography variant="h4" align="center" className="mb-4">
            Internal Server Error
          </Typography>
          <Typography variant="body2" color="gray" align="center">
            We're experiencing some technical difficulties on our end. Our team
            has been notified and is working to resolve this issue as quickly as
            possible.
          </Typography>
        </div>

        <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center items-center gap-4 mb-12">
          <Button onClick={handleRetry} variant="outline">
            <FaArrowRotateLeft />
            Try Again
          </Button>

          <Link href="/">
            <Button>Go Home</Button>
          </Link>
        </div>

        <Typography variant="body2" align="center">
          If this problem persists, please contact our support team.
        </Typography>
      </div>
    </div>
  );
}
