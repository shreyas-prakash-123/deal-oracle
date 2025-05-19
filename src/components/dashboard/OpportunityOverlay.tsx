
import React from 'react';

interface OpportunityOverlayProps {
  isVisible: boolean;
  onClose: () => void;
}

const OpportunityOverlay: React.FC<OpportunityOverlayProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-universal-blue-900/40 backdrop-blur-sm z-20 transition-opacity duration-300"
      onClick={onClose}
    />
  );
};

export default OpportunityOverlay;
