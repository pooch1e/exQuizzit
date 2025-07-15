import { prisma } from "../prisma";

// For now, this returns a default user, but this could be enhanced to:
// 1. Get user from session/cookies
// 2. Get user from authentication provider
// 3. Get user from JWT token, etc.

export async function getCurrentUser() {
  try {
    // This is a placeholder - in a real app you'd get this from authentication
    const currentUserName = "test-user";

    const user = await prisma.user.findFirst({
      where: {
        userName: currentUserName,
      },
    });

    return user;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

// Alternative: Get user by ID
export async function getUserById(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        userId: userId,
      },
    });

    return user;
  } catch (error) {
    console.error("Error getting user by ID:", error);
    return null;
  }
}
