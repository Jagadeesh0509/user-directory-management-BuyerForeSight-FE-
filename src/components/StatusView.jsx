export default function StatusView({ title, message, action }) {
  return (
    <section className="status-card">
      <h2>{title}</h2>
      <p>{message}</p>
      {action}
    </section>
  );
}
