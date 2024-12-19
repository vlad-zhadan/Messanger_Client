// FilePreview.tsx
import React from 'react';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

interface FilePreviewProps {
    previewUrl: string;
    onClose: () => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({ previewUrl, onClose }) => {
    return (
        <div className="previewContainer">
            <div className="previewContent">
                <div className="imageContainer">
                    <img src={previewUrl} alt="Preview" className="imgContainer" />
                </div>
                <Button
                    type="primary"
                    icon={<CloseOutlined />}
                    onClick={onClose}
                    danger
                    style={{ marginTop: '10px' }}
                >
                    Close
                </Button>
            </div>
        </div>
    );
};

export default FilePreview;
