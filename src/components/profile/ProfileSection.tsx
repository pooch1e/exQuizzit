'use client';

import {ProfileHeader} from './ProfileHeader'
  
export const ProfileSection = ({ user }) => {
  console.log('inside profile section');
  return (
    <>
      <ProfileHeader user={user} />
      <h4>ProfileDetails inside this will be data </h4>
      <h5>Button </h5>
    </>
  );
};
