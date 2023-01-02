const {spacing, fontFamily} = require('tailwindcss/defaultTheme');

// https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/defaultConfig.stub.js#L7
const themeColors = {
    "primary": "#35A8F3",

    "secondary": "#67C0F9",

    "accent": "#FFA12B",

    "neutral": "#3f3f3f",
    "neutral-content":"#fff",

    "base-100": "#FFFFFF",

    "info": "#8ECFF9",

    "success": "#45B881",

    "warning": "#facc15",

    "error": "#f43f5e",
}

const darkThemeColors = {
    ...themeColors,
    "base-100": 'rgb(53, 54, 58)',
    "neutral": "#e7e7e7",
    "neutral-content":"#1A1A1A"
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
        extend: {
            width:{
                basic: '480px',
            },
            height:{
                basic: '550px',
            },
            minWidth:{
                basic: '480px',
            },
            minHeight: {
                basic: '600px',
                '0': '0',
                '1/4': '25%',
                '1/2': '50%',
                '3/4': '75%',
                'full': '100%',
                "screen": '100vh',
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
