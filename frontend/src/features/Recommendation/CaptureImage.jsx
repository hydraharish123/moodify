import { Dialog } from "@headlessui/react";
import { useRef, useState, useEffect } from "react";
import Spinner from "../../ui/Spinner";
import TrackTable from "./TrackTable";
import { useSearchParams } from "react-router-dom";

function CaptureImage() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [emotion, setEmotion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const songsView = searchParams.get("songs") === "true";

    if (songsView && !emotion) {
      // Optional: You can fetch saved emotion from localStorage or skip capture
      // For now, just prevent webcam access
      return;
    }

    if (capturedImage === null && !songsView) {
      const getMedia = async () => {
        try {
          searchParams.delete("page");
          searchParams.set("songs", false);
          setSearchParams(searchParams);

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
    }
  }, [capturedImage, emotion, searchParams, setSearchParams]);

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

  async function handleUploadImage() {
    try {
      setIsLoading(true);
      const res = await fetch("http://127.0.0.1:5000/api/detect-emotion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: capturedImage }),
      });

      if (!res.ok) throw new Error("Failed to detect emotion");

      const data = await res.json();
      console.log(data);
      setEmotion(data);
      searchParams.set("songs", true);
      setSearchParams(searchParams);
    } catch (err) {
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) return <Spinner />;

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
                onClick={() => {
                  setCapturedImage(null);
                  setIsOpen(false);
                }}
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
                    onClick={() => {
                      setCapturedImage(null);
                      setIsOpen(false);
                    }}
                    className="mt-4 w-full rounded-md bg-[var(--color-grey-0)] px-4 py-3 text-lg font-semibold text-white"
                  >
                    Capture New Image
                  </button>
                  <button
                    onClick={() => {
                      handleUploadImage();
                      setIsOpen(false);
                    }}
                    className="mt-4 w-full rounded-md bg-[var(--color-grey-0)] px-4 py-3 text-lg font-semibold text-white"
                  >
                    Recommend songs/playlists
                  </button>
                </div>
              </>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
      {!capturedImage && (
        <div className="border-2 border-dashed border-white rounded-lg p-4 space-y-4 bg-black">
          <h2 className="text-white text-lg font-semibold">Capture Image</h2>

          <video
            ref={videoRef}
            autoPlay
            className="rounded shadow w-full transform-none"
          />

          <button
            onClick={handleCapture}
            className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
          >
            Capture
          </button>

          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>
      )}

      {searchParams.get("songs") === "true" && emotion && (
        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl text-white font-bold">
              Mood - {emotion?.dominant_emotion}
            </h1>

            <button
              onClick={() => {
                setCapturedImage(null);
                setEmotion(null);
                searchParams.set("songs", false);
                setSearchParams(searchParams);
              }}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Capture Image Again
            </button>
          </div>

          <div>
            <TrackTable emotion={emotion} />
          </div>
        </div>
      )}
    </>
  );
}

export default CaptureImage;
