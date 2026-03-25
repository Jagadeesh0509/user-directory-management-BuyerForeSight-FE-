import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Shell from '../components/Shell';
import StatusView from '../components/StatusView';
import { useUsers } from '../hooks/useUsers';

const SORT_OPTIONS = {
  nameAsc: {
    label: 'Name (A-Z)',
    compare: (left, right) => left.name.localeCompare(right.name)
  },
  nameDesc: {
    label: 'Name (Z-A)',
    compare: (left, right) => right.name.localeCompare(left.name)
  },
  companyAsc: {
    label: 'Company (A-Z)',
    compare: (left, right) => left.company.name.localeCompare(right.company.name)
  },
  companyDesc: {
    label: 'Company (Z-A)',
    compare: (left, right) => right.company.name.localeCompare(left.company.name)
  }
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const { users, isLoading, error } = useUsers();
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState('nameAsc');

  const filteredUsers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const activeSort = SORT_OPTIONS[sortKey].compare;

    return [...users]
      .filter((user) => {
        if (!normalizedQuery) {
          return true;
        }

        return (
          user.name.toLowerCase().includes(normalizedQuery) ||
          user.email.toLowerCase().includes(normalizedQuery)
        );
      })
      .sort(activeSort);
  }, [query, sortKey, users]);

  const controls = (
    <div className="toolbar">
      <label className="field">
        <span>Search</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by name or email"
        />
      </label>
      <label className="field">
        <span>Sort</span>
        <select value={sortKey} onChange={(event) => setSortKey(event.target.value)}>
          {Object.entries(SORT_OPTIONS).map(([value, option]) => (
            <option key={value} value={value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );

  let content;

  if (isLoading) {
    content = (
      <StatusView
        title="Loading directory"
        message="Fetching the latest user list for the dashboard."
      />
    );
  } else if (error) {
    content = <StatusView title="Unable to load users" message={error} />;
  } else if (!filteredUsers.length) {
    content = (
      <StatusView
        title="No users found"
        message="Try a different search term to see matching people."
      />
    );
  } else {
    content = (
      <section className="table-card">
        <div className="table-headline">
          <div>
            <h2>User Directory</h2>
            <p>
              Showing {filteredUsers.length} of {users.length} users
            </p>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  onClick={() => navigate(`/users/${user.id}`)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      navigate(`/users/${user.id}`);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.company.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  return (
    <Shell
      title="User Directory Dashboard"
      subtitle="Search and sort through user records, then open a full profile view for any person in the list."
      actions={controls}
    >
      {content}
    </Shell>
  );
}
