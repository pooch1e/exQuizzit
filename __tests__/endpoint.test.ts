import { POST } from '../src/app/api/users/route';

describe('POST /api/users', () => {
  it('returns 201 when user is created', async () => {
    const request = new Request('http://localhost/api/users', {
      method: 'POST',
      body: JSON.stringify({
        userName: 'Test User',
        email: `test${Date.now()}@example.com`,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data).toHaveProperty('userName');
    expect(data.user).toHaveProperty('email');
    expect(data.message).toBe('User created successfully');
  });
});

describe('UPDATE: user/:userId', () => {
  test('updates userId with correct quizzbuck total', () => {
    console.log('test not working');
  });
});
