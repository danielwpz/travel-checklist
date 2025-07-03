import { useState, useEffect } from 'react';
import { Clock, AlertCircle } from 'lucide-react';
import type { ChecklistItem } from '../types';

interface TimerDisplayProps {
  item: ChecklistItem;
}

const TimerDisplay = ({ item }: TimerDisplayProps) => {
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!item.timer) return;

    const updateTimer = () => {
      const now = new Date();
      let targetTime: Date;

      if (item.timer!.type === 'countdown') {
        // For countdown, calculate target time from when timer was created
        const createdAt = new Date(item.timer!.createdAt);
        const countdownMinutes = item.timer!.value as number;
        targetTime = new Date(createdAt.getTime() + countdownMinutes * 60 * 1000);
      } else {
        // For deadline, use the specified date/time
        targetTime = new Date(item.timer!.value as string);
      }

      const timeDiff = targetTime.getTime() - now.getTime();

      if (timeDiff <= 0) {
        setTimeRemaining('Expired');
        setIsExpired(true);
        return;
      }

      setIsExpired(false);

      // Calculate time components
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

      // Format display
      if (days > 0) {
        setTimeRemaining(`${days}d ${hours}h ${minutes}m`);
      } else if (hours > 0) {
        setTimeRemaining(`${hours}h ${minutes}m`);
      } else {
        setTimeRemaining(`${minutes}m`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [item.timer]);

  if (!item.timer) return null;

  return (
    <div className={`d-flex align-items-center gap-1 ${isExpired ? 'text-danger' : 'text-warning'}`}>
      {isExpired ? <AlertCircle size={14} /> : <Clock size={14} />}
      <small className="fw-bold">
        {timeRemaining}
      </small>
      <small className="text-muted">
        ({item.timer.label})
      </small>
    </div>
  );
};

export default TimerDisplay;
