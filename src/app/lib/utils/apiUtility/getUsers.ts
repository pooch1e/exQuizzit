import { prisma } from '../../prisma.ts';
export const getUsers = async (user: string) => {
  try {
    const singleUser = await prisma.user.findFirst({
      where: {
        userName: user,
      },
    });
    // console.log(singleUser);
    return singleUser;
  } catch (err) {
    console.log(err);
    throw err;
  }
};


