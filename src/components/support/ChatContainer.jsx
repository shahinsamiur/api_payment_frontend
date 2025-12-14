"use client";
import Image from "next/image";
import Animation from "../libs/Animation";
import ChatService from "./ChatService";

function ChatContainer({ showChat, setShowChat }) {
  return (
    <div className="container mx-auto px-5 lg:px-0 relative z-90">
      <Animation
        inViewClass="opacity-100 -translate-x-0"
        outViewClass="opacity-0 -translate-x-10"
      >
        <Image
          height={600}
          width={500}
          src="/icon/support247.svg"
          alt="support-image"
          className="h-[600px] w-[400px]"
        />
      </Animation>
      <ChatService showChat={showChat} setShowChat={setShowChat} />
    </div>
  );
}

export default ChatContainer;
