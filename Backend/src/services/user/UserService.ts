import * as argon from "argon2";
import prismaClient from "./../../prisma";

interface UserDto {
  name: string;
  email: string;
  password: string;
}

class UserService {
  async create({ name, email, password }: UserDto) {
    if (!email) throw new Error("Email Incorrect");

    const emailExists = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (emailExists) throw new Error("Account Already Exists");

    const pass = await argon.hash(password);

    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: pass,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return user;
  }

  async detailUser(id: number) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: id,
      },
      select: {
        name: true,
        email: true,
      },
    });
    return user;
  }
}

export { UserService };
