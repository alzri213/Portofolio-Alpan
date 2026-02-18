"use server";

import { cookies } from "next/headers";

import { Locale, defaultLocale, locales } from "@/config";

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const COOKIE_NAME = "NEXT_LOCALE";

export const getUserLocale = async () => {
  try {
    const value = cookies().get(COOKIE_NAME)?.value;
    if (value && (locales as readonly string[]).includes(value)) {
      return value as Locale;
    }
  } catch (error) {
    // cookies() might throw during static generation
  }
  return defaultLocale;
};

export const setUserLocale = async (locale: Locale) => {
  cookies().set(COOKIE_NAME, locale);
};
