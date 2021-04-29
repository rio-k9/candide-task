import { fakeServer } from "./fake-server-api";
import { passwordStrength } from "./password-strength";

export default async function validateInput(id: string, value: string): Promise<boolean | string> {
  if (id === "username") return usernameIsValid(value)
  else if (id === "password") return passwordIsValid(value)
  else if (id === "telephone") return telephoneIsValid(value)
  return false
}

export async function usernameIsValid(username: string): Promise<boolean | string> {
  const notValid = await fakeServer.isUsernameAvailable(username)
  if (notValid) return "Username is taken, try another."
  return username.trim().length > 4 || "Please enter a username more than 5 letters.";
}

export function passwordIsValid(password: string): boolean | string {
  // return password.length > 5 || "Please enter a strong password, use more letters.";
  const strength = passwordStrength(password)
  return strength > 15 || `Password strength should be 16 or more (${strength}).`;
}

export function telephoneIsValid(telephone: string): boolean | string {
  return telephone.trim().length > 5 && !isNaN(parseInt(telephone)) || "Please enter a valid phone number.";
}
