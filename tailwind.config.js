/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./*.html"],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Space Grotesk', 'sans-serif'],
            },
            colors: {
                background: {
                    primary: '#0A0A1F',
                    secondary: '#13132B',
                },
                accent: {
                    primary: '#A020F0',
                    secondary: '#00E5FF',
                },
                text: {
                    primary: '#FFFFFF',
                    secondary: '#E0E0E0',
                    muted: '#A0A0A0',
                },
                solana: {
                    purple: '#9945FF',
                    green: '#14F195',
                },
                mfai: {
                    primary: '#A020F0',
                    secondary: '#00E5FF',
                }
            },
            animation: {
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
                'spin-slow': 'spin 12s linear infinite',
                'draw': 'draw 2s ease-out forwards',
                'flow': 'flow 3s linear infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'slide-up': 'slideUp 0.5s ease-out forwards',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                draw: {
                    '0%': { strokeDasharray: '1000', strokeDashoffset: '1000' },
                    '100%': { strokeDashoffset: '0' }
                },
                flow: {
                    '0%': { backgroundPosition: '0% 50%' },
                    '100%': { backgroundPosition: '100% 50%' }
                },
                glow: {
                    '0%': { boxShadow: '0 0 20px rgba(160, 32, 240, 0.3)' },
                    '100%': { boxShadow: '0 0 40px rgba(160, 32, 240, 0.6), 0 0 60px rgba(0, 229, 255, 0.4)' }
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                }
            }
        }
    },
    plugins: [],
}
