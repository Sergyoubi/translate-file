import Steps from "@/components/global/Steps";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className="w-screen h-screen bg-[#fbebeb] flex flex-col justify-center items-center gap-6">
      <h1 className="text-5xl font-extrabold text-center">
        Easily Import and View Your <br /> Translation Files
      </h1>
      <p className="text-lg font-light">
        We simplify the process of translating JSON files manipulated by i18n
        library with AI.
      </p>
      <Steps />
      <Link href="/dashboard">
        <Button className="bg-[#d93838] px-6 py-6 text-white cursor-pointer">
          Start Translating <ChevronRight />
        </Button>
      </Link>
    </div>
  );
};

export default Home;
