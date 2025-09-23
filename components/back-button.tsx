'use client'
import { useRouter } from "next/navigation";
import { ArrowBack } from "./task-svgs";

export const BackButton = () => {
  const navigation = useRouter();
  return (
    <button
      onClick={() => navigation.back()}
      className="flex text-white/70 text-xs items-center cursor-pointer transition duration-200"
    >
      <ArrowBack />
      Back
    </button>
  );
};
