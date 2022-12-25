const {spacing, fontFamily} = require('tailwindcss/defaultTheme');

// https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/defaultConfig.stub.js#L7
const themeColors = {

    "primary": "#44ADEE",

    "secondary": "#bfdbfe",

    "accent": "#3b82f6",

    "neutral": "#1A1A1A",

    "base-100": "#FFFFFF",

    "info": "#4AA8BF",

    "success": "#4fad88",

    "warning": "#facc15",

    "error": "#f43f5e",
}

const darkThemeColors = {
    ...themeColors,
    "base-100": 'rgb(53, 54, 58)'
}

module.exports = {
    content: ['./pages/**/*.tsx', './components/**/*.tsx', './layouts/**/*.tsx'],
    darkMode: 'media',//class
    daisyui: {
        themes: [
            {
                light: themeColors,
                dark: darkThemeColors
            },
        ],
    },
    theme: {
        minHeight: {
            '0': '0',
            '1/4': '25%',
            '1/2': '50%',
            '3/4': '75%',
            'full': '100%',
            "screen": '70vh',
        },
        extend: {
            colors: {
                ...themeColors,
                'blue-opaque': 'rgb(13 42 148 / 18%)',
                gray: {
                    0: '#fff',
                    100: '#fafafa',
                    200: '#eaeaea',
                    300: '#999999',
                    400: '#888888',
                    500: '#666666',
                    600: '#444444',
                    700: '#333333',
                    800: '#222222',
                    900: '#111111'
                }
            },
            fontFamily: {
                sans: ['Inter', ...fontFamily.sans]
            },
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        color: theme('colors.gray.700'),
                        a: {
                            color: theme('colors.blue.500'),
                            '&:hover': {
                                color: theme('colors.blue.700')
                            },
                            code: {color: theme('colors.blue.400')}
                        },
                        'h2,h3,h4': {
                            'scroll-margin-top': spacing[32]
                        },
                        thead: {
                            borderBottomColor: theme('colors.gray.200')
                        },
                        code: {color: theme('colors.pink.500')},
                        'blockquote p:first-of-type::before': false,
                        'blockquote p:last-of-type::after': false
                    }
                },
                dark: {
                    css: {
                        color: theme('colors.gray.200'),
                        a: {
                            color: theme('colors.blue.400'),
                            '&:hover': {
                                color: theme('colors.blue.600')
                            },
                            code: {color: theme('colors.blue.400')}
                        },
                        blockquote: {
                            borderLeftColor: theme('colors.gray.700'),
                            color: theme('colors.gray.300')
                        },
                        'h2,h3,h4': {
                            color: theme('colors.gray.100'),
                            'scroll-margin-top': spacing[32]
                        },
                        hr: {borderColor: theme('colors.gray.700')},
                        ol: {
                            li: {
                                '&:before': {color: theme('colors.gray.500')}
                            }
                        },
                        ul: {
                            li: {
                                '&:before': {backgroundColor: theme('colors.gray.500')}
                            }
                        },
                        strong: {color: theme('colors.gray.100')},
                        thead: {
                            th: {
                                color: theme('colors.gray.100')
                            },
                            borderBottomColor: theme('colors.gray.600')
                        },
                        tbody: {
                            tr: {
                                borderBottomColor: theme('colors.gray.700')
                            }
                        }
                    }
                }
            })
        }
    },
    variants: {
        typography: ['dark']
    },
    plugins: [require('@tailwindcss/typography'), require('daisyui')]
};
