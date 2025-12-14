import { FaMicrophone } from "react-icons/fa";
import { MdRecordVoiceOver } from "react-icons/md";
import IconButton from "../libs/IconButton";

const Voice = ({
  setAudioBlob,
  recording,
  setRecording,
  mediaRecorderRef,
  stopRecording,
  isLoading,
}) => {
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      let chunks = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        setAudioBlob(blob);
        // Release the microphone to stop the browser audio icon
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <IconButton
        disabled={isLoading}
        type="button"
        className="rounded-md"
        onClick={recording ? stopRecording : startRecording}
        title={recording ? "Stop Recording" : "Start Recording"}
      >
        {recording ? (
          <MdRecordVoiceOver className="animate-pulse" size={16} />
        ) : (
          <FaMicrophone size={16} />
        )}
      </IconButton>
    </div>
  );
};

export default Voice;
