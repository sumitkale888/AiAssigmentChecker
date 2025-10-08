import React, { useRef, useCallback } from "react";
import Webcam from "react-webcam";

interface WebcamCaptureProps {
  onCapture: (imageData: string) => void;
}

const WebcamCapture: React.FC<WebcamCaptureProps> = ({ onCapture }) => {
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      onCapture(imageSrc); // send image to parent
    }
  }, [webcamRef, onCapture]);

  return (
    <div className="flex flex-col items-center">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="rounded-lg border"
      />
      <button
        onClick={capture}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Capture
      </button>
    </div>
  );
};

export default WebcamCapture;
