Instructions:Clone this repository
In an .env file add in the backend directory the following enviromental variables:
FPORT to 3000
MONGO_URI: Your link to your mongo db atlas
EMAIL_SENDER: email which will reply to people(both verify and task scheduling
EMAIL_PASS: nodemailer pass credential
if you deploy to render, i recommend setting PORT env to 3000 for letting production environment knowing which port to listen, since backend listens to port 3000
