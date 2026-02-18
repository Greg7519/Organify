FROM node:22.12
WORKDIR ./
COPY ./backend/package*.json ./
RUN npm install
COPY . .
ENV FPORT=3000 
EXPOSE 3000
CMD ["npm", "run", "dev"]
