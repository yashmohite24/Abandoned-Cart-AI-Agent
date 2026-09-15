import { DEFAULT_COUNTRY_DIAL } from "./countries";

export function toE164(dialCode: string, localNumber: string): string {
  const digits = localNumber.replace(/\D/g, "");
  const code = dialCode.replace(/\D/g, "");
  return `+${code}${digits}`;
}

export function validatePhone(dialCode: string, localNumber: string): string | null {
  const digits = localNumber.replace(/\D/g, "");
  if (!digits) {
    return "Please enter your phone number.";
  }

  if (dialCode === DEFAULT_COUNTRY_DIAL) {
    if (!/^\d{10}$/.test(digits)) {
      return "Enter a valid 10-digit Indian mobile number.";
    }
    if (!/^[6-9]/.test(digits)) {
      return "Indian mobile numbers must start with 6, 7, 8, or 9.";
    }
    return null;
  }

  if (digits.length < 6 || digits.length > 14) {
    return "Enter a valid phone number for the selected country.";
  }

  return null;
}
