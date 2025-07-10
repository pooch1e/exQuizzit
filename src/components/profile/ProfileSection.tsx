"use client";

import { ProfileHeader } from "./ProfileHeader";
import { ProfileBody } from "./ProfileBody";



export const ProfileSection = ({ user }) => {
  console.log("inside profile section");

  return (
    <div>
      <ProfileHeader user={user} />
      
      <ProfileBody user={user} />
      
    </div>
  );
};
