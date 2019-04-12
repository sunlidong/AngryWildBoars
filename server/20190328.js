const Koa = require('koa');
const router = require('koa-router')();
const Web3 = require('web3');
const bodyParser = require('koa-bodyparser');
const token_abi = require('../config/token_abi');
const token_address = require('../config/token_address');
var app = new Koa();
var web3_sk;
var Contract_Token;

//测试路由首页
router.get('/', async (ctx) => {
    //test
    ctx.body = "router test"
})

/*      01. 以太币(单)
    01. 币种类型:   以太币
    02. 查询方式:   单个
    03. 查询类型:   开始区块 结束区块
    04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号)
    05. 返回参数:   rows数据
    06. 是否批量:   否
*/
router.post('/test1', async (ctx) => {
    //parmas
    // ctx.body=ctx.request.body;  //获取表单提交的数据
    let res = ctx.request.body;
    let data = {
        url: web3_sk,
        id: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
        stat: "5251538",
        end: "5251542"

    }
    //
    // let data = {
    //     url: web3_sk,
    //     acount: "0x32cda8ca0a0ffa4cb7f40ccc33e007950d96a34f",
    //     start: "4892325",
    //     end: "4892329"
    //
    // };
    let accoutdata = await Controller.getmyAccountdata(
        data.url,//url
        data.id,
        data.stat,
        data.end
    );
    ctx.body = accoutdata;
});

/*      01. 以太币(单) (测试)
    01. 币种类型:   以太币
    02. 查询方式:   单个
    03. 查询类型:   开始区块 结束区块
    04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号)
    05. 返回参数:   rows数据
    06. 是否批量:   否
*/
router.post('/getethone', async (ctx) => {
    //parmas
    // ctx.body=ctx.request.body;  //获取表单提交的数据
    let res = ctx.request.body;
    //
    let state = Common.verification(res);
    if (state != "OK") {
        //
        return state;
    }
    console.log("state:", state)
    //
    let accoutdata = await Controller.getmyAccountdata1(
        web3_sk,//url
        res.Faddress,
        res.FstartBlockNumer,
        res.FendBlockNumber,
        res.type
    );
    ctx.body = accoutdata;
});

/*      01. 以太币(单) (测试)
    01. 币种类型:   以太币
    02. 查询方式:   单个
    03. 查询类型:   开始区块 结束区块
    04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号)
    05. 返回参数:   rows数据
    06. 是否批量:   否
*/
router.post('/gettoken', async (ctx) => {

    console.log(ctx.request.body);
    // ctx.body=ctx.request.body;  //获取表单提交的数据
    let res = ctx.request.body;
    console.log("post parmas  is ok ");

    //TODO
    //jiaoyan
    //func select

    let data = {
        url: web3_sk,
        acount: "0x32cda8ca0a0ffa4cb7f40ccc33e007950d96a34f",
        start: "4892325",
        end: "4892329"

    };
    //
    let accoutdata = await Controller.getmyAccountdata(data.url, data.acount, data.start, data.end);
    ctx.body = accoutdata;
});

/*      04. DRC代币 (单)
    01. 币种类型:   代币
    02. 查询方式:   单个
    03. 查询类型:   开始区块 结束区块
    04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号) 合约实例
    05. 返回参数:   rows数据 数组
    06. 是否批量:   否
*/
router.post('/gettoken201', async (ctx) => {

    console.log(ctx.request.body);
    // ctx.body=ctx.request.body;  //获取表单提交的数据
    let res = ctx.request.body;
    console.log("post parmas  is ok ");

    //TODO
    //jiaoyan
    //func select

    let data = {
        url: web3_sk,
        acount: "0x32cda8ca0a0ffa4cb7f40ccc33e007950d96a34f",
        start: "4892325",
        end: "4892329"

    };
    //
    let accoutdata = await Controller.getTokenmyAccountdata(data.url, data.acount, data.start, data.end);
    ctx.body = accoutdata;
});


/* 区块查询 批量
*/

/*      04. 以太币 (批量)
    01. 币种类型:   代币
    02. 查询方式:   批量
    03. 查询类型:   开始区块 结束区块
    04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号) 多个账户
    05. 返回参数:   rows数据 数组
    06. 是否批量:   否
*/
router.post('/getBatchEthernet', async (ctx) => {
    //参数接收
    let res = ctx.request.body;

    //拼接请求对象

    let requestData = [
        {
            web3Url: web3_sk,
            myAcount: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
            startBlockNumber: "5251538",
            endBlockNumber: "5251542",
            type: 1
        },
        {
            web3Url: web3_sk,
            myAcount: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
            startBlockNumber: "5251538",
            endBlockNumber: "5251542",
            type: 2
        },
        {
            web3Url: web3_sk,
            myAcount: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
            startBlockNumber: "5251538",
            endBlockNumber: "5251542",
            type: 3
        }
    ]


    //调用层函数处理

    let resultData = await Controller.queryBatchProcessingTaifangAddress(requestData);

    //返回 前台结果集
    ctx.body = resultData;
});

/*      05. 以太币 (批量)一个地址 多个区块区间查询
    01. 币种类型:   代币
    02. 查询方式:   批量
    03. 查询类型:   开始区块 结束区块
    04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号) 多个账户
    05. 返回参数:   rows数据 数组
    06. 是否批量:   否
*/
router.post('/getBatchEthernetscope', async (ctx) => {
    //参数接收
    let res = ctx.request.body;

    //拼接请求对象

    let requestData = {
        web3Url: web3_sk,
        myAcount: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
        blockInterval: [
            {startBlockNumber: 5251538, endBlockNumber: 5251542, type: 1},
            {startBlockNumber: 5251538, endBlockNumber: 5251542, type: 2},
            {startBlockNumber: 5251538, endBlockNumber: 5251542, type: 3}
        ]
    }


    //调用层函数处理

    let resultData = await Controller.queryNumberIntervalInformationAddress(requestData);

    //返回 前台结果集
    ctx.body = resultData;
});


/* 时间查询
*/

/*      21. 以太币 (单个)一个地址 时间查询
    01. 币种类型:   代币
    02. 查询方式:   批量
    03. 查询类型:   开始时间 结束时间
    04. 查询参数:   (4)(web3实例@地址@时间查询)
    05. 返回参数:   rows数据 数组
    06. 是否批量:   否
*/
router.post('/getInformation', async (ctx) => {
    //参数接收
    let res = ctx.request.body;

    //拼接请求对象
    // 2019/03/22 10:37:50
    // 2019/03/22 10:38:15
    let requestData = {
        web3Url: web3_sk,
        myAcount: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
        startBlockNumber: "2019/03/22 10:37:50", //2019/3/22 1:0:2
        endBlockNumber: "2019/03/22 10:38:15",
        type: 3
    }
    //时间处理  转换成时间戳
    let startTime = new Date(requestData.startBlockNumber).getTime();
    let endTime = new Date(requestData.endBlockNumber).getTime();
    //
    console.log("startTime =>", startTime);
    console.log("endTime =>", endTime);
    let requestData1 = {
        web3Url: web3_sk,
        myAcount: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
        startBlockNumber: startTime,
        endBlockNumber: endTime,
        type: 2

    }


    //调用层函数处理

    let resultData = await Controller.getsDataForspecifiedTimeAtAddressData(requestData);

    //返回 前台结果集
    ctx.body = resultData;
});

/*      22. 以太币 (单个)多个地址 时间查询
    01. 币种类型:   代币
    02. 查询方式:   批量
    03. 查询类型:   开始时间 结束时间
    04. 查询参数:   (4)(web3实例@地址@时间查询)
    05. 返回参数:   rows数据 数组
    06. 是否批量:   否
*/
router.post('/getInformations', async (ctx) => {
    //参数接收
    let res = ctx.request.body;

    //拼接请求对象
    // 2019/03/22 10:37:50
    // 2019/03/22 10:38:15

    //请求格
    let requestData = {
        web3Url: web3_sk,
        myAcount: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
        blockList: [
            {starTime: "2019/03/22 10:37:50", endTime: "2019/03/22 10:38:15", type: 3},
            {starTime: "2019/03/22 10:37:50", endTime: "2019/03/22 10:38:15", type: 3}

        ],
        type: 3
    }
    // //时间处理  转换成时间戳
    // // let startTime = new Date(requestData.startBlockNumber).getTime();
    // // let endTime = new Date(requestData.endBlockNumber).getTime();
    // // //
    // // console.log("startTime =>", startTime);
    // // console.log("endTime =>", endTime);
    // let requestData1 = {
    //     web3Url: web3_sk,
    //     myAcount: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
    //     startBlockNumber: startTime,
    //     endBlockNumber: endTime,
    //     type: 2
    //
    // }


    //调用层函数处理

    let resultData = await Controller.getsDataForspecifiedTimeAtAddressDatas(requestData);

    //返回 前台结果集
    ctx.body = resultData;
});

/*      23. 以太币 (多个)多个地址 时间查询
    01. 币种类型:   代币
    02. 查询方式:   批量
    03. 查询类型:   开始时间 结束时间
    04. 查询参数:   (4)(web3实例@地址@时间查询)
    05. 返回参数:   rows数据 数组
    06. 是否批量:   否
*/
router.post('/getInformationsmore', async (ctx) => {
    //参数接收
    let res = ctx.request.body;

    //拼接请求对象
    // 2019/03/22 10:37:50
    // 2019/03/22 10:38:15

    //请求格
    let requestData = [
        {
            myAcount: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
            startBlockNumber: "2019/03/22 10:37:50", //2019/3/22 1:0:2
            endBlockNumber: "2019/03/22 10:38:15",
            type: 3
        },
        {
            myAcount: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
            startBlockNumber: "2019/03/22 10:37:50", //2019/3/22 1:0:2
            endBlockNumber: "2019/03/22 10:38:15",
            type: 3
        },
        {
            myAcount: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
            startBlockNumber: "2019/03/22 10:37:50", //2019/3/22 1:0:2
            endBlockNumber: "2019/03/22 10:38:15",
            type: 3
        }
    ]
    //调用层函数处理

    let resultData = await Controller.getsDataForspecifiedTimeAtAddressDatasmore(requestData);

//返回 前台结果集
    ctx.body = resultData;
});


/* DRC代币
*/


/*区块查询
* */

/*      04. DRC代币 (单)
    01. 币种类型:   代币
    02. 查询方式:   单个
    03. 查询类型:   开始区块 结束区块
    04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号) 合约实例
    05. 返回参数:   rows数据 数组
    06. 是否批量:   否
*/
router.post('/gettoken20', async (ctx) => {

    console.log(ctx.request.body);
    // ctx.body=ctx.request.body;  //获取表单提交的数据
    let res = ctx.request.body;
    console.log("post parmas  is ok ");

    //TODO
    //jiaoyan
    //func select

    let data = {
        url: web3_sk,
        acount: "0x32cda8ca0a0ffa4cb7f40ccc33e007950d96a34f",
        start: "4892325",
        end: "4892329"

    };
    //
    let accoutdata = await Controller.getTokenmyAccountdata(data.url, data.acount, data.start, data.end);
    ctx.body = accoutdata;
});

/*      04. DRC代币 (单人多区块)
    01. 币种类型:   代币
    02. 查询方式:   单个
    03. 查询类型:   开始区块 结束区块
    04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号) 合约实例
    05. 返回参数:   rows数据 数组
    06. 是否批量:   否
*/
router.post('/gettoken20dan', async (ctx) => {

    console.log(ctx.request.body);
    // ctx.body=ctx.request.body;  //获取表单提交的数据
    let res = ctx.request.body;
    console.log("post parmas  is ok ");

    //TODO
    //jiaoyan
    //func select

    let resData = {
        url: web3_sk,
        myAcount: "0x32cda8ca0a0ffa4cb7f40ccc33e007950d96a34f",
        data: [
            {startBlockNumber: "4892325", endBlockNumber: "4892329"},
            {startBlockNumber: "4892325", endBlockNumber: "4892329"},
            {startBlockNumber: "4892325", endBlockNumber: "4892329"}

        ]
    };
    //
    let accoutdata = await Controller.getTokenmyAccountdatamany(resData.url, resData.myAcount, resData.data);
    ctx.body = accoutdata;
});

/*      04. DRC代币 (多人多区块)
    01. 币种类型:   代币
    02. 查询方式:   多个
    03. 查询类型:   开始区块 结束区块
    04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号) 合约实例
    05. 返回参数:   rows数据 数组
    06. 是否批量:   否
*/
router.post('/gettoken20mar', async (ctx) => {

    console.log(ctx.request.body);
    // ctx.body=ctx.request.body;   //获取表单提交的数据
    let res = ctx.request.body;
    console.log("post parmas  is ok ");

    //TODO
    //jiaoyan
    //func select
    let data = [
        {
            url: web3_sk,
            acount: "0x32cda8ca0a0ffa4cb7f40ccc33e007950d96a34f",
            start: "4892325",
            end: "4892329"
        },
        {
            url: web3_sk,
            acount: "0x32cda8ca0a0ffa4cb7f40ccc33e007950d96a34f",
            start: "4892325",
            end: "4892329"
        },
        {
            url: web3_sk,
            acount: "0x32cda8ca0a0ffa4cb7f40ccc33e007950d96a34f",
            start: "4892325",
            end: "4892329"
        }
    ]

    //
    let accoutdata = await Controller.getTokenmyAccountdatamore(data);
    //
    ctx.body = accoutdata;
});


/*时间查询
* */

/*      04. DRC代币 (单) 时间
    01. 币种类型:   代币
    02. 查询方式:   单个
    03. 查询类型:   开始区块 结束区块
    04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号) 合约实例
    05. 返回参数:   rows数据 数组
    06. 是否批量:   否
*/
router.post('/gettimetoken20', async (ctx) => {

    console.log(ctx.request.body);
    // ctx.body=ctx.request.body;  //获取表单提交的数据
    let res = ctx.request.body;
    console.log("post parmas  is ok ");

    //TODO
    //jiaoyan
    //func select
    let resposeData = {
        myAcount: "0x32cda8ca0a0ffa4cb7f40ccc33e007950d96a34f",
        startTime: "2019/03/22 10:37:50",
        endTime: "2019/03/22 10:37:50"
    }
    //
    let accoutdata = await Controller.getTimeTokenmyAccountdata(resposeData);
    ctx.body = accoutdata;
});

/*      04. DRC代币 (单人多区块) 时间
    01. 币种类型:   代币
    02. 查询方式:   单个
    03. 查询类型:   开始区块 结束区块
    04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号) 合约实例
    05. 返回参数:   rows数据 数组
    06. 是否批量:   否
*/
router.post('/gettoken20dan', async (ctx) => {

    console.log(ctx.request.body);
    // ctx.body=ctx.request.body;  //获取表单提交的数据
    let res = ctx.request.body;
    console.log("post parmas  is ok ");

    //TODO
    //jiaoyan
    //func select
    let data = [
        {
            myAcount: "0x32cda8ca0a0ffa4cb7f40ccc33e007950d96a34f",
            startTime: "2019/03/22 10:37:50",
            endTime: "2019/03/22 10:37:50"
        },
        {
            myAcount: "0x32cda8ca0a0ffa4cb7f40ccc33e007950d96a34f",
            startTime: "2019/03/22 10:37:50",
            endTime: "2019/03/22 10:37:50"
        },
        {
            myAcount: "0x32cda8ca0a0ffa4cb7f40ccc33e007950d96a34f",
            startTime: "2019/03/22 10:37:50",
            endTime: "2019/03/22 10:37:50"
        }

    ]
    let resposeData = {
        myAcount: "0x32cda8ca0a0ffa4cb7f40ccc33e007950d96a34f",
        list: [
            {
                myAcount: "0x32cda8ca0a0ffa4cb7f40ccc33e007950d96a34f",
                startTime: "2019/03/22 10:37:50",
                endTime: "2019/03/22 10:37:50"
            },
            {
                myAcount: "0x32cda8ca0a0ffa4cb7f40ccc33e007950d96a34f",
                startTime: "2019/03/22 10:37:50",
                endTime: "2019/03/22 10:37:50"
            },
            {
                myAcount: "0x32cda8ca0a0ffa4cb7f40ccc33e007950d96a34f",
                startTime: "2019/03/22 10:37:50",
                endTime: "2019/03/22 10:37:50"
            }

        ]
    }
    //
    let accoutdata = await Controller.getTimeTokenmyAccountdatamany(resposeData);
    ctx.body = accoutdata;
});

/*      04. DRC代币 (多人多区块) 时间
    01. 币种类型:   代币
    02. 查询方式:   多个
    03. 查询类型:   开始区块 结束区块
    04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号) 合约实例
    05. 返回参数:   rows数据 数组
    06. 是否批量:   否
*/
router.post('/gettoken20mar', async (ctx) => {

    console.log(ctx.request.body);
    // ctx.body=ctx.request.body;  //获取表单提交的数据
    let res = ctx.request.body;
    console.log("post parmas  is ok ");

    //TODO
    //jiaoyan
    //func select
    let data = [
        {
            myAcount: "0x32cda8ca0a0ffa4cb7f40ccc33e007950d96a34f",
            startTime: "2019/03/22 10:37:50",
            endTime: "2019/03/22 10:37:50"
        },
        {
            myAcount: "0x32cda8ca0a0ffa4cb7f40ccc33e007950d96a34f",
            startTime: "2019/03/22 10:37:50",
            endTime: "2019/03/22 10:37:50"
        },
        {
            myAcount: "0x32cda8ca0a0ffa4cb7f40ccc33e007950d96a34f",
            startTime: "2019/03/22 10:37:50",
            endTime: "2019/03/22 10:37:50"
        }

    ]
    //
    let accoutdata = await Controller.getTimeTokenmyAccountdatamore(data);
    ctx.body = accoutdata;
});


/*并发测试
* */


/*      04. DRC代币 (多人多区块) 时间
    01. 币种类型:   代币
    02. 查询方式:   多个
    03. 查询类型:   开始区块 结束区块
    04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号) 合约实例
    05. 返回参数:   rows数据 数组
    06. 是否批量:   否
*/
router.post('/TestgetQueryConcurrency', async (ctx) => {

    console.log(ctx.request.body);
    // ctx.body=ctx.request.body;  //获取表单提交的数据
    let res = ctx.request.body;
    console.log("post parmas  is ok ");

    //TODO
    //jiaoyan
    //func select
    let data = [
        {
            myAcount: "0x32cda8ca0a0ffa4cb7f40ccc33e007950d96a34f",
            startTime: "2019/03/22 10:37:50",
            endTime: "2019/03/22 10:37:50"
        },
        {
            myAcount: "0x32cda8ca0a0ffa4cb7f40ccc33e007950d96a34f",
            startTime: "2019/03/22 10:37:50",
            endTime: "2019/03/22 10:37:50"
        },
        {
            myAcount: "0x32cda8ca0a0ffa4cb7f40ccc33e007950d96a34f",
            startTime: "2019/03/22 10:37:50",
            endTime: "2019/03/22 10:37:50"
        }

    ]
    //
    let accoutdata = await Controller.testgetTimeTokenmyAccountdatamore(data);
    ctx.body = accoutdata;
});


/*      04. yitaibi (多人多区块) 时间
    01. 币种类型:   代币
    02. 查询方式:   多个
    03. 查询类型:   开始区块 结束区块
    04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号) 合约实例
    05. 返回参数:   rows数据 数组
    06. 是否批量:   否
*/
router.post('/TestgetQueryyitai', async (ctx) => {

    //
    //参数接收
    let res = ctx.request.body;

    //拼接请求对象
    // 2019/03/22 10:37:50
    // 2019/03/22 10:38:15
    //请求格
    let requestData = [
        {
            myAcount: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
            startTime: "2019/03/22 10:37:50", //2019/3/22 1:0:2
            endTime: "2019/03/22 10:38:15",
            type: 3
        },
        {
            myAcount: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
            startTime: "2019/03/22 10:37:50", //2019/3/22 1:0:2
            endTime: "2019/03/22 10:38:15",
            type: 3
        },
        {
            myAcount: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
            startTime: "2019/03/22 10:37:50", //2019/3/22 1:0:2
            endTime: "2019/03/22 10:38:15",
            type: 3
        }
    ]
    //调用层函数处理
    console.time('showColumnInfo')
    let resultData = await Controller.testytaigetTimeTokenmyAccountdatamore(requestData);
    console.timeEnd('showColumnInfo')
    //
    console.log("前台的数据是", resultData);
    ctx.body = resultData;
});


/*       业务处理
    01. 业务处理:   业务
*/
var Controller = {

    //YTB
    /* 单例处理部分
*
* */

    /*      01. 以太币(单)
        01. 币种类型:   以太币
        02. 查询方式:   单个
        03. 查询类型:   开始区块 结束区块
        04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号)
        05. 返回参数:   rows数据
        06. 是否批量:   否
    */
    getmyAccountdata: async (web3, myaccount, startBlockNumber, endBlockNumber) => {
        let resData = {
            myaddress: "",
            num: 0,
            list: []
        }
        if (endBlockNumber == null) {
            endBlockNumber = await web3.eth.blockNumber;
            console.log("Using endBlockNumber: " + endBlockNumber);
        }
        if (startBlockNumber == null) {
            startBlockNumber = endBlockNumber - 1000;
            console.log("Using startBlockNumber: " + startBlockNumber);
        }
        console.log("Searching for transactions to/from account \""
            + myaccount + "\" within blocks "
            + startBlockNumber
            + " and "
            + endBlockNumber);
        resData.myaddress = myaccount;
        //
        for (var i = startBlockNumber; i <= endBlockNumber; i++) {
            if (i % 1000 == 0) {
                console.log("Searching block " + i);
            }
            //
            var block = await web3.eth.getBlock(i, true);
            // console.log("1", Common.timeConverter(block.timestamp));
            // console.log("1", block.timestamp);
            // console.log("1", i);
            if (block != null && block.transactions != null) {
                block.transactions.forEach(function (e) {
                    //
                    if (myaccount == "*" || myaccount == e.from || myaccount == e.to) {
                        //
                        let rowdata1 = {
                            "txhash": e.hash,
                            "nonce": e.nonce,
                            "blockHash": e.blockHash,
                            "blockNumber": e.blockNumber,
                            "transactionIndex": e.transactionIndex,
                            "from": e.from,
                            "to": e.to,
                            "value": e.value,
                            "time": Common.timeConverter(block.timestamp) + " " + new Date(block.timestamp * 1000).toGMTString(),
                            "gasPrice": e.gasPrice,
                            "gas": e.gas,
                            "input": e.input
                        }
                        //add list
                        console.log("time shjijianchuo :::====", block.timestamp);
                        let row = {"from": e.from, "to": e.to, "row": rowdata1}
                        resData.list.push(row)
                        resData.num += 1;
                    }
                });
            }
        }
        console.log("cort  is ok ")
        return resData;
    },

    /*      02. 以太币(单) (测试)
        01. 币种类型:   以太币
        02. 查询方式:   单个
        03. 查询类型:   开始区块 结束区块
        04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号)
        05. 返回参数:   rows数据
        06. 是否批量:   否
    */
    getmyAccountdata1: async (web3, myaccount, startBlockNumber, endBlockNumber, type) => {
        let resData = {
            myaddress: "",
            num: 0,
            list: []
        }
        if (endBlockNumber == null) {
            endBlockNumber = await web3.eth.blockNumber;
            console.log("Using endBlockNumber: " + endBlockNumber);
        }
        if (startBlockNumber == null) {
            startBlockNumber = endBlockNumber - 1000;
            console.log("Using startBlockNumber: " + startBlockNumber);
        }
        console.log("Searching for transactions to/from account \""
            + myaccount + "\" within blocks "
            + startBlockNumber
            + " and "
            + endBlockNumber);
        resData.myaddress = myaccount;
        //
        if (type == 1) {
            //
            console.log("type=>1")
            //
            for (var i = startBlockNumber; i <= endBlockNumber; i++) {
                if (i % 1000 == 0) {
                    console.log("Searching block " + i);
                }
                //
                var block = await web3.eth.getBlock(i, true);
                if (block != null && block.transactions != null) {
                    block.transactions.forEach(function (e) {
                        //
                        if (myaccount == "*" || myaccount == e.from) {
                            //
                            let rowdata1 = {
                                "txhash": e.hash,
                                "nonce": e.nonce,
                                "blockHash": e.blockHash,
                                "blockNumber": e.blockNumber,
                                "transactionIndex": e.transactionIndex,
                                "from": e.from,
                                "to": e.to,
                                "value": e.value,
                                "time": Common.timeConverter(block.timestamp) + " " + new Date(block.timestamp * 1000).toGMTString(),
                                "gasPrice": e.gasPrice,
                                "gas": e.gas,
                                "input": e.input


                            }
                            //add list
                            let row = {"from": e.from, "to": e.to, "row": rowdata1}
                            resData.list.push(row)
                            resData.num += 1;
                        }
                    });
                }
            }
        } else if (type == 2) {
            for (var i = startBlockNumber; i <= endBlockNumber; i++) {
                if (i % 1000 == 0) {
                    console.log("Searching block " + i);
                }
                //
                var block = await web3.eth.getBlock(i, true);
                if (block != null && block.transactions != null) {
                    block.transactions.forEach(function (e) {
                        //
                        if (myaccount == "*" || myaccount == e.to) {
                            //
                            let rowdata1 = {
                                "txhash": e.hash,
                                "nonce": e.nonce,
                                "blockHash": e.blockHash,
                                "blockNumber": e.blockNumber,
                                "transactionIndex": e.transactionIndex,
                                "from": e.from,
                                "to": e.to,
                                "value": e.value,
                                "time": Common.timeConverter(block.timestamp) + " " + new Date(block.timestamp * 1000).toGMTString(),
                                "gasPrice": e.gasPrice,
                                "gas": e.gas,
                                "input": e.input
                            }
                            //add list
                            let row = {"from": e.from, "to": e.to, "row": rowdata1}
                            resData.list.push(row)
                            resData.num += 1;
                        }
                    });
                }
            }

        } else if (type == 3) {
            for (var i = startBlockNumber; i <= endBlockNumber; i++) {
                if (i % 1000 == 0) {
                    console.log("Searching block " + i);
                }
                //
                var block = await web3.eth.getBlock(i, true);
                if (block != null && block.transactions != null) {
                    block.transactions.forEach(function (e) {
                        //
                        if (myaccount == "*" || myaccount == e.from || myaccount == e.to) {
                            //
                            let rowdata1 = {
                                "txhash": e.hash,
                                "nonce": e.nonce,
                                "blockHash": e.blockHash,
                                "blockNumber": e.blockNumber,
                                "transactionIndex": e.transactionIndex,
                                "from": e.from,
                                "to": e.to,
                                "value": e.value,
                                "time": Common.timeConverter(block.timestamp) + " " + new Date(block.timestamp * 1000).toGMTString(),
                                "gasPrice": e.gasPrice,
                                "gas": e.gas,
                                "input": e.input
                            }
                            //add list
                            let row = {"from": e.from, "to": e.to, "row": rowdata1}
                            resData.list.push(row)
                            resData.num += 1;
                        }
                    });
                }
            }

        }
        console.log("cort  is ok ")
        return resData;
    },


    /* 批量处理部分
*
* */

    /*      21. 以太币(多)
    01. 币种类型:   以太币
    02. 查询方式:   单个
    03. 查询类型:   开始区块 结束区块
    04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号)
    05. 返回参数:   rows数据
    06. 是否批量:   否
*/
    queryBatchProcessingTaifangAddress: async (data) => {
        //声明返回对象
        let resultData =
            {
                myAcount: [],
                num: 0,
                list: []
            }
        console.log("data length is ====", data.length);
        //迭代器处理
        if (data.length != 0) {
            //非空后,循环处理数据
            for (var i = 0; i < data.length; i++) {
                console.log("循环次数是：", i);
                //判断 结束区块是否为空
                if (data[i].endBlockNumber == null) {
                    data[i].endBlockNumber = await data[i].web3Url.eth.blockNumber;
                    console.log("Using endBlockNumber: " + endBlockNumber);
                }
                //判断开始区块是否为空
                if (data[i].startBlockNumber == null) {
                    data[i].startBlockNumber = data[i].endBlockNumber - 1000;
                    console.log("Using startBlockNumber: " + data[i].startBlockNumber);
                }
                //开始查询
                console.log("Searching for transactions to/from account \""
                    + data[i].myAcount + "\" within blocks "
                    + data[i].startBlockNumber
                    + " and "
                    + data[i].endBlockNumber);
                resultData.myAcount.push(data[i].myAcount);
                //声明一个地址对象
                let rowsData = {
                    myAcount: data[i].myAcount,
                    num: 0,
                    rowData: []
                }
                //range
                for (var j = data[i].startBlockNumber; j <= data[i].endBlockNumber; j++) {
                    //区块循环次数
                    console.log("区块循环次数：", i, j)
                    resultData.num += 1;

                    // % 1000
                    if (j % 1000 == 0) {
                        console.log("Searching block " + i);
                    }
                    //获取区块数据 这里是直接获取对应块的数据,此时还没有开始数据过滤
                    var block = await data[i].web3Url.eth.getBlock(j, true);
                    //判断是否获取指定区块的数据
                    if (block != null && block.transactions != null) {

                        //根据类型 分别去查询不同的数据
                        switch (data[i].type) {
                            case 1:
                                if (Common.QuerySourceDataInformationOnly(data[i], block).num != 0) {
                                    rowsData.rowData.push(Common.QuerySourceDataInformationOnly(data[i], block));
                                    //
                                    rowsData.num += 1;
                                }
                                console.log("case 1");
                                break;
                            case 2:
                                if (Common.QueryDestinationDataInformationOnly(data[i], block).num != 0) {
                                    rowsData.rowData.push(Common.QueryDestinationDataInformationOnly(data[i], block));
                                    rowsData.num += 1;
                                }
                                console.log("case 2");
                                break;
                            case 3:
                                if (Common.QueryOnlySourceDestinationDataInformation(data[i], block).num != 0) {
                                    rowsData.rowData.push(Common.QueryOnlySourceDestinationDataInformation(data[i], block));
                                    rowsData.num += 1;
                                }
                                console.log("case 3");
                                break;
                            default:
                                console.log("default");
                                break;
                        }
                    }
                }
                // 装入大数组
                resultData.list.push(rowsData);
                console.log("cort is ok ", i);
            }
        }
        //返回 结果
        return resultData;
    },

    /*      22. 以太币(多) 一个地址,多个区块区间
   01. 币种类型:   以太币
   02. 查询方式:   单个
   03. 查询类型:   开始区块 结束区块
   04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号)
   05. 返回参数:   rows数据
   06. 是否批量:   否
*/
    queryNumberIntervalInformationAddress: async (data) => {
        //声明返回对象
        let resultData =
            {
                myAcount: [],
                num: 0,
                list: []
            }
        console.log("data length is ====", data.blockInterval);
        //迭代器处理
        if (data.length != 0) {
            //非空后,循环处理数据
            resultData.myAcount.push(data.myAcount);
            var myAcout = {
                myAcount: data.myAcount

            }
            for (var i = 0; i < data.blockInterval.length; i++) {
                console.log("循环次数是：", i);
                //判断 结束区块是否为空
                if (data.blockInterval[i].endBlockNumber == null) {
                    data[i].endBlockNumber = await data[i].web3Url.eth.blockNumber;
                    console.log("Using endBlockNumber: " + endBlockNumber);
                }
                //判断开始区块是否为空
                if (data.blockInterval[i].startBlockNumber == null) {
                    data[i].startBlockNumber = data[i].endBlockNumber - 1000;
                    console.log("Using startBlockNumber: " + data[i].startBlockNumber);
                }
                //开始查询
                console.log("Searching for transactions to/from account \""
                    + data.blockInterval[i].myAcount + "\" within blocks "
                    + data.blockInterval[i].startBlockNumber
                    + " and "
                    + data.blockInterval[i].endBlockNumber);

                //声明一个地址对象
                let rowsData = {
                    num: 0,
                    rowData: []
                }
                //range
                for (var j = data.blockInterval[i].startBlockNumber; j <= data.blockInterval[i].endBlockNumber; j++) {
                    //区块循环次数
                    console.log("区块循环次数：", i, j)
                    resultData.num += 1;

                    // % 1000
                    if (j % 1000 == 0) {
                        console.log("Searching block " + i);
                    }
                    //获取区块数据 这里是直接获取对应块的数据,此时还没有开始数据过滤
                    var block = await data.web3Url.eth.getBlock(j, true);
                    //判断是否获取指定区块的数据
                    if (block != null && block.transactions != null) {

                        //根据类型 分别去查询不同的数据
                        switch (data.blockInterval[i].type) {
                            case 1:
                                if (Common.QuerySourceDataInformationOnly(myAcout, block).num != 0) {
                                    rowsData.rowData.push(Common.QuerySourceDataInformationOnly(myAcout, block));
                                    //
                                    rowsData.num += 1;
                                }
                                console.log("case 1");
                                break;
                            case 2:
                                if (Common.QueryDestinationDataInformationOnly(myAcout, block).num != 0) {
                                    rowsData.rowData.push(Common.QueryDestinationDataInformationOnly(myAcout, block));
                                    rowsData.num += 1;
                                }
                                console.log("case 2");
                                break;
                            case 3:
                                if (Common.QueryOnlySourceDestinationDataInformation(myAcout, block).num != 0) {
                                    rowsData.rowData.push(Common.QueryOnlySourceDestinationDataInformation(myAcout, block));
                                    rowsData.num += 1;
                                }
                                console.log("case 3");
                                break;
                            default:
                                console.log("default");
                                break;
                        }
                    }
                }
                // 装入大数组
                resultData.list.push(rowsData);
                console.log("cort is ok ", i);
            }
        }
        //返回 结果
        return resultData;
    },


    /* 时间处理部分
*
* */

    /*      21. 以太币(多) 一个地址,一个时间范围
  01. 币种类型:   以太币
  02. 查询方式:   单个
  03. 查询类型:   开始区块 结束区块
  04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号)
  05. 返回参数:   rows数据
  06. 是否批量:   否
*/
    getsDataForspecifiedTimeAtAddressData: async (data) => {
        //
        //声明返回对象
        console.log("二分查询开始");
        //二分法查询 时间对应的时间戳
        // let maxNumber = await data.web3Url.eth.blockNumber;web3.eth.blockNumber
        let maxNumber = await web3_sk.eth.getBlockNumber();
        console.log("最新的区块高度是：", maxNumber);
        let start = await Common.indexOfSorted(maxNumber, data.startBlockNumber, 1);
        let end = await Common.indexOfSorted(maxNumber, data.endBlockNumber, 2);
        console.log("start:=", start);
        console.log("end:=", end);
        // console.log("end",end)
        //判断返回状态
        if (start.er == "min-1") {
            start = start.mid;
        }
        if (end.er == "max+1") {
            end = end.mid;
        }
        // let res = {}
        // //然后根据开始结束区块去查询
        let resultData = Common.getsTheSpecifiedRangeBlockData(web3_sk, data.myAcount, start, end, data.type);
        //fanhui
        return resultData;
    },

    /*      22. 以太币(多) 一个地址,多个时间范围
  01. 币种类型:   以太币
  02. 查询方式:   单个
  03. 查询类型:   开始区块 结束区块
  04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号)
  05. 返回参数:   rows数据
  06. 是否批量:   否
*/
    getsDataForspecifiedTimeAtAddressDatas: async (data) => {
        //

        //声明返回对象
        let resultData = {
            myAcount: data.myAcount,
            num: 0,
            data: []
        }
        let start = "";
        let end = "";
        //shujujiaoyan
        let maxNumber = await web3_sk.eth.getBlockNumber();
        // console.log("最新的区块高度是：", maxNumber);
        for (var i = 0; i < data.blockList.length; i++) {
            //chaxun
            start = await Common.indexOfSorted(maxNumber, data.blockList[i].starTime, 1);
            //
            end = await Common.indexOfSorted(maxNumber, data.blockList[i].endTime, 2);
            //panduan
            if (start.er == "min-1") {
                start = start.mid;
            }
            if (end.er == "max+1") {
                end = end.mid;
            }


            //panduan
            if (start.er == "min-1") {
                start = start.mid;
            }
            if (end.er == "max+1") {
                end = end.mid;
            }
            //genju ququkuai  gaodu qu chaxun
            // //然后根据开始结束区块去查询
            let res = Common.getsTheSpecifiedRangeBlockData(web3_sk, data.myAcount, start, end, data.type)
            let timeLimit = {
                startTime: data.blockList[i].starTime,
                endTime: data.blockList[i].endTime,
                block: {startBlockNumber: start, endBlockNumber: end},
                data: res
            }
            resultData.data.push(timeLimit);
        }
        return resultData;
    },

    /*      23. 以太币(多) 多个地址,多个时间范围
  01. 币种类型:   以太币
  02. 查询方式:   单个
  03. 查询类型:   开始区块 结束区块
  04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号)
  05. 返回参数:   rows数据
  06. 是否批量:   否
*/
    getsDataForspecifiedTimeAtAddressDatasmore: async (data) => {
//
        //声明返回对象
        let res = [];
        for (var i = 0; i < data.length; i++) {
            console.log("二分查询开始");
            //二分法查询 时间对应的时间戳
            // let maxNumber = await data.web3Url.eth.blockNumber;web3.eth.blockNumber
            let maxNumber = await web3_sk.eth.getBlockNumber();
            console.log("最新的区块高度是：", maxNumber);
            let start = await Common.indexOfSorted(maxNumber, data[i].startBlockNumber, 1);
            let end = await Common.indexOfSorted(maxNumber, data[i].endBlockNumber, 2);
            console.log("start:=", start);
            console.log("end:=", end);
            // console.log("end",end)
            //判断返回状态
            if (start.er == "min-1") {
                start = start.mid;
            }
            if (end.er == "max+1") {
                end = end.mid;
            }
            // let res = {}
            // //然后根据开始结束区块去查询
            let resultData = Common.getsTheSpecifiedRangeBlockData(web3_sk, data.myAcount, start, end, data.type);
            res.push(resultData)

        }

        //fanhui
        console.log("fanhiude shju shi :----------------------------", res);
        return res;
    },


    /*daibi */

    /* 批量处理部分
*
* */

    /*      04. DRC代币 (单人多区块)
    01. 币种类型:   代币
    02. 查询方式:   单个
    03. 查询类型:   开始区块 结束区块
    04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号) 合约实例
    05. 返回参数:   rows数据 数组
    06. 是否批量:   否
*/
    getTokenmyAccountdata: async (web3, acount, startBlockNumber, endBlockNumber) => {
        var res = {
            "row": []
        };
        //

        await Contract_Token.getPastEvents('Transfer', {
            filter: {_from: '0x66A4F55B53Cfd0563a16F40BE7EDF8A07796F692'},
            fromBlock: "4892143",
            toBlock: "4892329",
        }, (error, events) => {
            //TODO
            console.log("events length:", events.length);
            for (let i = 0; i < events.length; i++) {
                var data = events[i];
                var rowdata = {
                    "no": i,
                    "address": data.address,
                    "blockHash": data.blockHash,
                    "blockNumber": data.blockNumber,
                    "logIndex": data.logIndex,
                    "removed": data.removed,
                    "transactionHash": data.transactionHash,
                    "transactionIndex": data.transactionIndex,
                    "id": data.id,
                    "returnValues": {
                        "0": data.returnValues["0"],
                        "1": data.returnValues["1"],
                        "2": data.returnValues["2"],
                        "_from": data.returnValues._from,
                        "_to": data.returnValues._to,
                        "_value": data.returnValues._value
                    },
                    "event": data.event,
                    "signature": data.signature
                };
                //
                // console.log("row",i,res);
                res.row.push(rowdata)
            }
        });
        console.log("res=>", res)
        return res;

    },

    /*      04. DRC代币 (单人多区块)
    01. 币种类型:   代币
    02. 查询方式:   单个
    03. 查询类型:   开始区块 结束区块
    04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号) 合约实例
    05. 返回参数:   rows数据 数组
    06. 是否批量:   否
*/
    getTokenmyAccountdatamany: async (web3, myAcount, res) => {

        //
        let brr = [];
        for (var i = 0; i < res.length; i++) {
            var res = {
                "row": []
            };
            //

            await Contract_Token.getPastEvents('Transfer', {
                filter: {_from: myAcount},
                fromBlock: res[i].startBlockNumber,
                toBlock: res[i].endBlockNumber
            }, (error, events) => {
                //TODO
                console.log("events length:", events.length);
                for (let i = 0; i < events.length; i++) {
                    var data = events[i];
                    var rowdata = {
                        "no": i,
                        "address": data.address,
                        "blockHash": data.blockHash,
                        "blockNumber": data.blockNumber,
                        "logIndex": data.logIndex,
                        "removed": data.removed,
                        "transactionHash": data.transactionHash,
                        "transactionIndex": data.transactionIndex,
                        "id": data.id,
                        "returnValues": {
                            "0": data.returnValues["0"],
                            "1": data.returnValues["1"],
                            "2": data.returnValues["2"],
                            "_from": data.returnValues._from,
                            "_to": data.returnValues._to,
                            "_value": data.returnValues._value
                        },
                        "event": data.event,
                        "signature": data.signature
                    };
                    //
                    // console.log("row",i,res);
                    res.row.push(rowdata);
                    brr.push(res)
                }
            });
            console.log("res=>", res)
        }
        return res;
    },

    /*      07. DRC代币 (多人多区块)
    01. 币种类型:   代币
    02. 查询方式:   单个
    03. 查询类型:   开始区块 结束区块
    04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号) 合约实例
    05. 返回参数:   rows数据 数组
    06. 是否批量:   否
*/
    getTokenmyAccountdatamore: async (parsm) => {
        //
        let brr = [];
        for (var i = 0; i < parsm.length; i++) {
            var res = {
                "row": []
            };
            //
            await Contract_Token.getPastEvents('Transfer', {
                filter: {_from: parsm[i].myAcount},
                fromBlock: parsm[i].startBlockNumber,
                toBlock: parsm[i].endBlockNumber,
            }, (error, events) => {
                //TODO
                console.log("events length:", events.length);
                for (let i = 0; i < events.length; i++) {
                    var data = events[i];
                    var rowdata = {
                        "no": i,
                        "address": data.address,
                        "blockHash": data.blockHash,
                        "blockNumber": data.blockNumber,
                        "logIndex": data.logIndex,
                        "removed": data.removed,
                        "transactionHash": data.transactionHash,
                        "transactionIndex": data.transactionIndex,
                        "id": data.id,
                        "returnValues": {
                            "0": data.returnValues["0"],
                            "1": data.returnValues["1"],
                            "2": data.returnValues["2"],
                            "_from": data.returnValues._from,
                            "_to": data.returnValues._to,
                            "_value": data.returnValues._value
                        },
                        "event": data.event,
                        "signature": data.signature
                    };
                    //
                    // console.log("row",i,res);
                    res.row.push(rowdata)
                }
            });
            brr.push(res);
        }
        return brr;
    },

    /* 时间处理部分
*
* */

    /*      04. DRC代币 (单人多区块) 时间
01. 币种类型:   代币
02. 查询方式:   单个
03. 查询类型:   开始区块 结束区块
04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号) 合约实例
05. 返回参数:   rows数据 数组
06. 是否批量:   否
*/
    getTimeTokenmyAccountdata: async (data) => {
        var res = {
            "row": []
        };
        //首先 要根据时间去获取区块数
        //
        //声明返回对象
        console.log("二分查询开始");
        //二分法查询 时间对应的时间戳
        // let maxNumber = await data.web3Url.eth.blockNumber;web3.eth.blockNumber
        let maxNumber = await web3_sk.eth.getBlockNumber();
        console.log("最新的区块高度是：", maxNumber);
        let start = await Common.indexOfSorted(maxNumber, data.startTime, 1);
        let end = await Common.indexOfSorted(maxNumber, data.endTime, 2);
        console.log("start:=", start);
        console.log("end:=", end);
        // console.log("end",end)
        //判断返回状态
        if (start.er == "min-1") {
            start = start.mid;
        }
        if (end.er == "max+1") {
            end = end.mid;
        }

        //
        await Contract_Token.getPastEvents('Transfer', {
            filter: {_from: data.myAcount},
            fromBlock: start,
            toBlock: end,
        }, (error, events) => {
            //TODO
            console.log("events length:", events.length);
            for (let i = 0; i < events.length; i++) {
                var data = events[i];
                var rowdata = {
                    "no": i,
                    "address": data.address,
                    "blockHash": data.blockHash,
                    "blockNumber": data.blockNumber,
                    "logIndex": data.logIndex,
                    "removed": data.removed,
                    "transactionHash": data.transactionHash,
                    "transactionIndex": data.transactionIndex,
                    "id": data.id,
                    "returnValues": {
                        "0": data.returnValues["0"],
                        "1": data.returnValues["1"],
                        "2": data.returnValues["2"],
                        "_from": data.returnValues._from,
                        "_to": data.returnValues._to,
                        "_value": data.returnValues._value
                    },
                    "event": data.event,
                    "signature": data.signature
                };
                //
                // console.log("row",i,res);
                res.row.push(rowdata)
            }
        });
        console.log("res=>", res)
        return res;

    },

    /*      04. DRC代币 (单人多区块) 时间
    01. 币种类型:   代币
    02. 查询方式:   单个
    03. 查询类型:   开始区块 结束区块
    04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号) 合约实例
    05. 返回参数:   rows数据 数组
    06. 是否批量:   否
*/
    getTimeTokenmyAccountdatamany: async (data) => {
        let brr = [];
        for (var i = 0; i < data.list.lenth; i++) {
            var res = {
                "row": []
            };
            //首先 要根据时间去获取区块数
            //
            //声明返回对象
            console.log("二分查询开始");
            //二分法查询 时间对应的时间戳
            // let maxNumber = await data.web3Url.eth.blockNumber;web3.eth.blockNumber
            let maxNumber = await web3_sk.eth.getBlockNumber();
            console.log("最新的区块高度是：", maxNumber);
            let start = await Common.indexOfSorted(maxNumber, data.list[i].startTime, 1);
            let end = await Common.indexOfSorted(maxNumber, data.list[i].endTime, 2);
            console.log("start:=", start);
            console.log("end:=", end);
            // console.log("end",end)
            //判断返回状态
            if (start.er == "min-1") {
                start = start.mid;
            }
            if (end.er == "max+1") {
                end = end.mid;
            }

            //
            await Contract_Token.getPastEvents('Transfer', {
                filter: {_from: data.list[i].myAcount},
                fromBlock: start,
                toBlock: end,
            }, (error, events) => {
                //TODO
                console.log("events length:", events.length);
                for (let i = 0; i < events.length; i++) {
                    var data = events[i];
                    var rowdata = {
                        "no": i,
                        "address": data.address,
                        "blockHash": data.blockHash,
                        "blockNumber": data.blockNumber,
                        "logIndex": data.logIndex,
                        "removed": data.removed,
                        "transactionHash": data.transactionHash,
                        "transactionIndex": data.transactionIndex,
                        "id": data.id,
                        "returnValues": {
                            "0": data.returnValues["0"],
                            "1": data.returnValues["1"],
                            "2": data.returnValues["2"],
                            "_from": data.returnValues._from,
                            "_to": data.returnValues._to,
                            "_value": data.returnValues._value
                        },
                        "event": data.event,
                        "signature": data.signature
                    };
                    //
                    // console.log("row",i,res);
                    res.row.push(rowdata)
                }
            });
            console.log("res=>", res)
            brr.push(res);
        }
        return res;
    },

    /*      07. DRC代币 (多人多区块) 时间
    01. 币种类型:   代币
    02. 查询方式:   单个
    03. 查询类型:   开始区块 结束区块
    04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号) 合约实例
    05. 返回参数:   rows数据 数组
    06. 是否批量:   否
*/
    getTimeTokenmyAccountdatamore: async (data) => {
        let brr = [];
        for (var i = 0; i < data.lenth; i++) {
            var res = {
                "row": []
            };
            //首先 要根据时间去获取区块数
            //
            //声明返回对象
            console.log("二分查询开始");
            //二分法查询 时间对应的时间戳
            // let maxNumber = await data.web3Url.eth.blockNumber;web3.eth.blockNumber
            let maxNumber = await web3_sk.eth.getBlockNumber();
            console.log("最新的区块高度是：", maxNumber);
            let start = await Common.indexOfSorted(maxNumber, data[i].startTime, 1);
            let end = await Common.indexOfSorted(maxNumber, data[i].endTime, 2);
            console.log("start:=", start);
            console.log("end:=", end);
            // console.log("end",end)
            //判断返回状态
            if (start.er == "min-1") {
                start = start.mid;
            }
            if (end.er == "max+1") {
                end = end.mid;
            }

            //
            await Contract_Token.getPastEvents('Transfer', {
                filter: {_from: data[i].myAcount},
                fromBlock: start,
                toBlock: end,
            }, (error, events) => {
                //TODO
                console.log("events length:", events.length);
                for (let i = 0; i < events.length; i++) {
                    var data = events[i];
                    var rowdata = {
                        "no": i,
                        "address": data.address,
                        "blockHash": data.blockHash,
                        "blockNumber": data.blockNumber,
                        "logIndex": data.logIndex,
                        "removed": data.removed,
                        "transactionHash": data.transactionHash,
                        "transactionIndex": data.transactionIndex,
                        "id": data.id,
                        "returnValues": {
                            "0": data.returnValues["0"],
                            "1": data.returnValues["1"],
                            "2": data.returnValues["2"],
                            "_from": data.returnValues._from,
                            "_to": data.returnValues._to,
                            "_value": data.returnValues._value
                        },
                        "event": data.event,
                        "signature": data.signature
                    };
                    //
                    // console.log("row",i,res);
                    res.row.push(rowdata)
                }
            });
            console.log("res=>", res)
            brr.push(res);
        }
        return res;
    },

    /* 测试处理部分
*
* */
    /*      07. DRC代币 (多人多区块) 时间
01. 币种类型:   代币
02. 查询方式:   单个
03. 查询类型:   开始区块 结束区块
04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号) 合约实例
05. 返回参数:   rows数据 数组
06. 是否批量:   否
*/
    testgetTimeTokenmyAccountdatamore: async (data) => {
        var brr = [];
        let maxNumber = await web3_sk.eth.getBlockNumber();
        await Common.getforlist(data, maxNumber)
            .then(res => {
                    return res;
                }
            );
    },

    /*      07. DRC代币 (多人多区块) 时间
01. 币种类型:   代币
02. 查询方式:   单个
03. 查询类型:   开始区块 结束区块
04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号) 合约实例
05. 返回参数:   rows数据 数组
06. 是否批量:   否
*/
    testytaigetTimeTokenmyAccountdatamore: async (data) => {
        var brr = [];
        let maxNumber = await web3_sk.eth.getBlockNumber();
        console.log("查询的最新区块是：", maxNumber);
        //查询多人多区块
        await Common.getforlist1(data, maxNumber)
            .then(res1 => {
                    brr.push(res1)
                    console.log("的的的", res1);

                }
            );
        return brr;
    }
};

/*       基础业务
    01. 基础业务:   基础业务
*/
var Common = {
    //
    init_web3: (url) => {
        var web3 = new Web3(new Web3.providers.HttpProvider(url));
        return web3;
    },
    timeConverter: (UNIX_timestamp) => {
        var a = new Date(UNIX_timestamp * 1000);
        var year = a.getFullYear();
        var month = a.getMonth() + 1;
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        //
        if (year < 10) {
            // console.log("year", hour);
            year = "0" + year;
        }

        if (month < 10) {
            // console.log("month小于10", month);
            month = "0" + month;
        }

        if (date < 10) {
            // console.log("date小于10", date);
            date = "0" + date;
        }

        if (hour < 10) {
            // console.log("hour小于10", hour);
            hour = "0" + hour;
        }

        if (min < 10) {
            // console.log("min小于10", min);
            min = "0" + min;
        }

        if (sec < 10) {
            // console.log("sec小于10", sec);
            sec = "0" + sec;
        }
        var time = year + '/' + month + '/' + date + ' ' + hour + ':' + min + ':' + sec;
        return time
    },

    /* time 比较,个位处理
    *
    * */
    timeFormatProcessing: (UNIX_timestamp) => {
        //
        var a = new Date(UNIX_timestamp * 1000);
        var year = a.getFullYear();
        var month = a.getMonth() + 1;
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        //做数据处理,如果发生是小于9的要判断,如果小于9比较就会异常，所以要加0
        //if

        if (year < 10) {
            // console.log("year", hour);
            year = "0" + year;
        }

        if (month < 10) {
            // console.log("month小于10", month);
            month = "0" + month;
        }

        if (date < 10) {
            // console.log("date小于10", date);
            date = "0" + date;
        }

        if (hour < 10) {
            // console.log("hour小于10", hour);
            hour = "0" + hour;
        }

        if (min < 10) {
            // console.log("min小于10", min);
            min = "0" + min;
        }

        if (sec < 10) {
            // console.log("sec小于10", sec);
            sec = "0" + sec;
        }
        var time = year + '/' + month + '/' + date + ' ' + hour + ':' + min + ':' + sec;
        return time

    },
    verification: (data) => {
        //
        console.log("start  verification");
        switch (data) {
            case data.Faddress == null || data.Faddress == undefined || data.Faddress == "":
                return Error.Faddress;
            case data.FstartBlockNumer == null | data.FstartBlockNumer == undefined || data.FstartBlockNumer == "":
                return Error.FstartBlockNumer;
            case data.FendBlockNumber == null | data.FendBlockNumber == undefined || data.FendBlockNumber == "":
                return Error.FendBlockNumber;
            case data.type == null | data.type == undefined || data.type == "":
                return Error.type;
            default:
                return "OK";
        }
    },

    /*    时间  query 以太币  查询  只查询 From
    *  ***********************************
    *
    *
    *
    *  01. 币种类型:   以太币
    * */
    queryTimeSourceDataInformationOnly: (data, block) => {
        //声明一个地址对象
        let rowsData = {
            num: 0,
            rowData: []
        }
        //如果对应区块号有数据,那么开始遍历数据过滤
        block.transactions.forEach((e) => {
            //这里要判断他是要查询什么种类
            //判断处理
            if (data.myAcount == "*" || data.myAcount == e.from) {
                // console.log("--type");
                //拼接数据
                let rowrmessage = {
                    "txhash": e.hash,
                    "nonce": e.nonce,
                    "blockHash": e.blockHash,
                    "blockNumber": e.blockNumber,
                    "transactionIndex": e.transactionIndex,
                    "from": e.from,
                    "to": e.to,
                    "value": e.value,
                    "time": Common.timeConverter(block.timestamp) + " " + new Date(block.timestamp * 1000).toGMTString(),
                    "gasPrice": e.gasPrice,
                    "gas": e.gas
                    // "input": e.input
                }
                console.log("---row", rowrmessage);
                //拼接对象
                let row = {
                    'time': Common.timeConverter(block.timestamp),
                    "message": {
                        'from': e.from,
                        'to': e.to,
                    },
                    "row": rowrmessage,
                    "bz": ''
                }
                //存入返回对象
                rowsData.rowData.push(row);
                //rows 数量加1
                rowsData.num += 1;
            }
        });
        //
        // console.log("ProcessingDataCompletion", data.myAcount);
        return rowsData;
    },

    //Query destination data information only
    /*    时间  query 以太币  查询  只查询 to
    *  ***********************************
    *
    *
    *
    *  01. 币种类型:   以太币
    * */
    queryTimeDestinationDataInformationOnly: (data, block) => {
        //声明一个地址对象
        let rowsData = {
            num: 0,
            rowData: []
        }
        //如果对应区块号有数据,那么开始遍历数据过滤
        block.transactions.forEach((e) => {
            //这里要判断他是要查询什么种类
            //判断处理
            if (data.myAcount == "*" || data.myAcount == e.to) {
                // console.log("--type");
                //拼接数据
                let rowrmessage = {
                    "txhash": e.hash,
                    "nonce": e.nonce,
                    "blockHash": e.blockHash,
                    "blockNumber": e.blockNumber,
                    "transactionIndex": e.transactionIndex,
                    "from": e.from,
                    "to": e.to,
                    "value": e.value,
                    "time": Common.timeConverter(block.timestamp) + " " + new Date(block.timestamp * 1000).toGMTString(),
                    "gasPrice": e.gasPrice,
                    "gas": e.gas
                    // "input": e.input
                }
                console.log("---row", rowrmessage);
                //拼接对象
                let row = {
                    'time': Common.timeConverter(block.timestamp),
                    "message": {
                        'from': e.from,
                        'to': e.to,
                    },
                    "row": rowrmessage,
                    "bz": ''
                }
                //存入返回对象
                rowsData.rowData.push(row);
                //rows 数量加1
                rowsData.num += 1;
            }
        });
        //
        console.log("ProcessingDataCompletion", data.myAcount);
        return rowsData;
    },


    /*    时间  query 以太币  查询  只查询 From,to
*  ***********************************
*
*
*
*  01. 币种类型:   以太币
* */
    queryTimeOnlySourceDestinationDataInformation: (data, block) => {
        //声明一个地址对象
        let rowsData = {
            num: 0,
            rowData: []
        }
        //如果对应区块号有数据,那么开始遍历数据过滤
        block.transactions.forEach((e) => {
            //这里要判断他是要查询什么种类
            //判断处理
            if (data.myAcount == "*" || data.myAcount == e.from || data.myAcount == e.to) {
                // console.log("--type");
                //拼接数据
                let rowrmessage = {
                    "txhash": e.hash,
                    "nonce": e.nonce,
                    "blockHash": e.blockHash,
                    "blockNumber": e.blockNumber,
                    "transactionIndex": e.transactionIndex,
                    "from": e.from,
                    "to": e.to,
                    "value": e.value,
                    "time": Common.timeConverter(block.timestamp) + " " + new Date(block.timestamp * 1000).toGMTString(),
                    "gasPrice": e.gasPrice,
                    "gas": e.gas
                    // "input": e.input
                }
                // console.log("---row", rowrmessage);
                //拼接对象
                let row = {
                    'time': Common.timeConverter(block.timestamp),
                    "message": {
                        'from': e.from,
                        'to': e.to,
                    },
                    "row": rowrmessage,
                    "bz": ''
                }
                //存入返回对象
                console.log("查询到的对象是：", row)
                rowsData.rowData.push(row);
                //rows 数量加1
                rowsData.num += 1;
            }
        });
        //
        // console.log("ProcessingDataCompletion", data.myAcount);
        console.log("查询到的是rowsData =", rowsData);
        return rowsData;
    },

    /*    时间  query 以太币  查询  只查询 From,to async
*  ***********************************
*
*
*
*  01. 币种类型:   以太币
* */
    queryTimeOnlySourceDestinationDataInformationasync: async (data, block) => {
        //声明一个地址对象
        let rowsData = {
            num: 0,
            rowData: []
        }
        //如果对应区块号有数据,那么开始遍历数据过滤
        block.transactions.forEach((e) => {
            //这里要判断他是要查询什么种类
            //判断处理
            if (data.myAcount == "*" || data.myAcount == e.from || data.myAcount == e.to) {
                // console.log("--type");
                //拼接数据
                let rowrmessage = {
                    "txhash": e.hash,
                    "nonce": e.nonce,
                    "blockHash": e.blockHash,
                    "blockNumber": e.blockNumber,
                    "transactionIndex": e.transactionIndex,
                    "from": e.from,
                    "to": e.to,
                    "value": e.value,
                    "time": Common.timeConverter(block.timestamp) + " " + new Date(block.timestamp * 1000).toGMTString(),
                    "gasPrice": e.gasPrice,
                    "gas": e.gas
                    // "input": e.input
                }
                // console.log("---row", rowrmessage);
                //拼接对象
                let row = {
                    'time': Common.timeConverter(block.timestamp),
                    "message": {
                        'from': e.from,
                        'to': e.to,
                    },
                    "row": rowrmessage,
                    "bz": ''
                }
                //存入返回对象
                console.log("查询到的对象是：", row)
                rowsData.rowData.push(row);
                //rows 数量加1
                rowsData.num += 1;
            }
        });
        //
        // console.log("ProcessingDataCompletion", data.myAcount);
        console.log("查询到的是rowsData =", rowsData);
        return rowsData;
    },


    /*      query 以太币  查询  只查询 From
*  ***********************************
*
*
*
*  01. 币种类型:   以太币
* */
    QuerySourceDataInformationOnly: (data, block) => {
        //声明一个地址对象
        let rowsData = {
            num: 0,
            rowData: []
        }
        //如果对应区块号有数据,那么开始遍历数据过滤
        block.transactions.forEach((e) => {
            //这里要判断他是要查询什么种类
            //判断处理
            if (data.myAcount == "*" || data.myAcount == e.from) {
                // console.log("--type");
                //拼接数据
                let rowrmessage = {
                    "txhash": e.hash,
                    "nonce": e.nonce,
                    "blockHash": e.blockHash,
                    "blockNumber": e.blockNumber,
                    "transactionIndex": e.transactionIndex,
                    "from": e.from,
                    "to": e.to,
                    "value": e.value,
                    "time": Common.timeConverter(block.timestamp) + " " + new Date(block.timestamp * 1000).toGMTString(),
                    "gasPrice": e.gasPrice,
                    "gas": e.gas,
                    "input": e.input
                }
                console.log("---row", rowrmessage);
                //拼接对象
                let row = {"from": e.from, "to": e.to, "row": rowrmessage}
                //存入返回对象
                rowsData.rowData.push(row);
                //rows 数量加1
                rowsData.num += 1;
            }
        });
        //
        console.log("ProcessingDataCompletion", data.myAcount);
        return rowsData;
    },

    //Query destination data information only

    /*      query 以太币  查询  只查询 to
    *  ***********************************
    *
    *
    *
    *  01. 币种类型:   以太币
    * */
    QueryDestinationDataInformationOnly: (data, block) => {
        //声明一个地址对象
        let rowsData = {
            num: 0,
            rowData: []
        }
        //如果对应区块号有数据,那么开始遍历数据过滤
        block.transactions.forEach((e) => {
            //这里要判断他是要查询什么种类
            //判断处理
            if (data.myAcount == "*" || data.myAcount == e.to) {
                // console.log("--type");
                //拼接数据
                let rowrmessage = {
                    "txhash": e.hash,
                    "nonce": e.nonce,
                    "blockHash": e.blockHash,
                    "blockNumber": e.blockNumber,
                    "transactionIndex": e.transactionIndex,
                    "from": e.from,
                    "to": e.to,
                    "value": e.value,
                    "time": Common.timeConverter(block.timestamp) + " " + new Date(block.timestamp * 1000).toGMTString(),
                    "gasPrice": e.gasPrice,
                    "gas": e.gas,
                    "input": e.input
                }
                console.log("---row", rowrmessage);
                //拼接对象
                let row = {"from": e.from, "to": e.to, "row": rowrmessage}
                //存入返回对象
                rowsData.rowData.push(row);
                //rows 数量加1
                rowsData.num += 1;
            }
        });
        //
        console.log("ProcessingDataCompletion", data.myAcount);
        return rowsData;
    },

    //
    /*      query 以太币  查询  只查询 From,to
*  ***********************************
*
*
*
*  01. 币种类型:   以太币
* */
    QueryOnlySourceDestinationDataInformation: (data, block) => {
        //声明一个地址对象
        let rowsData = {
            num: 0,
            rowData: []
        }
        //如果对应区块号有数据,那么开始遍历数据过滤
        block.transactions.forEach((e) => {
            //这里要判断他是要查询什么种类
            //判断处理
            if (data.myAcount == "*" || data.myAcount == e.from || data.myAcount == e.to) {
                // console.log("--type");
                //拼接数据
                let rowrmessage = {
                    "txhash": e.hash,
                    "nonce": e.nonce,
                    "blockHash": e.blockHash,
                    "blockNumber": e.blockNumber,
                    "transactionIndex": e.transactionIndex,
                    "from": e.from,
                    "to": e.to,
                    "value": e.value,
                    "time": Common.timeConverter(block.timestamp) + " " + new Date(block.timestamp * 1000).toGMTString(),
                    "gasPrice": e.gasPrice,
                    "gas": e.gas,
                    "input": e.input
                }
                console.log("---row", rowrmessage);
                //拼接对象
                let row = {"from": e.from, "to": e.to, "row": rowrmessage}
                //存入返回对象
                rowsData.rowData.push(row);
                //rows 数量加1
                rowsData.num += 1;
            }
        });
        //
        console.log("ProcessingDataCompletion", data.myAcount);
        return rowsData;
    },


    /*二分法 查找  开始时间对应的区块
    *
    *   1.返回对应时间吹的区块
    * */
    indexOfSorted: async (maxNumber, n, state) => {
        //
        //assume : arr has been sorted
        var low = 0;
        var high = maxNumber - 1;
        var led = (low + high) / 2;
        var mid = Math.ceil(led);
        var i = 0;
        //开始
        while (high - low > 1) {
            //如果
            // console.log("rows:" + "mide:" + mid + "high:" + high + "low:" + low);
            let p1 = await Common.getTimestamp(low);
            let p2 = await Common.getTimestamp(high);
            let p3 = await Common.getTimestamp(mid);
            if (n == p1) {
                console.log("返回成功1", low)
                return low;
            }
            if (n == p2) {
                console.log("返回成功2", high)
                return high;
            }
            if (n == p3) {
                console.log("返回成功3", mid)
                return mid;
            }
            if (n > p3) {
                console.log("小了");
                low = mid;
                let sum = (low + high) / 2;
                mid = Math.ceil(sum);
                console.log("转换后的数据是", mid);
            }
            if (n < p3) {
                console.log("大了");
                high = mid;
                let sd = (low + high) / 2
                mid = Math.ceil(sd);
                console.log("转换后的数据是", mid);
            }
            //
        }
        if (static == 1) {
            //+
            return {er: "min-1", mid: mid - 1};
        } else if (static == 2) {
            //-
            return {er: "max+1", mid: mid + 1};
        }
    },

    /*获取区块的时间戳*/
    getTimestamp: async (index) => {
        //
        // console.log("12", index);
        var block = await web3_sk.eth.getBlock(index, true);
        // console.log("block--", block.timestamp);
        // console.log("block--", block);

        // // block.then(value => {
        // //     console.log("block", value);   // p1 resolve
        // // })
        if (block != null && block.transactions != null) {
            let time = Common.timeFormatProcessing(block.timestamp);
            return time;
        }
    },


    /*根据区块范围区间查询关于某人的信息
    *
    * */
    getsTheSpecifiedRangeBlockData: async (web3, myaccount, startBlockNumber, endBlockNumber, type) => {
        //声明一个地址对象
        console.log("据区块范围区间查询关于某人的信息");
        let brr = [];
        let frr = [];
        let rowsData = {
            myAcount: myaccount,
            blocklimited: {startNum: startBlockNumber, endNum: endBlockNumber},
            num: 0,
            rowData: []
        }
        let mydat = {
            myAcount: myaccount

        }
        for (var i = startBlockNumber; i <= endBlockNumber; i++) {
            console.log("i % 1000 == 0");
            if (i % 1000 == 0) {
                console.log("Searching block " + i);
            }
            //2275 skt
            // web3.eth.getBlock(i, true);
            var block = await web3.eth.getBlock(i, true);
            //
            if (block != null && block.transactions != null) {
                //
                switch (type) {
                    case 1:
                        if (Common.queryTimeSourceDataInformationOnly(mydat, block).num != 0) {
                            rowsData.rowData.push(Common.queryTimeSourceDataInformationOnly(mydat, block));
                            //
                            rowsData.num += 1;
                        }
                        // console.log("case 1");
                        break;
                    case 2:
                        if (Common.queryTimeDestinationDataInformationOnly(mydat, block).num != 0) {
                            rowsData.rowData.push(Common.queryTimeDestinationDataInformationOnly(mydat, block));
                            rowsData.num += 1;
                        }
                        console.log("case 2");
                        break;
                    case 3:
                        if (Common.queryTimeOnlySourceDestinationDataInformationasync(mydat, block).num != 0) {
                            //
                            frr.push(Common.queryTimeOnlySourceDestinationDataInformationasync(mydat, block)
                                .then(res => {
                                    rowsData.rowData.push(res);
                                    rowsData.num += 1;
                                })
                                .catch(e => {
                                    console.log("2363", e);
                                }))
                        }
                        // console.log("case 3");
                        break;
                    default:
                        console.log("default");
                        break;
                }


            }
        }

        await Promise.all(frr).then(
            res => {
                console.log("2383")
            }
        )
            .catch(e => {
                console.log("2389", e);
            })
        //
        console.log("区块范围区间查询关于某人的信息", rowsData);
        return rowsData;
    },

    /* 封装单个循环结果
    *
    * */
    getFindIndividualData: async (data, maxNumber) => {
        //二分查找 开始区块 结束区块
        // var res = {
        //     "row": []
        // };
        var resdata = [];
        let brr = [];
        let crr = [];
        let krr = [];
        //首先 要根据时间去获取区块数
        console.log("二分查询开始");
        // console.log("最新的区块高度是：", maxNumber);
        brr.push(Common.indexOfSorted(maxNumber, data.startTime, 1)
            .then(res => {
                crr.push(res);
            })
            .catch(e => {
                console.log(e);
            }));
        brr.push(Common.indexOfSorted(maxNumber, data.endTime, 2)
            .then(res => {
                crr.push(res);

            }).catch(e => {
                console.log(e);
            }));
        //

        // let start = await Common.indexOfSorted(maxNumber, data.startTime, 1);
        // let end = await Common.indexOfSorted(maxNumber, data.endTime, 2);
        //awit
        await Promise.all(brr)
            .then(res => {
                console.log("查询到的开始区块号是：", crr[0]);
                console.log("查询到的结束区块号是：", crr[1]);
                //
                if (crr[1] == "min-1") {
                    crr[1] = start.mid;
                }
                if (crr[2] == "max+1") {
                    crr[2] = end.mid;
                }
                //
                Common.getsTheSpecifiedRangeBlockData(web3_sk, data.myAcount, crr[0], crr[1], data.type)
                    .then(res => {
                        resdata.push(res);
                        //
                        console.log("返回2367111111", res);
                    })
                    .catch(e => {
                        console.log(e);
                        return e;
                    })
            });
        //
        return resdata;
    },


    /* fez*/
    getforlist: async (data, maxNumber) => {
        let ass = [];
        let arr = [];
        for (var i = 0; i < data.length; i++) {
            ass.push(Common.getFindIndividualData(data[i], maxNumber)
                .then(res => {
                    arr.push(res);
                }));
        }
        await Promise.all(ass).then(er => {
            console.log("dfadd", arr);
            return arr
        });
        //
    },

    //处理多个数据
    getforlist1: async (data, maxNumber) => {
        let ass = [];
        let arr = [];
        for (var i = 0; i < data.length; i++) {
            //处理单条数据
            ass.push(Common.getFindIndividualData(data[i], maxNumber)
                .then(res => {
                    console.log("处理单条数据 :", res)
                    arr.push(res);
                }));
        }
        await Promise.all(ass).then(er => {
            console.log('所有的', arr);

        });
        return arr;
    }

}

/*       Web相关
    01. Web相关:   Web相关
*/
var Web3JS = {
    init_web3: () => {
        const url = "https://ropsten.infura.io/v3/ee23e77aa14846d88eb5cad3d59e37f2";
        web3_sk = new Web3(new Web3.providers.HttpProvider(url));
        console.log("web3=>", web3_sk.version);
        web3_sk.eth.defaultAccount = '0x38a8DC14edE1DEf9C437bB3647445eEec06fF105';

    },
    getabitest: () => {
    },
    getContract: () => {
        //
        let Abi_Token = token_abi;
        let Address_Token = token_address.token.address;
        //Token  实例化
        Contract_Token = web3_sk.eth.Contract(Abi_Token, Address_Token, {
            from: '0x38a8DC14edE1DEf9C437bB3647445eEec06fF105',
            gasPrice: '2000000000'
        });

//         const myContract = new web3.eth.Contract([...],
// ˓→'0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe', {
//             from: '0x1234567890123456789012345678901234567891', // default from address
//             gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
//         });
        // TODO:
        console.log("Token合约实例完成");
    }
};

/*       参数集合
    01. 参数集合:   参数集合
*/
var Error = {
    //
    Faddress: {
        status: "nil Faddress",
        msg: "Faddress is nil"
    },
    FstartBlockNumer: {
        status: "nil FstartBlockNumer",
        msg: "FstartBlockNumer is nil"
    },
    FendBlockNumber: {
        status: "nil FendBlockNumber",
        msg: "FendBlockNumber is nil"
    },
    lowBalance: {
        status: "nil Faddress",
        msg: "Faddress is nil"
    },


}


/*       相关启动
    01. 相关启动:   相关启动
*/
Web3JS.init_web3();
Web3JS.getContract();
app.use(bodyParser());
app.use(router.routes());   /*启动路由*/
app.use(router.allowedMethods());
//
app.listen(3000);
console.log("server is starting......");