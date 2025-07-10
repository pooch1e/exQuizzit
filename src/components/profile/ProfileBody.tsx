


export const ProfileBody = ({user}) => {

    const { userName, email, highScore, quizzBuckTotal } = user;
    
    return (
        <div className='profile-body' >
            <p>{userName}</p>
            <p>{email}</p>
            <p>High Score: {highScore}</p>
            <p>Quiz Bucks: {quizzBuckTotal}</p>
        </div>
    );
}