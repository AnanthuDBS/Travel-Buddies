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

References (have provided inline references also);

express - https://expressjs.com/en/starter/hello-world.html -detailed guide on Routing, Middlewares, etc. are available
MongoDb connection - https://mongoosejs.com/docs/connections.html
Routing and to serve the static files - 
https://expressjs.com/en/guide/routing.html 
https://expressjs.com/en/starter/static-files.html 
Conditional server start - https://stackoverflow.com/questions/42523175/using-node-env-with-multiple-environments-in-javascript-projects 
Exporting app for Testing - https://www.youtube.com/watch?v=UfX-QNCOFrE 
https://www.youtube.com/watch?v=r5L1XRZaCR0 

mongoose Schema - https://mongoosejs.com/docs/guide.html 
Field definitions - https://mongoosejs.com/docs/subdocs.html 
mongoose model - https://mongoosejs.com/docs/models.html 

Router - https://expressjs.com/en/guide/routing.html 
Trip related(create, fetch, join, fetch TripById, edit TripById, Del TripById)
https://mongoosejs.com/docs/documents.html 
https://mongoosejs.com/docs/queries.html 
https://mongoosejs.com/docs/api/array.html 
https://www.geeksforgeeks.org/mongoose-findbyid-function/ 
https://www.geeksforgeeks.org/mongoose-findbyidandupdate-function/ 
https://www.geeksforgeeks.org/mongoose-findbyidanddelete-function/ 

https://archive.jestjs.io/docs/en/22.x/mock-functions 
https://github.com/ladjs/supertest 
https://www.npmjs.com/package/supertest 

Have used GenAIs for decoding certain errors at times.