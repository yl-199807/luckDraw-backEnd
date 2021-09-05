const express = require("express");
const fs = require("fs");
// const path = require('path');
// const router = express.Router();
const app = express();
const port = 3002;  // 设置端口

const prizelist = "/prize.json"

//设置跨域访问
app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", " 3.2.1");
    res.header("Content-Type", "application/json;charset=utf-8");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    next();
});

//奖品接口
app.get('/api/prize', (req, res) => {
    let prizeList = JSON.parse(fs.readFileSync(__dirname + prizelist, {
        encoding: 'utf8',
        flag: 'r'
    }))['prizeList']
    res.json({
        code: 200,
        prizeList
    });
});

//登陆接口，待完成
app.get('/api/login', (req, res) => {
    const {
        username,
        password
    } = req.query
    if (username === 'admin' && password === '123456') {
        res.json({
            code: 0,
            message: '登陆成功',
            token: username + '-' + (new Date().getTime() + 60 * 60 * 1000) //token过期时间1个小时
        })
    } else {
        res.json({
            code: 1,
            message: '账号或密码错误'
        })
    }
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
