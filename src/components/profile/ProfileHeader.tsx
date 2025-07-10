'use client'
import Image  from 'next/image'

export const ProfileHeader = ({user}) => {
    // save profile image in useState
    

    return (
        <>
            <Image
                src={user.avatar.replace('/svg?', '/png?')}
                alt='Avatar image'
                width={100}
                height={100}
                className={'rounded-full'}
            />
        </>
    )
}