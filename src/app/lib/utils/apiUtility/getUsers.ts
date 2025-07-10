import { prisma } from '../../prisma';
export const getUsers = async (user: string) => {
  try {
    const singleUser = await prisma.user.findFirst({
      where: {
        userName: user,
      },
    });
    return singleUser;
    
  } catch (err) {
    console.log(err);
    throw err;
  }
};
