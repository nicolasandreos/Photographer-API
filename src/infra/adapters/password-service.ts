import { IPasswordService } from "../../application/ports/password-service";
import bcrypt from "bcrypt";

export class PasswordService implements IPasswordService {
    async hash(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    async compare(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }
}