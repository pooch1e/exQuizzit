import { getUsers } from "../../lib/utils/apiUtility/getUsers.ts";
import { ProfileSection } from "../../../components/profile/ProfileSection.tsx";

import { BackToHomeButton } from "@/components/BackToHomeButton.tsx";

export default async function ProfilePage() {
  console.log("inside profile section");
  //fetch data here with api utility
  const user = await getUsers("BobTheBrave");

  // pass it down in props to components that need it
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center bg-white p-8 rounded-xl shadow-lg border border-gray-200 max-w-3xl w-full mx-4">
          {/* Avatar/profile centered at top */}
          <div className="mb-8">
            <ProfileSection user={user} />
          </div>

          {/* Button pushed to bottom */}
          <div className="mt-4 px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition">
            <BackToHomeButton>Back to Home</BackToHomeButton>
          </div>
        </div>
      </div>
    </>
  );
}
