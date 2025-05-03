# StudyNotion

StudyNotion is a full-stack EdTech platform built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js).  
It provides features like authentication, course management, student enrollment, instructor dashboards, and secure payments.

---

## Table of Contents

- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [Routing](#routing)
- [State Management](#state-management)
- [Utilities](#utilities)

---

## Setup Instructions

### Backend

1. Clone the repository:
   ```bash
   git clone https://github.com/HimanshuKumar101/Study_Notion.git
   cd studynotion/server
2. Install dependencies:
   ```bash
   npm install
3. Create a .env file in /server and add environment variables.

4. Start the server:
   ```bash
   npm run dev
---

# Frontend
1. Navigate to frontend:
   ```bash
   cd ../src
2. Install dependencies:
   ```bash
   npm install
3. Create a .env file in /src and add environment variables.

4. Start the React app:
   ```bash
   npm start

Environment Variables
Backend (/server/.env)


### Email Configuration
  
   
- MAIL_HOST=smtp.gmail.com
- MAIL_USER=your-email@gmail.com
- MAIL_PASS=your-email-password

### JWT Secret
- JWT_SECRET=your-jwt-secret

---

# Razorpay Configuration
- RAZORPAY_KEY=your-razorpay-key
- RAZORPAY_SECRET=your-razorpay-secret

--- 

# Cloudinary Configuration
- CLOUD_NAME=your-cloudinary-cloud-name
- API_KEY=your-cloudinary-api-key
- API_SECRET=your-cloudinary-api-secret

---

# MongoDB Configuration
- MONGODB_URL=your-mongodb-connection-string

### Server Port
- PORT=4000

### Frontend (/src/.env)

REACT_APP_BASE_URL=http://localhost:4000
REACT_APP_RAZORPAY_KEY = Razorpay API Key.
RAZORPAY_SECRET = Secret 

---

# Project Structure
### Backend

```

server/

├── config/          # Cloudinary and database configuration
├── controllers/     # Business logic (Auth, Course, Payments, etc.)
├── mail/            # Email templates
├── middlewares/     # Auth middleware
├── models/          # Mongoose schemas
├── routes/          # Express routes
├── utils/           # Helper functions
├── .env             # Environment variables
└── index.js         # Server entry point

```
---

# Frontend

```
src/
├── assets/          # Static files (images, videos)
├── components/      # Reusable UI components
│   ├── common/      # Navbar, Footer, etc.
│   ├── core/        # Page-specific components
├── data/            # Static data
├── hooks/           # Custom React hooks
├── pages/           # Page-level components
├── reducer/         # Redux reducers
├── services/        # API connectors
├── slices/          # Redux slices
├── utils/           # Utility functions
├── App.js           # Main App component
├── index.js         # React entry point
└── index.css        # Global styles

```

---

# Key Features
User Authentication (Signup, Login, OTP verification, Password Reset)

- Student Dashboard and Course Progress Tracking

- Instructor Dashboard and Course Management

- Secure Payments via Razorpay

- Email Notifications (Signup OTP, Payment Success)

- Responsive Design (Mobile and Desktop)

---

# Routing
### Backend API Routes
#### Auth

- POST /api/v1/auth/login

- POST /api/v1/auth/signup

- POST /api/v1/auth/sendotp

- POST /api/v1/auth/changepassword

- POST /api/v1/auth/reset-password-token

- POST /api/v1/auth/reset-password

#### Profile

- GET /api/v1/profile/getUserDetails

- PUT /api/v1/profile/updateProfile

- DELETE /api/v1/profile/deleteProfile

- GET /api/v1/profile/getEnrolledCourses

- GET /api/v1/profile/instructorDashboard

#### Courses

- POST /api/v1/course/createCourse

- POST /api/v1/course/addSection

- POST /api/v1/course/addSubSection

- POST /api/v1/course/editCourse

- GET /api/v1/course/getAllCourses

- POST /api/v1/course/getCourseDetails

- POST /api/v1/course/getFullCourseDetails

- DELETE /api/v1/course/deleteCourse

#### Payments

- POST /api/v1/payment/capturePayment

- POST /api/v1/payment/verifyPayment

- POST /api/v1/payment/sendPaymentSuccessEmail

#### Contact

- POST /api/v1/contact/contact

---

# Frontend Routes
#### Public Routes
- /- Home

- /about - About Us

- /contact - Contact Us

- /signup - Signup

- /login - Login

- /forgot-password - Forgot Password

- /verify-email - Email Verification

- /update-password/:id - Reset Password

- /catalog/:catalogName - Course Catalog

- /courses/:courseId - Course Details

#### Private Routes (Dashboard)
- /dashboard/my-profile

- /dashboard/settings

- /dashboard/cart

- /dashboard/enrolled-courses

- /dashboard/instructor

- /dashboard/add-course

- /dashboard/my-courses

- /dashboard/edit-course/:courseId

- /view-course/:courseId/section/:sectionId/sub-section/:subSectionId

---

# State Management
#### Using Redux Toolkit:

- authSlice - Handles authentication state.

- profileSlice - Manages user profile details.

- courseSlice - Manages courses and payment info.

- viewCourseSlice - Tracks course viewing and progress.

### Utilities
#### Backend Utilities

- mailSender.js — Send emails

- imageUploader.js — Upload images to Cloudinary

- secToDuration.js — Convert seconds to a readable duration

---

# Frontend Utilities

- constants.js — Static constants (roles, statuses)

- avgRating.js — Calculate average course ratings

- dateFormatter.js — Format dates nicely

Getting Started
After setting up the backend and frontend, visit:

- Backend API: http://localhost:4000

- Frontend Client: http://localhost:3000

Make sure .env files are correctly configured.




