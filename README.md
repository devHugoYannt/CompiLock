# 📦 CompiLock

**A simple and intuitive inventory management system.**

CompiLock is a project designed to simplify inventory management by allowing users to track incoming and outgoing products, monitor stock levels, and organize their inventory in a practical and accessible way.

More than just an inventory management tool, CompiLock was created to solve a real-world problem: helping small business owners manage their products without relying on complicated systems.

---

## 📖 About the Project

The idea behind CompiLock originated from a request made by my grandfather, who was having difficulty keeping track of the products he sells and managing his inventory.

The goal is to develop a platform consisting of a website and an installable mobile application, where all products are cataloged and organized in a centralized digital inventory.

Whenever he goes out to sell products, he will be able to use the mobile application to register product withdrawals. Each transaction will automatically update the inventory database, adjusting the available quantities.

Likewise, whenever a new shipment arrives, the incoming products can be registered, keeping inventory information accurate and up to date.

The main goal is to make this entire process simple, intuitive, and reliable, reducing the need for manual inventory tracking.

## 🎯 Main Objectives

- Simplify inventory management and product tracking.
- Centralize all products in a single catalog.
- Automate inventory updates.
- Track incoming and outgoing products.
- Provide access through both desktop and mobile devices.
- Keep inventory data synchronized through the cloud.
- Deliver a simple, accessible, and user-friendly interface.

## ✨ Planned Features

- [ ] Product registration and management.
- [ ] Incoming inventory registration.
- [ ] Outgoing inventory registration.
- [ ] Automatic stock quantity updates.
- [ ] Real-time inventory overview.
- [ ] Inventory movement history.
- [ ] Product search and filtering.
- [ ] Data synchronization across devices.
- [ ] User authentication system.
- [ ] Mobile app installation through PWA.

## 🎨 Design and User Experience

Since the application is initially intended for an elderly user, accessibility and ease of use are among the project's main priorities.

The interface will follow a classic, minimalist, and functional visual approach, focusing on:

- **Readability:** Clear typography, comfortable font sizes, and excellent contrast.
- **Simplicity:** Intuitive navigation and minimal steps to complete tasks.
- **Accessibility:** Large buttons and easily recognizable interface elements.
- **Classic aesthetics:** A discreet, traditional, and organized visual identity.
- **Usability:** Avoiding unnecessarily complex menus and features.

The objective is to ensure that anyone can use the system without requiring technical knowledge.

## 🛠️ Technologies and Architecture

The initial architecture is based on a Progressive Web Application (PWA) integrated with Supabase, allowing a single codebase to work as both a website and an installable mobile application.

| Technology | Purpose |
|---|---|
| React | Frontend development and user interface. |
| PWA | Installable application experience. |
| Supabase | Database, authentication, and file storage. |
| PostgreSQL | Database management and product records. |
| Vercel | Application hosting and deployment. |

### Proposed Architecture

**Frontend (React + PWA)**

Responsible for the application's interface, allowing users to browse products, register inventory movements, and monitor stock levels.

**Backend and Database (Supabase)**

Responsible for storing product information, recording inventory movements, authenticating users, and synchronizing data across devices.

**Hosting (Vercel)**

Responsible for deploying and hosting the application, making it accessible through desktop and mobile browsers.

## ☁️ Infrastructure and Costs

The project is designed to initially operate using free-tier services, considering its initial requirements: a single user and a relatively small inventory.

Services such as Supabase and Vercel help minimize infrastructure costs during development and the initial deployment phase.

Free-tier limitations and availability may change according to each provider's policies.

## 📱 Compatibility

CompiLock will be developed using Progressive Web App (PWA) technology.

This approach provides:

- Access through desktop browsers.
- Access through mobile browsers.
- Installation on Android and iOS home screens.
- A single codebase supporting multiple platforms.

In the future, the project may also be packaged using tools such as Capacitor, allowing distribution through application stores.

## 🚀 Installation and Setup

### Prerequisites

- Node.js
- npm
- Git

### Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/compilock.git
```

### Navigate to the project directory

```bash
cd compilock
```

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

> Environment variables and Supabase integration settings must be configured according to the project's structure.

## 🔒 Security and Data Integrity

The system is expected to use Supabase authentication and Row Level Security (RLS) policies to ensure that only authorized users can access and modify inventory information.

Inventory operations should be performed consistently, preventing discrepancies between physical stock quantities and the information displayed by the application.

## 📌 Project Status

`In Development`

CompiLock is currently in its initial planning and development phase. New features will be implemented gradually based on the needs identified during actual usage.

---

## ❤️ The Story Behind CompiLock

CompiLock started with a simple request from a grandfather who needed a better way to organize his daily business activities.

The idea is to transform this everyday challenge into an accessible technological solution, demonstrating that technology does not need to be complicated to make a meaningful difference.

**CompiLock: Simple Control. Organized Inventory.**
