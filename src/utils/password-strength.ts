/**
 * Write this algorithm:
 *
 * strength = password_length_capped_at_5 + unique_characters_in_password
 *
 * See unit tests for examples
 */
export function passwordStrength(password: string): number {
  const passArr = password.split("")
  const uniqueStrength = new Set(passArr).size;
  const lengthStrength = passArr.length >= 5 ? 5 : passArr.length
  const strength = uniqueStrength + lengthStrength
  return strength;
}
