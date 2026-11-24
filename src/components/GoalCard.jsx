export default function GoalCard({
  goal,
  onUpdateProgress,
  onToggleStatus,
  onEdit,
  onDelete,
}) {
  const isCompleted = goal.status === "completed";

  return (
    <div className={`goal-card ${isCompleted ? "completed" : ""}`}>
      <div className="goal-top">
        <h3 className="goal-title">{goal.title}</h3>
        <span className={`badge ${goal.status}`}>
          {isCompleted ? "Completed" : "In Progress"}
        </span>
      </div>

      {goal.description && <p className="goal-desc">{goal.description}</p>}

      <div className="goal-meta">
        📅 Target Date: <strong>{goal.targetDate}</strong>
      </div>

      <div className="progress-bar-bg">
        <div
          className={`progress-bar-fill ${isCompleted ? "completed" : ""}`}
          style={{ width: `${goal.progress}%` }}
        />
      </div>

      <div className="slider-row">
        <label htmlFor={`slider-${goal.id}`}>Progress:</label>
        <input
          id={`slider-${goal.id}`}
          type="range"
          min="0"
          max="100"
          value={goal.progress}
          onChange={(e) => onUpdateProgress(goal.id, e.target.value)}
        />
        <span>
          <strong>{goal.progress}%</strong>
        </span>
      </div>

      <div className="goal-actions">
        <button
          className="btn small success"
          onClick={() => onToggleStatus(goal.id)}
        >
          {isCompleted ? "↩ Mark In Progress" : "✓ Mark Completed"}
        </button>
        <button className="btn small secondary" onClick={onEdit}>
          ✎ Edit
        </button>
        <button
          className="btn small danger"
          onClick={() => onDelete(goal.id)}
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
}
