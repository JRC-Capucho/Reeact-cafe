import prismaClient from "../../../prisma";
import * as argon from "argon2";
import { sign } from "jsonwebtoken";

interface UserDto {
  email: string;
  password: string;
}

class AuthUser {
  async signin({ email, password }: UserDto) {
    if (!email) throw new Error("Email is empty");

    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) throw new Error("Invalid password or email");

    const isMatch = await argon.verify(user.password, password);

    if (!isMatch) return { message: "Inalid password or email" };

    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      {
        subject: user.id.toString(),
        expiresIn: "30d",
      },
    );
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token,
    };
  }
}

export { AuthUser };
