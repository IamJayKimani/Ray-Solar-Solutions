function StatusBadge({ status }) {
  const variant = status === 'Active' || status === 'Verified' || status === 'Approved' || status === 'Completed'
    ? 'success'
    : status === 'Pending' || status === 'Processing'
    ? 'pending'
    : 'danger';

  return (
    <span className={`status-badge ${variant}`}>
      {status}
    </span>
  );
}

export default StatusBadge;
