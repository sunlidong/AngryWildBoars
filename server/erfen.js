// var indexOfSorted = function f(arr,n){
//     //assume : arr has been sorted
//     var low = 0;
//     var high = arr.length - 1;
//     var mid = (low + high) / 2;
//
//     while(high - low > 1){
//         if(n == arr[low]){return low;}
//         if (n == arr[high]){return high;}
//         if(n == arr[mid]){return mid;}
//         if(n > arr[mid]){
//             low = mid;
//             mid = (low + high) / 2;
//             console.log("1",mid);
//         }
//         if(n < arr[mid]){
//             high = mid;
//
//             mid = (low + high) / 2;
//             console.log("2",mid);}
//     }
//
//     return -1;
//
// }
//
//
// var sortedArr = new Array(1,4,7,9,11,12,21,26,33);
//
// console.log(indexOfSorted(sortedArr,12));

//
// var st="2009/10/20 11:38:40";

//
// var b = "1553187602";
// let c = timeConverter1(b);
// console.log("1123", c);
//
// // var et="2019/3/22 10:37:2";
// var et = c;
// var st = "2019/03/24 01:00:01";
//
// if (st < et) {
//     console.log("stxiao");
//
// } else if (st > et) {
//     console.log("etxiao");
// } else if (st = et) {
//     console.log("et=st");
// }
//
// //
// function timeConverter1(UNIX_timestamp) {
//     //
//     var a = new Date(UNIX_timestamp * 1000);
//     var year = a.getFullYear();
//     var month = a.getMonth() + 1;
//     var date = a.getDate();
//     var hour = a.getHours();
//     var min = a.getMinutes();
//     var sec = a.getSeconds();
//     //if
//
//     if (year < 10) {
//         console.log("year", hour);
//         year = "0" + year;
//     }
//
//     if (month < 10) {
//         console.log("month小于10", month);
//         month = "0" + month;
//     }
//
//     if (date < 10) {
//         console.log("date小于10", date);
//         date = "0" + date;
//     }
//
//     if (hour < 10) {
//         console.log("hour小于10", hour);
//         hour = "0" + hour;
//     }
//
//     if (min < 10) {
//         console.log("min小于10", min);
//         min = "0" + min;
//     }
//
//     if (sec < 10) {
//         console.log("sec小于10", sec);
//         sec = "0" + sec;
//     }
//
//     var time = year + '/' + month + '/' + date + ' ' + hour + ':' + min + ':' + sec;
//     // var k = new Date(time);
//     return time;
//
// };
// var func = () => ({foo: 1}); //正确
// let func1 = async () => {
//     setTimeout(() => {
//         console.log("aaaaaa")
//     }, 3000)
// }
//
// let func2 = async () => {
//     setTimeout(() => {
//         console.log("bbbbbb")
//     }, 3000)
// }
//
// let func3 = async () => {
//     setTimeout(() => {
//         console.log("bbbbbb")
//     }, 5000)
// }
// async  function action (){
//     func1();
//     await func2();
//     console.log("await")
// }
//
// action().then(a=>{
//     console.log("lllll")
//
// });

// async function helloWorld() {
//     return 'hello world'
// }
// // helloWorld().then(result => {
// //     console.log(result);
// // })
// // console.log('虽然在后面，但是我先执行');
//
// //
// let brr=[];
// async function adf() {
//     for (var i = 0; i < 20; i++) {
//         console.log("===", i)
//        await select(i).then(res => {
//             let row = {id: i, data: res}
//             brr.push(row)
//         });
//     }
// }
// adf();
// var shuzu =[];
// var  sdb=[];
//
//   function select(data) {
//     let arr = [];
//     for (var i=0;i<5;i++){
//         arr.push(i)
//     }
//       sdb.push(arr)
//
// }
// async function mainnew() {
//     for (var i =0;i<20;i++){
//         shuzu.push(select(i));
//
//     }
// }
// mainnew();
//
// Promise.all(shuzu);
// // console.log("arrr",shuzu);
// console.log("arrr",sdb);
//
// //
// const p1 = new Promise(function(resolve,reject){
//     resolve("success1");
//     resolve("success1");
//
// });
// const p2 = new Promise(function(){
//     resolve("success3");
//     reject('reject');
// });
//
// p1.then(function(value){
//     console.log(value);
// });
//
// p2.then(function(value){
//     console.log(value);
//
// })
// const p1 = new Promise(function(resolve,reject){
//     resolve('success1');
//     resolve('success2');
// });
//
// const p2 = new Promise(function(){
//     resolve('success3');
//     reject('reject');
// });
//
// p1.then(function(value){
//     console.log(value); // success1
// });
// p2.then(function(value){
//     console.log(value); // success3
// });

// const p = new Promise(function(resolve,reject){
//     resolve('success');
// });
//
// p.then(function(value){
//     console.log(value);
// });
//
// console.log('first');
// // first
// // success

// var shuzu =[];
// var  sdb=[];
//  async function select(data) {
//     let arr = [];
//     for (var i=0;i<data;i++){
//         arr.push(i)
//     }
//     return arr;
// }
// // let ac =[];
// async function mainnew() {
//     let ac =[];
//     for (var i =0;i<20;i++){
//         select(i).then(res=>{
//             console.log("test",i,ac.push(res),"ffff")
//         })
//     }
//     return ac ;
// }
// async function na(){
//    let c =  await mainnew();
//      console.log("cc",c)
//
// }
// na();
const fetch = require('node-fetch')
const bluebird  = require('bluebird')

async function getZhihuColumn(id) {
    await bluebird.delay(1000)
    const url = `https://zhuanlan.zhihu.com/api/columns/${id}`
    const response = await fetch(url)
    return await response.json()
}

const showColumnInfo = async() => {
    console.time('showColumnInfo')

    const names = ['qianduanzhidian', 'FrontendMagazine']
    const promises = names.map(x => getZhihuColumn(x))
    for (const promise of promises) {
        const column = await promise
        console.log(`name:${column.name}`)
        console.log(`description:${column.description}`)
    }
    console.timeEnd('showColumnInfo') // 2615.484ms
}
const showColumnInfo2 = async() => {
    console.time('showColumnInfo2')

    const names = ['qianduanzhidian', 'FrontendMagazine']
    for (const name of names) {
        const column = await getZhihuColumn(name)
        console.log(`name:${column.name}`)
        console.log(`description:${column.description}`)
    }
    console.timeEnd('showColumnInfo2') // 4757.181ms
}

showColumnInfo2()

showColumnInfo();