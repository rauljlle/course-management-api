import request from 'supertest';
import app from '../app';
import CourseModel from '../modules/courses/CourseModel';

describe('Course Management Endpoints', () => {
  let token: string;

  beforeAll(async () => {
    const authResponse = await request(app)
      .post('/login/register')
      .send({
        email: "test@test.com",
        name: "test",
        username: "test",
        password: "test"
      });
    token = authResponse.body.token;
  });

  it('should create a course', async () => {
    const response = await request(app)
      .post('/courses')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Course',
        description: 'Test Description',
        duration: 10,
        instructor: 'Test Instructor',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
  });

  it('should fetch all courses', async () => {
    const response = await request(app)
      .get('/courses')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should fetch a course by ID', async () => {
    const newCourse = await CourseModel.create({
      title: 'Test Course',
      description: 'Test Description',
      duration: 10,
      instructor: 'Test Instructor',
    });

    const response = await request(app)
      .get(`/courses/${newCourse._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('title', 'Test Course');
  });

  it('should update a course by ID', async () => {
    const newCourse = await CourseModel.create({
      title: 'Test Course',
      description: 'Test Description',
      duration: 10,
      instructor: 'Test Instructor',
    });

    const response = await request(app)
      .put(`/courses/${newCourse._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated Course Title',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('title', 'Updated Course Title');
  });

  it('should delete a course by ID', async () => {
    const newCourse = await CourseModel.create({
      title: 'Test Course',
      description: 'Test Description',
      duration: 10,
      instructor: 'Test Instructor',
    });

    const response = await request(app)
      .delete(`/courses/${newCourse._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
