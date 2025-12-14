"use client";
import { useEffect, useState } from "react";
import Card from "../libs/Card";
import Typography from "../libs/Typography";

export default function TimeCountdown({ date }) {
  const [timeLeft, setTimeLeft] = useState({
    days: "0",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    if (!date) return;
    const targetDate = new Date(date);
    targetDate.setHours(23, 59, 59, 999);

    const updateCountdown = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    };

    updateCountdown();

    const interval = setInterval(() => {
      updateCountdown();
    }, 1000);

    return () => clearInterval(interval);
  }, [date]);

  const timeData = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <Card className="grow">
      <Typography variant="h5">Time remaining for draw</Typography>

      <div className="flex flex-wrap justify-start gap-3">
        {timeData.map((data, index) => (
          <div
            key={index}
            className="bg-primary-dark/10 dark:bg-primary-dark/20 px-7 py-3 rounded-lg text-center grow dark:text-white"
          >
            <Typography variant="h3">{data.value}</Typography>
            <Typography variant="body2">{data.label}</Typography>
          </div>
        ))}
      </div>
    </Card>
  );
}
