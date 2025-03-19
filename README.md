# Portfolio Dashboard

## Project Overview
This project is a **Portfolio Dashboard** built using **Next.js**, **D3.js**, **Recharts**, and **Tailwind CSS**. It features dynamic **Sector Allocation**, **Overlap Analysis with Sankey Diagrams**, and **Performance Summary Graphs** to visualize investment data interactively.

--- URL: [https://finance-dashboard-jet-chi.vercel.app/]

## Tech Stack

| Technology          | Purpose                                        |
|---------------------|------------------------------------------------|
| **Next.js 14**      | React-based framework for SSR & performance    |
| **TypeScript**      | Type safety and better developer experience    |
| **Tailwind CSS**    | Modern utility-based CSS framework             |
| **D3.js**           | Data visualization (Sankey Diagram)            |
| **Recharts**        | Graphs & charts for performance summary        |
| **Framer Motion**   | Smooth animations and UI transitions           |
| **Lucide Icons**    | SVG-based icons for UI elements                |

---

## 📥 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/portfolio-dashboard.git
cd portfolio-dashboard
```
### Install Dependencies
```npm install  # OR yarn install```

### Start Development Server

```npm run dev  # OR yarn dev```
The app runs at http://localhost:3000.

### Project Structure
 ```portfolio-dashboard/
│── public/                     # Static assets (icons, images)
│── src/
│   ├── app/                     # Next.js App Router
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Main page
│   ├── components/              # UI components
│   │   ├── navbar/              # Navbar component
│   │   ├── sector-allocation/   # Sector allocation UI
│   │   ├── overlap-analysis/    # Sankey diagram for overlap
│   │   ├── performance-chart/   # Investment performance graph
│   ├── lib/                     # Utility functions & data management
│   ├── styles/                  # Global stylesheets
│── .eslintrc.js                 # Linting config
│── .gitignore                   # Ignore files for Git
│── next.config.js               # Next.js configuration
│── package.json                 # Project dependencies
│── README.md                    # Documentation
```

🎨 Features Implemented
### 1. Sector Allocation

    Displays a sector-wise allocation of investments.
    Uses a flexbox-based grid with percentage-based distribution.
    Responsive & dynamic layout based on screen size.

### 2. Overlap Analysis (Sankey Diagram)

    Built with D3.js Sankey visualization.
    Dynamic label positions update on resize.
    Hover interactions to highlight specific fund overlaps.

### 3. Performance Summary

    Recharts-based area graph to show portfolio growth.
    Time-period filtering (1M, 3M, 6M, 1Y, etc.).
    Custom tooltips and hover effects for better data insights.

### 4. Fully Responsive UI

    Mobile Navigation with Hamburger Menu.
    Adaptive layouts for tablet & desktop screens.
    CSS media queries ensure consistency.



