import { Link, useParams } from 'react-router-dom';
import Shell from '../components/Shell';
import StatusView from '../components/StatusView';
import { useUsers } from '../hooks/useUsers';

function DetailItem({ label, value }) {
  return (
    <div className="detail-item">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default function UserDetailPage() {
  const { userId } = useParams();
  const { users, isLoading, error } = useUsers();
  const user = users.find((entry) => String(entry.id) === userId);

  const backButton = (
    <Link className="button-link" to="/">
      Back to dashboard
    </Link>
  );

  let content;

  if (isLoading) {
    content = (
      <StatusView title="Loading user details" message="Gathering profile information for this user." />
    );
  } else if (error) {
    content = <StatusView title="Unable to load user" message={error} action={backButton} />;
  } else if (!user) {
    content = (
      <StatusView
        title="User not found"
        message="The requested profile does not exist in the current directory."
        action={backButton}
      />
    );
  } else {
    content = (
      <section className="detail-grid">
        <article className="profile-card spotlight">
          <p className="eyebrow">Profile</p>
          <h2>{user.name}</h2>
          <p className="hero-copy">{user.company.catchPhrase}</p>
          <div className="chip-row">
            <span className="chip">{user.username}</span>
            <span className="chip">{user.company.bs}</span>
          </div>
        </article>
        <article className="profile-card">
          <h3>Contact Information</h3>
          <div className="detail-list">
            <DetailItem label="Email" value={user.email} />
            <DetailItem label="Phone" value={user.phone} />
            <DetailItem label="Website" value={user.website} />
          </div>
        </article>
        <article className="profile-card">
          <h3>Company</h3>
          <div className="detail-list">
            <DetailItem label="Name" value={user.company.name} />
            <DetailItem label="Catchphrase" value={user.company.catchPhrase} />
            <DetailItem label="Business" value={user.company.bs} />
          </div>
        </article>
        <article className="profile-card">
          <h3>Address</h3>
          <div className="detail-list">
            <DetailItem
              label="Street"
              value={`${user.address.suite}, ${user.address.street}`}
            />
            <DetailItem label="City" value={user.address.city} />
            <DetailItem label="Zipcode" value={user.address.zipcode} />
            <DetailItem
              label="Geo"
              value={`${user.address.geo.lat}, ${user.address.geo.lng}`}
            />
          </div>
        </article>
      </section>
    );
  }

  return (
    <Shell
      title="User Detail"
      subtitle="A complete view of the selected user record from the directory."
      actions={backButton}
    >
      {content}
    </Shell>
  );
}
