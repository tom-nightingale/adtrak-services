module.exports = {
  purge: {
      content: ['./pages/**/*.js', './components/**/*.js'],
      options: {
        safelist: [
            /^wp/,
            'bg-positive',
            'bg-negative',
        ],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      "2xs": "375px",
      xs: "480px",
      sm: "600px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1400px",
      "3xl": "1600px",
      "4xl": "1900px",
    },
    fontFamily: {
      sans: ["AribauGrotesk, '-apple-system', 'BlinkMacSystemFont', sans-serif"],
      display: ["Mont, '-apple-system', 'BlinkMacSystemFont', sans-serif"],
    },
    fontSize: {
      '2xs': '14px',
      'xs': '16px',
      'sm': '18px',
      'base': '20px',
      'lg': '24px',
      'xl': '34px',
      '2xl': '74px',
      '3xl': '80px',
    },
    filter: {
      none: "none",
      grayscale: "grayscale(1)",
    },
    extend: {
      width: {
        "1/16": "6.25%",
        "2/16": "12.5%",
        "3/16": "18.75%",
        "5/16": "31.25%",
        "6/16": "37.5%",
        "7/16": "43.75%",
        "9/16": "56.25%",
        "10/16": "62.5%",
        "11/16": "68.75%",
        "13/16": "81.25%",
        "14/16": "87.5%",
        "15/16": "93.75%",
      },
      colors: {
        primary: {
          DEFAULT: "#FF6B4A",
        },
        secondary: {
          light: "#ABE8E8",
          DEFAULT: "#3B5CC4",
          dark: "#12284C",
        },
        positive: {
          DEFAULT: "#81D76C",
          dark: "#205114",
        },
        negative: {
          DEFAULT: "#F84747",
          dark: "#B11A1A",
        }
      },
      spacing: {
        39: "9.5rem",
        50: "12.4rem",
        57: "14.35rem",
        62: "15.35rem",
        72: "18rem",
        84: "21.25rem",
        86: "22.6rem",
        87: "22.65rem",
        96: "24rem",
        116: "29rem",
        128: "32rem",
      },
      zIndex: {
        "-10": "-10",
        "-20": "-20",
      },
      borderRadius: {
        '4xl': '2rem',
      },
      inset: (theme, { negative }) => ({
        full: "100%",
        "1/2": "50%",
        ...theme("spacing"),
        ...negative(theme("spacing")),
      }),
      maxWidth: (theme) => ({
        ...theme("spacing"),
        ...theme("screens"),
      }),
      minHeight: (theme) => ({
        ...theme("spacing"),
        25: "25vh",
        50: "50vh",
        75: "75vh",
        90: "90vh",
      }),
    },
  },
  variants: {
    opacity: ['responsive', 'group-hover', 'hover', 'focus', 'group-focus'],
    backgroundColor: ['responsive', 'group-hover', 'hover', 'focus', 'group-focus'],
    textColor: ['responsive', 'group-hover', 'hover', 'focus', 'group-focus'],
    padding: ['responsive', 'group-hover', 'hover', 'focus', 'group-focus'],
    textDecoration: ['group-hover', 'hover', 'focus', 'group-focus'],
  },
  plugins: [
    require("tailwindcss-filters"),
    require('@tailwindcss/forms'),
  ],
  corePlugins: {
    container: false,
  },
}