# 📦 Product Addressing System

## 🖋️ Description

This project offers a comprehensive system to address products. It captures and manages data pertaining to products, brands, categories, warehouse shelves, incoming orders, picking and insertion operations, and shelf dedications. Its prime directive is to recommend shelf placements for new products to be inserted or addressed.

---

### 📚 **API**

Built on `.NET Core`, our Web API is crafted with the best practices of clean architecture, Fluent API, and the Unit of Work pattern. It communicates seamlessly with a MySQL database.

#### **Domain Layer** 🌐
- Models
- Repository Interfaces
- UnitOfWork Interface
- Seedwork
- Services

#### **Infrastructure Layer** ⚙️
- Migrations
- Repository Implementations
- DbContext (MySQL-configured)
- UnitOfWork Implementation

#### **API Layer** 🖥️
- program.cs
- DTOs
- Controllers

---

### 📱 **Front End**

Crafted in React Native, initialized with the latest React Expo CLI and powered by TypeScript. This front-end solution tests the API's robustness, makes API calls, and displays results. State management is streamlined with Zustand, and there's a dedicated screen for every unique function. Thanks to Expo, this project is universally compatible across platforms.

---

## 🔧 **Getting Started (Development Environment)**

### **API Setup**:

1. 🔗 Clone the repository.
2. 📂 Open the `API` folder using Visual Studio.
3. 🔧 Update the connection strings in both `DbContext` and `program.cs` to mirror your MySQL server and port details.
4. ▶️ Hit 'Run' in Visual Studio.

> **Tip**: The database was orchestrated using `MAMP` and `phpMyAdmin`.

### **Front End Setup**:

1. 🖥️ Move to the `front end` directory in your terminal.
2. 📦 Install dependencies with `npm install` or `yarn install`.
3. 🚀 Launch the Expo project via `npx expo start`.

---
