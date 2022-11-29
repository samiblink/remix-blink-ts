import bcrypt from 'bcryptjs'
import { prisma } from './prisma.server'
import type { RegisterForm } from './types.server'
import type { Profile } from "@prisma/client"

export const createUser = async (user: RegisterForm) => {
  const passwordHash = await bcrypt.hash(user.password, 10)
  const newUser = await prisma.user.create({
    data: {
      email: user.email,
      password: passwordHash,
      profile: {
        firstName: user.firstName,
        lastName: user.lastName,
      },
    },
  })
  return { id: newUser.id, email: user.email }
}
// querys from database from user collection all users EXCEPT current user
export const getOtherUsers = async (userId: string) => {
    return prisma.user.findMany({
      where: {
        id: { not: userId },
    },
      orderBy: {
        profile: {
          firstName: "asc",
        },
      },
  })
}
// queries from the database a single unique user by given Id
export const getUserById = async (userId: string) => {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  })
}
export const updateUser = async (userId: string, profile: Partial<Profile>) => {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      profile: {
        update: profile,
      },
    },
  });
};