
<img width="1917" height="677" alt="Στιγμιότυπο οθόνης 2025-09-04 183500" src="https://github.com/user-attachments/assets/c17f64a6-a8b3-4939-99c7-c252041f9a9c" />
<br/>
Instructions:Clone this repository<br/>
In an .env file add in the backend directory the following enviromental variables:<br/>
FPORT to 3000<br/>
MONGO_URI: Your link to your mongo db atlas(DATABASE must be users with collections of users, tasks and groups)<br/>
EMAIL_SENDER: email which will reply to people(both verify and task scheduling<br/>
MOBILE:Specify true if you will use backend for a framework like react native to specify redirects<br/>
EMAIL_PASS: nodemailer pass credential<br/>

if you deploy to render, i recommend setting PORT env to 3000 for letting production environment knowing which port to listen, since backend listens to port 3000<br/>
in addUsers.html change href to your local/production port<br/>

Technologies used: Html css(tailwind css) and javascript(both frontend and backend(node js). Database layer implemented through mongo DB<br/>
Deployment in custom IIS server, deployed with a custom TLS certificate and custom domain using reverse proxy
