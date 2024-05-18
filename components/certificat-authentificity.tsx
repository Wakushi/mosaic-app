import React from 'react';

interface CertificateAuthentificityProps {
  title: string;
  artist: string;
}

const CertificateAuthentificity: React.FC<CertificateAuthentificityProps> = ({ title, artist }) => {
  return (
    <div style={{ width: '1200px', height: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '2px solid black', padding: '20px', fontFamily: 'PlayfairDisplay-VariableFont_wght' }}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>Certificate of Authenticity</h1>
      <p style={{ fontSize: '36px' }}>{title}</p>
      <p style={{ fontSize: '24px' }}>{artist}</p>
    </div>
  );
};

export default CertificateAuthentificity;