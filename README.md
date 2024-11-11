# Travel-Buddies

Project Breakdown
Frontend (React-based):

Main Components:
PostForm: For users to create a new travel plan post (destination, travel mode, time, participant limit).
PostList: Displays all available travel plans with options to join or leave.
PostDetail: Shows specific details of a selected travel post, including current participants.
UserActions: Allows users to join, leave, or edit their own plans.

Frontend Logic:
State Management: Use React’s useState and useEffect for managing post data and updates.
API Integration: Use fetch or axios to make API calls to the backend for CRUD operations.
Custom & Template Code: Design from scratch for all components, but document if using any template for layout (like a modal or form template). Avoid pre-built components to meet the project guidelines.
Backend (API-based, Node.js/Express):

Database: Choose a database like MongoDB or PostgreSQL to store travel posts and user data.
CRUD API:
Create (POST): Add a new travel plan.
Read (GET): Retrieve available travel plans (all posts or by specific destination).
Update (PUT): Allow users to edit their posts, e.g., updating participant count if someone joins/leaves.
Delete (DELETE): Allow users to cancel their travel plans.

API Endpoints:
/api/posts: To create or get posts.
/api/posts/:id: To view, update, or delete specific posts.
/api/posts/:id/join: To add a user to a plan.
/api/posts/:id/leave: To remove a user from a plan.
Intermediate Functions & Logic:

Validation: Ensure that users don’t join if the participant limit is reached or if the signup time has passed.
Join/Leave Logic: Functions to handle users joining or bailing out of a trip within the permitted time frame.
Error Handling: Manage errors like duplicate joins or leaving after the allowed period.

*  Users will be able to put up posts expressing their plan to travel to a specific destination.
*  Other users will be able to view the post and sign up for the plan as well. 
*  Include destination, mode of travel, time, no. of people permitted, etc. and be able to edit the details. 
*  The users will be able to cancel and delete their posts, and remove people if group limit is reduced in time.

DB --> MSSQL/MongoDB
Front-end --> html, css
Back-end --> node.JS, express.JS
version control --> GitHub
