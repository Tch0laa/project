import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const defaultNS = "ns1";
export const resources = {
  en: {
    hey:'nini',
    bye:'nini',
  },
} as const;

i18n.use(initReactI18next).init({
  lng: "en",
  ns: ["ns1", "ns2"],
  defaultNS,
  resources,
});