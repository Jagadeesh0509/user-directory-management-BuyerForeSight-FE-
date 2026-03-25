const USERS_API_URL = 'https://jsonplaceholder.typicode.com/users';

export async function fetchUsers() {
  const response = await fetch(USERS_API_URL);

  if (!response.ok) {
    throw new Error('Unable to load users right now.');
  }

  return response.json();
}
