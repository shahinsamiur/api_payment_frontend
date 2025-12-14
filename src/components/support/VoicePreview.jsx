import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import AudioPreview from "./AudioPreview";

const VoicePreview = ({
  closeRecording,
  stopRecording,
  recording,
  duration = 60,
  audioBlob,
  isLoading,
}) => {
  const [audioDuration, setAudioDuration] = useState(0);

  useEffect(() => {
    if (!recording) return;

    const interval = setInterval(() => {
      setAudioDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [recording]);

  useEffect(() => {
    if (audioDuration >= duration && recording) {
      stopRecording();
    }
  }, [audioDuration, recording, stopRecording]);

  // Calculate progress (0% -> 100%)
  const progress = (audioDuration / duration) * 100;

  return (
    <div className="flex flex-col items-center justify-center w-full relative pt-7 p-3 bg-primary-darker rounded-lg shadow-lg">
      {recording && (
        <>
          {/* Progress bar */}
          <div className="w-full bg-primary-main h-2 rounded-full overflow-hidden mb-1">
            <div
              className="bg-primary-light h-2 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Timer */}
          <span className="text-white text-sm font-medium">
            {audioDuration}s/1m
          </span>
        </>
      )}

      {/* preview the audio professinally */}
      {!recording && audioBlob && (
        <AudioPreview audioBlob={audioBlob} isLoading={isLoading} />
      )}

      {/* Close button */}
      <button
        disabled={isLoading}
        type="button"
        onClick={closeRecording}
        className="absolute top-1 right-1 text-white hover:text-red-400"
      >
        <IoClose size={20} />
      </button>
    </div>
  );
};

export default VoicePreview;
