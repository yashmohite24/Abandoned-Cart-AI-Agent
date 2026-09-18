import { COUNTRIES } from "./countries";

const FLAGS: Record<string, string> = {
  India: "🇮🇳",
  "United States": "🇺🇸",
  "United Kingdom": "🇬🇧",
  "United Arab Emirates": "🇦🇪",
  Singapore: "🇸🇬",
  Australia: "🇦🇺",
  Canada: "🇨🇦",
};

export function countryFlag(name: string): string {
  return FLAGS[name] ?? "🌐";
}

export function countryByDial(dialCode: string) {
  return COUNTRIES.find((c) => c.dialCode === dialCode);
}
