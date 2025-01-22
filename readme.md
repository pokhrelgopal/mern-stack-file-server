# MERN Auth Boilerplate

This is a boilerplate built with **Next.js** (client-side) and **Node.js with Express and Prisma** (server-side). It includes reusable UI components, complete authentication functionality, and a full-fledged backend setup with features like **login**, **registration**, **password reset**, and **forgot password**. This boilerplate can serve as the foundation for building scalable and maintainable modern **MERN** stack applications.

## Features

### Client-Side (Next.js):

- Various Reusable UI components from buttons to alert dialogs, modals, etc
- Seamless integration with the backend via API calls
- Authentication features: Login, Register, Forgot Password, Reset Password

### Server-Side (Node.js + Express + Prisma):

- Fully-featured REST API
- Authentication with JWT (JSON Web Tokens)
- User management: Login, Register, Forgot Password, Reset Password
- Prisma ORM for database interaction

---

## Technologies Used

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS (for styling)
- **Backend**: Node.js, Express, TypeScript, Prisma, JWT (for authentication)
- **Database**: PostgreSQL

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20 has been used here)
- **npm**, **yarn**, **pnpm**, or **bun** (for managing dependencies)
- **PostgreSQL** (You may use neon or render if you wish to)

---

### 1. Client Setup

1. Navigate to the `cms-client` directory:

   ```bash
   cd cms-client
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to see the application in action. The page auto-updates as you modify the source files.

---

### 2. Server Setup

1. Navigate to the `cms-server` directory:

   ```bash
   cd cms-server
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. Set up your database:

   - Make sure your PostgreSQL (or another supported database) is up and running.
   - Configure the database connection in `.env` by providing the database URL.

   Example:

   ```bash
   DATABASE_URL=
   PORT=
   JWT_SECRET=
   GOOGLE_PASSWORD=
   GOOGLE_EMAIL=
   FRONTEND_URL=
   NODE_ENV="development"
   ```

4. Apply Prisma migrations to your database:

   ```bash
   npx prisma migrate dev
   ```

5. Start the backend server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

6. The server will now be running on `http://localhost:5000`. You can use it as your API for authentication, user management, and other features.

---

## Authentication Features

The boilerplate includes the following user authentication features:

- **Login**: Allows users to log in with their credentials.
- **Register**: Allows new users to sign up and create an account.
- **Forgot Password**: Allows users to reset their password via email.
- **Reset Password**: Allows users to set a new password after requesting a reset link.

---

Feel free to clone the project and explore it. 😄
