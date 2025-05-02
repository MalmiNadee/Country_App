/** @type { import ('tailwindcss').Config } */

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                'dark-blue': 'hsl(209, 23%, 22%)',
                'very-dark-blue': 'hsl(207, 26%, 17%)',
                'very-dark-blue-text': 'hsl(200, 15%, 8%)',
                'dark-gray': 'hsl(0, 0%, 98%)',
                'very-light-gray': 'hsl(0, 0%, 98%)',
                'white': 'hsl(0, 0%, 100%)',
            },
            fontFamily: {
                sans: ['Nunito Sans', 'sans-serif']
            },
        },
    },
    darkMode: 'class',
    plugins: [],
}
