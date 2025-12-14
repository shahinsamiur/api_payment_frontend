"use client";

import Animation from "@/components/libs/Animation";
import Button from "@/components/libs/Button";
import Card from "@/components/libs/Card";
import Typography from "@/components/libs/Typography";
import ChatContainer from "@/components/support/ChatContainer";
import { useGetGeneralDataQuery } from "@/store/features/generalData";
import Link from "next/link";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { IoCallSharp } from "react-icons/io5";
import { PiTelegramLogoBold } from "react-icons/pi";

function LiveSupport() {
  const { data: generalData } = useGetGeneralDataQuery();
  const [showChat, setShowChat] = useState(false);

  const supportNumbers = [
    {
      id: 1,
      name: "Phone",
      number: generalData?.site_phone?.cell,
      text: "Direct Phone Support",
      Icon: IoCallSharp,
      btnText: "Call Now",
      link: `tel:${generalData?.site_phone?.cell}`,
    },
    {
      id: 2,
      name: "telegram",
      number: generalData?.site_phone?.telegram,
      text: "Message on Telegram",
      Icon: PiTelegramLogoBold,
      btnText: "Open Telegram",
      link: `https://t.me/${generalData?.site_phone?.telegram}`,
    },
    {
      id: 3,
      name: "whatsapp",
      number: generalData?.site_phone?.whatsapp,
      text: "Message on Whatsapp",
      Icon: FaWhatsapp,
      btnText: "Chat on Whatsapp",
      link: `https://wa.me/${generalData?.site_phone?.whatsapp}`,
    },
  ];

  return (
    <div>
      <div className="h-[400px] md:h-[500px] xl:h-[600px] w-full bg-[url('/support-image.png')] bg-center bg-cover bg-no-repeat relative">
        <div className="absolute inset-0 bg-[#6E6D6D80] flex flex-col justify-center">
          <div className="px-4 flex flex-col justify-center items-center space-y-2 text-center max-w-3xl mx-auto py-10">
            <Animation
              inViewClass="opacity-100 -translate-x-0"
              outViewClass="opacity-0 -translate-x-10"
            >
              <Typography variant="h1" color="white">
                {generalData?.site_name} Support Centre
              </Typography>
            </Animation>
            <Animation
              inViewClass="opacity-100 -translate-x-0"
              outViewClass="opacity-0 -translate-x-10"
            >
              <Typography variant="body2" color="white">
                We know that questions can come up at any time, and we’re always
                here to help. Whether you need technical guidance, account
                assistance, or just a quick answer, our support team is
                dedicated to ensuring your experience with WorkDear is smooth
                and worry-free.
              </Typography>
              <Typography variant="body2" align="center" color="white">
                📧 Email us at: {generalData?.site_email}
              </Typography>
            </Animation>

            <Animation
              inViewClass="opacity-100 translate-y-0"
              outViewClass="opacity-0 translate-y-10"
            >
              <Button onClick={() => setShowChat(true)}>
                24/7 Live Support
              </Button>
            </Animation>
          </div>
        </div>
      </div>

      {/* Support cards */}
      <div className="flex flex-wrap gap-5 container mx-auto px-5">
        {supportNumbers.map((item, index) => (
          <Animation
            inViewClass="opacity-100 translate-y-0"
            outViewClass="opacity-0 translate-y-10"
            animationDelay={index * 1}
            key={item.id}
            className="grow"
          >
            <Card className="lg:-mt-10 z-30 hover:-translate-y-2 transition-all duration-300 cursor-pointer grow">
              <div className="flex flex-col gap-2 items-center justify-center dark:text-white">
                <div className="bg-primary-dark text-white rounded-full p-4">
                  <item.Icon className="size-8 md:size-10" />
                </div>
                <button className="hover:text-primary-main font-semibold">
                  {item.number}
                </button>
                <Typography
                  variant="body2"
                  color="primary"
                  className="font-medium"
                >
                  {item.text}
                </Typography>
                <Link href={item.link} target="_blank">
                  <Button className="mt-2">
                    <item.Icon /> {item.btnText}
                  </Button>
                </Link>
              </div>
            </Card>
          </Animation>
        ))}
      </div>

      <ChatContainer setShowChat={setShowChat} showChat={showChat} />
    </div>
  );
}

export default LiveSupport;
