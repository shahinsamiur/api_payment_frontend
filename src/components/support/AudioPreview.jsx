import { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

const AudioPreview = ({ audioBlob, isLoading }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (audioBlob) {
      const audioURL = URL.createObjectURL(audioBlob);
      audioRef.current = new Audio(audioURL);

      audioRef.current.ontimeupdate = () => {
        setCurrentTime(Math.floor(audioRef.current.currentTime));
      };

      // Draw fake waveform (for visual preview)
      drawWaveform();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioBlob]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const drawWaveform = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#0EA5E9";

    const barCount = 50;
    const barWidth = width / barCount;
    for (let i = 0; i < barCount; i++) {
      const barHeight = Math.random() * height;
      ctx.fillRect(i * barWidth, height - barHeight, barWidth * 0.6, barHeight);
    }
  };

  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="flex items-end gap-1 relative">
      <button
        type="button"
        onClick={togglePlay}
        className="bg-sky-500 hover:bg-sky-600 text-white p-2 flex justify-center items-center rounded-full"
      >
        {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} />}
      </button>

      <canvas ref={canvasRef} width={200} height={40} className="rounded" />

      <span className="text-sm text-white">{formatTime(currentTime)}</span>

      {/* loading indicator */}
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  );
};

export default AudioPreview;
