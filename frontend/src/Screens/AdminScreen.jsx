import React, { useState } from 'react';
import AuthorAdmin from '../Components/Admin/AuthorAdmin';
import FeedbackAdmin from '../Components/Admin/FeedbackAdmin';
import GenreAdmin from '../Components/Admin/GenreAdmin';
import BookAdmin from '../Components/Admin/BookAdmin';
import InteractionAdmin from '../Components/Admin/InteractionAdmin';

function AdminScreen() {
  const [showAuthorAdmin, setShowAuthorAdmin] = useState(false);
  const [showFeedbackAdmin, setShowFeedbackAdmin] = useState(false);
  const [showGenreAdmin, setShowGenreAdmin] = useState(false);
  const [showBookAdmin, setShowBookAdmin] = useState(false);
  const [showInteractionAdmin, setShowInteractionAdmin] = useState(false); // State for InteractionAdmin

  const buttonStyle = {
    backgroundColor: '#007bff', // Default color
    color: '#fff', // Text color
    border: 'none',
    padding: '10px 20px',
    margin: '5px',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  return (
    <div>
      <h1>Admin Screen</h1>
      <button
        style={{
          ...buttonStyle,
          backgroundColor: showInteractionAdmin ? '#28a745' : buttonStyle.backgroundColor
        }}
        onClick={() => setShowInteractionAdmin(!showInteractionAdmin)}
      >
        {showInteractionAdmin ? 'Hide Interaction Admin' : 'Show Interaction Admin'}
      </button>
      {showInteractionAdmin && <InteractionAdmin />} {/* Render InteractionAdmin conditionally */}

      <button
        style={{
          ...buttonStyle,
          backgroundColor: showAuthorAdmin ? '#28a745' : buttonStyle.backgroundColor
        }}
        onClick={() => setShowAuthorAdmin(!showAuthorAdmin)}
      >
        {showAuthorAdmin ? 'Hide Author Admin' : 'Show Author Admin'}
      </button>
      {showAuthorAdmin && <AuthorAdmin />}

      <button
        style={{
          ...buttonStyle,
          backgroundColor: showGenreAdmin ? '#28a745' : buttonStyle.backgroundColor
        }}
        onClick={() => setShowGenreAdmin(!showGenreAdmin)}
      >
        {showGenreAdmin ? 'Hide Genre Admin' : 'Show Genre Admin'}
      </button>
      {showGenreAdmin && <GenreAdmin />}

      <button
        style={{
          ...buttonStyle,
          backgroundColor: showBookAdmin ? '#28a745' : buttonStyle.backgroundColor
        }}
        onClick={() => setShowBookAdmin(!showBookAdmin)}
      >
        {showBookAdmin ? 'Hide Book Admin' : 'Show Book Admin'}
      </button>
      {showBookAdmin && <BookAdmin />}

      <button
        style={{
          ...buttonStyle,
          backgroundColor: showFeedbackAdmin ? '#28a745' : buttonStyle.backgroundColor
        }}
        onClick={() => setShowFeedbackAdmin(!showFeedbackAdmin)}
      >
        {showFeedbackAdmin ? 'Hide Feedback Admin' : 'Show Feedback Admin'}
      </button>
      {showFeedbackAdmin && <FeedbackAdmin />}
    </div>
  );
}

export default AdminScreen;
