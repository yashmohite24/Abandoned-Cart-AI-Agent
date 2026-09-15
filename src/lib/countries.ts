export type CountryOption = {
  name: string;
  dialCode: string;
};

export const COUNTRIES: CountryOption[] = [
  { name: "India", dialCode: "+91" },
  { name: "United States", dialCode: "+1" },
  { name: "United Kingdom", dialCode: "+44" },
  { name: "United Arab Emirates", dialCode: "+971" },
  { name: "Singapore", dialCode: "+65" },
  { name: "Australia", dialCode: "+61" },
  { name: "Canada", dialCode: "+1" },
];

export const DEFAULT_COUNTRY_DIAL = "+91";
