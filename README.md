# Lagalt

## ENG

Lagalt is a web app with the purpose to match users with projects that fit their experience and interest. Some main features for users include:

- The ability to register and log in with email and password.
- The ability to search for projects and join these projects after approval from the project owner.
- The ability to send messages in the project's group chat.
- The ability to receive updates from the project owner.
- The ability to create their own projects.
- The ability to update their user information such as experience and personal description.

The fetching of projects from the backend is done with pagination. When searching for projects, there are autocomplete and filtering functions. 

Users with the admin role have the ability to log in and delete projects/other users. As a guest (not logged in) user, one can view all projects and get limited information about them as well as information about the Lagalt web app.

The project's frontend is made in JavaScript with React and Vite. It is based on Google's Material UI component library with a responsive mobile-first design.

The backend is made in Java with Spring Boot according to the MVC pattern and can be tested via Swagger in the browser. The project uses JWT for session management and PostgreSQL as the database.

## SWE

Lagalt är en webbapp med syftet att para ihop användare med projekt som matchar deras erfarenheter och intressen. Några huvudfunktioner för användare är:

- Att kunna registrera sig och logga in med email och lösenord.
- Att söka efter projekt och ansluta sig till dessa efter godkännande av projektägaren.
- Att skicka meddelanden i projektets gruppchatt.
- Att få uppdateringar från projektägaren.
- Att kunna skapa egna projekt.
- Att uppdatera sin användarinformation såsom erfarenheter och personlig beskrivning.

Hämtning av projekt görs med paginering. För sökningar av projekt finns autocomplete och filtreringsfunktioner. 

Användare med rollen admin har möjlighet att logga in och radera projekt/användare. Som gäst (oinloggad) användare kan man se alla projekt och få begränsad information om dessa samt få information om webbappen Lagalt.

Projektets frontend är gjord i JavaScript med React och Vite. Det är baserat på Googles Material UI komponentbibliotek med en responsiv mobile-first design.

Backenden är gjord i Java med Spring Boot enligt MVC-mönstret och kan testas via Swagger i browsern. Projektet använder JWT för sessionshantering och PostgreSQL som databas.
