function StatCard({ title, value, accent }) {
  return (
    <div className="stat-card">
      <span>{title}</span>
      <strong style={accent ? { color: accent } : undefined}>{value}</strong>
    </div>
  );
}

export default StatCard;
