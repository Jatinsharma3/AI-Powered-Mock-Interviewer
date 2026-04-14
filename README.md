# AI Interview Mocker

AI Interview Mocker is a web application that helps users practice mock interviews using AI-generated questions and feedback.

---

## Features

* Generate interview questions based on job role and tech stack
* Upload resume (PDF) to generate personalized questions
* View previous interviews
* Track progress using charts
* Get AI-based feedback and performance analysis
* User authentication using Clerk

---

## Tech Stack

* Next.js (App Router)
* React
* Tailwind CSS
* PostgreSQL (Neon DB)
* Drizzle ORM
* Clerk Authentication
* Google Gemini API

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Jatinsharma3/ai-interview-mocker.git
cd ai-interview-mocker
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Setup environment variables

Create a `.env` file in the root folder and add:

```env
DATABASE_URL=your_database_url

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

---

### 4. Run the project

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

---

## Deployment

You can deploy this project on Vercel:

1. Push your code to GitHub
2. Import the project into Vercel
3. Add environment variables
4. Deploy

---

## Notes

* Database queries are handled through API routes (backend)
* Client components use `fetch()` to communicate with APIs
* Environment variables are used to keep sensitive data secure

---

## Future Improvements

* Add voice-based interview
* Improve UI design
* Add more analytics

---

## Author

Jatin Sharma
GitHub: https://github.com/Jatinsharma3