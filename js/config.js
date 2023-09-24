//游戏相关配置文件 
// 存储数值

// 生成地图网格 30*30 
var mapDate = [],
    tr = 30,
    td = 30;

// 生成龙数值
var dragonbody = 20;//定义div宽高

var dragon = {
    dragonPos: [//初始化龙的位置
        //domcent 为了生成dom节点 flag区分身体与头部
        { x: 29, y: 0, domContent: "", flag: 'body' },
        { x: 28, y: 0, domContent: "", flag: 'body' },
        { x: 27, y: 0, domContent: "", flag: 'body' },
        { x: 26, y: 0, domContent: "", flag: 'head' },
    ],
    dirc: "left"
}

// 生成食物数值
var footbody = 20,//定义div宽高
    footCount = 0;//食物数量

var foot = {
    x: 0, y: 0, domContent: ""
}


// 得分
var score = 0;

// 停止计时器
var setIntervalStop = null;
var setIntervalStop1 = null;
var setIntervalStop2 = null;

var time = 500;
var timeout = 1500;

var count = 0;

