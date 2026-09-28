export const serviceOptions = ["Air Duct Cleaning", "Dryer Vent Cleaning", "Chimney Cleaning"] as const;
export type ContactFields = Record<"fullName" | "phone" | "email" | "zip" | "service" | "message", string>;

export function validateContact(input: unknown): { success: true; data: ContactFields } | { success: false; error: string } {
  if (!input || typeof input !== "object" || Array.isArray(input)) return { success: false, error: "Please provide valid form details." };
  const value = input as Record<string, unknown>;
  const data = {} as ContactFields;
  for (const key of ["fullName", "phone", "email", "zip", "service", "message"] as const) {
    if (key === "message" && value[key] === undefined) data[key] = "";
    else if (typeof value[key] !== "string") return { success: false, error: "Please fill in all required fields." };
    else data[key] = value[key].trim();
  }
  let error = "";
  if (data.fullName.length < 2 || data.fullName.length > 100 || /[\r\n]/.test(data.fullName)) error = "Enter a name between 2 and 100 characters.";
  else if (!/^[+0-9().\s-]{7,20}$/.test(data.phone) || !/^\d{7,15}$/.test(data.phone.replace(/\D/g, ""))) error = "Enter a valid phone number with 7 to 15 digits.";
  else if (data.email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(data.email)) error = "Enter a valid email address.";
  else if (!/^\d{5}(-\d{4})?$/.test(data.zip)) error = "Enter a valid ZIP code (12345 or 12345-6789).";
  else if (!serviceOptions.some((service) => service === data.service)) error = "Please select a service.";
  else if (data.message.length > 1000) error = "Keep your message within 1,000 characters.";
  return error ? { success: false, error } : { success: true, data };
}
