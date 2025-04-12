# Candidate Search App

The **Candidate Search App** is a React-based web application that allows users to search for GitHub users, review their profiles, and save potential candidates for future reference. The app provides features such as sorting, pagination, and local storage for saved candidates.

## Table of Contents

- [Candidate Search App](#candidate-search-app)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Key Components](#key-components)
  - [Dependencies/Technologies Used](#dependenciestechnologies-used)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Deployment](#deployment)
  - [Media](#media)
    - [Live Deployment](#live-deployment)
    - [Screen Capture](#screen-capture)
    - [Video Demo](#video-demo)
  - [License](#license)

## Features

- **Search GitHub Users**: Fetch and display GitHub user profiles using the GitHub API.
- **Save Candidates**: Save potential candidates to a list for future reference.
- **Pagination**: Navigate through saved candidates with pagination controls.
- **Sorting**: Sort saved candidates by name, username, location, or company.
- **Local Storage**: Persist saved candidates across sessions using `localStorage`.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Key Components

- **CandidateSearch.tsx**: Displays GitHub users and allows saving or skipping candidates.
- **SavedCandidates.tsx**: Displays saved candidates with sorting and pagination.
- **API.tsx**: Handles API calls to GitHub.
- **storage.ts**: Provides utility functions for managing localStorage.

## Dependencies/Technologies Used

- **React**: Frontend library for building user interfaces.
- **React Router**: For navigation between sections without reloading the page.
- **Vite**: Development environment for fast builds and hot module replacement.
- **TypeScript**: For type safety and better developer experience.
- **CSS**: Custom styles for a polished and responsive design.
- **..env**: Requires GitHub API key (<https://github.com/settings/tokens>).

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/Candidate-Search
   ```

2. Navigate to the project directory:

   ```bash
   cd Candidate-Search
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add the following:

    ```env
    VITE_GITHUB_API_KEY=your_github_api_key 

    Replace your_github_api_key with a valid GitHub personal access token.
    ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open your browser and navigate to your port.

## Usage

- **Search GitHub Users**: Search for users by username, view their avatars, location, and email (if available).
- **Save Users**: Save users to local storage and view them in a sortable list.
- **View Saved Candidates**: Navigate to the "Saved Candidates" section to view, sort, and manage your saved users.

## Deployment

To deploy the project on **Render**, follow these steps:

1. Fork or clone the repository.
2. Set up environment variables in the Render dashboard:
    - `VITE_GITHUB_API_KEY`: Your GitHub API key.
3. Connect the repository to Render and deploy.

## Media

### Live Deployment

[Live Candidate Search App](https://candidate-search-pdrr.onrender.com/)

### Screen Capture

![Candidate Search App Screenshot](./public/candidatesearchscreencap.jpg)

### Video Demo

Watch the video demo of the app [here](https://drive.google.com/file/d/1nEKjZC-Iqtj6MZ7Iryw2j6tCbYoV_x2Y/view?usp=sharing)

## License

This project is licensed under the MIT License. You are free to use, modify, and distribute this software as long as the original license is included in any distribution.

See the [LICENSE](./LICENSE) file for more details.