import { POST } from '../src/app/api/users/route';
import { PUT } from '../src/app/api/users/route';

describe('POST /api/users', () => {
  test('returns 201 when user is created', async () => {
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
    console.log(data);

    expect(response.status).toBe(201);
    expect(data).toHaveProperty('user');
    expect(data.user).toHaveProperty('email');
    expect(data.message).toBe('User Created');
  });
});

describe('PUT: /user', () => {
  test('updates user with correct quizzbuck total via username', async () => {
    const request = new Request('http://localhost/api/users', {
      method: 'PUT',
      body: JSON.stringify({
        id: 'b2c3d4e5-f6a7-8901-bcde-fa2345678901',
        data: 10,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await PUT(request);
    const data = await response.json();
    console.log(data);

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('user');
    expect(data.user).toHaveProperty('quizzBuckTotal');
    expect(data.message).toBe('User Updated');
  });
});
