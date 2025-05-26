"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, LoaderCircle } from "lucide-react";
import {
  deleteTranslation,
  translateToEnglish,
  translateToFrench,
  translateToSpanish,
  updateTranslation,
} from "@/actions/files";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Action = ({ id, value }: { id: string; value: string }) => {
  const [text, setText] = useState<string>("");
  const [isUpdateLoading, setIsUpdateLoading] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  const handleClickOnSaveButton = async () => {
    try {
      setIsUpdateLoading(true);
      const response = await updateTranslation(id, text);

      if (response?.status === 200) {
        setIsUpdateLoading(false);
        setText("");
      }
    } catch (error) {
      setIsUpdateLoading(false);
      console.log(
        `Error from Action.tsx/handleTranslationUpdate()! Error: ${error}`
      );
    }
  };

  const handleClickOnDeleteButton = async () => {
    try {
      setIsDeleteLoading(true);

      const response = await deleteTranslation(id);
      if (response?.status === 200) {
        setIsDeleteLoading(false);
      }
    } catch (error) {
      setIsDeleteLoading(false);
      console.log(
        `Error from Action.tsx/handleClickOnDeleteButton()! Error: ${error}`
      );
    }
  };

  const handleClickOnUSA = async () => {
    try {
      setIsUpdateLoading(true);
      const response = await translateToEnglish(value);
      const translatedValue = response?.translatedText as string;

      if (response?.status === 200) {
        const updatedValue = await updateTranslation(id, translatedValue);
        if (updatedValue?.status === 200) {
          setIsUpdateLoading(false);
        }
      }
    } catch (error) {
      setIsUpdateLoading(false);
      console.log(`Error from Action.tsx/handleClickOnUSA()! Error: ${error}`);
    }
  };

  const handleClickOnFrench = async () => {
    try {
      setIsUpdateLoading(true);
      const response = await translateToFrench(value);
      const translatedValue = response?.translatedText as string;

      if (response?.status === 200) {
        const updatedValue = await updateTranslation(id, translatedValue);
        if (updatedValue?.status === 200) {
          setIsUpdateLoading(false);
        }
      }
    } catch (error) {
      setIsUpdateLoading(false);
      console.log(`Error from Action.tsx/handleClickOnUSA()! Error: ${error}`);
    }
  };

  const handleClickOnSpain = async () => {
    try {
      setIsUpdateLoading(true);
      const response = await translateToSpanish(value);
      const translatedValue = response?.translatedText as string;

      if (response?.status === 200) {
        const updatedValue = await updateTranslation(id, translatedValue);
        if (updatedValue?.status === 200) {
          setIsUpdateLoading(false);
        }
      }
    } catch (error) {
      setIsUpdateLoading(false);
      console.log(`Error from Action.tsx/handleClickOnUSA()! Error: ${error}`);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <div className="w-[25rem] h-56 flex flex-col justify-center items-start gap-2">
          <p className="text-base font-bold ml-3 mt-4">Edit Translation</p>
          <div className="w-full h-56 flex-center gap-2">
            <section className="w-[60%] h-full flex flex-col justify-center items-start gap-3">
              <p className="text-sm font-medium text-slate-700 ml-3">
                Translation
              </p>
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={value}
                className="w-full rounded-none"
              />
            </section>
            <section className="w-[40%] h-full flex flex-col justify-center items-start gap-3">
              <p className="text-sm font-medium text-slate-700">
                Translate with AI
              </p>
              <div className="flex gap-3">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <img
                        src="/flags-img/usa.png"
                        alt="flag-img"
                        onClick={handleClickOnUSA}
                        className="size-8 hover:border border-slate-200 rounded-sm cursor-pointer"
                      />
                    </TooltipTrigger>
                    <TooltipContent className="bg-violet-600">
                      <p>Click to Translate</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <img
                        src="/flags-img/france.png"
                        alt="flag-img"
                        onClick={handleClickOnFrench}
                        className="size-8 hover:border border-slate-200 rounded-sm cursor-pointer"
                      />
                    </TooltipTrigger>
                    <TooltipContent className="bg-violet-600">
                      <p>Click to Translate with AI</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <img
                        src="/flags-img/esp.png"
                        alt="flag-img"
                        onClick={handleClickOnSpain}
                        className="size-8 hover:border border-slate-200 rounded-sm cursor-pointer"
                      />
                    </TooltipTrigger>
                    <TooltipContent className="bg-violet-600">
                      <p>Click to Translate with AI</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </section>
          </div>
          <Button
            className="w-full cursor-pointer"
            onClick={handleClickOnSaveButton}
            disabled={!text || isUpdateLoading}
          >
            {isUpdateLoading ? (
              <LoaderCircle className="size-6 animate-spin" />
            ) : (
              "Save"
            )}
          </Button>
          <Button
            variant="ghost"
            className="w-full border border-red-300 hover:bg-red-100 text-rose-400 cursor-pointer"
            disabled={isDeleteLoading || isUpdateLoading}
            onClick={handleClickOnDeleteButton}
          >
            {isDeleteLoading ? (
              <LoaderCircle className="size-6 animate-spin" />
            ) : (
              "Delete Key & Value"
            )}
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Action;
