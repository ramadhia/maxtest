# Maxbuzz Project

## Prerequisites

Before you begin, ensure you have the following tools installed on your machine:

- **Make**: Ensure that `Make` is installed. If not, you can install it following the instructions [here](https://www.gnu.org/software/make/).
- **Docker**: This project uses Docker to run services in isolated containers. If you haven't installed Docker, you can get it from [here](https://www.docker.com/get-started).
- **Docker Compose**: Ensure Docker Compose is installed to run multiple containers. Installation instructions can be found [here](https://docs.docker.com/compose/install/).

## Getting Started

Follow these steps to get the project up and running on your local machine.

### 1. Initialize the Maxbuzz Project

- Rename the `env.example` file to `.env` and configure your environment variables accordingly.

---

### 2. Backend (Django)

#### 2.1 Set up the Django Project

1. **Set up environment variables**:
   - Rename the `env.example` file to `.env` in the `be` folder, or you can run this command on your machine Linux/MacOS.
     ```
      cp .env.example .env
      ```
   - Configure the database connection string and other necessary variables.

2. **Set up python virtual env and activate it**
      ```bash
      python -m venv .venv
    
      source .venv/bin/activate
      ```
3. **Install dependencies**:
   Inside the `be` directory, install the required dependencies with pip:

   ```bash
   pip install -r requirements.txt
   ```

#### 2.2 Docker Compose (PostgreSQL)

### Docker Compose File

Ensure you have a `docker-compose.yaml` file in the root directory (`maxbuzz-project/`) before proceeding to the next step.

1. **Start PostgreSQL**:
   First, start the PostgreSQL service using Docker Compose in the root directory (`maxbuzz-project/`):

   ```bash
   docker compose -f docker-compose.yaml up db
   ```

   This command will only start the **PostgreSQL** container and expose it on port `45432`. Ensure that this step is complete before proceeding to the next step.


2. **Check if PostgreSQL is running**:
   You can check if PostgreSQL is running by accessing the following:

   ```bash
   psql -h localhost -U root -p 45432
   ```

   If PostgreSQL is running, it will ask for the password (use the one defined in `.env|env.example` file or `docker-compose.yaml`).

#### 2.3 Create the Database

1. **Create Database**:
   After PostgreSQL is up and running, create the `maxbuzz_db` database. You can create the database using the `psql` command-line tool, or you can do this through a PostgreSQL client:

   ```bash
   CREATE DATABASE maxbuzz_db;
   ```

#### 2.4 Initialize the Django Project

1. **Run Django Migrations & Seed the database with initial data**:

   After the database is created, navigate to the `be` directory and run the Django migrations to set up the schema:

   ```bash
   python manage.py migrate
   ```
    _**From this part, the products data will populate 10 sample entries in the database**_



#### 2.5 Run the Backend API Server

After the migrations are applied, you can run the backend server manually if preferred:

```bash
python manage.py runserver 0.0.0.0:40001
```

---

### 3. Deploy Backend & Frontend with Docker Compose

Set up the project and run the necessary services using Docker Compose:

#### 3.1 Deploy the Project Using Docker Compose
Now that the database is migrated, you can deploy the project and start all services (Frontend, Backend Server, PostgreSQL) with the following command:
_Ensure that this step is run in the root directory (`maxbuzz-project/`)._
```bash
docker compose -f docker-compose.yaml up
```

This command will pull the necessary images and start the services defined in the `docker-compose.yaml` file, including:

- **Frontend**: Running at port `40000`
- **Backend API**: Running at port `40001`
- **PostgreSQL**: Database service running at port `45432`

#### 3.2 Frontend Setup

1. **Install dependencies**:
   Navigate to the `fe` folder and install the necessary dependencies:

   ```bash
   npm install
   ```

2. **Run the Frontend Development Server**:

   Start the Next.js development server:

   ```bash
   npm run dev
   ```

   This will start the frontend on `http://localhost:15000`.

---

### 4. Accessing Services

- **Backend API**: Accessible on `http://localhost:40001`
  - Example endpoint to Fetch Products: `GET - http://localhost:40001/api/products/`
  - Example endpoint to Fetch Orders: `GET - http://localhost:40001/api/orders`
  - Example endpoint to Create Order: `POST - http://localhost:40001/api/orders`
   ```
   // example of request
   {
       "customer_name": "john doe",
       "customer_email": "email@email.com",
       "products": [
           {
               "id": 2,
               "qty": 1,
               "price": 200,
               "sub_total": 200
           },
           {
               "id": 4,
               "qty": 1,
               "price": 120,
               "sub_total": 120
           }
       ]
   }
   ```
- **Frontend**: Accessible on `http://localhost:40000` or `http://localhost:15000` if run using `npm run dev`
- **PostgreSQL**: Accessible on `localhost:45432`
  - Username: `root`
  - Password: `password`

---
### Error Handling
- Condition when Products not found
![image](https://github.com/user-attachments/assets/1d1c7d40-fc9f-43d4-bc05-c5b5c005ed4b)
- Condition when products are not found, but they are still in the cart page
![image](https://github.com/user-attachments/assets/408e1719-c85d-4518-9643-7aedca4da208)
- Condition when getting the 'Out of stock' error before checking out the cart
![Screenshot From 2024-11-29 19-48-29](https://github.com/user-attachments/assets/199acc3a-46f6-4397-912c-2a4c7541071d)
- Condition when getting the 'Out of stock' error after checking out the cart
![image](https://github.com/user-attachments/assets/015fcea0-cea9-446e-93a2-fbd9a46995af)

---
## Question 3:
#### Case Study: Balancing Buyer and Seller Experience
 Here is my answer. 
1. **For Buyers (Trust and Quality Assurance):**
    - **Enhanced Product Verification**: Implement a "Verified Seller" badge for items inspected by the platform  for quality and accuracy.
    - **Enhanced Seller Trusted**: This badge indicates that the seller is trusted, offering authentic products guaranteed by the platform, and has been verified.
    - **Standardized Descriptions**: Provide sellers with pre-defined templates and prompts for clear, standardized product descriptions.
    - **Transparency Features**: Add detailed seller profiles, including badges for achievements (e.g., "New but Verified," "Verified Seller", "Trusted Seller"). For this point, I have implemented for this feature in this project.

   
**Here is the sample of badge seller.**

https://github.com/user-attachments/assets/b12b4ad9-497d-4c30-b92f-36364523d8be


2. **For Sellers (Support and Growth):**
   - **Guided Onboarding**: Create a streamlined tutorial for new sellers, including tips on creating high-quality listings.
   - **Promotional Boost**: Allow new sellers limited free access to platform promotions to increase visibility.
   - **Community Building**: Pair new sellers with experienced sellers for guidance 
