import { Dialog } from "@headlessui/react";
import React, { useRef, useState, useEffect } from "react";

function CaptureImage() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing webcam: ", err);
      }
    };
    getMedia();
  }, []);

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/png");
      setCapturedImage(dataUrl);
      setIsOpen(true);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onClose={() => {}} className="z-1001 relative">
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div
          className="fixed inset-0 flex items-center justify-center p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <Dialog.Panel className="max-h-[80vh] w-full max-w-3xl overflow-hidden rounded-lg bg-white p-8 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <Dialog.Title className="text-2xl font-bold text-[var(--color-grey-0)]">
                Captured Image
              </Dialog.Title>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 transition hover:text-black"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>
            {capturedImage && (
              <>
                <div>
                  <img
                    src={capturedImage}
                    alt="Captured"
                    className="rounded shadow mt-2"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="mt-4 w-full rounded-md bg-[var(--color-grey-0)] px-4 py-3 text-lg font-semibold text-white"
                  >
                    Capture New Image
                  </button>
                  <button className="mt-4 w-full rounded-md bg-[var(--color-grey-0)] px-4 py-3 text-lg font-semibold text-white">
                    Recommend songs/playlists
                  </button>
                </div>
              </>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
      <div className="border-2 border-dashed border-white rounded-lg p-4 space-y-4 bg-black">
        <h2 className="text-white text-lg font-semibold">Capture Image</h2>

        <video ref={videoRef} autoPlay className="rounded shadow w-full" />

        <button
          onClick={handleCapture}
          className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
        >
          Capture
        </button>

        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
    </>
  );
}

export default CaptureImage;
