# ChatGPT-XP - ChatGPT UI for Windows XP & IE6

[Anime-style chuuni version](./README.md)

ChatGPT-XP is a **lightweight UI for ChatGPT**, designed to run on **Windows XP** with support for **Internet Explorer 6**. It provides a frontend chat interface that interacts with the OpenAI API but does not include a built-in AI model. The backend is built using **Express.js**.

## Project Structure

```
.
├── src/                   # Source code
│   ├── .download/         # Downloaded frontend libraries (showdown.js, etc.)
│   ├── home.html          # Frontend (compatible with IE6)
│   ├── server.js          # Express.js backend (acts as an API proxy)
├── package.json           # Dependencies & npm scripts
├── .env                   # Environment variables (API_KEY, PASSWORD, etc.)
├── .env_default           # Example environment file
```

## Installation & Setup

### Install Dependencies

```sh
npm install
```

### Configure Environment Variables

Copy the `.env_default` file and create your own `.env`:

```sh
cp .env_default .env
```

Edit the `.env` file to include:

```env
PORT=4038
API_KEY=your_openai_api_key
PASSWORD=your_secure_password
```

### Start the application

```sh
npm run start
```

## API Endpoints

ChatGPT-XP acts as a **proxy** to communicate with the OpenAI API. It does not process AI requests locally but forwards messages to OpenAI’s ChatGPT.

### Authentication

```http
POST /login
Content-Type: application/x-www-form-urlencoded
```

**Request Body:**

```json
{ "password": "your_secure_password" }
```

**Response:**

```json
{ "success": true, "token": "your_token" }
```

### Sending Messages to OpenAI API

```http
POST /chat
Content-Type: application/json
```

**Request Body:**

```json
{ "message": "Hello", "token": "your_token" }
```

**Response:**

```json
{ "reply": "Hi! How can I help you?" }
```

### Logging Out

```http
POST /logout
Content-Type: application/json
```

**Request Body:**

```json
{ "token": "your_token" }
```

**Response:**

```json
{ "success": true }
```

## Contributing

Contributions are welcome! The goal of **ChatGPT-XP** is to provide a **functional ChatGPT UI** on **legacy systems**. Feel free to submit **issues, pull requests**, or suggestions for better compatibility with Windows XP and IE6.
