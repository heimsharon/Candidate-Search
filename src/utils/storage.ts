export const saveAcceptedCandidates = (candidates: any []) => {
    localStorage.setItem('acceptedCandidates', JSON.stringify(candidates));
    }
export const getAcceptedCandidates = () => {
    const candidates = localStorage.getItem('acceptedCandidates');
    return candidates ? JSON.parse(candidates) : [];
    }