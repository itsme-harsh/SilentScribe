import { useState } from 'react';

const FileUpload = ({ setFile, setError, label, valid = true }) => {
  const [file, setLocalFile] = useState(null); // To track the local file

  // Handle the file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    // If validation is disabled, allow file without validation
    if (!valid) {
      setLocalFile(selectedFile);
      setError('');
      setFile(selectedFile);
      return;
    }

    // File validation: Check if file exists
    if (!selectedFile) {
      setError('No file selected');
      setFile(null);
      return;
    }

    // Validate file type (example: accept only images)
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!validTypes.includes(selectedFile.type)) {
      setError('Invalid file type. Only JPG, PNG, and GIF are allowed.');
      setFile(null);
      return;
    }

    // Validate file size (example: max size 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (selectedFile.size > maxSize) {
      setError('File size exceeds the 5MB limit.');
      setFile(null);
      return;
    }

    // If valid, update file state and clear error
    setLocalFile(selectedFile);
    setError('');
    setFile(selectedFile);
  };

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];

    // Same validation logic for dropped files
    handleFileChange({ target: { files: [droppedFile] } });
  };

  return (
    <>
      <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <div
        className="mt-1 p-3 border-2 border-dashed border-gray-300 dark:border-gray-600 p-6 text-center cursor-pointer"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <label
          className="block text-lg text-gray-700 dark:text-blue-500 mb-4"
          htmlFor="file-input"
        >
          Drag and Drop Your File Here or Click to Select
        </label>

        {/* Hidden file input, triggered by label */}
        <input
          type="file"
          id="file-input"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />

        {file ? (
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            <p>File Selected: <strong>{file.name}</strong></p>
            <p>File Size: <strong>{(file.size / 1024).toFixed(2)} KB</strong></p>
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 mt-2">No file selected yet</p>
        )}
      </div>
    </>
  );
};

export default FileUpload;
