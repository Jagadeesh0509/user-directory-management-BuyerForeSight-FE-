export default function Shell({ title, subtitle, actions, children }) {
  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">BuyerForeSight Directory</p>
          <h1>{title}</h1>
          <p className="hero-copy">{subtitle}</p>
        </div>
        {actions ? <div className="hero-actions">{actions}</div> : null}
      </header>
      <main>{children}</main>
    </div>
  );
}
