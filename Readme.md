# TripPAS

TripPAS is a full-stack travel planning application for discovering destinations, comparing budgets, building trips, and sharing travel experiences.

## Features

- Explore destinations and travel experiences
- View destination details, images, activities, and ratings
- Build and save personalized trip plans
- Analyze and compare estimated trip budgets
- Register and log in with JWT authentication
- Manage saved trips and profile information
- Add and browse community experiences
- Responsive React interface with animated page transitions

## Tech Stack

### Client

- React 18
- Vite
- React Router
- Tailwind CSS
- Framer Motion
- Recharts
- Lucide React

### Server

- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication
- bcryptjs password hashing

## Project Structure

```text
TripPAS/
├── client/       React/Vite frontend
├── server/       Express/MongoDB backend
└── Readme.md
```

## Prerequisites

- Node.js 18 or newer
- npm
- A MongoDB database, local or MongoDB Atlas

## Installation

Clone the repository and install dependencies for both applications:

```bash
git clone https://github.com/amantirkeycse-source/tripPAS.git
cd tripPAS

cd client
npm install

cd ../server
npm install
```

## Environment Variables

Create `server/.env` with values for your environment:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
JWT_SECRET=replace-with-a-long-random-secret
PORT=5000
```

Never commit `.env` files or database credentials. The repository ignores environment files by default.

## Running Locally

Start the backend in one terminal:

```bash
cd server
node server.js
```

Start the frontend in a second terminal:

```bash
cd client
npm run dev
```

Open the URL printed by Vite, usually `http://localhost:5173`.

The frontend expects the API at `http://localhost:5000`. Update `client/src/services/api.js` if the backend runs at another address.

## Available Scripts

### Client

```bash
npm run dev       # Start the Vite development server
npm run build     # Create a production build
npm run preview   # Preview the production build locally
```

### Server

```bash
node server.js     # Start the Express API
```

## Main Routes

| Route | Description |
| --- | --- |
| `/` | Home page |
| `/explore` | Browse destinations |
| `/destination/:id` | Destination details |
| `/plan` | Create a trip plan |
| `/analyzer` | Analyze a trip budget |
| `/compare` | Compare budget options |
| `/experiences` | Browse travel experiences |
| `/auth` | Sign in or register |
| `/dashboard` | Authenticated user dashboard |
| `/saved` | Saved trips |

## API Health Checks

Once the server is running, these endpoints can be used to verify connectivity:

```text
GET http://localhost:5000/
GET http://localhost:5000/api/test
```

## License

This project is provided for educational and personal use.
