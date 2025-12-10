/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Primary Foundation - Kenya earth tones
                primary: {
                    50: '#fef5ee',
                    100: '#fde8d7',
                    200: '#fbcdae',
                    300: '#f8ab7a',
                    400: '#f47d44',
                    500: '#f15a1f',
                    600: '#e24015',
                    700: '#bb2e13',
                    800: '#952617',
                    900: '#792316',
                },
                // Utility Status Colors
                stable: {
                    DEFAULT: '#10b981',
                    light: '#34d399',
                    dark: '#059669',
                },
                caution: {
                    DEFAULT: '#f59e0b',
                    light: '#fbbf24',
                    dark: '#d97706',
                },
                critical: {
                    DEFAULT: '#ef4444',
                    light: '#f87171',
                    dark: '#dc2626',
                },
                // Accent - Vibrant teal/cyan
                accent: {
                    DEFAULT: '#06b6d4',
                    light: '#22d3ee',
                    dark: '#0891b2',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            fontSize: {
                'display': ['42px', { lineHeight: '1.2', fontWeight: '700' }],
                'h1': ['32px', { lineHeight: '1.4', fontWeight: '600' }],
                'h2': ['24px', { lineHeight: '1.4', fontWeight: '600' }],
                'h3': ['20px', { lineHeight: '1.4', fontWeight: '600' }],
                'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
                'body': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
                'body-sm': ['14px', { lineHeight: '1.6', fontWeight: '400' }],
                'caption': ['12px', { lineHeight: '1.2', fontWeight: '400' }],
            },
            spacing: {
                'xs': '4px',
                'sm': '8px',
                'md': '12px',
                'lg': '16px',
                'xl': '24px',
                '2xl': '32px',
                '3xl': '48px',
                '4xl': '64px',
            },
            boxShadow: {
                'level-1': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                'level-2': '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
                'level-3': '0 4px 8px 0 rgba(0, 0, 0, 0.15)',
                'level-4': '0 8px 16px 0 rgba(0, 0, 0, 0.2)',
                'level-5': '0 16px 32px 0 rgba(0, 0, 0, 0.25)',
            },
            animation: {
                'fade-in': 'fadeIn 150ms ease-in',
                'slide-in': 'slideIn 200ms ease-out',
                'scale-in': 'scaleIn 200ms ease-out',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideIn: {
                    '0%': { transform: 'translateY(-10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
}
