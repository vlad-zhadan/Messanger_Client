import React, { useState } from 'react';

export default function FileUploadForm (){
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string>('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setSelectedFile(file);

        // Generate a preview URL for the file
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        } else {
            setPreviewUrl(null);
        }
    };

    const handleUpload = () => {
        if (selectedFile) {
            setUploadStatus('Uploading...');
            setTimeout(() => {
                setUploadStatus('File uploaded successfully!');
            }, 2000); // Simulate upload delay
        }
    };

    return (
        <div style={styles.container}>
            <h2>File Upload</h2>
            <div style={styles.uploadContainer}>
                <input
                    type="file"
                    id="fileInput"
                    onChange={handleFileChange}
                    style={styles.fileInput}
                />
                <label htmlFor="fileInput" style={styles.label}>
                    {selectedFile ? selectedFile.name : 'Choose a file'}
                </label>
            </div>
            {previewUrl && (
                <div style={styles.previewContainer}>
                    <p>Preview:</p>
                    <img src={previewUrl} alt="Preview" style={styles.previewImage} />
                </div>
            )}
            <button
                onClick={handleUpload}
                style={styles.uploadButton}
                disabled={!selectedFile}
            >
                Upload
            </button>
            {uploadStatus && <p style={styles.uploadStatus}>{uploadStatus}</p>}
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        maxWidth: '400px',
        margin: '20px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '12px',
        textAlign: 'center',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    uploadContainer: {
        position: 'relative',
        display: 'inline-block',
        marginBottom: '20px',
    },
    fileInput: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0,
        cursor: 'pointer',
    },
    label: {
        display: 'block',
        padding: '10px 20px',
        border: '2px dashed #007bff',
        borderRadius: '12px',
        textAlign: 'center',
        color: '#007bff',
        cursor: 'pointer',
        backgroundColor: '#eaf4ff',
    },
    previewContainer: {
        marginTop: '20px',
    },
    previewImage: {
        maxWidth: '100%',
        height: 'auto',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    uploadButton: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    uploadButtonDisabled: {
        backgroundColor: '#ccc',
        cursor: 'not-allowed',
    },
    uploadStatus: {
        marginTop: '10px',
        fontWeight: 'bold',
        color: '#28a745',
    },
};

