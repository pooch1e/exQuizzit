import { getUsers } from '../../app/lib/utils/apiUtility/getUsers.ts';
export const ProfileSection = async () => {
  console.log('inside profile section');
  //fetch data here with api utility
  const user = await getUsers('BobTheBrave');
  // pass it down in props to components that need it
  console.log(user, 'users in server');
  return (
    <>
      <h3>ProfileHeader - inside this will be avatar </h3>
      <h4>ProfileDetails inside this will be data </h4>
      <h5>Button </h5>
    </>
  );
};
