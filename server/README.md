# Server Components Documentation

This directory contains the backend components for the StudyNotion project. The server is built using Node.js, Express, and MongoDB, and it includes various features such as user authentication, course management, payment processing, and more.

## Table of Contents

1. [Setup Instructions](#setup-instructions)
2. [Environment Variables](#environment-variables)
3. [Project Structure](#project-structure)
4. [Routes](#routes)
5. [Controllers](#controllers)
6. [Models](#models)
7. [Utilities](#utilities)

---

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/HimanshuKumar101/Study_Notion.git
   cd studynotion/server
2. Install dependencies:
   ```bash
   npm install
3. Create a .env file in the /server directory and configure the environment variables as described in the Environment Variables section.

4. Start the server:
   ```bash
   npm run dev
---

# Environment Variables
The server requires the following environment variables to function correctly. Add these to your .env file:

### Email Configuration
- MAIL_HOST=smtp.gmail.com
- MAIL_USER=your-email@gmail.com
- MAIL_PASS=your-email-password

### JWT Secret
- JWT_SECRET=your-jwt-secret

### Razorpay Configuration
- RAZORPAY_KEY=your-razorpay-key
- RAZORPAY_SECRET=your-razorpay-secret

### Cloudinary Configuration
- CLOUD_NAME=your-cloudinary-cloud-name
- API_KEY=your-cloudinary-api-key
- API_SECRET=your-cloudinary-api-secret

### MongoDB Configuration
- MONGODB_URL=your-mongodb-connection-string

### Server Port
- PORT=4000

---
# Project Structure

server/

├── config/

│   ├── [cloudinary.js](http://_vscodecontentref_/0)         # Cloudinary configuration for media uploads

│   ├── [database.js](http://_vscodecontentref_/1)           # MongoDB connection setup

├── controllers/

│   ├── [Auth.js](http://_vscodecontentref_/2)               # User authentication and authorization

│   ├── [Category.js](http://_vscodecontentref_/3)           # Category management

│   ├── [ContactUs.js](http://_vscodecontentref_/4)          # Contact form handling

│   ├── [Course.js](http://_vscodecontentref_/5)             # Course management

│   ├── [Payments.js](http://_vscodecontentref_/6)           # Payment processing

│   ├── [Profile.js](http://_vscodecontentref_/7)            # User profile management

│   ├── [RatingAndReview.js](http://_vscodecontentref_/8)    # Ratings and reviews for courses

│   ├── [ResetPassword.js](http://_vscodecontentref_/9)      # Password reset functionality

│   ├── [Section.js](http://_vscodecontentref_/10)            # Section management within courses

│   ├── [Subsection.js](http://_vscodecontentref_/11)         # Subsection management within sections

│   ├── [courseProgress.js](http://_vscodecontentref_/12)     # Course progress tracking

├── mail/

│   ├── templates/            # Email templates for various notifications

├── middlewares/

│   ├── [auth.js](http://_vscodecontentref_/13)               # Authentication and role-based access control

├── models/

│   ├── [Category.js](http://_vscodecontentref_/14)           # Category schema

│   ├── [Course.js](http://_vscodecontentref_/15)             # Course schema

│   ├── [CourseProgress.js](http://_vscodecontentref_/16)     # Course progress schema

│   ├── [OTP.js](http://_vscodecontentref_/17)                # OTP schema for email verification

│   ├── [Profile.js](http://_vscodecontentref_/18)            # User profile schema

│   ├── [RatingAndReview.js](http://_vscodecontentref_/19)    # Ratings and reviews schema

│   ├── [Section.js](http://_vscodecontentref_/20)            # Section schema

│   ├── [SubSection.js](http://_vscodecontentref_/21)         # Subsection schema

│   ├── [User.js](http://_vscodecontentref_/22)               # User schema

├── routes/

│   ├── [Contact.js](http://_vscodecontentref_/23)            # Routes for contact form

│   ├── [Course.js](http://_vscodecontentref_/24)             # Routes for course management

│   ├── [Payments.js](http://_vscodecontentref_/25)           # Routes for payment processing

│   ├── [Profile.js](http://_vscodecontentref_/26)            # Routes for user profiles

│   ├── [User.js](http://_vscodecontentref_/27)               # Routes for user authentication

├── utils/

│   ├── [imageUploader.js](http://_vscodecontentref_/28)      # Utility for uploading images to Cloudinary

│   ├── [mailSender.js](http://_vscodecontentref_/29)         # Utility for sending emails

│   ├── [secToDuration.js](http://_vscodecontentref_/30)      # Utility for converting seconds to duration

├── .env                      # Environment variables file

├── [index.js](http://_vscodecontentref_/31)                  # Entry point for the server


---
# Routes
### User Routes (/api/v1/auth)
- POST /login - User login
- POST /signup - User registration
- POST /sendotp - Send OTP for email verification
- POST /changepassword - Change user password
- POST /reset-password-token - Generate password reset token
- POST /reset-password - Reset user password
- Profile Routes (/api/v1/profile)
- GET /getUserDetails - Fetch user details
- PUT /updateProfile - Update user profile
- DELETE /deleteProfile - Delete user account
- GET /getEnrolledCourses - Fetch enrolled courses
- GET /instructorDashboard - Fetch instructor dashboard data
- Course Routes (/api/v1/course)
- POST /createCourse - Create a new course
- POST /addSection - Add a section to a course
- POST /addSubSection - Add a subsection to a section
- POST /editCourse - Edit course details
- GET /getAllCourses - Fetch all courses
- POST /getCourseDetails - Fetch details of a specific course
- POST /getFullCourseDetails - Fetch full details of a course
- DELETE /deleteCourse - Delete a course
- Payment Routes (/api/v1/payment)
- POST /capturePayment - Capture payment
- POST /verifyPayment - Verify payment
- POST /sendPaymentSuccessEmail - Send payment success email
- Contact Routes (/api/v1/contact)
- POST /contact - Handle contact form submissions

---

# Controllers
Controllers handle the business logic for each route. Key controllers include:

- Auth.js: Handles user authentication (login, signup, OTP, etc.).
- Course.js: Manages course creation, editing, and deletion.
- Payments.js: Handles payment processing and verification.
- Profile.js: Manages user profiles and account settings.
- RatingAndReview.js: Handles course ratings and reviews.

---

# Models
The server uses Mongoose to define schemas for MongoDB. Key models include:

- User.js: Defines the user schema.
- Course.js: Defines the course schema.
- Section.js: Defines sections within courses.
- SubSection.js: Defines subsections within sections.
- Category.js: Defines course categories.
- RatingAndRaview.js: Defines ratings and reviews for courses.

---

# Utilities
- mailSender.js: Utility for sending emails using Nodemailer.
- imageUploader.js: Utility for uploading images to Cloudinary.
- secToDuration.js: Converts seconds into a human-readable duration format.

