# Lagalt

Lagalt is a web app with the purpose to match users with projects that fit their experience and interest. Some main features for users include:

- The ability to register and log in with email and password.
- The ability to search for projects and join these projects after approval from the project owner.
- The ability to send messages in the project's group chat.
- The ability to receive updates from the project owner.
- The ability to create their own projects.
- The ability to update their user information such as experience and personal description.

The fetching of projects from the backend is done with pagination. When searching for projects, there are autocomplete and filtering functions. 

Users with the admin role have the ability to log in and delete projects/other users. As a guest (not logged in) user, one can view all projects and get limited information about them as well as view the About us page.  

The project's frontend is made in JavaScript with React and Vite. It is based on Google's Material UI component library with a responsive mobile-first design. The backend is made in Java with Spring Boot according to the MVC pattern and can be tested via Swagger in the browser. The project uses JWT for session management and PostgreSQL as the database.


## Run with Docker
Start Docker Engine
### Backend 
(Instructions on how to create jar file is in build.gradle)  
Navigate to lagalt-be/build/libs or where the jar file and Dockerfile is located   
docker build -t lagalt-be .  
docker run -p 4000:4000 lagalt-be  
### Frontend
Navigate to lagalt-fe  
docker build -t lagalt-fe .  
docker run -p 5173:5173 lagalt-fe  
