
# NestJS Prisma Swagger

This project showing how to build a RESTful API using NestJS, Prisma ORM, and Swagger for API documentation.

## 🧰 Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **Prisma**: An ORM for Node.js and TypeScript for database access.
- **Swagger**: Tool for documenting RESTful APIs automatically.
- **TypeScript**: Strongly typed programming language built on JavaScript.
- **PostgreSQL**: Relational database (can be replaced with SQLite or MySQL as needed).

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/3laaElsadany/NestJS_Prisma_Swagger.git
cd NestJS_Prisma_Swagger
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Database

Make sure PostgreSQL is running, then update your `.env` file:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/database_name?schema=public"
```

### 4. Initialize Prisma

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Run the App

```bash
npm run start:dev
```

### 6. Access Swagger Documentation

After starting the server, open:

```
http://localhost:3000/api
```

## 📁 Project Structure

```
src/
├── app.module.ts
├── main.ts
├── prisma/
│   ├── prisma.module.ts
│   └── prisma.service.ts
├── products/
│   ├── products.controller.ts
│   ├── products.module.ts
│   ├── products.service.ts
│   └── dto/
│       ├── create-product.dto.ts
│       ├── update-product.dto.ts
│       └── product-response/
│           └── product-response.dto.ts
├── categories/
│   ├── categories.controller.ts
│   ├── categories.module.ts
│   ├── categories.service.ts
│   └── dto/
│       ├── create-category.dto.ts
│       ├── update-category.dto.ts
│       └── category-response/
│           └── category-response.dto.ts
```

## 📝 Notes

- **Prisma**: Data models are defined in `schema.prisma` under the `prisma/` directory.
- **Swagger**: Configured in `main.ts` using `SwaggerModule` and `DocumentBuilder`.


