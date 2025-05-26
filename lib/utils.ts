import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { saveAs } from "file-saver";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type TranslationEntry = {
  id: string;
  key: string;
  value: string;
};

export const flattenJSON = async (
  obj: any,
  parentKey = "",
  flatenContent: any = {}
) => {
  for (let key in obj) {
    const propKey = parentKey ? `${parentKey}.${key}` : key;

    if (
      typeof obj[key] === "object" &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      flattenJSON(obj[key], propKey, flatenContent);
    } else {
      flatenContent[propKey] = obj[key];
    }
  }

  return flatenContent;
};

export const unFlattenJSON = (flatObj: Record<string, string>) => {
  const result: Record<string, any> = {};

  for (const flatKey in flatObj) {
    const keys = flatKey.split(".");
    let current = result;

    keys.forEach((key, index) => {
      const isLast = index === keys.length - 1;
      const keyIsNumber = !isNaN(Number(key));

      // Handle numeric keys as object keys (not arrays) for i18n compatibility
      const normalizedKey = keyIsNumber ? String(key) : key;

      if (isLast) {
        current[normalizedKey] = flatObj[flatKey];
      } else {
        if (!current[normalizedKey]) current[normalizedKey] = {};
        current = current[normalizedKey];
      }
    });
  }

  return result;
};

export const exportTranslationsAsJSON = (
  entries: TranslationEntry[],
  options?: {
    onStart?: () => void;
    onFinish?: () => void;
    onError?: (error: unknown) => void;
  }
) => {
  try {
    options?.onStart?.();

    const flatObj: Record<string, string> = {};
    entries.forEach(({ key, value }) => {
      flatObj[key] = value;
    });

    const nestedObj = unFlattenJSON(flatObj);
    const jsonStr = JSON.stringify(nestedObj, null, 2);
    const blob = new Blob([jsonStr], {
      type: "application/json;charset=utf-8",
    });

    saveAs(blob, "translations.json");

    options?.onFinish?.();
  } catch (error) {
    options?.onError?.(error);
  }
};
