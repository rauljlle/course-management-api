import request from 'supertest';
import app from '../app';
import { UserRepository } from '../modules/login/user/UserRepository';
import { AuthService } from '../modules/login/auth/AuthService';

describe('Authentication Endpoints', () => {
  it('should authenticate a user and return a token', async () => {
    const ur = new UserRepository;
    const as = new AuthService(ur);
    await as.register(
      {email: "admin@admin.com",
      name: "admin",
      username: "admin",
      password: "admin"}
    )

    const response = await request(app)
      .post('/login')
      .send({
        email: "admin@admin.com",
        password: "admin"
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should create a user and return a token', async () => {
    const response = await request(app)
      .post('/login/register')
      .send({
        email: "test@test.com",
        name: "test",
        username: "test",
        password: "test"
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
  });

  it('should fail authentication with incorrect credentials', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        username: 'wronguser',
        password: 'wrongpassword',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Invalid email or password');
  });
});