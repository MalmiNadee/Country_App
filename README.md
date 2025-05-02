# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## IT22341204 - K Rangana Malmi Nadee
## Batch ID – Y3.S2.WE.SE.03.01 
## it22341204@my.sliit.lk 
## 0754907285 


## GlobeView Country App

A React application that allows users to explore countries using the REST Countries API.

## Features

- View all countries with key information(flag, population, region and more)
- Search countries by country name
- Filter by region, language, or currency
- View detailed country information(Capital, languages, border countries, timezones, currencies and country facts)
- Light/dark theme toggle(Tailwind CSS)
- Interactive View on Map
- User authentication (login/register)
- Add/ Remove Favorite countries functionality(store in localStroage)
- Responsive design

## Setup & installation, build and run instructions
  clone the repository
  open new terminal
  navigate => cd Country_App
  Install dependencies: npm install
  run application => npm run dev
  then open http://localhost:5173/ link in browser

## Testing

run tests  => npm test

## Deployment 

app is hosted => Vercel
Vercel link => https://country-app-git-main-malmis-projects-357d03d7.vercel.app

## Challenges Faced & Solutions Implemented

Challenge 1: Inconsistent API Responses

Problem:  The REST Countries API sometimes returned inconsistent or incomplete data, such as missing fields like capital or borders.

Solution:
	Used optional chaining (?.) to prevent runtime errors.
	Provided default values for in case of missing data.
	Implemented functions to normalize data into consistent formats.


Challenge 2: Performance with Large Datasets

Problem: Loading data for all countries at once slows down the app, especially when filtering and searching for operations.
Solution:
	Added real-time search and filtering to reduce the number of displayed items.
	Planned for pagination and lazy loading to improve performance.


Challenge 3: Responsive Design

Problem: Developing a UI that worked seamlessly across all screen sizes.(mobile, tablet and desktop)
Solution:
	Used Tailwind CSS, and Grid for responsive layouts.
	Added media queries for styling at different screen sizes.
	Tested across multiple screen sizes to ensure consistency.



Challenge 4: Complex State Management

Problem: Handling multiple filters, search, and user state without unnecessary re-renders. 
Solution:
	Used React Context API to handle global state management (e.g., user sessions and theme).
	Separated local and global states.
	Considered adding Redux for future scalability.

Challenge 5: Accessibility & UX Enhancements

Problem: Ensuring the app is accessible while keeping the design modern and engaging.

Solution:
	Used ARIA attributes and semantic HTML.
	Ensured keyboard navigability and compatibility with screen readers.
	Choose accessible color palettes with good contrast.

##  Future Improvements

While the current version of the GlobeView Country App delivers a rich set of features and a smooth user experience. The following future improvements aim to enhance the app’s functionality, scalability and user engagement.

1.	Pagination & Lazy Loading

  Currently, all countries are loaded at once, which could impact performance on lower-end        devices or slow networks.

Future Enhancement:
	Add pagination for country listings.
	Lazy-load flag images and data on scroll.


2.	User Reviews & rating system

Allowing users to attach personal reviews and ratings to countries would increase engagement.

Future Enhancement:
	Add a review and rating feature for each country card (available after login)
	Photo uploads with  Cloudinary integration.

3.	Enhanced Authentication & User Profiles

A more secure and personalized experience helps with user engagement.

Future Enhancement:
	Implement OAuth integration (Google, GitHub login).
	Add user profile pages with editable favorites and preferences.

4.	Multi-language Support

 Making the app accessible to non-English speakers will expand its reach.

Future Enhancement:
	Add i18n support using react-i18next.
	Translate UI text based on user preference.

5.	 Real-Time Weather Integration

Future Enhancement:
	Weather API (OpenWeatherMap or WeatherAPI).
	5-day forecast display on country details page.


These planned enhancements aim to turn GlobeView into not just a country explorer, but a fully personalized, performant, and global application.