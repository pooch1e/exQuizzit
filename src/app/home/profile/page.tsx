import { getUsers } from '../../lib/utils/apiUtility/getUsers.ts';
import { ProfileSection } from '../../../components/profile/ProfileSection.tsx';
import { BackToHomeButton } from '@/components/BackToHomeButton.tsx';
import SpaceBackground from '@/components/SpaceBackground';
import { cookies } from 'next/headers';

export default async function ProfilePage() {
  console.log('inside profile section');
  const cookieJar = await cookies();
  const username: string | undefined = cookieJar.get('username')?.value;

  console.log(username, 'username');
  const user = await getUsers(username);
  console.log(user, 'should be object');

  if (user === null) {
    return <p>no profile here</p>;
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
