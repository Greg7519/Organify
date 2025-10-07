
<img width="1917" height="677" alt="Στιγμιότυπο οθόνης 2025-09-04 183500" src="https://github.com/user-attachments/assets/c17f64a6-a8b3-4939-99c7-c252041f9a9c" />

Instructions:Clone this repository

In an .env file add in the backend directory the following enviromental variables:

FPORT to 3000

MONGO_URI: Your link to your mongo db atlas(DATABASE must be users with collections of users, tasks and groups)

EMAIL_SENDER: email which will reply to people(both verify and task scheduling
MOBILE:Specify true if you will use backend for a framework like react native to specify redirects
EMAIL_PASS: nodemailer pass credential

if you deploy to render, i recommend setting PORT env to 3000 for letting production environment knowing which port to listen, since backend listens to port 3000
in addUsers.html change href to your local/production port
