frontend/
│
├── public/
│
├── src/
│
│ ├── assets/
│ │ ├── logo.png
│ │ ├── hero.svg
│ │
│ ├── components/
│ │
│ │ ├── Navbar/
│ │ │ ├── Navbar.jsx
│ │ │ └── Navbar.css
│ │
│ │ ├── TaskForm/
│ │ │ ├── TaskForm.jsx
│ │ │ └── TaskForm.css
│ │
│ │ ├── TaskCard/
│ │ │ ├── TaskCard.jsx
│ │ │ └── TaskCard.css
│ │
│ │ ├── ScheduleCard/
│ │ │ ├── ScheduleCard.jsx
│ │ │ └── ScheduleCard.css
│ │
│ │ ├── RiskAnalysis/
│ │ │ ├── RiskAnalysis.jsx
│ │ │ └── RiskAnalysis.css
│ │
│ │ ├── ProductivityCoach/
│ │ │ ├── ProductivityCoach.jsx
│ │ │ └── ProductivityCoach.css
│ │
│ │ └── Loader/
│ │ ├── Loader.jsx
│ │ └── Loader.css
│
│ ├── pages/
│ │
│ │ ├── Home.jsx
│ │ ├── Dashboard.jsx
│ │ ├── Planner.jsx
│ │ ├── Analytics.jsx
│ │
│
│ ├── services/
│ │
│ │ ├── api.js
│ │ ├── geminiService.js
│ │
│
│ ├── context/
│ │
│ │ └── TaskContext.jsx
│
│
│ ├── hooks/
│ │
│ │ └── useTasks.js
│
│
│ ├── utils/
│ │
│ │ ├── dateUtils.js
│ │ ├── priorityUtils.js
│ │
│
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
│
├── package.json
└── vite.config.js

backend/
│
├── controllers/
│
│ ├── taskController.js
│ ├── scheduleController.js
│ ├── riskController.js
│ └── coachController.js
│
├── routes/
│
│ ├── taskRoutes.js
│ ├── scheduleRoutes.js
│ ├── riskRoutes.js
│ └── coachRoutes.js
│
├── services/
│
│ ├── geminiService.js
│ ├── plannerAgent.js
│ ├── riskAnalyzer.js
│ └── productivityAgent.js
│
├── middleware/
│
│ ├── errorHandler.js
│
├── models/
│
│ ├── Task.js
│ ├── User.js
│
├── config/
│
│ ├── firebase.js
│ └── gemini.js
│
├── app.js
├── server.js
│
├── .env
└── package.json
