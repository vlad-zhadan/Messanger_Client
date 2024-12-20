import React from 'react';
import './FileCard.css';

interface FileCardProps {
  fileName: string;
}

const FileCard: React.FC<FileCardProps> = ({ fileName}) => {
  return (
    <div className="file-card">
      <div className="file-icon">
        <span role="img" aria-label="file">📄</span>
      </div>
      <div className="file-info">
        <p className="file-name">{fileName}</p>
      </div>
    </div>
  );
};

export default FileCard;
