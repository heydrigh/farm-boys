# Farm Management System

This project is a Farm Management System built with NestJS, TypeORM, PostgreSQL, and Docker. It includes modules for managing crops, producers, farms, and dashboards. Follow the instructions below to set up and run the project.

---

## **Setup Instructions**

### **1. Create `.env` File**

1. Copy the contents of `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file to set your environment variables. Ensure the database configuration matches your setup.

---

### **2. Run the Project with Docker**

1. Start the containers:

   ```bash
   docker-compose up -d
   ```

2. Verify that the services are running:

   ```bash
   docker ps
   ```

---

### **3. Install Dependencies**

1. Install the necessary packages using Yarn:

   ```bash
   yarn
   ```

---

### **4. Run in Development Mode**

1. Start the development server:

   ```bash
   yarn dev
   ```

---

### **5. Set Up the Database**

1. Run the database migrations to create the initial schema:

   ```bash
   yarn migration:run
   ```

2. Seed the database with initial mock data:

   ```bash
   yarn seed
   ```

---

## **Available Scripts**

| Command               | Description                            |
|-----------------------|----------------------------------------|
| `yarn`               | Install dependencies                   |
| `yarn dev`           | Start the server in development mode   |
| `yarn build`         | Build the project                      |
| `yarn start`         | Start the built application            |
| `yarn migration:run` | Run database migrations                |
| `yarn seed`          | Seed the database with mock data       |

---

## **Project Modules**

1. **Crops Module**: Manage crops like Soybean, Corn, and more.
2. **Producers Module**: Manage producers, including their farms.
3. **Farms Module**: Manage farm details, areas, and related crops.
4. **Dashboard Module**: Provides summary statistics and analytics.

---

## **Technologies Used**

- **Backend**: NestJS
- **Database**: PostgreSQL with TypeORM
- **Containerization**: Docker & Docker Compose
- **Environment Configuration**: `.env` with `dotenv`

---

## **Contact**

For questions or feedback, feel free to reach out.
