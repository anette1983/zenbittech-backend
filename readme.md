## A Node.js REST API application with Express framework and PostgreSQL

## Table of Contents

- [Introduction](#introduction)
- [Usage](#usage)
- [Installation](#installation)
- [Supported routes](#supported-routes)

## Introduction

This is a Node.js REST API application developed using various technologies and packages, including Node.js, the Express framework, Joi, PostgreSQL, Morgan, nodemon, Cors, Cross-env, Dotenv, Sendgrid, Bcrypt, Jsonwebtoken, Multer. It's a fully functioning API server that runs on Node.js and is connected to an active PostgreSQL database.

The server manages collections of users and investment deals, providing authentication/authorization, and email verification.

## Usage

This project is available at https://db-zenbittech-backend.onrender.com

To test the CRUD operations, please use "Postman" application or similar.

You can also test the application by using a frontend app that is connected to it:
https://zenbittech-frontend.vercel.app/

## Installation

To use this project locally, please follow these steps:

**Step 1: Clone the Repository**

```
git clone https://github.com/anette1983/zenbittech-backend.git
```

**Step 2: Navigate to the project's directory**

```
cd zenbittech-backend
```

**Step 3. Install the project dependencies using npm:**

```
npm install
```

**Step 4: Using the cloned Application**

To use the cloned project, follow these steps:

1. Customize the project's configuration according to your requirements. You may need to modify configuration files or environment variables.

2. Start the Node.js server:
   npm start

3. Access the application by navigating to `http://localhost:3000` in your web browser.

## Supported routes:

**AUTH routes**

- `POST /api/users/register` Recieves a request body in JSON format with fields {email, password} (all fields are required). If any required fields are missing in the request body, returns JSON {"message": "missing required fieldname field"} with a status code of 400. If the email is already in use, it returns {"message": "Email already in use"} with status 409. If everything is fine with request body, it saves the user in the database. Returns JSON {"user": {"email":"email,"subscription": "starter"}} with a status code of 201 and sends the verification email to the provided email address.
- `GET /api/users/verify/:verficationToken` Recieves the verification token parameter. Returns JSON {"message": "Email verified successfully"}. If there is no user associated with the verification token, it returns {"message": "User not found"} with status code of 404.
- `POST /api/users/verify` Resends a verification email. Recieves body in {"email":"email"} JSON format. Returns JSON {"message": "Verification email sent"} with status 200. If there is no such email, returns {"message": "Email not found"} with status 404. If the email is already verified, returns {"message": "Verification has already been passed"} with status 400.
- `POST /api/users/login` Recieves body containing email and password in JSON format. Returns JSON {"token": "token", "user": {"email": "email", "subscription": "starter"}} with status 200. If there is no such user or the password is wrong returns JSON {"message": "Email or password is wrong"} with status 401. If user is not verified returns "Unathorized" message with status 401.
- `GET /api/users/current` Recieves Bearer Token in headers. After it's successful validation, returns JSON with current user's email and subscription. Else returns "Unathorized" message with status 401.
- `POST /api/users/logout` Recieves token. Returns "Unathorized" message with status 401 or answer with status 204 without content.

**DEALS routes**

- `GET /api/deals` Returns an array of all available investment deals in JSON format with status 200.
- `POST /api/deals` Recieves body in {name,
  price,
  ticket,
  yield (optional),
  daysLeft,
  sold,
  preview (optional)} format. If there are no required fields in body, returns JSON {"message": "missing required field name field"} with status 400. If everything is fine with body, saves the deal info in the database. Returns a deal object with status 201.

Thank you for your interest in this project! If you have any questions or need further assistance, please feel free to contact me:

- <a href="https://www.linkedin.com/in/hanna-konchakovska/"><img align="left" src="https://raw.githubusercontent.com/yushi1007/yushi1007/main/images/linkedin.svg" alt="Hanna | LinkedIn" width="21px"/></a>
