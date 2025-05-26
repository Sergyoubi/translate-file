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

type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

export const flattenJSON = async (
  obj: Record<string, JSONValue>,
  parentKey = "",
  flatenContent: Record<string, JSONValue> = {}
): Promise<Record<string, JSONValue>> => {
  for (const key in obj) {
    const propKey = parentKey ? `${parentKey}.${key}` : key;

    if (
      typeof obj[key] === "object" &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      await flattenJSON(
        obj[key] as Record<string, JSONValue>,
        propKey,
        flatenContent
      );
    } else {
      flatenContent[propKey] = obj[key];
    }
  }

  return flatenContent;
};

export const unFlattenJSON = (
  flatObj: Record<string, JSONValue>
): Record<string, JSONValue> => {
  const result: Record<string, JSONValue> = {};

  for (const flatKey in flatObj) {
    const keys = flatKey.split(".");
    let current: any = result;

    keys.forEach((key, index) => {
      const isLast = index === keys.length - 1;
      const keyIsNumber = !isNaN(Number(key));
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
): void => {
  try {
    options?.onStart?.();

    const flatObj: Record<string, string> = {};
    for (const { key, value } of entries) {
      flatObj[key] = value;
    }

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
