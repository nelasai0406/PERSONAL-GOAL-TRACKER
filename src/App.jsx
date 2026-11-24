import { useState, useEffect } from "react";
import OverallProgress from "./components/OverallProgress";
import GoalForm from "./components/GoalForm";
import GoalCard from "./components/GoalCard";
import "./App.css";

const STORAGE_KEY = "react_personal_goal_tracker_v1";

export default function App() {
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [editingGoal, setEditingGoal] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Save goals to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
  }, [goals]);

  // Add or Update Goal
  const handleSaveGoal = (goalData) => {
    if (editingGoal) {
      setGoals((prev) =>
        prev.map((g) => (g.id === editingGoal.id ? { ...goalData, id: g.id } : g))
      );
      setEditingGoal(null);
    } else {
      const newGoal = {
        ...goalData,
        id: Date.now().toString(),
      };
      setGoals((prev) => [newGoal, ...prev]);
    }
  };

  // Delete Goal
  const handleDeleteGoal = (id) => {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      setGoals((prev) => prev.filter((g) => g.id !== id));
      if (editingGoal?.id === id) setEditingGoal(null);
    }
  };

  // Update Progress Slider
  const handleUpdateProgress = (id, newProgress) => {
    const progress = Number(newProgress);
    setGoals((prev) =>
      prev.map((g) =>
        g.id === id
          ? {
              ...g,
              progress,
              status: progress === 100 ? "completed" : "in-progress",
            }
          : g
      )
    );
  };

  // Toggle Completed / In-Progress Status
  const handleToggleStatus = (id) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id !== id) return g;
        const willComplete = g.status !== "completed";
        return {
          ...g,
          status: willComplete ? "completed" : "in-progress",
          progress: willComplete ? 100 : g.progress === 100 ? 50 : g.progress,
        };
      })
    );
  };

  // Filter & Search Logic
  const filteredGoals = goals.filter((goal) => {
    const matchesSearch = goal.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase().trim());
    const matchesStatus =
      statusFilter === "all" || goal.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container">
      <header>
        <h1>🎯 Personal Goal Tracker</h1>
        <p>Plan, track, and complete your personal milestones.</p>
      </header>

      <OverallProgress goals={goals} />

      <GoalForm
        onSave={handleSaveGoal}
        editingGoal={editingGoal}
        onCancelEdit={() => setEditingGoal(null)}
      />

      {/* Search and Filter Controls */}
      <section className="controls">
        <input
          type="text"
          placeholder="🔍 Search goals by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Goals</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </section>

      {/* Goals Grid */}
      <section className="goals-grid">
        {filteredGoals.length === 0 ? (
          <div className="empty-state">
            <p>No goals found. Add a new goal above or adjust your filters.</p>
          </div>
        ) : (
          filteredGoals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onUpdateProgress={handleUpdateProgress}
              onToggleStatus={handleToggleStatus}
              onEdit={() => {
                setEditingGoal(goal);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onDelete={handleDeleteGoal}
            />
          ))
        )}
      </section>
    </div>
  );
}
