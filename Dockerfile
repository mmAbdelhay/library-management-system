FROM node:18.17.1

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN cp .env.example .env


EXPOSE 3000

EXPOSE 8080

CMD ["sh", "-c", "npx sequelize db:migrate && node app.js"]
