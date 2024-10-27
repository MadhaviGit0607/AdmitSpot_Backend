# Contact Management Backend App

This is a simple contact management backend application built with **Next.js** and **SQLite**. The application provides RESTful APIs to manage contacts, allowing users to create, read, and store contact information such as name, email, phone number, and address.

## Features

- **RESTful API**: Provides endpoints to interact with contact data.
- **CRUD Operations**:
  - **Create**: Add new contacts.
  - **Read**: Retrieve a list of contacts.
- **SQLite Database**: Uses SQLite for lightweight data storage.

## Technologies Used

- **Next.js**: A React framework for building server-side rendered applications.
- **SQLite**: A lightweight, serverless database engine.
- **Node.js**: JavaScript runtime used for building the API.

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- npm or yarn
- SQLite

### Installation

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd contact-management-backend

Here's a detailed README file template for your contact management backend app using Next.js and SQLite. You can customize it further based on your specific requirements and project details.

markdown
Copy code
# Contact Management Backend App

This is a simple contact management backend application built with **Next.js** and **SQLite**. The application provides RESTful APIs to manage contacts, allowing users to create, read, and store contact information such as name, email, phone number, and address.

## Features

- **RESTful API**: Provides endpoints to interact with contact data.
- **CRUD Operations**:
  - **Create**: Add new contacts.
  - **Read**: Retrieve a list of contacts.
- **SQLite Database**: Uses SQLite for lightweight data storage.

## Technologies Used

- **Next.js**: A React framework for building server-side rendered applications.
- **SQLite**: A lightweight, serverless database engine.
- **Node.js**: JavaScript runtime used for building the API.

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- npm or yarn
- SQLite

### Installation

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd contact-management-backend
Install Dependencies:

bash
Copy code
npm install
Setup the Database:

Ensure you have an SQLite database file (database.sqlite) in the root directory of the project. You can create the file using a tool like DB Browser for SQLite or by executing SQL commands directly.

Create the contacts Table:

Run the following SQL commands to create the contacts table in your SQLite database:

sql
Copy code
CREATE TABLE contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
Running the Application
To start the Next.js development server, run:

bash
Copy code
npm run dev
The server will start at http://localhost:3000.

API Endpoints
GET /api/contacts

Description: Fetch all contacts.
Response: Returns an array of contact objects.
POST /api/contacts

Description: Add a new contact.
Request Body:
json
Copy code
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "555-1234",
  "address": "456 Elm Street"
}
Response: Returns the newly created contact object.

Example Usage with Postman
Get All Contacts:

Method: GET
URL: http://localhost:3000/api/contacts
Response: Array of contact objects.
Create a New Contact:

Method: POST
URL: http://localhost:3000/api/contacts
Body: (raw JSON)

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "555-5678",
  "address": "789 Pine Street"
}
Response: Newly created contact object.
Contributing
If you'd like to contribute to this project, please fork the repository and submit a pull request. Any contributions, suggestions, or improvements are welcome!
