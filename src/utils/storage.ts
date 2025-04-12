import { useEffect, useState } from 'react';

export const saveAcceptedCandidates = (candidates: any[]) => {
  localStorage.setItem('acceptedCandidates', JSON.stringify(candidates));
};

export const getAcceptedCandidates = () => {
  const candidates = localStorage.getItem('acceptedCandidates');
  return candidates ? JSON.parse(candidates) : [];
};

export const useSavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<any[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    if (Array.isArray(saved)) {
      setSavedCandidates(saved);
    } else {
      setSavedCandidates([]);
    }
  }, []);

  return { savedCandidates, setSavedCandidates };
};