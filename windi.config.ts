import {defineConfig} from 'vite-plugin-windicss'
import colors from 'windicss/colors'
import typography from 'windicss/plugin/typography'

export default defineConfig({
    darkMode: 'class',
    plugins: [
        typography(),
    ],
    theme: {
        extend: {
            fontSize: {
                'kd14px22px': ['14px', '22px'],
                'kd12px22px': ['12px', '22px'],
                'kd36px':['36px','140%'],
                'kd26px140':['26px','140%'],
                'kd12px16px':['12px','16px'],
                'kd24px30px':['24px','30px'],
                'kd16px24px':['16px','24px'],
                'kd14px18px':['14px','18px'],
                'kd24px150':['24px','150%'],
                'kd24px110':['24px','110%']
            },
            fontFamily: {
                "kdFang": 'PingFang SC',
                "kdExp":'D-DIN Exp'
            },
            margin: {
                'kd32px': '32px',
                'kd35px':'35px',
                'kd4px':'4px',
            },
            maxWidth: {
                'mx1440': '1440px'
            },
            minWidth:{
                'min288px':'288px',
                'min430px':'430px'
            },
            borderRadius:{
                'kd12px':'12px'
            },
            colors: {
                global: {
                    body: '#F6FAFD',
                    default: '#253E6F',
                    primary: '#2B8DFE',
                    highTitle:'#033666',
                    mobileBody:'#D8E8FF',

                },
            },
            opacity: {
                85: '.85',
            },
            typography: {
                DEFAULT: {
                    css: {
                        maxWidth: '65ch',
                        color: 'inherit',
                        a: {
                            'color': 'inherit',
                            'opacity': 0.75,
                            'fontWeight': '500',
                            'textDecoration': 'underline',
                            '&:hover': {
                                opacity: 1,
                                color: colors.teal[600],
                            },
                        },
                        b: {color: 'inherit'},
                        strong: {color: 'inherit'},
                        em: {color: 'inherit'},
                        h1: {color: 'inherit'},
                        h2: {color: 'inherit'},
                        h3: {color: 'inherit'},
                        h4: {color: 'inherit'},
                        code: {color: 'inherit'},
                    },
                },
            },
        },
    },
})
