"use client";

interface RankTimerProps {
  timeLeft: number;
}

export default function RankTimer({ timeLeft }: RankTimerProps) {
  const formatTime = (ms: number) => {
    if (ms <= 0) return "Category Rank is Now Available!";
    const seconds = Math.floor(ms / 1000) % 60;
    const minutes = Math.floor(ms / (1000 * 60)) % 60;
    const hours = Math.floor(ms / (1000 * 60 * 60)) % 24;
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="mt-4 text-lg font-bold">
      Age & CPT Wise Rank will be available in: <span className="text-red-500">{formatTime(timeLeft)}</span>
    </div>
  );
}