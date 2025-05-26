# Front-end and back-end architecture

- Front-end: NextJS
- Back-end : NextJS

As NextJS is monolithic React framework, it simplifies the development process especially when working with database and API request.
All API request go on itself making them fast and rapid to develop. I choose to use server actions because it is easy to maintain and scale compared to api/route.

=> Using a monolithic framework simplyfied deployment (here on Vercel)

# Data model

- Each file represents a Metadata (name, size, ...) and Contents which are JSON.
- File's Metadata and its Contents are stored on different tables ( the file contents are "id", "key" and "value" )

=> 1 File can have many Contents | 1 content belong to 1 file (one to many relashionship)
Each Translation stores one translation key and its value.

# Challenges

- The real challenge was trying to simplify the Workflow of the app; then put myself at the place of users and trying to understand what workflow they expect because the app should stay simple and easy to use (everything should happen in just one click).

# Feature I would you suggest if I were to start again

- Using Zero Sync (powerful JavaScript sync engine from the RepliCache team) that update database as user type/modify contents.
  No need to use ORM for mutations

# Run app locally:

- Clone the repository : git clone....

- create .env file and add the following:

  - DATABASE_URL="you-postgres-db-connection-string/translation-DB"
  - OPENROUTE_API_KEY=you-openrouter-api-key

- Run : npm install
- Run : npm run dev
- localhost:3000
