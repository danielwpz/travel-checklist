# Travel Checklist

A modern, interactive travel checklist application built with React, TypeScript, and Vite. Stay organized and never forget the essentials for your next adventure!

## About

This application provides a user-friendly interface for managing your travel checklist. It comes with a set of default essential items and allows you to add custom items, check them off as you pack, and maintains your progress using local storage.

### Default Items Include:
- 📘 Passport
- 🪥 Toothbrush
- 🔌 Phone charger
- 🕶️ Sunglasses
- 📷 Camera
- 📋 Travel insurance
- 💊 Medications
- 👟 Comfortable shoes
- 🔌 Travel adapter
- 👕 Clothes for weather

## Tech Stack

- **React 19** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Bootstrap 5** - UI components and responsive design
- **Radix UI** - Accessible UI primitives
- **Lucide React** - Beautiful icons

## Prerequisites

Make sure you have the following installed:
- Node.js (version 18 or higher)
- npm, yarn, or pnpm

## Installation

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

## Running the Application

### Development Mode
Start the development server with hot module replacement:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will be available at `http://localhost:5173`

### Preview Production Build
To preview the production build locally:

```bash
npm run preview
# or
yarn preview
# or
pnpm preview
```

## Building for Production

Create an optimized production build:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

The built files will be in the `dist` directory.

## Development

### Code Quality
Run ESLint to check for code quality issues:

```bash
npm run lint
# or
yarn lint
# or
pnpm lint
```

### Project Structure
```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── AddItemForm.tsx # Form for adding new items
│   ├── ChecklistItem.tsx # Individual checklist item
│   └── TravelChecklist.tsx # Main checklist component
├── lib/                # Utility functions
├── __tests__/          # Test files
├── types.ts            # TypeScript type definitions
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## Features

- ✅ Interactive checklist with checkboxes
- 📱 Fully responsive design
- 💾 Automatic local storage persistence
- ➕ Add custom checklist items
- 🗑️ Remove items from the list
- 🔄 Reset to default items
- 📊 Progress tracking
- 🎨 Modern UI with gradient backgrounds
