// src/pages/CandidateSearch.tsx
import React, { useState } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

const CandidateSearch = () => {
  const [query, setQuery] = useState('');
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null); // To view individual candidate details

  const token = import.meta.env.VITE_GITHUB_TOKEN; // Get the token from .env file

  // Handle searching for candidates
  const handleSearch = async () => {
    if (!query) return; // Don't search if the query is empty
    setLoading(true);
    try {
      const results = await searchGithub(); // Use the searchGithub function
      setCandidates(results);
      setError('');
    } catch (err) {
      setError('An error occurred while fetching candidates');
    } finally {
      setLoading(false);
    }
  };

  // Show detailed information for a selected candidate
  const handleCandidateClick = async (username: string) => {
    setLoading(true);
    try {
      const userDetails = await searchGithubUser(username); // Fetch detailed profile
      setSelectedCandidate(userDetails);
    } catch (err) {
      setError('Failed to load candidate details');
    } finally {
      setLoading(false);
    }
  };

  // Save candidate to localStorage
  const saveCandidate = (candidate: any) => {
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    saved.push(candidate);
    localStorage.setItem('savedCandidates', JSON.stringify(saved));
  };

  return (
    <div>
      <h1>Search GitHub Candidates</h1>
      <input
        type="text"
        placeholder="Search GitHub Users"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch} disabled={loading}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {/* Sort candidates button */}
      {candidates.length > 0 && (
        <button onClick={sortCandidates}>Sort Alphabetically</button>
      )}

      <div>
        {candidates.length > 0 && (
          <ul>
            {candidates.map((candidate) => (
              <li key={candidate.id}>
                <img src={candidate.avatar_url} alt={candidate.login} width={50} />
                <p>{candidate.login}</p>
                <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                  View Profile
                </a>
                <button onClick={() => saveCandidate(candidate)}>Save</button>
                <button onClick={() => handleCandidateClick(candidate.login)}>View Details</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Display details of a selected candidate */}
      {selectedCandidate && (
        <div>
          <h2>{selectedCandidate.name}</h2>
          <p>{selectedCandidate.bio}</p>
          <a href={selectedCandidate.html_url} target="_blank" rel="noopener noreferrer">
            View Full Profile
          </a>
          <button onClick={() => saveCandidate(selectedCandidate)}>Save this candidate</button>
        </div>
      )}
    </div>
  );
};

export default CandidateSearch;



