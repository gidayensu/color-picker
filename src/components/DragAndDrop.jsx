import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ImageColorPicker } from "react-image-color-picker";

export default function DragAndDrop({ handleColorPick }) {
  const [uploadedImage, setUpLoadedImage] = useState(null);

  const onDrop = useCallback((acceptedFile) => {
    acceptedFile.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        setUpLoadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleRemovePicture = () => {
    setUpLoadedImage(null);
  };

  return (
    <>
      <div className="mb-6">
        <div className="w-full md:w-1/2 lg:w-1/3 mx-auto my-4 p-4 border border-gray-300 rounded-lg">
          <div
            className="block mb-2 text-sm font-medium text-gray-900"
            style={{}}
            {...getRootProps()}
          >
            <input
              className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              {...getInputProps()}
            />
            <p className="text-center font-bold mt-2 cursor-pointer">
              Drag and drop a file here or click to selet a file
            </p>
          </div>
        </div>
        
        {uploadedImage && (
          <div className="max-h-15 max-w-15 m rounded-lg border border-white shadow-md overflow-hidden">
            <ImageColorPicker
              onColorPick={handleColorPick}
              zoom={1}
              imgSrc={uploadedImage}
            />
          </div>
        )};
        {uploadedImage && (
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded "
            onClick={handleRemovePicture}
          >
            Remove Picture
          </button>
        )}
      </div>
    </>
  )
}
