import { cookies } from 'next/headers';
import { getUsers } from './apiUtility/getUsers';

export async function getCurrentUser() {
  try {
    // Get the username from cookies
    const cookieStore = await cookies();
    const username = cookieStore.get('username')?.value;
    
    console.log('getCurrentUser - username from cookies:', username);
    
    if (!username) {
      console.log('getCurrentUser - no username in cookies');
      return null;
    }
    
    // Get the full user data using the username
    const user = await getUsers(username);
    console.log('getCurrentUser - user data:', user);
    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}