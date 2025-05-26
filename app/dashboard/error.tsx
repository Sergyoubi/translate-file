"use client";
import React from "react";

const error = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-2">
      <p className="text-5xl text-center font-medium text-red-400">Sorry!</p>
      <p className="text-3xl text-center font-medium text-neutral-700">
        The File you are trying to access <br /> does not exist.
      </p>
    </div>
  );
};

export default error;
