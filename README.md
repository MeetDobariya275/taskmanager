# Task Manager Web Application

A full-stack Task Manager app that allows users to register, log in, and manage their to-do tasks. The front end is built with React & Bootstrap, and the back end uses Node.js/Express with MongoDB.

## Features

- **User Authentication:** Registration and login using JWT.
- **Task Management:** Create, read, update, and delete tasks (each user sees only their tasks).
- **Password Requirements:** Live validation with a show/hide password toggle.
- **Responsive Design:** Mobile-friendly interface built with Bootstrap.

## Prerequisites

- [Node.js](https://nodejs.org/) (v12 or higher) and npm
- Git
- A MongoDB Atlas account (or a local MongoDB instance)

## Installation

1. **Clone the Repository:**  
   Open your terminal and run:
   git clone https://github.com/MeetDobariya275/taskmanager.git
3. **Back End Setup:**  
Navigate to the `server` folder, install dependencies, and set up environment variables.
- Change directory:

  cd server

- Install dependencies:

  npm install

- Create a file named `.env` in the `server` folder with the following content:
  ```
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  PORT=5000

  Replace `your_mongodb_connection_string` with your MongoDB Atlas connection string (remember to URL-encode any special characters)
  and `your_jwt_secret` with a strong secret key.
- Start the server:

  npm start

  The server will run at [http://localhost:5000](http://localhost:5000).

3. **Front End Setup:**  
Navigate to the `client` folder, install dependencies, and set up the API URL.
- Change directory:
  ```
  cd ../client

- Install dependencies:

  npm install

- Create a file named `.env` in the `client` folder with the following content:

  REACT_APP_API_URL=http://localhost:5000

- Start the React app:

  npm start

  The front end will run at [http://localhost:3000](http://localhost:3000).

## Usage

- Open [http://localhost:3000](http://localhost:3000) in your browser.
- Use the Sign Up page to create a new account.
- Log in with your credentials.
- Manage your tasks using the provided interface.

## Deployment

For production deployments:
- **Back End:** Deploy the `/server` folder (e.g., on Render) and set environment variables (`MONGO_URI`, `JWT_SECRET`, `PORT`)
  via your hosting platform's dashboard.
- **Front End:** Build the React app using `npm run build` in the `client` folder and deploy the resulting `build` directory (e.g., on Netlify or Vercel).
- Set the environment variable `REACT_APP_API_URL` to your deployed back-end URL (e.g., `https://your-backend.onrender.com`).

## Hiding Secrets

- Ensure that your `.env` files are listed in your `.gitignore` so that sensitive data (like `MONGO_URI` and `JWT_SECRET`) are not
  committed to your public repository.
- Use environment variables on your deployment platforms to keep your secrets secure.

## Licences
- https://idyllic-squirrel-4ad8e6.netlify.app
- the above link is live for this app
