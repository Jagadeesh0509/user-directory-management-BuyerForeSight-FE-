# BuyerForeSight Frontend Assignment

A Create React App implementation of a User Directory Dashboard using the JSONPlaceholder users API:

`https://jsonplaceholder.typicode.com/users`

## Features

- User directory dashboard with:
  - Name
  - Email
  - Phone
  - Company
- Client-side search by name or email
- Client-side sorting by:
  - Name ascending / descending
  - Company ascending / descending
- User detail page with full user information
- Responsive UI for desktop and mobile

## Tech Stack

- React 18
- React Router
- Create React App
- Plain CSS

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm start
```

The app will usually open at:

`http://localhost:3000`

### Production build

```bash
npm run build
```

## Project Structure

```text
user-dashboard/
  public/
    index.html
  src/
    components/
      Shell.jsx
      StatusView.jsx
    data/
      usersApi.js
    hooks/
      useUsers.js
    pages/
      DashboardPage.jsx
      UserDetailPage.jsx
    App.jsx
    index.js
    styles.css
```

## Main Functionality

### Dashboard

- Fetches users from the API
- Displays users in a table
- Filters users using the search input
- Sorts users using the selected sort option
- Navigates to a detail page when a row is clicked

### User Detail Page

- Shows full selected user information
- Includes contact, company, and address details
- Supports fallback states for loading, API errors, and missing users

## Notes

- Search and sorting are fully client-side.
- Data is loaded from the public JSONPlaceholder API.
- If `npm start` fails in Git Bash, run:

```bash
npx react-scripts start
```
