# ⚡ TAPPO — Smart Table Ordering SaaS (MVP)

> **TAPPO** is a cutting-edge cloud-based SaaS platform designed to redefine the hospitality experience in cafes and restaurants. It automates table-side ordering via **QR Code** and **NFC** technologies, seamlessly bridging the gap between customers and the kitchen while providing real-time order management and comprehensive performance analytics.

---

## 📂 Project Architecture

| Directory / File | Description & Responsibility |
| :--- | :--- |
| 📁 **`Tappo/`** | Root workspace directory. |
| └── 📁 **`tappo-v01/`** | Main React application directory for the MVP. |
| &nbsp;&nbsp;&nbsp;&nbsp;├── 📁 **`src/components/`** | Reusable UI components (Buttons, Modals, Cards, Popups). |
| &nbsp;&nbsp;&nbsp;&nbsp;├── 📁 **`src/pages/`** | Core application views (Menu, MerchantDashboard, AdminPanel). |
| &nbsp;&nbsp;&nbsp;&nbsp;├── 📁 **`src/context/`** | Global state management providers (CartContext, OrderContext). |
| &nbsp;&nbsp;&nbsp;&nbsp;├── 📁 **`src/reducers/`** | Complex state logic handled cleanly via `useReducer`. |
| &nbsp;&nbsp;&nbsp;&nbsp;├── 📁 **`src/data/`** | Initial local JSON mock data (`mockData.js`) prior to API integration. |
| &nbsp;&nbsp;&nbsp;&nbsp;└── 📁 **`public/`** | Static assets and public configurations (`index.html`, `manifest.json`). |

---

## 💎 Core Features Scope

### 📱 1. Smart Menu & Interactive Ordering

| Feature | Tech Implementation | Operational Goal & Description |
| :--- | :---: | :--- |
| 🔗 **Direct Ordering** | `QR / NFC` | Frictionless table-side menu access and ordering without account registration. |
| 🪟 **Interactive Popups** | `MUI Dialog` | Detailed modal views displaying item descriptions, ingredients, and pricing upon card click. |
| ⚠️ **Allergen Warnings** | `Allergen System` | Integrated visual badges for items containing common allergens to ensure customer safety. |
| 🔔 **Waiter Call** | `Instant Alert` | Dedicated quick-action button to request table service or the bill directly to the dashboard. |
| 🧠 **Smart Cross-Selling** | `Recommendation Engine` | Cart-level analysis proposing complementary items (e.g., desserts with coffee) to increase AOV. |
| 💬 **Private Feedback** | `Admin-Only Insights` | Closed-loop review system directing customer feedback strictly to management. |

---

### 🖥️ 2. Merchant Real-Time Dashboard

| Stage / Feature | Alert Type | Functionality |
| :--- | :---: | :--- |
| 🟢 **1. Order Accepted** | 🔊 Audio + 👁️ Visual | Real-time reception of table-specific orders structured in actionable cards. |
| 🟡 **2. Preparing** | 👁️ Visual Status | Status update shifting the order to the kitchen/bar queue. |
| 🔵 **3. Ready for Service** | 🔊 Completion Alert | Notification prompting the floor staff to serve the finalized order to the table. |
| 📜 **Daily Ledger** | 💾 Auto-Save | Comprehensive archive logging all daily transactions for end-of-day review. |
| 🔐 **Access Control** | 🔑 Credentials | Secure login system using predefined admin credentials. |

---

### 📊 3. Admin Panel & Analytics

| Metric / Chart | Filtering Capability | Business Value |
| :--- | :---: | :--- |
| 📈 **Sales Trends** | `Daily / Weekly` | Interactive charts visualizing sales volume and revenue growth over time. |
| ⏰ **Peak Hours Analysis** | `Hourly / Daily` | Identification of the busiest hours and days to optimize staff scheduling. |
| 🔢 **Total Orders** | `KPI Card` | Aggregate count of completed transactions within the selected timeframe. |
| 👥 **Total Customers** | `KPI Card` | Unique customer count (laying the groundwork for future loyalty programs). |
| 💰 **Average Order Value** | `KPI Card` | Tracking the AOV to measure the effectiveness of the cross-selling engine. |
| 🏆 **Top Performer** | `KPI Card` | Highlighting the best-selling menu item to drive procurement decisions. |

---

## 🛠️ Tech Stack

| Technology / Library | Role / Implementation |
| :--- | :--- |
| **Frontend Core** | `React.js` (Functional Components & Custom Hooks) |
| **UI Framework** | `Material UI (MUI)` for consistent, responsive, and professional UI components and icons. |
| **State Management** | `useReducer` paired with `Context API` for predictable complex state flows (Cart & Order Pipeline). |
| **Routing** | `React Router v6` for seamless navigation between Menu, Dashboard, and Admin views. |
| **Data Handling** | `JSON / JS Objects` for structured mock data modeling prior to backend integration. |

---

## 🚀 Local Development Setup

```bash
# 1. Navigate to the main project directory
cd Tappo/tappo-v01

# 2. Install core React dependencies
npm install

# 3. Install Material UI and its dependencies
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material

# 4. Start the local development server
npm start