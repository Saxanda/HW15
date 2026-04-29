Full-stack app with Node.js, Express, TypeORM, PostgreSQL, React

▶️ Setup DB

Run initial schema:

psql -U postgres -d homework15 -f db.sql

▶️ Migrate & Seed
npm run migration:run:manual
npm run seed

▶️ Run App
cd backend
npm run prod

Open: http://localhost:8000