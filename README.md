# Travel-Buddies

Project Breakdown
Frontend: HTML, CSS, Javascript
Backend: node.js, express.js
Version control: Github

Main Components:
PostForm: To create a new travel plan post (destination, travel mode, time, participant limit).
PostList: Displays all available travel plans with option to join.
PostDetail: Shows specific details of a travel post, including the number of current participants.
UserActions: Allows to join, edit and delete the trips.

Database: MongoDB Atlas, as well as Compass for local database if necessary
Create (POST): Add a new travel plan.
Read (GET): Retrieve available travel plans (all posts or by specific trip ID).
Update (PUT): Allows to edit the trip details
Delete (DELETE): Allows to cancel the trip.

API details provided in the link below: https://ananthupsankar.atlassian.net/wiki/spaces/~63c8a852f6d42a7a4632e622/pages/65924/APIs+for+Travel+Buddies+application+Programming+for+Information+System 
API integration testes using Postman.
Validation: Ensure that users don’t join if the participant limit is reached, and no duplicate email IDs or phone numbers are used.
Join Logic: Functions to handle users joining a trip.
