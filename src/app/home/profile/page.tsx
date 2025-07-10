import { getUsers } from "../../lib/utils/apiUtility/getUsers.ts";
import { ProfileSection } from "../../../components/profile/ProfileSection.tsx";
import { BackToHomeButton } from "@/components/BackToHomeButton.tsx";
import SpaceBackground from "@/components/SpaceBackground";

export default async function ProfilePage() {
  console.log("inside profile section");
  //fetch data here with api utility
  const user = await getUsers("BobTheBrave");

  // Handle case where user is not found
  if (!user) {
    return (
      <SpaceBackground className="flex items-center justify-center p-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl thick-yellow-border p-12 max-w-4xl w-full mx-4 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">User Not Found</h2>
          <p className="text-gray-600 mb-8">The requested user could not be found.</p>
          <div className="flex justify-center">
            <BackToHomeButton className="px-8 py-4 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors font-semibold text-lg">
              Back to Home
            </BackToHomeButton>
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
