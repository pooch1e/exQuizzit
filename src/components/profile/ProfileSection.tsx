'use client';

import { ProfileHeader } from './ProfileHeader'
import { ProfileBody } from './ProfileBody';
import { useRouter } from 'next/navigation';
  
export const ProfileSection = ({ user }) => {
  console.log('inside profile section');
  const router = useRouter();

  function handleBackToHome () {
    router.push('/home');
  }

  return (
    <>
      <ProfileHeader user={user} />
      <ProfileBody user={user} />
      <button onClick={handleBackToHome} >Back to Home</button>
    </>
  );
};
