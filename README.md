# BetaShares Search App Test by Kraig Burrows

A modern Vue.js search application built with Vue 3, TypeScript, and PrimeVue components.

## Features

- Modern Vue 3 Composition API
- TypeScript support
- PrimeVue UI components
- Tailwind CSS for styling
- Auto-animation support
- VueUse utilities

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:

```bash
git clone https://github.com/zync09/betashares-search-kraig
cd betashares-search-kraig
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

## Development

To start the development server:

```bash
npm run dev
# or
yarn dev
```

This will start the development server at `http://localhost:3000`

Note port 3000 is set in the vite.config.ts file and is required for CORS.

## Project Structure

- `src/` - Source code directory
- `public/` - Static assets
- `components/` - Vue components
- `vite.config.ts` - Vite configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration

## Technologies Used

- Vue 3
- TypeScript
- Vite
- PrimeVue
- Tailwind CSS
- VueUse
- FormKit Auto Animate

# How to use and features

## Search

The search is a simple search bar that allows you to search for a fund by name, ASX code, phrase or topic.

### Results

The results are a list of funds that match the search criteria.

## Filtering

The filtering is a set of filters that allow you to filter the funds. The filters are:

- Dividend Frequency
- Management Approach
- Investment Suitability
- Asset Category
- One Year Return
- Five Year Return
- Management Fee

## Pagination

The pagination is a set of buttons that allow you to paginate through the funds.

## Sorting

The sorting is a set of buttons that allow you to sort the funds by name, ASX code, phrase or topic.

## Reset

The reset is a button that allows you to reset the filters and search.
