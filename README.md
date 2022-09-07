# FULLSTACK RESTAURANT APP

## Technologies:
#### FE:
1) Vue
2) Axios
3) Bootstrap 4
#### BE:
1) Node.js
2) Typescript
3) Express.js
4) PostgreSQL (via Docker)
5) Prisma ORM

## How to start App
BE listening port 3000 by default.
<br>
FE listening port 8080 by default.
<br><br>
Run:
1) clone repo: `git clone`
2) install deps:
- `npm i`
- `cd ./front`
- `npm i`
3) create .env file for BE (required var DATABASE_URL).
4) start Docker with PostgreSQL:
- `docker-compose up -d `
5) Migrate:
- `npx prisma migrate dev --name init`
6) go root and run script:
- `npm run-script dev`

<hr>

## Demo
![Alt Text](./demo.gif)

<hr>
