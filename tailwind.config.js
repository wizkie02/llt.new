/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from 'tailwindcss-animate';

export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			},
        // Vietnam-inspired color palette
        primary: '#E4784D',      // Dragon fruit orange
        secondary: '#64A86B',    // Rice field green
        accent: '#FFCB3C',       // Lantern yellow
        bg: {
          light: '#FFFAF0',      // Soft rice paper
          dark: '#1F2937',       // Deep indigo
        },
        text: {
          light: '#2A3B4A',      // Deep indigo
          dark: '#F7F8F9',       // Off white
        },
        success: '#3DD598',      // Jade green
        warning: '#FFC107',      // Amber
        error: '#FF5252',        // Red
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
        'fadeInUp': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'slowZoom': {
          '0%': {
            transform: 'scale(1)'
          },
          '100%': {
            transform: 'scale(1.1)'
          }
        },
        'flyPlane': {
          '0%': {
            transform: 'translateX(-50px) translateY(-50%)',
            opacity: '0'
          },
          '15%': {
            opacity: '1'
          },
          '85%': {
            opacity: '1'
          },
          '100%': {
            transform: 'translateX(350px) translateY(-50%)',
            opacity: '0'
          }
        }
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'slow-zoom': 'slowZoom 20s ease-out forwards',
        'flyPlane': 'flyPlane 3s ease-in-out infinite'
  		}
  	}
  },
  plugins: [tailwindcssAnimate],
}

