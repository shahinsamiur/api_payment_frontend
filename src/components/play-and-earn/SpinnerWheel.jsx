"use client";
import {
  useCheckSpinQuery,
  usePlayAndEarnMutation,
} from "@/store/features/playAndEarn";
import { updateUserBalance } from "@/store/slices/user";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import LoadingIndicator from "../common/LoadingIndicator";
import Typography from "../libs/Typography";

const rewardData = [
  { option: "0.0001" },
  { option: "0.0002" },
  { option: "0.0003" },
  { option: "0.0004" },
  { option: "0.0001" },
  { option: "0.0002" },
  { option: "0.0003" },
  { option: "0.0001" },
];

const colors = [
  "#E91E63",
  "#2196F3",
  "#FF9800",
  "#00BCD4",
  "#4CAF50",
  "#9C27B0",
  "#FFC107",
  "#3F51B5",
];

export default function SpinnerWheel() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [playAndEarn, { isLoading }] = usePlayAndEarnMutation();
  const { data, isLoading: isChecking, refetch } = useCheckSpinQuery();
  const dispatch = useDispatch();

  const handleSpin = async () => {
    try {
      if (spinning) return;
      const response = await playAndEarn().unwrap();
      const targetIndex = rewardData.findIndex(
        (r) => r.option === response.reward
      );
      if (targetIndex === -1) {
        toast.error("Reward not found in wheel!");
        return;
      }

      setSpinning(true);

      const anglePerSegment = 360 / rewardData.length;
      const spins = 5; // number of full rotations
      const stopAngle =
        spins * 360 + (rewardData.length - targetIndex) * anglePerSegment;

      // Rotate the wheel
      setRotation((prev) => prev + stopAngle);

      setTimeout(() => {
        setSpinning(false);
        setResult(response.reward);
        dispatch(updateUserBalance(response.reward));
        toast.success(`Congratulations! You got ${response.reward}$`);
        refetch();
      }, 4000);
    } catch (error) {
      toast.error(error.data?.message || error.message || "Spin failed!");
    }
  };

  const segmentCount = rewardData.length;
  const anglePerSegment = 360 / segmentCount;

  const createSegmentPath = (index) => {
    const startAngle = (index * anglePerSegment - 90) * (Math.PI / 180);
    const endAngle = ((index + 1) * anglePerSegment - 90) * (Math.PI / 180);
    const radius = 160;
    const centerX = 150;
    const centerY = 150;

    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);

    const largeArcFlag = anglePerSegment > 180 ? 1 : 0;

    return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  const getTextPosition = (index) => {
    const angle =
      (index * anglePerSegment + anglePerSegment / 2 - 90) * (Math.PI / 180);
    const textRadius = 90;
    const centerX = 144;
    const centerY = 144;

    const x = centerX + textRadius * Math.cos(angle);
    const y = centerY + textRadius * Math.sin(angle);
    const rotation = index * anglePerSegment + anglePerSegment / 2;

    return { x, y, rotation };
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-72 h-72">
        {/* Pointer */}
        <div className="absolute -top-8 right-8 z-20 rotate-[30deg] translate-y-2">
          <Image
            src="/map-pointer.svg"
            alt="pointer"
            width={70}
            height={70}
            objectFit="contain"
          />
        </div>

        {/* SVG Wheel */}
        <svg
          width="288"
          height="288"
          className="rounded-full border-4 border-green-700 dark:border-white"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? "transform 4s ease-out" : "none",
          }}
        >
          {rewardData.map((seg, index) => {
            const textPos = getTextPosition(index);
            return (
              <g key={index}>
                <path
                  d={createSegmentPath(index)}
                  fill={colors[index]}
                  stroke="none"
                />
                <text
                  x={textPos.x}
                  y={textPos.y}
                  fill="white"
                  fontSize="14"
                  fontWeight="bold"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${textPos.rotation + 270} ${textPos.x} ${
                    textPos.y
                  })`}
                >
                  {seg.option}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Center Spin Button */}
        <button
          onClick={handleSpin}
          disabled={spinning || isLoading || data?.data?.id || isChecking}
          className="absolute top-1/2 left-1/2 transform -translate-x-[37%] -translate-y-[39%] m-auto size-18 rounded-full bg-primary-main text-white z-10 hover:bg-primary-dark disabled:bg-gray-500 transition-colors text-sm font-semibold"
        >
          Spin
        </button>
      </div>

      {/* Show result */}
      {result && (
        <Typography variant="h5" className="mt-4 font-medium">
          You won: {result}
        </Typography>
      )}

      {isChecking && (
        <div className="mt-4">
          <LoadingIndicator />
        </div>
      )}

      {data?.data?.id && (
        <Typography variant="h5" className="mt-4 font-medium">
          You have played this round Today wait for next day
        </Typography>
      )}
    </div>
  );
}
