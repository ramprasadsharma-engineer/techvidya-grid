# Admin Panel Setup Guide

## Installation Required

You need to install React Router DOM to enable the authentication and admin routes:

```bash
npm install react-router-dom
```

## Features Implemented

### 1. Authentication System (`/authlogin`)
- Secure login portal for authorized personnel
- Pre-configured credentials for different departments
- Session management using localStorage

### 2. Admin Panel (`/admin`)
- Event winner management interface
- Dynamic team size selection (1-10 members)
- Add, edit, and delete winners for each position (1st, 2nd, 3rd)
- Search functionality for events
- Real-time updates to the leaderboard sidebar

### 3. Leaderboard Sidebar (Left Side)
- Displays all events with their status (Upcoming/Active)
- Shows winner preview (first place winner name)
- Auto-updates when winners are added via admin panel
- Status computed based on event start date/time

## Admin Credentials

### Department Admins
- **CSE**: `cse_admin` / `CSE@2025#tech`
- **AIML**: `aiml_admin` / `AIML@2025#tech`
- **ISE**: `ise_admin` / `ISE@2025#tech`
- **EC**: `ec_admin` / `EC@2025#tech`
- **MECH**: `mech_admin` / `MECH@2025#tech`
- **CIVIL**: `civil_admin` / `CIVIL@2025#tech`
- **MBA**: `mba_admin` / `MBA@2025#tech`
- **DS**: `ds_admin` / `DS@2025#tech`

### Special Access
- **Webmaster**: `webmaster` / `WEB@master#2025!`
- **Convenor**: `convenor` / `CONV@enor#2025!`
- **Chief Coordinator**: `chief_coordinator` / `CHIEF@coord#2025!`

## How to Use

### For Admins:

1. **Login**
   - Navigate to `/authlogin`
   - Enter your username and password
   - Click "Login"

2. **Manage Winners**
   - After login, you'll be redirected to `/admin`
   - Select an event from the sidebar
   - Click "Add" or "Edit" for any position (1st, 2nd, 3rd)
   - Set team size (1-10 members)
   - Fill in member details:
     - Name
     - College
     - Department
   - Click "Save Winners"

3. **Edit Winners**
   - Click "Edit" on any position
   - Modify the information
   - Click "Save Winners"

4. **Delete Winners**
   - Click "Delete" on any position
   - Confirm the deletion

### For Users:

1. **View Leaderboard**
   - Click the golden "Leaderboard" button on the homepage
   - Sidebar opens from the left
   - View all events with their status
   - Events with winners show a trophy icon and winner name
   - Click any event to scroll to it

## Current Data Storage

Currently using **localStorage** for data persistence. This means:
- ✅ Data persists across page refreshes
- ✅ Multiple admins can login simultaneously
- ⚠️ Data is stored locally in the browser
- ⚠️ Each browser/device has separate data

## Backend Integration (Future)

To connect to a real database:

1. **Replace localStorage calls** in:
   - `AdminPanel.jsx` (lines with `localStorage.getItem/setItem`)
   - `LeaderboardSidebar.jsx` (lines with `localStorage.getItem`)

2. **Create API endpoints**:
   - `POST /api/winners` - Save winners
   - `GET /api/winners/:eventId` - Get winners for an event
   - `GET /api/winners` - Get all winners
   - `PUT /api/winners/:eventId/:position` - Update winners
   - `DELETE /api/winners/:eventId/:position` - Delete winners

3. **Update authentication**:
   - Move credentials to backend
   - Implement JWT tokens
   - Add session management

## File Structure

```
src/
├── components/
│   ├── AuthLogin.jsx          # Login page
│   ├── AuthLogin.css          # Login styles
│   ├── AdminPanel.jsx         # Admin management interface
│   ├── AdminPanel.css         # Admin styles
│   ├── LeaderboardSidebar.jsx # Updated with winner display
│   └── EventsSidebar.css      # Shared sidebar styles
├── data/
│   └── events.js              # Shared event data
└── main.jsx                   # Router configuration
```

## Routes

- `/` - Main website
- `/authlogin` - Admin login portal
- `/admin` - Admin panel (requires authentication)

## Notes

- Multiple admins can login simultaneously
- Changes are reflected immediately in the leaderboard
- Event status (Upcoming/Active) is computed automatically based on date/time
- All admin credentials are currently hardcoded (move to backend in production)
