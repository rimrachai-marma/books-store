import { eq } from "drizzle-orm";
import type { Database } from "../../config/db/database";
import { comparePassword, hashPassword } from "../../utils/password";
import { generateToken } from "../../utils/jwt";
import type { LoginData, NewUser, User } from "./auth.types";
import { users } from "../../drizzle/schema";

export class AuthService {
  constructor(private db: Database) {}

  async signup(data: NewUser) {
    const existingUser = await this.db
      .select()
      .from(users)
      .where(eq(users.email, data.email))
      .limit(1);

    if (existingUser.length > 0) {
      throw new Error("User already exists");
    }

    const hashedPassword = await hashPassword(data.password);

    const [user] = await this.db
      .insert(users)
      .values({
        name: data.name,
        email: data.email,
        hashedPassword,
      })
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
      });

    if (!user) {
      throw new Error("Failed to create user");
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
      name: user.name,
    });

    return { user, token };
  }

  async login(data: LoginData) {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.email, data.email))
      .limit(1);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValid = await comparePassword(data.password, user.hashedPassword);

    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
      name: user.name,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}
