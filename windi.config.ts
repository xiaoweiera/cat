import {defineConfig} from 'vite-plugin-windicss'
import colors from 'windicss/colors'
import typography from 'windicss/plugin/typography'
import * as echart from  './src/logic/echarts/colors'


const cssGlobal = {
    bgHui:'#F1F3F5',
    body: '#F6FAFD',
    bodyTwo:'#F8FBFD',
    default: '#253E6F',
    primary: '#2B8DFE',
    highTitle:'#033666', /*3,54,102*/
    mobileBody:'#D8E8FF',
    numGreen:'#00B464',
    numRed:'#E9592D',
    time:'#A2A4A8',
    noSelect:'#A8A8A8',
    white:'#FFFFFF',
    grey: '#7b8db1',
    money: '#F88923',
    disabled: '#cccccc', // 禁用，灰色
    ...echart.tailwind,
}

export default defineConfig({
    darkMode: 'class',
    plugins: [
        typography(),
    ],
    theme: {
        borderRadius:{
            'kd4px':'4px',
            'kd6px':'6px',
            'kd8px':'8px',
            'kd12px':'12px',
            'kd30px':'30px'

        },
        extend: {
            fontSize: {
                'kd10px10px':['10px','10px'],
                'kd20px20px':['20px','20px'],
                'kd11px16px':['11px','16px'],
                'kd14px16px':['14px','16px'],
                'kd14px22px': ['14px', '22px'],
                'kd14px20px': ['14px', '20px'],
                'kd14px35px': ['14px', '25px'],
                'kd12px22px': ['12px', '22px'],
                'kd12px20px': ['12px', '20px'],
                'kd12px18px': ['12px', '18px'],
                'kd18px28px': ['18px', '28px'],
                'kd18px27px': ['18px', '27px'],
                'kd36px':['36px','140%'],
                'kd14px0px':['14px','0px'],
                'kd10px16px':['10px','16px'],
                'kd16px16px':['16px','16px'],
                'kd42px110':['42px','110%'],
                'kd16px150':['16px','150%'],
                'kd15px150':['15px','150%'],
                'kd15px18px':['15px','18px'],
                'kd26px140':['26px','140%'],
                'kd12px16px':['12px','16px'],
                'kd24px30px':['24px','30px'],
                'kd16px24px':['16px','24px'],
                'kd14px18px':['14px','18px'],
                'kd9px14px':['9px','14px'],
                'kd22px28px':['22px','28px'],
                'kd22px26px':['22px','26px'],
                'kd24px150':['24px','150%'],
                'kd24px36px':['24px','36px'],
                'kd24px110':['24px','110%'],
                'kd42px50px':['42px','50px'],
                'kd24px32px':['24px','32px'],
                'kd36px36px':['36px','36px'],
                'kd10px14px':['10px','14px'],
                'kd24px24px':['24px','24px'],
                'kd24px100':['24px','100%'],
                'kd36px140':['36px','140%'],
                'kd20px24px':['20px','24px'],
                'kd24px112':['24px','112'],
                'kd30px28px':['30px','28px'],
                'kd20px28px':['20px','28px'],
                'kd16px160':['16px','160%'],
                'kd14px160':['14px','160%'],
                'kd13px19px':['13px','19px'],
                'kd13px20px':['13px','20px'],
                'kd13px18px':['13px','18px'],
                'kd17px17px':['17px','17px'],
                'kd32px32px':['32px','32px'],
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
                'mx1440': '1440px',
            },
            minWidth:{
                'min288px':'288px',
                'min430px':'430px'
            },
            borderRadius:{
                'kd12px':'12px'
            },
            colors: {
                global: cssGlobal,
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
