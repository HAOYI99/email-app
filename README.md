Technical Assessment of PicklesAuctions

## Getting Started

### Installation

Make sure you have these environment on your machine.

Specification / Requirement

| Software | Version |
| ----------- | ----------- |
| NodeJS | 20.11.0 |
| PostgreSQL | 16.1-1 |


### Clone the repository:
```bash
git clone https://github.com/HAOYI99/email-app.git
```

config your database connection string and your email token at .env file
```bash
DATABASE_URL="postgresql://postgres:1234@localhost:5432/yourDatabase?schema=public"
EMAIL=your_email@gmail.com
EMAIL_PASSWORD=your_password
```

setup the development server and run ( follow the command one by one ) 
```bash
npm install
npx prisma migrate dev
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Now we use the postman to create some records

![Alt text](readme.image/image.png) 

You will receive 204 No Content response

Lets click refresh on table in the browser

![Alt text](readme.image/image-1.png)

we got the new record 

![Alt text](readme.image/image-2.png)

you may do some filtering or sorting with the table
or even adjust the pagination

## Architecture
<pre>
┣ app
   ┣ api 
   ┃ ┣ email  <- api to get all records
   ┃ ┗ sendEmail  <- api to send email
   ┣ enum  
   ┣ services
   ┃ ┣ emailService.ts  <- to handle email services
   ┃ ┗ validation.ts  <- schema validation
   ┣ layout.tsx   <-  root layout
   ┗ page.tsx   <-  main UI
┣ prisma
   ┣ migrations   <-  database migrations history / SQL
   ┣ client.ts   <- uses of prisma client
   ┗ schema.prisma     <- schema of all entity
┣ .env   <- environment config
</pre>

