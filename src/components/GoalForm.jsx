import { useState, useEffect } from "react";

export default function GoalForm({ onSave, editingGoal, onCancelEdit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (editingGoal) {
      setTitle(editingGoal.title);
      setDescription(editingGoal.description);
      setTargetDate(editingGoal.targetDate);
      setProgress(editingGoal.progress);
    } else {
      resetFields();
    }
  }, [editingGoal]);

  const resetFields = () => {
    setTitle("");
    setDescription("");
    setTargetDate("");
    setProgress(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !targetDate) return;

    const clampedProgress = Math.min(100, Math.max(0, Number(progress) || 0));
    onSave({
      title: title.trim(),
      description: description.trim(),
      targetDate,
      progress: clampedProgress,
      status: clampedProgress === 100 ? "completed" : "in-progress",
    });

    resetFields();
  };

  return (
    <section className="form-card">
      <h2>{editingGoal ? "Edit Goal" : "Add a New Goal"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Goal Title *</label>
          <input
            id="title"
            type="text"
            placeholder="e.g., Build a React Portfolio"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            rows="2"
            placeholder="Optional details or milestones..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="targetDate">Target Date *</label>
            <input
              id="targetDate"
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="progress">Initial Progress (%)</label>
            <input
              id="progress"
              type="number"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(e.target.value)}
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn primary">
            {editingGoal ? "Save Changes" : "Add Goal"}
          </button>
          {editingGoal && (
            <button
              type="button"
              className="btn secondary"
              onClick={() => {
                resetFields();
                onCancelEdit();
              }}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
