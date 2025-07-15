import { getUsers } from "../../lib/utils/apiUtility/getUsers.ts";
import { ProfileSection } from "../../../components/profile/ProfileSection.tsx";
import { BackToHomeButton } from "@/components/BackToHomeButton.tsx";
import SpaceBackground from "@/components/SpaceBackground";
import { cookies } from "next/headers";
import { LogOutButton } from "@/components/LogOutButton.tsx";

interface ProfilePageProps {
  searchParams: Promise<{ user?: string }>;
}

export default async function ProfilePage({ searchParams }: ProfilePageProps) {
  console.log("inside profile section");

  const params = await searchParams;
  let user;

  if (params.user) {
    // Get specific user from URL params
    user = await getUsers(params.user);
  } else {
    // Get current logged-in user from cookies
    const cookieJar = await cookies();
    const username: string | undefined = cookieJar.get("username")?.value;
    console.log(username, "username");
    user = username ? await getUsers(username) : null;
    console.log(user, "should be object");
  }

  // Handle case where user is not found
  if (!user) {
    const errorMessage = params.user
      ? `User "${params.user}" not found`
      : "Login to access profile page";

    return (
      <SpaceBackground className="flex items-center justify-center p-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl thick-yellow-border p-12 max-w-4xl w-full mx-4 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Profile Not Found
          </h2>
          <p className="text-gray-600 mb-8">{errorMessage}</p>
          <div className="mt-8 flex justify-center gap-4 w-full max-w-md">
            <BackToHomeButton className="w-full px-8 py-4 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors font-semibold text-lg">
              Back to Home
            </BackToHomeButton>
            <LogOutButton className="w-full px-8 py-4 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors font-semibold text-lg" />
          </div>
        </div>
      </SpaceBackground>
    );
  }

  // pass it down in props to components that need it
  return (
    <SpaceBackground className="flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl thick-yellow-border p-12 max-w-4xl w-full mx-4 text-center">
        {/* Avatar/profile centered */}
        <div className="mb-8 flex flex-col items-center">
          <ProfileSection user={user} />
        </div>

        {/* Button centered at bottom */}
        <div className="mt-8 flex justify-center">
          <BackToHomeButton className="px-8 py-4 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors font-semibold text-lg">
            Back to Home
          </BackToHomeButton>
        </div>
      </div>
    </SpaceBackground>
  );
}
