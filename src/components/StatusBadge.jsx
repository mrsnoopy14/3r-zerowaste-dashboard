function StatusBadge({ isFull }) {
  return isFull ? (
    <span className="status-pill status-full">Full</span>
  ) : (
    <span className="status-pill status-ok">Not Full</span>
  );
}
