# Task-Manager
A simple task manager web application for the IU course DLBCSPJWD01 built with Node.js, Express and SQLite.

![Task Manager Screenshot](/screenshots/app-preview.png)

A lightweight task management web application for students and professionals. Organize tasks with filtering options.

## Features
- Add/delete tasks
- Mark tasks as complete
- Filter: All/Active/Completed
- Responsive design
- Persistent storage

## Installation Guide (ZIP Download)

### Step 1: Download and Extract
1. Download ZIP from GitHub
2. Right-click ZIP → "Extract All"
3. Choose extraction location

### Step 2: Install Prerequisites
1. Install [Node.js](https://nodejs.org/) (v18+ recommended)
2. Verify installation:

bash
   node -v
   npm -v

### Step 3: Install Dependencies
1. Open terminal in extracted folder
2. Run:
   ```bash
   npm install
   ```

### Step 4: Start Application
1. In same terminal:
   ```bash
   node server.js
   ```
2. Open browser:  
   `http://localhost:3000`

## Folder Structure
```
task-manager/
├── public/ # Frontend files
│ ├── index.html
│ ├── styles/
│ │ └── main.css
│ └── scripts/
│ └── app.js
├── server.js # Backend server
├── database/ # Database storage
├── package.json
└── README.md
```

## Troubleshooting
- **Port in use?**  
  Change port in `server.js` (line 5)
- **Missing modules?**  
  Run `npm install` again
- **Database issues?**  
  Delete `database/tasks.db` and restart

## Support
Contact: mert.sentuerk@iu-study.org  
Repository: https://github.com/Cahara77/Task-Manager
```
