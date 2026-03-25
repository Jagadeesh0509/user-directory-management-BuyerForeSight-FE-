import { useEffect, useState } from 'react';
import { fetchUsers } from '../data/usersApi';

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadUsers() {
      try {
        setIsLoading(true);
        setError('');

        const userList = await fetchUsers();

        if (isMounted) {
          setUsers(userList);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message || 'Something went wrong.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  return { users, isLoading, error };
}
