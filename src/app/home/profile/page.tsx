import { getUsers } from '../../lib/utils/apiUtility/getUsers.ts';
import { ProfileSection } from '../../../components/profile/ProfileSection.tsx';

export default async function ProfilePage() {
  console.log('inside profile section');
  //fetch data here with api utility
  const user = await getUsers('BobTheBrave');

  // pass it down in props to components that need it
  return (
    <>
      <div>
        <h2>here is our profile page</h2>
        <ProfileSection user={user} />
        {/* <HomeButton /> */}
      </div>
    </>
  );
}
