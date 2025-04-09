import React from 'react';
import './styles/index.css';

export interface Candidate {
    name: string;
    username: string;
    location: string;
    avatar: string;
    email: string;
    html_url: string;
    company: string;
}

export interface CandidateDetails {
    name: string;
    username: string;
    location: string;
    avatar: string;
    email: string;
    html_url: string;
    company: string;    
}

export interface CandidateProps {
    candidate: Candidate;
    onSave: (candidate: Candidate) => void;
    onSkip: () => void;
    isOpen: boolean;
    handleToggle: () => void;
}

const Candidate = ({ candidate, onSave, onSkip, isOpen, handleToggle }: CandidateProps) => {
    const handleSave = () => {
        onSave(candidate);
    };
    const handleSkip = () => {
        onSkip();
    };

    return (
        <>
            <div className="candidate">
                <div className="candidate-header" onClick={handleToggle}>
                    <img src={candidate.avatar} alt={`${candidate.name}'s avatar`} />
                    <h2>{candidate.name}</h2>
                    <p>{candidate.username}</p>
                </div>
                {isOpen && (
                    <div className="candidate-details">
                        <p><strong>Location:</strong> {candidate.location}</p>
                        <p><strong>Email:</strong> {candidate.email}</p>
                        <p><strong>Company:</strong> {candidate.company}</p>
                        <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">View Profile</a>
                    </div>
                )}
            </div>
            <div className="candidate-actions">
                <button onClick={handleSave}>Save</button>
                <button onClick={handleSkip}>Skip</button>
            </div>
        </>
    );
};

export default Candidate;