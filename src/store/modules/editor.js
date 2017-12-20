import common from '../common';
import axios from 'axios'

const state = {
    baseWidgetTitle: '基础组件',
    baseWidgets: [
        ['input', 'text', '文本框', '&#xe600;', true],
        ['radio', '', '选择', '&#xe627;&#xe6dc;', true],
        ['select', '', '下拉', '&#xe6dc;', true],
        ['multiSelect', '', '多行下拉', '&#xe6dc;&#xe6dc;', true],
        ['input', 'dateTime_date', '日期', '&#xe604;', true],
        ['table', '', '表格', '&#xe661;', true],
        ['input', 'number', '数字', '&#xe60b;', true],
        ['score', 'score', '评分', '&#xe623;', true],
        ['sort', '', '排序', '&#xe654;', true],
        ['input', 'currency', '货币', '&#xe6af;', true],
        ['input', 'enclosure', '附件', '&#xe652;', true],
        ['commodity', '', '商品', '&#xe616;', true],
        ['city', '', '城市', '&#xe649;', true],
    ],
    picWidgetTitle: '图片类组件',
    picWidgets: [
        ['pic-upload', '', '图片上传', '&#xe698;'],
        ['pic-select', '', '图片选择', ' &#xe6d3;'],
        ['pic-show', '', '图片展示', '&#xe601;'],
    ],
    auxiliaryTitle: '辅助类组件',
    auxiliarys: [
        ['text-multiple', '', '文本描述', '&#xe7e1;'],
        ['line', '', '分割线',  '&#xe634;'],
        ['paging', '', '分页', '&#xe609;'],
    ],
    contactsTitle: '联系人组件',
    contacts: [
        ['contact', '',  '联系人', '&#xe606;'],
        ['phone', '',  '手机', '&#xe611;'],
        ['email', '',  '邮箱', '&#xe659;'],
        ['company', '',  '公司', '&#xe63f;'],
        ['job', '', '职位', '&#xe678;'],
        ['department', '',  '部门', '&#xe61f;'],
        ['portrait', '',  '头像', '&#xe62f;'],
        ['telephone', '',  '电话', '&#xe647;'],
        ['area', '', '地址', '&#xe624;'],
        ['birthday', '',  '生日', '&#xe63a;'],
        ['link', '', '链接', '&#xe6d4;'],
        ['location', '',  '所在地', '&#xe639;'],
    ],
    imTitle: '即时通讯',
    ims: [
        ['weixin', '', '微信', '&#xe78a;'],
        ['qq', '', 'QQ', '&#xe617;'],
        ['weibo', '', '微博', '&#xe603;'],
    ],
    country: [],
}
// const elementTypes = ['Etext', 'Eradio', 'Eselect', 'EmultiSelect', 'EdateTime_date', 'Enumber', 'Escore'];
let elementTypes = [];
for (let element in state) {
    if (Object.prototype.toString.call(state[element]) === '[object Array]') {
        state[element].forEach(item => {
            if (item[4]) {
                if (item[1]) {
                    elementTypes.push(common.elementPrefix+item[1]);
                } else {
                    elementTypes.push(common.elementPrefix+item[0]);
                }
           }
        });
    }
}

const elementBaseProperty = {
    uuid: 0,
    // 基础设置
    base: {
        required: false,
        // 填写设置
        limit: {
            repeat: true
        },
    },
    // 外观样式
    style: {}
};

const elementProperty = {
    'Etext': {
        base: {
            title: '文本框',
            limit: false,
            name: '文本框', // 元素的名称
            desc: '',
            type: 'input', // 元素的类型
            element: 'text', // 元素的子类型
        },
        style: {
            layout: 'transverse', // transverse or vertical
            width: '20', // 10% - 100%
        },
        property: {
            changeType: {
                name: '切换组件类型',
                type: 'select',
                value: 1,
                data: [
                    {id: 0, value: 1, desc: '单行文本'},
                    {id: 1, value: 2, desc: '多行文本'}
                ]
            }
        }
    },
    'Eenclosure': {
        base: {
            title: '附件',
            limit: false,
            name: '附件', // 元素的名称
            desc: '',
            type: 'input', // 元素的类型
            element: 'text', // 元素的子类型
        },
        style: {
            layout: 'transverse', // transverse or vertical
            width: '20', // 10% - 100%
        },
        property: {
            changeType: {
                name: '切换组件类型',
                type: 'select',
                value: 1,
                data: [
                    {id: 0, value: 1, desc: '单行文本'},
                    {id: 1, value: 2, desc: '多行文本'}
                ]
            }
        }
    },
    'Ecurrency': {
        base: {
            title: '货币',
            limit: false,
            name: '货币', // 元素的名称
            desc: '',
            type: 'input', // 元素的类型
            element: 'currency', // 元素的子类型
        },
        style: {
            layout: 'transverse', // transverse or vertical
            width: '20', // 10% - 100%
        },
        property: {
            changeType: {
                name: '切换组件类型',
                type: 'select',
                value: '¥ 人民币',
                data: ["¥ 人民币", "$ 美元", "€ 欧元", "£ 英镑", "JP¥ 日元", "A$ 澳元", "C$ 加拿大元", "Fr. 瑞士法郎", "HK$ 港币", "฿ 泰铢", "S$ 新加坡元", "kr 瑞典克朗", "kr 挪威克朗", "zł 波兰兹罗提", "kr. 丹麦克朗", "₽ 俄罗斯卢布", "Mex$ 墨西哥比索", "₩ 韩元", "R 南非兰特", "R$ 巴西雷亚尔", "₹ 印度卢比", "RM 马来西亚林吉特", "自定义"]
            }
        },
    },
    'Enumber': {
        base: {
            title: '数字',
            limit: false,
            name: '数字', // 元素的名称
            desc: '',
            type: 'input', // 元素的类型
            element: 'number', // 元素的子类型
        },
        style: {
            layout: 'transverse', // transverse or vertical
            width: '20', // 10% - 100%
        },
        property: {
            lastFix: ''
        }
    },
    'Eradio': {
        base: {
            title: '选择',
            name: '选择',
            type: 'radio',
            element: '',
            desc: '',
        },
        style: {
            layout: 'transverse',
        },
        property: {
            changeType: {
                name: '切换组件类型',
                type: 'select',
                value: 1,
                data: [
                    {id: 0, value: 1, desc: '单选'},
                    {id: 1, value: 2, desc: '多选'}
                ]
            },
            selectContent: {
                name: '选项内容',
                type: 'multi-line-text',
                value: 1,
                count: 3,
                data: [
                    {id: 0, value: 1, desc: '选项1'},
                    {id: 1, value: 2, desc: '选项2'},
                    {id: 2, value: 3, desc: '选项3'},
                ]
            }
        }

    },
    'Escore': {
        base: {
            title: '评分',
            limit: false,
            name: '评分', // 元素的名称
            desc: '',
            type: 'input', // 元素的类型
            element: 'score', // 元素的子类型
        },
        property: {
            icon: 'start',
            maxValue: 5,
            minValue: 0,
            defaultValue: 2,
            limit: 20
        }
    },
    'EdateTime_date': {
        base: {
            name: '日期',
            title: '日期时间',
            type: 'input',
            element: 'datetime_date',
            desc: '',
        },
        property: {
            checkValues: [],
            types: {
                'dateTime': ['YYYYMMdd', 'MMdd', 'dd'],
                'date': ['YYYYMMdd', 'YYYYMM', 'MMdd', 'YYYY', 'MM', 'dd']
            },
            dateTypeNumber: 'dateTime',
            customDefaultTime: '', // 默认时间
            isCustomDefaultTime: false,
            defaultItems: {
                'dateTime': [1, 2, 3],
                'date': [1, 5, 6, 7, 4],
                'time': [1, 2, 3]
            },
            changeTimeType: {
                name: '数据类型',
                data: [
                    {id: 0, value: 'dateTime', desc: '日期+时间'},
                    {id: 1, value: 'date', desc: '日期'},
                    {id: 2, value: 'time', desc: '时间'}
                ],
                value: 'dateTime'
            },
            changeDateFormat: {
                name: '接受的日期格式',
                value: 'YYYYMMdd',
                data: [{desc: '年-月-日', value: 'YYYYMMdd'}, {desc: '年-月', value: 'YYYYMM'}, {desc: '月-日', value: 'MMdd'},
                    {desc: '仅年', value: 'YYYY'}, {desc: '仅月', value: 'MM'}, {desc: '仅日', value: 'dd'},]
            },
            defaultShowTime: {
                name: '默认显示日期时间',
                value: 1,
                data: [{desc: '留空', value: 1}, {desc: '填表当前时间', value: 2}, {desc: '指定时间', value: 3},
                    {desc: '填表当天', value: 5}, {desc: '填表前一天', value: 6}, {desc: '填表后一天', value: 7}, {
                        desc: '指定日期',
                        value: 4
                    }]
            },
            accurateTimeData: {
                name: '时间精确到',
                value: 3,
                data: [{desc: '时', value: 1}, {desc: '分', value: 2}, {desc: '秒', value: 3}]
            },
        }
    },
    'Eselect': {
        base: {
            name: '下拉选择',
            title: '下拉',
            type: 'select',
            element: '',
            value: 1,
            desc: '',
        },
        style: {
            layout: 'transverse',
        },
        property: {
            selects: {
                title: '切换组件类型',
                type: 'multiLineText',
                value: 1,
                count: 3,
                data: [
                    {id: 0, value: 1, desc: '选项1'},
                    {id: 1, value: 2, desc: '选项2'},
                    {id: 2, value: 3, desc: '选项3'},
                ]
            }
        }
    },
    'EmultiSelect': {
        base: {
            name: '多级下拉',
            title: '多级下拉',
            type: 'multiSelect',
            element: '',
        },
        property: {
            tabs: {
                title: '',
                type: 'tab',
                value: '1',
                count: 2,
                data: [
                    {
                        desc: '一级',
                        value: '1'
                    },
                    {
                        desc: '二级',
                        value: '2'
                    }
                ]
            },
            oneLevel: {
                title: '默认提示文字',
                type: 'text',
                value: '请选择'
            },
            twoLevel: {
                title: '默认提示文字',
                type: 'text',
                value: '请选择'
            },
            threeLevel: {
                title: '默认提示文字',
                type: 'text',
                value: '请选择'
            },
            oneSelects: {
                title: '切换组件类型',
                type: 'multiLineText',
                value: '',
                count: 3,
                twoOne: '',
                threeOne: '',
                threeTwo: '',
                data: []
            }
        }
    },
    'Etable': {
        base: {
            name: '表格',
            title: '表格',
            type: 'table',
            element: '',
            desc: ''
        },
        property: {
            maxValue: 5,
            minValue: 0,
            defaultValue: 2,
            limit: 20,
            icon: '',
            selects: {
                name: '切换组件类型',
                title: '切换组件类型',
                type: 'multiLineText',
                value: 'radio',
                count: 3,
                data: [
                    {id: 0, value: 'radio', desc: '表格单选'},
                    {id: 1, value: 'checkbox', desc: '表格多选'},
                    {id: 2, value: 'start', desc: '表格评分'},
                    {id: 3, value: 'fill', desc: '表格填空'},
                ]
            },
            colSelects: {
                title: '题目',
                type: 'multiLineText',
                value: 1,
                count: 3,
                data: [
                    {id: 0, value: 1, desc: '选项1', data: []},
                    {id: 1, value: 2, desc: '选项2', data: []},
                    {id: 2, value: 3, desc: '选项3', data: []},
                ]
            },
            columnSelects: {
                title: '选项',
                type: 'multiLineText',
                value: 1,
                count: 3,
                data: [
                    {id: 0, value: 1, desc: '题目1', data: [ {type:'start'}, {type:'start'}, {type:'start'}]},
                    {id: 1, value: 2, desc: '题目2', data: [ {type:'start'}, {type:'start'}, {type:'start'}]},
                    {id: 2, value: 3, desc: '题目3', data: [ {type:'start'}, {type:'start'}, {type:'start'}]},
                ]
            },
            score: {
            }
        }
    },
    'Esort': {
        base: {
            name: '排序',
            title: '排序',
            type: 'sort',
            element: '',
            desc: ''
        },
        property: {
            selects: {
                title: '选项内容',
                type: 'multiLineText',
                value: 1,
                count: 3,
                data: [
                    {id: 0, value: 1, desc: '选项1'},
                    {id: 1, value: 2, desc: '选项2'},
                    {id: 2, value: 3, desc: '选项3'},
                ]
            }
        }
    },
    'Ecommodity': {
        base: {
            name: '商品',
            title: '商品',
            type: 'commodity',
            element: '',
            desc: ''
        },
        property: {
            list: [
                {
                    name: '商品名',
                    desc: '高富帅喜欢的',
                    money: '20000.00',
                    total: 2,
                    img: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=843493999,2467842738&fm=173&s=3685F90450F2579E9C8C84D6030000B9&w=218&h=146&img.JPG',
                    editor: false
                },
                {
                    name: '商品名',
                    desc: '高富帅喜欢的',
                    money: '20000.00',
                    total: 2,
                    img: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=843493999,2467842738&fm=173&s=3685F90450F2579E9C8C84D6030000B9&w=218&h=146&img.JPG',
                    editor: false
                },
                {
                    name: '商品名',
                    desc: '高富帅喜欢的',
                    money: '20000.00',
                    total: 2,
                    img: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=843493999,2467842738&fm=173&s=3685F90450F2579E9C8C84D6030000B9&w=218&h=146&img.JPG',
                    editor: false
                }
            ]
        }
    },
    'Ecity': {
        base: {
            name: '城市',
            title: '城市',
            type: 'city',
            element: '',
            desc: ''
        },
        property: {
            minLevel: {
                name: '最小层级',
                value: ''
            },
            country: {
                name: '限定国家',
                value: 0
            },
            type:  1 // 1，2 代表下拉选择或输入搜索
        }
    }
}

let elementPropertys = {};
elementTypes.forEach((type, index) => {
    state[type] = Object.assign({}, elementBaseProperty, elementProperty[type]);
});

const getters = {
}

const mutations = {
    setCountry(state, payload) {
        state.country = payload.data;
    }
}

const actions = {
    getAllCountry({ commit }, payload) {
        axios.get('/static/country.json')
            .then((res) => {
                commit('setCountry', { data: res.data.country });
            });
    }
}
export default {
    state,
    getters,
    mutations,
    actions
}