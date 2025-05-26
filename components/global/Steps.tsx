import React from "react";
import { Box } from "lucide-react";
import { stepsItems } from "@/constants";

const Steps = () => {
  return (
    <div className="w-full h-[25%] flex-center">
      {stepsItems.map((items) => (
        <div
          key={items.id}
          className="w-[30%] h-full flex flex-col justify-center items-center gap-3"
        >
          <Box className="size-8" />
          <h1 className="text-2xl font-bold">
            {items.stepNumber}{" "}
            <span className="text-lg font-light">{items.description}</span>
          </h1>
        </div>
      ))}
    </div>
  );
};

export default Steps;
