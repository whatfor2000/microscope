'use client'
import Image from "next/image";
import SerialInput from "@/app/components/serialInput"

export default function Home() {
  const captureFrame = async () => {
    const response = await fetch('http://localhost:5000/api/capture');
    const result = await response.json();
    console.log(result);
  };
  return (
    <>
      <SerialInput />
      <img src="http://localhost:5000/video_feed" alt="video_feed"
        className="flex mx-4 my-4 outline-2 outline-amber-50 rounded-2xl"
        width={960}
        height={720}
      />
      <button onClick={captureFrame} className="flex outline-2 outline-amber-50 w-auto h-full rounded-2xl mx-4 my-4 px-2 cursor-pointer hover:bg-gray-500">Capture!</button>
    </>
  );
}
