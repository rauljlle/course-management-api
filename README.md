# Course Management API

## Overview

The Course Management API is a backend application built using Node.js, TypeScript, Express.js, and MongoDB. It allows authenticated users to manage courses by providing endpoints to create, read, update, and delete course records. The application follows SOLID principles, ensuring scalability and maintainability.

---

## Features

- **Authentication**: Uses JWT-based authentication for secure access.
- **Course Management**:
  - Create courses.
  - Retrieve all courses with optional filters.
  - Retrieve a single course by ID.
  - Update course details.
  - Delete courses.
- **SOLID Design Principles**: Structured with a clean architecture to promote maintainability.
- **Unit Testing**: Uses Jest for unit tests.
- **In-Memory Database**: Can run with an in-memory MongoDB instance for testing or lightweight use.
- **Dockerized**: Includes `Dockerfile` and `docker-compose.yml` for easy containerization and deployment.

---

## Requirements

- Node.js (>= 16.x)
- npm or yarn
- MongoDB instance
- Docker (optional, for containerization)

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rauljlle/course-management-api.git
   cd course-management-api
   ```

2. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

   ```env
   PORT=3000
   JWT_SECRET=your_jwt_secret
   ```

   There's an .env-example in the project folder if you need a reference

3. With docker installed, run:

   ```bash
   docker compose up -d --build
   ```

4. Your app will be running on the port you specified

---

## API Endpoints

### Authentication

#### Login

- **POST** `/login`
- **Request Body**:
  ```json
  {
    "email": "your_email",
    "password": "your_password"
  }
  ```
- **Response**:
  ```json
  {
    "token": "jwt_token"
  }
  ```
- **OBS**:
  There is an user already created, and those are its credentials:
  ```json
  {
    "email": "admin@admin.com",
    "name": "admin",
    "username": "admin",
    "password": "admin"
  }
  ```

#### Logon

- **POST** `/login/register`
- **Request Body**:
  ```json
  {
    "email": "your_email",
    "name": "your_name",
    "username": "your_username",
    "password": "your_password"
  }
  ```
- **Response**:
  ```json
  {
    "token": "jwt_token"
  }
  ```

### Courses (Protected Routes)

#### Create a Course

- **POST** `/courses`
- **Headers**:
  ```
  Authorization: Bearer <jwt_token>
  ```
- **Request Body**:
  ```json
  {
    "title": "Course Title",
    "description": "Course Description",
    "duration": 10,
    "instructor": "Instructor Name"
  }
  ```

#### Get All Courses

- **GET** `/courses`
- **Headers**:
  ```
  Authorization: Bearer <jwt_token>
  ```
- **Query Parameters** (optional):
  - `title` (filter by title)
  - `instructor` (filter by instructor)

#### Get a Course by ID

- **GET** `/courses/:id`
- **Headers**:
  ```
  Authorization: Bearer <jwt_token>
  ```

#### Update a Course

- **PUT** `/courses/:id`
- **Headers**:
  ```
  Authorization: Bearer <jwt_token>
  ```
- **Request Body**:
  ```json
  {
    "title": "Updated Title",
    "description": "Updated Description",
    "duration": 12,
    "instructor": "Updated Instructor"
  }
  ```

#### Delete a Course

- **DELETE** `/courses/:id`
- **Headers**:
  ```
  Authorization: Bearer <jwt_token>
  ```

---

## Running Tests

Run unit tests using Jest:

```bash
npm run test
```
