"use client";
import useFileUpload from "@/hooks/liveChat/useFileUpload";
import useSendMessage from "@/hooks/liveChat/useSendMessage";
import useTyping from "@/hooks/liveChat/useTyping";
import useVoiceRecording from "@/hooks/liveChat/useVoiceRecording";
import { useRef, useState } from "react";
import { FaImage } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import IconButton from "../libs/IconButton";
import ImagePreview from "./ImagePreview";
import Voice from "./Voice";
import VoicePreview from "./VoicePreview";

export default function ChatInput({
  ws,
  socketInfo,
  setChatHistory,
  user,
  chatHistory,
}) {
  const [inputValue, setInputValue] = useState("");
  const [image, setImage] = useState(null);
  const imageRef = useRef(null);

  const { handleSaveFile, fileUploading } = useFileUpload();
  const { handleTypingStart, resetTyping } = useTyping(ws, socketInfo, user);
  const {
    recording,
    setRecording,
    audioBlob,
    setAudioBlob,
    mediaRecorderRef,
    closeRecording,
    stopRecording,
  } = useVoiceRecording();
  const sendMessage = useSendMessage({
    ws,
    socketInfo,
    setChatHistory,
    user,
    chatHistory,
    handleSaveFile,
    resetTyping,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessage(inputValue, image, audioBlob);
    setInputValue("");
    setImage(null);
    imageRef.current.value = null;
    setAudioBlob(null);
  };

  const handleImageSelect = (e) => {
    setImage(e.target.files[0]);
  };

  const handleImageRemove = () => {
    setImage(null);
    imageRef.current.value = null;
  };

  return (
    <form className="bg-card py-1 px-2 space-y-2" onSubmit={handleSubmit}>
      {image && (
        <ImagePreview
          image={image}
          onRemove={handleImageRemove}
          isUploading={fileUploading}
        />
      )}

      {(recording || audioBlob) && (
        <VoicePreview
          audioBlob={audioBlob}
          closeRecording={closeRecording}
          stopRecording={stopRecording}
          recording={recording}
          isLoading={fileUploading}
        />
      )}

      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Type your message"
          value={inputValue}
          onChange={(e) => {
            const value = e.target.value;
            setInputValue(value);
            handleTypingStart();
          }}
          className="flex-1 px-4 py-2 text-sm rounded-full dark:text-white dark:placeholder:text-gray-300 outline-none"
        />
        <Voice
          setAudioBlob={setAudioBlob}
          recording={recording}
          setRecording={setRecording}
          mediaRecorderRef={mediaRecorderRef}
          stopRecording={stopRecording}
          isLoading={fileUploading}
        />
        <IconButton
          className="rounded-md"
          disabled={fileUploading}
          onClick={() => imageRef.current.click()}
          type="button"
        >
          <FaImage size={16} />
        </IconButton>
        <IconButton
          className="rounded-md"
          disabled={fileUploading}
          type="submit"
        >
          <IoMdSend size={18} />
        </IconButton>
      </div>

      <input
        ref={imageRef}
        onChange={handleImageSelect}
        type="file"
        name="image-file"
        hidden
        accept="image/jpeg, image/png, image/jpg"
      />
    </form>
  );
}
