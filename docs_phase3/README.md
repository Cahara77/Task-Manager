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
## Test Cases for Personal Task Manager

### Test Case 1: Task Creation
1. **Action**: Enter "Complete portfolio project" in input field → Click "Add" button  
2. **Expected Result**: 
   - Task appears in task list under "All" filter
   - Task has "Active" status (no strikethrough)
   - Input field clears automatically

### Test Case 2: Mark Task as Completed
1. **Action**: Click checkbox next to "Complete portfolio project" task  
2. **Expected Result**:
   - Task displays strikethrough text
   - Task moves to "Completed" filter view
   - Task remains visible in "All" view with strikethrough

### Test Case 3: Reactivate Completed Task
1. **Action**: Click checkbox on completed task (strikethrough text)  
2. **Expected Result**:
   - Strikethrough disappears
   - Task moves to "Active" filter view
   - Task remains in "All" view without strikethrough

### Test Case 4: Delete Task
1. **Action**: Click trash icon next to any task  
2. **Expected Result**:
   - Task immediately disappears from all views
   - No error messages appear in console

### Test Case 5: Filter Active Tasks
1. **Action**: Click "Active" filter button  
2. **Expected Result**:
   - Only tasks without strikethrough are shown
   - "Completed" tasks are hidden
   - URL updates to `?filter=active`

### Test Case 6: Filter Completed Tasks
1. **Action**: Click "Completed" filter button  
2. **Expected Result**:
   - Only tasks with strikethrough are shown
   - "Active" tasks are hidden
   - URL updates to `?filter=completed`

### Test Case 7: Persistence Verification
1. **Action**: 
   - Add 3 new tasks
   - Mark 1 as completed
   - Refresh browser page  
2. **Expected Result**:
   - All 3 tasks reappear in "All" view
   - Completed task retains strikethrough
   - Active tasks remain unchecked

### Test Case 8: Responsive Layout
1. **Action**: Resize browser window to 320px width  
2. **Expected Result**:
   - Task elements stack vertically
   - Text remains readable without horizontal scrolling
   - Filter buttons rearrange responsively

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
