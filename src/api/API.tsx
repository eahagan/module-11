// src/api/API.tsx
const searchGithub = async () => {
  try {
    // Generate a random number to paginate through users (GitHub API paginates results with a `since` parameter)
    const start = Math.floor(Math.random() * 100000000) + 1;

    const response = await fetch(`https://api.github.com/users?since=${start}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`, // Use token from .env file
      },
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error('Invalid API response, check the network tab');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('An error occurred', err);
    return [];
  }
};

// Search for a specific GitHub user by username
const searchGithubUser = async (username: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`, // Use token from .env file
      },
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error('Invalid API response, check the network tab');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('An error occurred', err);
    return {};
  }
};

// Export both functions so they can be used in other components
export { searchGithub, searchGithubUser };

