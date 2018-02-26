/**
 * Created by azlar on 11/12/15.
 */



// import * as CONST from '../const';

export const MD5 = require("./lib/md5");

const CheckTypes = {
    INT: 1,
    STRING: 2,
    ARRAY: 3,

    PHONE: 51,
    EMAIL: 52,
    DATE: 53,

    __SAFE__: 999
};


export const MONTH_LIST = ["January","February","March","April","May","June","July","August","September", "October","November","December"];
/**
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 * check type
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 */
//class checkType{
//}

export function isNumber(str){
    var n = Number(str);

    return !isNaN(n) && n != '';
}

export function isString(str){
    return Object.prototype.toString.call(str) === '[object String]';
}

export function isArray(obj){
    return Object.prototype.toString.call(obj) === '[object Array]';
}

export function checkMobile(phone) {
    var r = /^1[3,5,7,8]\d{9}$/;
    return r.test(phone);
}

export function isEmail(val){
    return !!(val.match(/\S+@\S+\.\S+/) && val.indexOf(' ') == -1 && val.indexOf('..') == -1);
}



export function isDate(date){
    var parsedDate = Date.parse(date);

    return isNaN(date) && !isNaN(parsedDate);
}

export function check(val, type){
    type = typeof type === 'undefined' ? CheckTypes.STRING : type;

    var pass = false;
    switch (type){
        case CheckTypes.INT:
            pass = isNumber(val);
            break;

        case CheckTypes.STRING:
            pass = isString(val);
            break;

        case CheckTypes.ARRAY:
            pass = isArray(val);
            break;

        case CheckTypes.PHONE:
            pass = checkMobile(val);
            break;

        case CheckTypes.DATE:
            pass = isDate(val);
            break;

        case CheckTypes.EMAIL:
            pass = isEmail(val);
            break;


        case CheckTypes.__SAFE__:
            pass = true;
            break;

        default:
            pass = false;
    }

    return pass;
}


export function validate(validateKeys, params) {
    for (var key in validateKeys){
        if(typeof params[key] == 'undefined' || !check(params[key], validateKeys[key])){
            throw key;
        }
    }
}



/**
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 * other func
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/

export function checkBroswer(){
    var browser={
        versions:function(){
            var u = navigator.userAgent;
            return {         //移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
                iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
        }(),
        language:(navigator.browserLanguage || navigator.language).toLowerCase()
    };

    return browser;
}

export function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) === 'micromessenger';
}

export function generateKey(time){
    // return md5(time + '-' + CONST.TOKEN_KEY + 'qaz');
}


export function beforeToday(d) {
    let date = new Date(d),
        today = new Date(),
        year = parseInt(date[0]), month = parseInt(date[1]) - 1, day = parseInt(date[2]),
        todayYear = today.getFullYear(), todayMonth = today.getMonth(), todayDay = today.getDate();

    if(year < todayYear) {
        return true;
    }

    if(month === todayMonth){
        if(month < todayMonth) {
            return true;
        }

        if(month === todayMonth) {
            return day < todayDay;
        }
    }

    return false;
}

export function isToday(d) {
    let date = new Date(d), today = new Date();

    return date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate();
}

export function showInnerHtml(html){
    return {__html: html};
}

//like add 'selected' class, use 'time' for removing the class
export function addClassForAnimate(dom, className, time) {

    if(!dom.classList.contains(className)) {

        dom.classList.add(className);

        if(typeof time !== 'undefined' && time !== 0) {
            setTimeout(function () {

                dom.classList.remove(className);
            }, time);
        }
    }

}

export const getNextUtil = (dom, to, type = 'ALL') => {
    let result = [];

    to = to.toUpperCase();
    type = type.toUpperCase();

    dom = dom.nextElementSibling || dom.nextSibling;

    while( dom && dom.nodeType === Node.ELEMENT_NODE ) {
        // result.push( node );

        if(dom.nodeName === to) {
            break;
        }

        if(type === 'ALL' || dom.nodeName === type) {
            result.push(dom);
        }
        dom = dom.nextElementSibling || dom.nextSibling;
    }

    return result;
};


/**
 *
 * here is some functions copied from internet
 *
 *
 */
export function isElementInViewport (el) {
    //special bonus for those using jQuery
    // if (typeof jQuery === "function" && el instanceof jQuery) {
    //     el = el[0];
    // }

    let rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}

// from: https://stackoverflow.com/questions/21474678/scrolltop-animation-without-jquery
export function scrollToTop(scrollDuration, target = 0) {
    let cosParameter = window.scrollY / 2,
        scrollCount = 0,
        oldTimestamp = performance.now();

    function step (newTimestamp) {
        scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));
        if (scrollCount >= Math.PI) window.scrollTo(0, 0);
        if (window.scrollY === target) return;


        window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)));
        oldTimestamp = newTimestamp;
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
}


// substr ch & en
export function getCharLength(str) {
    var c = 0.0;
    var unicode = 0;
    if (str == null || str == "") {
        return 0;
    }
    var len = str.length;
    for(var i = 0; i < len; i++) {
        unicode = str.charCodeAt(i);
        if (unicode < 127) { //判断是单字符还是双字符
            c += 1;
        } else {  //chinese
            c += 2;
        }
    }
    return c;
}

//截取字符
export function subStrCh(str, start, end) {
    var  c = 0, strUnicode = '', newStr = '';
    var len = str.length;
    var strLen = getCharLength(str);
    if (start < 0) {
        start = strLen + start;
    }
    if (end < 1) {
        end = strLen + end;// - ((str.charCodeAt(len-1) < 127) ? 1 : 2);
    }

    for(var i = 0; i < len; i++) {
        if (c >= start) {
            break;
        }
        strUnicode = str.charCodeAt(i);
        if (strUnicode < 127) {
            c += 1;
        } else {
            c += 2;
        }
    }

    for(i; i < len; i++) {
        strUnicode = str.charCodeAt(i);
        if (strUnicode < 127) {
            c += 1;
        } else {
            c += 2;
        }
        newStr += str.charAt(i);
        if (c >= end) {
            break;
        }
    }
    return newStr;
}

// generate an uuid
export function uuid() {
    return s4() + s4() + "-" + s4() + "-" + s4() + "-" +
        s4() + "-" + s4() + s4() + s4();
}
function s4() {
    return Math.floor((1 + Math.random()) * 0x10000);
}