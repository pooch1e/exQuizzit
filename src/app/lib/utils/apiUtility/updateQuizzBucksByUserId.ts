export const updateQuizzBucksByUserId = async (id: string, data: number) => {
  try {
    const request = new Request(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/api/users`,
      {
        method: 'PUT',
        body: JSON.stringify({
          id,
          data,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const response = await fetch(request);
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
    console.log('no quizzbucks updated');
  }
};
