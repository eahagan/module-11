// src/pages/SavedCandidates.tsx
import React, { useState, useEffect } from 'react';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('savedCandidates');
    if (saved) {
      setSavedCandidates(JSON.parse(saved));
    }
  }, []);

  // Remove a saved candidate from localStorage
  const removeSavedCandidate = (id: string) => {
    const updatedSavedCandidates = savedCandidates.filter(
      (candidate) => candidate.id !== id
    );
    setSavedCandidates(updatedSavedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedSavedCandidates));
  };

  return (
    <div>
      <h1>Saved Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No saved candidates yet.</p>
      ) : (
        <ul>
          {savedCandidates.map((candidate: any) => (
            <li key={candidate.id}>
              <img src={candidate.avatar_url} alt={candidate.login} width={50} />
              <p>{candidate.login}</p>
              <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                View Profile
              </a>
              <button onClick={() => removeSavedCandidate(candidate.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedCandidates;


