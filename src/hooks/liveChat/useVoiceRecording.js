import { useRef, useState } from "react";

export default function useVoiceRecording() {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);

  const closeRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      setAudioBlob(null);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  return {
    recording,
    setRecording,
    audioBlob,
    setAudioBlob,
    mediaRecorderRef,
    closeRecording,
    stopRecording,
  };
}
