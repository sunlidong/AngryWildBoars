//引入 Koa
const koa = require('koa2');
const Web3 = require('web3');
const router = require('koa-router')();
var bodyParser = require('koa-bodyparser');
const app = new koa();

//
var web3_sk;
//
var Web3JS = {
    init_web3: () => {
        const url = "https://ropsten.infura.io/v3/ee23e77aa14846d88eb5cad3d59e37f2"
        web3_sk = new Web3(new Web3.providers.HttpProvider(url));
        console.log("web3=>", web3_sk.version)
        console.log("11");
    },
    getabi: () => {
    }
}

// router
var Router1 = {

    router_get: () => {
        //
        router.get('/', (ctx, next) => {
            ctx.body = "调用D_multiSendandself结果是=>";
        });
        router.get('/ad', (ctx, next) => {
            // TODO:
            ctx.body = "测试路由";
        });
    },
    router_post: () => {

        router.post('/book', (ctx,next) => {
            //
            let res = ctx.request.body;
            console.log("post parmas is=>", data);

            //TODO
            //jiaoyan
            //func select


            let data  ={
                url:web3_sk,
                acount:"0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
                start:"5251537",
                end:"5251542"

            };
            //
            console.log("4");
            Controller.getmyAccountdata(data.url,data.acount,data.start,data.end);
            console.log("9")
            ctx.body = "调用D_multiSendandself结果是=>";
        });
    }
}

//conter
var Controller = {
    //
    getmyAccountdata: async (web3,myAcount, startBlockNumber, endBlockNumber) => {
        console.log("post parmas is=>", data);
        if (endBlockNumber == null) {
            endBlockNumber = await web3.eth.blockNumber;
            console.log("Using endBlockNumber: " + endBlockNumber);
        }
        if (startBlockNumber == null) {
            startBlockNumber = endBlockNumber - 1000;
            console.log("Using startBlockNumber: " + startBlockNumber);
        }
        console.log("Searching for transactions to/from account \"" + myaccount + "\" within blocks " + startBlockNumber + " and " + endBlockNumber);

        for (var i = startBlockNumber; i <= endBlockNumber; i++) {
            if (i % 1000 == 0) {
                console.log("Searching block " + i);
            }
            //
            var block = await web3.eth.getBlock(i, true);
            if (block != null && block.transactions != null) {
                block.transactions.forEach(function (e) {
                    if (myaccount == "*" || myaccount == e.from || myaccount == e.to) {
                        console.log(" tx hash : " + e.hash + "\n"
                            + " nonce : " + e.nonce + "\n"
                            + " blockHash : " + e.blockHash + "\n"
                            + " blockNumber : " + e.blockNumber + "\n"
                            + " transactionIndex: " + e.transactionIndex + "\n"
                            + " from : " + e.from + "\n"
                            + " to : " + e.to + "\n"
                            + " value : " + web3.utils.fromWei(e.value.toString()) + "\n"
                            + " time : " + timeConverter(block.timestamp) + " " + new Date(block.timestamp * 1000).toGMTString() + "\n"
                            + " gasPrice : " + e.gasPrice + "\n"
                            + " gas : " + e.gas + "\n"
                            + " input : " + e.input
                            + "--------------------------------------------------------------------------------------------"
                        );
                    }
                })
            }
        }

    },
    gettestdat: () => {
        console.log("1")
    }

}

//commit
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
        var time = year + '/' + month + '/' + date + ' ' + hour + ':' + min + ':' + sec;
        return time
    }
}

//init
var Init = {
    init: () => {
        //
        Web3JS.init_web3();
        console.log("init web3 is ok ");
        //监听端口
        app.use(bodyParser());
        app.use(router());
        // app.use(router.allowedMethods());
        app.use(bodyParser());
        Router1.router_get();
        Router1.router_post();
        app.listen(3000,()=>{
            console.log('starting at port 3000');
        });

    }
}
var Koa2 = {
    use:()=>{
        app.use(bodyParser());
        app.use(router.routes());   /*启动路由*/
        app.use(router.allowedMethods());
    },
    listen:()=>{
        app.listen(3000);
    }
}


//starting
Init.init();






