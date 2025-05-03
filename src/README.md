# StudyNotion Frontend

This directory contains the frontend components for the StudyNotion project. The application is built using React, Redux, and React Router, providing a seamless user experience for students, instructors, and administrators.

## Table of Contents

1. [Setup Instructions](#setup-instructions)
2. [Environment Variables](#environment-variables)
3. [Project Structure](#project-structure)
4. [Key Features](#key-features)
5. [Routing](#routing)
6. [State Management](#state-management)
7. [Utilities](#utilities)

---

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/studynotion.git
   cd studynotion/src
2. Install dependencies:
   ```bash
   npm install
3. Create a .env file in the root directory and configure the environment variables as described in the Environment Variables section.

4. Start the development server:
   ```bash
   npm start

# Environment Variables
The frontend requires the following environment variables to function correctly. Add these to your .env file:

REACT_APP_BASE_URL=http://localhost:4000
REACT_APP_RAZORPAY_KEY = Razorpay API
RAZORPAY_SECRET = Secret


src/
├── assets/                     # Static assets like images and videos
├── components/                 # Reusable React components
│   ├── common/                 # Shared components like Navbar, Footer, etc.
│   ├── core/                   # Core components for specific pages
├── data/                       # Static data like links and configurations
├── hooks/                      # Custom React hooks
├── pages/                      # Page-level components
├── reducer/                    # Redux reducers
├── services/                   # API connectors and service logic
│   ├── operations/             # API operation functions
├── slices/                     # Redux slices for state management
├── utils/                      # Utility functions and constants
├── [App.js](http://_vscodecontentref_/0)                      # Main application component
├── [index.js](http://_vscodecontentref_/1)                    # Entry point for the React application
└── index.css                   # Global styles



#### Key Features
- User Authentication: Login, signup, and password management.
- Dashboard: Separate dashboards for students and instructors.
- Course Management: Add, edit, and view courses.
- Payment Integration: Razorpay integration for secure payments.
- Responsive Design: Optimized for both desktop and mobile devices.



#### Routing
The application uses react-router-dom for client-side routing. Below are the key routes:

##### Public Routes
- /: Home page
- /about: About page
- /contact: Contact page
- /signup: Signup page
- /login: Login page
- /forgot-password: Forgot password page
- /verify-email: Email verification page
- /update-password/:id: Update password page
- /catalog/:catalogName: Course catalog
- /courses/:courseId: Course details
##### Private Routes
- /dashboard/my-profile: User profile
- /dashboard/settings: User settings
- /dashboard/cart: Cart (students only)
- /dashboard/enrolled-courses: Enrolled courses (students only)
- /dashboard/instructor: Instructor dashboard (instructors only)
- /dashboard/add-course: Add a new course (instructors only)
- /dashboard/my-courses: View instructor's courses (instructors only)
- /dashboard/edit-course/:courseId: Edit a course (instructors only)
- /view-course/:courseId/section/:sectionId/sub-section/:subSectionId: View course content (students only)


#### State Management
The application uses Redux Toolkit for state management. Key slices include:

- authSlice: Manages authentication state (e.g., user token).
- cartSlice: This component is used to manage the cart state.
- courseSlice: Manages course-related state (e.g., current course, payment status).
- loadingBarSlice: his componet is used to manage the loading bar state.
- profileSlice: Handles user profile data.
- viewCourseSlice: Tracks course content and progress.

#### Utilities
- constants.js: Contains reusable constants like account types and course statuses.
- avgRating.js: Utility to calculate average ratings.
- dateFormatter.js: Formats dates for display.



