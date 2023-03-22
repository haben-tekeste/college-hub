import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export class HashManagger {
  public static async hashData(data: string) {
    const salt = randomBytes(8).toString("hex");
    const buffer = (await scryptAsync(data, salt, 64)) as Buffer;
    return `${buffer.toString("hex")}.${salt}`;
  }
  public static async compareHash(
    suppliedData: string,
    plainData: string
  ) {
    // buffer == hashedPassword
    const [buffer, salt] = suppliedData.split(".");
    const passwordToCompare = (await scryptAsync(plainData, salt, 64)) as Buffer;
    return buffer == passwordToCompare.toString('hex');
  }
}