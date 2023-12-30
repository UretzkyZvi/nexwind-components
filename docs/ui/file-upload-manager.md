
# File Upload Manager Component Guide

## Introduction

The `FileUploadManager` is a React component designed for handling file uploads in your application. It provides a user-friendly interface for selecting files and tracking upload progress. This guide provides instructions on how to integrate and use this component in your project.

## Prerequisites

Before you start, ensure your project setup includes the following dependencies:

- React
- Tailwind CSS
- `lucide-react` for icons
- `clsx` for conditional class names
- A Modal component

If you don't have these dependencies installed, you can add them using npm or yarn. For example:

```bash
npm install react tailwindcss lucide-react clsx
```

## Component Installation

1. **Copy the Component Code**: Copy the `FileUploadManager` component code provided in this guide.

2. **Add to Your Project**: Paste the copied code into a new file in your project, typically under a directory like `src/components`.

3. **Import in Your Project**: Import the `FileUploadManager` component in the file where you wish to use it.

   ```javascript
   import FileUploadManager from './components/FileUploadManager';
   ```

## Usage

To use the `FileUploadManager` component in your application, follow these steps:

### Step 1: Import the Component

Import the `FileUploadManager` into the desired React component file.

```javascript
import FileUploadManager from 'path-to-FileUploadManager';
```

Replace `'path-to-FileUploadManager'` with the actual path to the file containing the `FileUploadManager` component.

### Step 2: Use the Component in JSX

Implement the `FileUploadManager` component within your component's JSX.

```jsx
<FileUploadManager   
  onComplete={(data) => {
    console.log("onComplete", data);
  }}
  onUpdate={(status, progress) => {
    console.log("onUpdate", status, progress);
  }}
  uploadEndpoint="your-upload-endpoint"
  uploadOptions={{
    mimeTypes: ["text/csv"],
    maxSize: 1024 * 1024 * 3, // 3 MB
    maxFiles: 2,
  }}
  openFileSelector={true}
  onCloseManually={() => {/* handle close */}}
/>
```

### Props

- `onComplete`: Callback function triggered when the upload is complete.
- `onUpdate`: Callback function providing updates on the upload status and progress.
- `uploadEndpoint`: The endpoint where files will be uploaded.
- `uploadOptions`: Configuration options for the file upload.
- `openFileSelector`: Boolean to control the visibility of the file selector.
- `onCloseManually`: Function to handle the manual closure of the file selector.

### Step 3: Set Up the Server Endpoint

Ensure that your server has an endpoint capable of handling file uploads and that it matches the `uploadEndpoint` prop specified in the component.

### Additional Configuration

- Tailwind CSS should be configured in your project for styling.
- Modify the `FileUploadManager` as needed to match your project's styling and functional requirements.

## Complete Example

Below is an example showing how to use the `FileUploadManager` in a React component.

```jsx
import React, { useState } from 'react';
import FileUploadManager from './components/FileUploadManager';

const MyComponent = () => {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsSelectorOpen(true)}>Upload Files</button>
      <FileUploadManager
        onComplete={(data) => console.log("Upload Complete", data)}
        onUpdate={(status, progress) => console.log("Status:", status, "Progress:", progress)}
        uploadEndpoint="/api/upload"
        uploadOptions={{ mimeTypes: ["text/csv"], maxSize: 3145728, maxFiles: 2 }}
        openFileSelector={isSelectorOpen}
        onCloseManually={() => setIsSelectorOpen(false)}
      />
    </div>
  );
};

export default MyComponent;
```

This guide should help you integrate and use the `FileUploadManager` component in your React application. Adjust the component and its usage as per your project's requirements.
