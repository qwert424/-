// 存储方法

// 游戏主方法
function main() {

    // 点击开始按钮后 在初始化
    document.getElementsByClassName('icon-youxi')[0].addEventListener('click', function (e) {

        //1、初始化游戏
        initGame();

        // 2、绑定事件
        bindEvent();

        //图标不显示
        this.style.display = "none";
        e.stopPropagation();

    }, false)

}
main();

// 初始化游戏
function initGame() {

    // 初始化地图 只生成一次 所以不用单独写函数
    for (var i = 0; i < tr; i++) {
        for (var j = 0; j < td; j++) {
            mapDate.push({
                x: j,
                y: i
            })
        }
    }

    // 初始化龙 生成多次 所以单独写函数调用
    initDragon(dragon);

    // 初始化食物 生成多次 所以单独写函数调用
    initFoot(foot);
}

// 初始化龙
function initDragon(dragon) {

    var section = document.getElementsByClassName('section')[0];

    for (var i = 0; i < dragon.dragonPos.length; i++) {

        //判断是不是第一次初始化样式div（即前面定义过的不用重复定义）
        if (!dragon.dragonPos[i].domContent) {

            dragon.dragonPos[i].domContent = document.createElement('div');
            dragon.dragonPos[i].domContent.style.position = "absolute";
            dragon.dragonPos[i].domContent.style.width = dragonbody + 'px';
            dragon.dragonPos[i].domContent.style.height = dragonbody + 'px';
            dragon.dragonPos[i].domContent.style.left = dragon.dragonPos[i].x * dragonbody + "px";
            dragon.dragonPos[i].domContent.style.top = dragon.dragonPos[i].y * dragonbody + "px";
            dragon.dragonPos[i].domContent.style.fontSize = 20 + "px";
            dragon.dragonPos[i].domContent.style.color = "red";
        }

        //判断部位
        if (dragon.dragonPos[i].flag === "head") {
            dragon.dragonPos[i].domContent.className = "iconfont icon-longcemian";
        } else {
            dragon.dragonPos[i].domContent.className = "iconfont icon-redu";
        }

        section.append(dragon.dragonPos[i].domContent);
    }

    var len = dragon.dragonPos.length - 1;
    switch (dragon.dragonPos.dirc) {
        case "up":
            dragon.dragonPos[len].domContent.style.transform = "rotate(90deg)";
            break;
        case "right":
            dragon.dragonPos[len].domContent.style.transform = "rotate(-180deg)";
            break;
        case "down":
            dragon.dragonPos[len].domContent.style.transform = "rotate(-90deg)";
            break;
    }
}

// 初始化食物 随机
function initFoot(foot) {

    var section = document.getElementsByClassName('section')[0];

    // 写一个死循环 不断生成食物 直到满足食物不在龙身上 不在格子外即可
    while (true) {

        foot.x = Math.floor(Math.random() * tr);
        foot.y = Math.floor(Math.random() * td);

        var ifReturn = false;//判断标准

        for (var i = 0; i < dragon.dragonPos.length; i++) {
            if (foot.x === dragon.dragonPos[i].x && foot.y === dragon.dragonPos[i].y) {
                var ifReturn = true;
                break;
            }
        }

        if (!ifReturn) {
            break;
        }

    }

    if (!foot.domContent) {//第一次生成
        foot.domContent = document.createElement('div');
        foot.domContent.style.width = footbody + "px";
        foot.domContent.style.height = footbody + "px";
        foot.domContent.style.position = "absolute";
        foot.domContent.style.fontSize = 20 + "px";
        foot.domContent.style.color = "yellow";
        foot.domContent.className = "iconfont icon-pingguo";
        section.append(foot.domContent)
    }

    foot.domContent.style.left = foot.x * footbody + "px";
    foot.domContent.style.top = foot.y * footbody + "px";

}

// 绑定事件 
function bindEvent() {

    // 按键绑定
    document.addEventListener('keydown', dragonkey, false)

    //计时器开始游戏
    setTimeout("start()", timeout);

    // 恢复游戏
    var stop = document.getElementsByClassName('icon-zanting')[0];
    stop.addEventListener('click', againGame, false);
}

function start() {
    // 全局暂停功能
    document.addEventListener('click', stopGame, false);
    startGame();
}

// 方向
function dragonkey(e) {
    switch (e.key) {
        case "ArrowUp":
        case "W":
        case "w":
            dragon.dragonPos.dirc = "up";
            break;

        case "ArrowDown":
        case "S":
        case "s":
            dragon.dragonPos.dirc = "down";
            break;

        case "ArrowRight":
        case "D":
        case "d":
            dragon.dragonPos.dirc = "right";
            break;

        case "ArrowLeft":
        case "A":
        case "a":
            dragon.dragonPos.dirc = "left";
            break;
    }
}

// 删除
function dragonDel(oldHead) {
    var section = document.getElementsByClassName('section')[0];
    oldHead.flag = "body";
    section.removeChild(dragon.dragonPos[0].domContent)
    dragon.dragonPos.shift();
}

// 添加
function dragonUnshift(oldHead) {
    var Dragon = dragon.dragonPos;
    Dragon.unshift({ x: Dragon[0].x, y: Dragon[0].y, domContent: "", flag: 'body' })
    oldHead.flag = "body";
    initDragon(dragon);
}

// 龙向上
function dragonUp(oldHead) {
    dragon.dragonPos.push(
        { x: oldHead.x, y: oldHead.y - 1, domContent: "", flag: "head" }
    )
}

// 龙向下
function dragonDown(oldHead) {
    dragon.dragonPos.push(
        { x: oldHead.x, y: oldHead.y + 1, domContent: "", flag: "head" }
    )
}

// 龙向右
function dragonRight(oldHead) {
    dragon.dragonPos.push(
        { x: oldHead.x + 1, y: oldHead.y, domContent: "", flag: "head" }
    )
}

// 龙向左
function dragonLeft(oldHead) {
    dragon.dragonPos.push(
        { x: oldHead.x - 1, y: oldHead.y, domContent: "", flag: "head" }
    )
}

function ifBoom(oldHead) {

    var len = dragon.dragonPos.length - 1,
        headX = dragon.dragonPos[len].x,
        headY = dragon.dragonPos[len].y,
        boom = false;

    for (var i = 0; i < len; i++) {
        if ((headX === dragon.dragonPos[i].x && headY === dragon.dragonPos[i].y) || headX < 0 || headX > 29 || headY < 0 || headY > 29) {
            boom = true;
            if (window.confirm("您的游戏结束，共获得" + score + "分,是否重新游戏❓")) {
                var section = document.getElementsByClassName('section')[0];
                var button = section.getElementsByClassName('icon-youxi')[0];
                var button1 = section.getElementsByClassName('icon-zanting')[0];
                section.innerHTML = ""
                section.appendChild(button)
                section.appendChild(button1)
                //重新初始化
                dragon = {
                    dragonPos: [//初始化龙的位置
                        //domcent 为了生成dom节点 flag区分身体与头部
                        { x: 29, y: 0, domContent: "", flag: 'body' },
                        { x: 28, y: 0, domContent: "", flag: 'body' },
                        { x: 27, y: 0, domContent: "", flag: 'body' },
                        { x: 26, y: 0, domContent: "", flag: 'head' },
                    ],
                    dirc: "left"
                };
                foot = {
                    x: 0, y: 0, domContent: ""
                };
                time = 500;
                count = 0;
                button.style.display = "block";
                clearInterval(setIntervalStop);
                clearInterval(setIntervalStop1);
                document.removeEventListener('click', stopGame, false);
                document.removeEventListener('keydown', dragonkey, false);
                var stop = document.getElementsByClassName('icon-zanting')[0];
                stop.EventListener('click', againGame, false);
                main()
                break;
            } else {
                // 将监听事件取消即可
                document.removeEventListener('keydown', dragonkey, false);
                document.removeEventListener('click', stopGame, false);
                clearInterval(setIntervalStop);
                clearInterval(setIntervalStop1);
                break;
            }
        } else if (headX === foot.x && headY === foot.y) {
            initFoot(foot)
            dragonUnshift(oldHead);
            score++;
        }
    }

    if (!boom) {
        dragonDel(oldHead);
        initDragon(dragon);
    }

}

// 开始游戏
function startGame() {
    setIntervalStop = setInterval(move, time)
}

// 移动
function move() {

    var len = dragon.dragonPos.length,
        oldHead = dragon.dragonPos[len - 1];

    switch (dragon.dragonPos.dirc) {
        case "up":
            dragonUp(oldHead);
            break;
        case "right":
            dragonRight(oldHead);
            break;
        case "down":
            dragonDown(oldHead);
            break;
        default:
            dragonLeft(oldHead);
    }
    if (len == 7 && count == 0) {
        clearInterval(setIntervalStop);
        time = 400;
        setIntervalStop1 = setInterval(move, time)
        count++;
    } else if (len == 13 && count == 1) {
        clearInterval(setIntervalStop1);
        time = 200;
        setIntervalStop1 = setInterval(move, time)
        count++;
    }
    ifBoom(oldHead);

}

// 暂停游戏
function stopGame() {
    document.getElementsByClassName('icon-zanting')[0].style.display = "block";
    clearInterval(setIntervalStop);
    clearInterval(setIntervalStop1);
}

// 再次游戏
function againGame(e) {
    this.style.display = "none";
    e.stopPropagation();
    startGame();
}

// 提示显示
function mess() {
    setIntervalStop2 = setInterval(function () {
        if (innerWidth <= 1230) {
            document.getElementById('message').style.display = "none"
        } else {
            document.getElementById('message').style.display = "block"
        }
    }, time)
}
mess()