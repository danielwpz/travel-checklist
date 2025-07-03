
import { useState } from 'react';
import { Clock, X } from 'lucide-react';

interface TimerFormProps {
  onSetTimer: (timer: {
    type: 'countdown' | 'deadline';
    value: number | string;
    label: string;
    createdAt: string;
  } | null) => void;
  initialTimer?: {
    type: 'countdown' | 'deadline';
    value: number | string;
    label: string;
    createdAt: string;
  } | null;
}

const TimerForm = ({ onSetTimer, initialTimer }: TimerFormProps) => {
  const [showTimerForm, setShowTimerForm] = useState(!!initialTimer);
  const [timerType, setTimerType] = useState<'countdown' | 'deadline'>(
    initialTimer?.type || 'countdown'
  );
  const [countdownMinutes, setCountdownMinutes] = useState(
    initialTimer?.type === 'countdown' ? (initialTimer.value as number) : 120
  );
  const [deadlineDate, setDeadlineDate] = useState(() => {
    if (initialTimer?.type === 'deadline') {
      const date = new Date(initialTimer.value as string);
      return date.toISOString().slice(0, 16); // Format for datetime-local input
    }
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(18, 0, 0, 0);
    return tomorrow.toISOString().slice(0, 16);
  });
  const [timerLabel, setTimerLabel] = useState(initialTimer?.label || '');

  const handleSetTimer = () => {
    if (!timerLabel.trim()) return;

    const timer = {
      type: timerType,
      value: timerType === 'countdown' ? countdownMinutes : deadlineDate,
      label: timerLabel.trim(),
      createdAt: new Date().toISOString(),
    };

    onSetTimer(timer);
    setShowTimerForm(false);
  };

  const handleRemoveTimer = () => {
    onSetTimer(null);
    setShowTimerForm(false);
  };

  const handleCancel = () => {
    setShowTimerForm(false);
    if (!initialTimer) {
      onSetTimer(null);
    }
  };

  if (!showTimerForm) {
    return (
      <button
        type="button"
        onClick={() => setShowTimerForm(true)}
        className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1"
        title="Set timer"
      >
        <Clock size={14} />
        {initialTimer ? 'Edit Timer' : 'Set Timer'}
      </button>
    );
  }

  return (
    <div className="border rounded p-3 mt-2 bg-light">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="mb-0">Set Timer</h6>
        <button
          type="button"
          onClick={handleCancel}
          className="btn btn-sm btn-outline-secondary"
        >
          <X size={14} />
        </button>
      </div>

      <div className="mb-3">
        <label className="form-label">Timer Type</label>
        <div className="d-flex gap-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="timerType"
              id="countdown"
              checked={timerType === 'countdown'}
              onChange={() => setTimerType('countdown')}
            />
            <label className="form-check-label" htmlFor="countdown">
              Countdown
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="timerType"
              id="deadline"
              checked={timerType === 'deadline'}
              onChange={() => setTimerType('deadline')}
            />
            <label className="form-check-label" htmlFor="deadline">
              Deadline
            </label>
          </div>
        </div>
      </div>

      {timerType === 'countdown' ? (
        <div className="mb-3">
          <label htmlFor="countdownMinutes" className="form-label">
            Minutes from now
          </label>
          <input
            type="number"
            className="form-control"
            id="countdownMinutes"
            value={countdownMinutes}
            onChange={(e) => setCountdownMinutes(Number(e.target.value))}
            min="1"
            max="10080" // 1 week in minutes
          />
        </div>
      ) : (
        <div className="mb-3">
          <label htmlFor="deadlineDate" className="form-label">
            Deadline date and time
          </label>
          <input
            type="datetime-local"
            className="form-control"
            id="deadlineDate"
            value={deadlineDate}
            onChange={(e) => setDeadlineDate(e.target.value)}
          />
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="timerLabel" className="form-label">
          Description
        </label>
        <input
          type="text"
          className="form-control"
          id="timerLabel"
          value={timerLabel}
          onChange={(e) => setTimerLabel(e.target.value)}
          placeholder="e.g., 'before departure', 'by evening'"
        />
      </div>

      <div className="d-flex gap-2">
        <button
          type="button"
          onClick={handleSetTimer}
          className="btn btn-primary btn-sm"
          disabled={!timerLabel.trim()}
        >
          Set Timer
        </button>
        {initialTimer && (
          <button
            type="button"
            onClick={handleRemoveTimer}
            className="btn btn-outline-danger btn-sm"
          >
            Remove Timer
          </button>
        )}
      </div>
    </div>
  );
};

export default TimerForm;

