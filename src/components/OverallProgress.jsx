export default function OverallProgress({ goals }) {
  const total = goals.length;
  const completedCount = goals.filter((g) => g.status === "completed").length;
  const avgProgress =
    total === 0
      ? 0
      : Math.round(
          goals.reduce((sum, g) => sum + Number(g.progress), 0) / total
        );

  return (
    <section className="overall-card">
      <div className="overall-header">
        <h2>Overall Progress</h2>
        <span>
          {completedCount} / {total} Goals Completed ({avgProgress}% Avg)
        </span>
      </div>
      <div className="progress-bar-bg">
        <div
          className={`progress-bar-fill ${avgProgress === 100 && total > 0 ? "completed" : ""}`}
          style={{ width: `${avgProgress}%` }}
        />
      </div>
    </section>
  );
}
