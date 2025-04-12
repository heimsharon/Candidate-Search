// This file is responsible for displaying the candidate's information and allowing the user to save or skip the candidate.
import './styles/index.css';

// Define the structure of a Candidate object
export interface Candidate {
    name: string; // Candidate's full name
    username: string; // Candidate's GitHub username
    location: string; // Candidate's location
    avatar: string; // URL of the candidate's avatar image
    email: string; // Candidate's email address
    html_url: string; // URL to the candidate's GitHub profile
    company: string; // Candidate's company
    bio: string; // Candidate's bio or description
}

// Define the structure of CandidateDetails (similar to Candidate)
export interface CandidateDetails {
    name: string; // Candidate's full name
    username: string; // Candidate's GitHub username
    location: string; // Candidate's location
    avatar: string; // URL of the candidate's avatar image
    email: string; // Candidate's email address
    html_url: string; // URL to the candidate's GitHub profile
    company: string; // Candidate's company
    bio: string; // Candidate's bio or description
}

// Define the props for the Candidate component
export interface CandidateProps {
    candidate: Candidate; // The candidate object to display
    onSave: (candidate: Candidate) => void; // Function to handle saving the candidate
    onSkip: () => void; // Function to handle skipping the candidate
    isOpen: boolean; // Whether the candidate details are expanded
    handleToggle: () => void; // Function to toggle the expanded state
}

// Candidate component to display a candidate's information
const Candidate = ({ candidate, onSave, onSkip, isOpen, handleToggle }: CandidateProps) => {
    // Function to handle saving the candidate
    const handleSave = () => {
        onSave(candidate);
    };

    // Function to handle skipping the candidate
    const handleSkip = () => {
        onSkip();
    };

    return (
        <>
            {/* Candidate container */}
            <div className="candidate">
                {/* Candidate header with avatar, name, and username */}
                <div className="candidate-header" onClick={handleToggle}>
                    <img src={candidate.avatar} alt={`${candidate.name}'s avatar`} />
                    <h2>{candidate.name}</h2>
                    <p>{candidate.username}</p>
                </div>

                {/* Candidate details (expanded when isOpen is true) */}
                {isOpen && (
                    <div className="candidate-details">
                        <p><strong>Location:</strong> {candidate.location}</p>
                        <p><strong>Email:</strong> {candidate.email}</p>
                        <p><strong>Company:</strong> {candidate.company}</p>
                        <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">View Profile</a>
                    </div>
                )}
            </div>

            {/* Candidate actions (Save and Skip buttons) */}
            <div className="candidate-actions">
                <button onClick={handleSave}>Save</button>
                <button onClick={handleSkip}>Skip</button>
            </div>
        </>
    );
};

export default Candidate;