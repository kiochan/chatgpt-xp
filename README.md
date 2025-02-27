# ⚡ ChatGPT-XP - The Ultimate XP Legacy AI Chat! ⚡
> **"Ancient tech? No problem! We shall resurrect the legends of Windows XP and wield the power of IE6!"**

[For mere mortals](./README_normal.md)

ChatGPT-XP is an **epic** AI-powered chat application, crafted to bring the almighty AI experience to the **glorious** days of Windows XP and its eternal browser, **Internet Explorer 6**! Running on **Express.js**, this beast ensures that even the mightiest relics of the past can access cutting-edge AI!

## 🔥 Project Structure 🔥

```
.
├── src/                   # The sacred source code
│   ├── .download/         # Ancient relics (showdown.js, scripts, etc.)
│   ├── home.html          # The holy front-end (IE6 compatible!)
│   ├── server.js          # The core power of ChatGPT-XP
├── package.json           # Forbidden knowledge (dependencies & scripts)
├── .env                   # Secret artifacts (API_KEY, PASSWORD, etc.)
├── .env_default           # Sacred template of env variables
```

## ⚡ Summon the AI - Installation & Execution ⚡

### 1️⃣ **Install Dependencies**

```sh
npm install
```

### 2️⃣ **Set Your Arcane Secrets (Environment Variables)**

Copy the legendary `.env_default` and create your own `.env`:

```sh
cp .env_default .env
```

Then, imbue it with the following:

```env
PORT=4038
API_KEY=your_openai_api_key
PASSWORD=your_secure_password
```

### 3️⃣ **Unleash the Power**

```sh
pm run start
```

## 🎯 Arcane API Endpoints 🎯

### **1️⃣ Authenticate - Gain Access to the Forbidden Library**

```http
POST /login
Content-Type: application/x-www-form-urlencoded
```

**Invocation Ritual:**

```json
{ "password": "your_secure_password" }
```

**The Oracle Responds:**

```json
{ "success": true, "token": "your_token" }
```

### **2️⃣ Speak to the AI - Channel Its Power**

```http
POST /chat
Content-Type: application/json
```

**Your Offering:**

```json
{ "message": "Hello", "token": "your_token" }
```

**The AI Bestows Knowledge:**

```json
{ "reply": "Greetings, mortal. What do you seek?" }
```

### **3️⃣ Banish Your Presence - Logout**

```http
POST /logout
Content-Type: application/json
```

**Sever Your Ties:**

```json
{ "token": "your_token" }
```

**The AI Acknowledges Your Departure:**

```json
{ "success": true }
```

## 🎌 Join the Order - Contribute to the Legend 🎌

> **"Together, we shall forge ChatGPT-XP into the mightiest relic of old, ensuring that even the shadows of Windows XP can bask in the radiance of AI!"**

Want to help refine ChatGPT-XP? Join the cause, send in your PRs, break some compatibility (but fix it after), and ensure XP lives on! 🚀
