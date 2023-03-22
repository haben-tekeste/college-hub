import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export class PasswordManager {
  public static async hashPassword(password: string) {
    const salt = randomBytes(8).toString("hex");
    const buffer = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${buffer.toString("hex")}.${salt}`;
  }
  public static async comparePassword(
    suppliedPassword: string,
    plainPassword: string
  ) {
    // buffer == hashedPassword
    const [buffer, salt] = suppliedPassword.split(".");
    const passwordToCompare = (await scryptAsync(plainPassword, salt, 64)) as Buffer;
    return buffer == passwordToCompare.toString('hex');
  }
}