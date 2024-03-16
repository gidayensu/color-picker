import { FaFileUpload } from "react-icons/fa";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ImageColorPicker } from "react-image-color-picker";
import { useContext } from "react";
import { TintShadyContext } from "../../store/tint-shady-context-provider";

export default function DragAndDrop() {
  const {colorChoice, imageUploadStatus} = useContext(TintShadyContext);

  const [uploadedImage, setUpLoadedImage] = useState(null);
  const onDrop = useCallback((acceptedFile) => {
    acceptedFile.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        setUpLoadedImage(reader.result);
        imageUploadStatus(true);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ 
    accept: {
      'image/png': [],
      'image/jpeg': [],
      
  }, onDrop });

  const handleRemovePicture = () => {
    setUpLoadedImage(null);
    imageUploadStatus(false)
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="">
          <div
            style={{}}
            {...getRootProps()}
          >
            <input
              className=""
              {...getInputProps()}
            />
            {!uploadedImage && <div> 
              
              <div className="hidden mt-4 border-2 border-dashed border-slate-400 rounded-lg w-80 md:w-96 h-80 md:h-96 md:flex flex-col justify-center items-center cursor-pointer">
              <span className="flex items-center justify-center h-12 w-12 rounded-tl-lg rounded-bl-lg text-5xl"><FaFileUpload/></span>
              <p className="p-2 mt-4 font-bold">drag and drop your image file here</p>
              <p className="p-2 text-slate-400">Files supported are PNG, JPG, GIF</p>
              <p className="p-2 text-slate-600">or</p>
              <button className="border-2 border-teal-600 h-10 w-40 rounded-md text-sm text-teal-700 font-semibold hover:bg-teal-700 hover:border-teal-700 hover:text-white"> Browse files</button>
            </div>
            <div className="flex flex-row md:hidden">
              <div className="flex justify-center items-center w-52 border-2 border-teal-700  h-12 text-sm font-bold text-teal-700 text-opacity-70 rounded-l-lg">
                  <p>Upload image </p>
              </div>
              <button className="flex justify-center items-center text-2xl border-r-2 border-y-2 border-teal-700 w-12 text-teal-700 rounded-r-lg">
                <FaFileUpload/>
              </button>
            </div>
              </div>
            }
          </div>
        </div>
        
        {uploadedImage && (
          <div className="md:w-96 mt-4 w-80">
            <ImageColorPicker
              onColorPick={colorChoice}
              zoom={1}
              imgSrc={uploadedImage}
              
            />
          </div>
        )}
        {uploadedImage && (
          <button
            className="h-12 border w-40 mt-4 rounded-lg bg-teal-600 hover:bg-teal-700 text-white "
            onClick={handleRemovePicture}
          >
            Remove Picture 
          </button>
        )}
      </div>
    </>
  )
}
