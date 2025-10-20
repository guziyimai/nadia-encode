﻿//是否是IE
//@author guziyimai
getObj("waringDiv").style.opacity=0;
var waringStr,isLowIE;
/**
 * 给SB的IE用的！！！
 * @author guziyimai
 */
try{
	new RegExp("(?<!.)");
}catch(e1){
	isSBIE=true;//不支持断言的，等同于SB的IE浏览器。
}
try{
	"".indexOf("");
}catch(e2){
	isLowIE=true;//IE8以下
}
try{
	"".replaceAll("","");
}catch(e3){
	//不支持replaceAll的弱智
	String.prototype.replaceAll=function(a,b){
		return this.split(a).join(b);
	};
}
try{
	document.getElementsByClassName("menuDiv");
}catch(e4){
	isLowIE=true;//IE8以下
	var children=document.getElementsByTagName('*');
	document.getElementsByClassName=function(className){
		var elements=new Array();
		for (var i=0; i<children.length; i++){
			var child=children[i];
			var classNames=child.className.split(' ');
			for (var j=0; j<classNames.length; j++){
				if (classNames[j] == className){
					elements.push(child);
					break;
				}
			}
		} 
		return elements;
	};
}

/**
 * 获取元素
 * @author guziyimai
 */
function getObj(id,type){
	if(type==1){
		return document.getElementsByTagName(id);
	} else if(type==2){
		return document.getElementsByClassName(id);
	} else {
		return document.getElementById(id);
	}
}

if(isWin)getObj("helpTxt",2)[8].innerHTML="4、可整合到 Infinity、WeTab等插件的自定义搜索引擎中，地址添加后缀【?s=%s】即可。";
getObj("menuDiv",2)[0].style.display="block";

/**
 * Base64编码和解码
 * @author guziyimai
 */
try{
	window.btoa("");
	window.Base64={
		encode : function (str) {
			return window.btoa(unescape(encodeURIComponent(str)));
		},
		decode : function (str) {
			//多支持了一种SB的base64变种
			var str2=decodeURIComponent(escape(window.atob(str)));
			var regu=/(%u[0-9a-f]{4}|%[0-9a-f]{2})/i;
			if(regu.test(str2)) {
				var tem=unescape(window.atob(str));
				//2次校验（防止将AES误当base64解出乱码）
				if(!regu.test(tem)&&window.btoa(escape(tem)).replace(/={1,3}$/, '')==str.replace(/={1,3}$/, '')){
					str2=tem;
				} else str2='';
			} else if (Base64.encode(str2).replace(/={1,3}$/, '') != str.replace(/={1,3}$/, '')) new Error("base64 error");
			return str2;
		}
	}
} catch(e){
	/**
	 * IE9以下兼容或不支持btoa的弱智
	 * @author https://blog.csdn.net/qq_34039868/article/details/103919535
	 */
	isLowIE=true;
	window.Base64={
		_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
		encode : function (str) {
			var output="";
			var chr1,chr2,chr3,enc1,enc2,enc3,enc4;
			var i=0;
			str=Base64._utf8_encode(str);
			while(i<str.length) {
				chr1=str.charCodeAt(i++);
				chr2=str.charCodeAt(i++);
				chr3=str.charCodeAt(i++);
				enc1=chr1>>2;
				enc2=((chr1&3)<<4)|(chr2>>4);
				enc3=((chr2&15)<<2)|(chr3>>6);
				enc4=chr3&63;
				if(isNaN(chr2)) {
					enc3=enc4=64;
				}else if(isNaN(chr3)) {
					enc4=64;
				}
				output=output +
					Base64._keyStr.charAt(enc1)+Base64._keyStr.charAt(enc2) +
					Base64._keyStr.charAt(enc3)+Base64._keyStr.charAt(enc4);
			}
			return output;
		},
		decode : function (str){
			var output="";
			var chr1,chr2,chr3;
			var enc1,enc2,enc3,enc4;
			var i=0;
			str=str.replace(/[^A-Za-z0-9\+\/\=]/g,"");
			while (i<str.length) {
				enc1=Base64._keyStr.indexOf(str.charAt(i++));
				enc2=Base64._keyStr.indexOf(str.charAt(i++));
				enc3=Base64._keyStr.indexOf(str.charAt(i++));
				enc4=Base64._keyStr.indexOf(str.charAt(i++));
				chr1=(enc1<< 2)|(enc2>>4);
				chr2=((enc2&15)<<4)|(enc3>>2);
				chr3=((enc3&3)<<6)|enc4;
				output=output+String.fromCharCode(chr1);
				if (enc3!=64)
					output=output+String.fromCharCode(chr2);
				if (enc4!=64)
					output=output + String.fromCharCode(chr3);
			}
			output=Base64._utf8_decode(output);
			return output;
		},
		_utf8_encode : function (str){
			str=str.replace(/\r\n/g,"\n");
			var utf="";
			for (var n=0;n<str.length;n++) {
				var c=str.charCodeAt(n);
				if (c<128){
					utf+=String.fromCharCode(c);
				}else if(c>127&&c<2048){
					utf+=String.fromCharCode((c>>6)|192);
					utf+=String.fromCharCode((c&63)|128);
				}else{
					utf+=String.fromCharCode((c>>12)|224);
					utf+=String.fromCharCode(((c>>6)&63)|128);
					utf+=String.fromCharCode((c&63)|128);
				}

			}
			return utf;
		},
		_utf8_decode : function (utf) {
			var str="";
			var i=0;
			var c=c1=c2=0;
			while (i<utf.length ){
				c=utf.charCodeAt(i);
				if (c<128) {
					str+=String.fromCharCode(c);
					i++;
				}else if(c>191&&c<224){
					c2=utf.charCodeAt(i+1);
					str+=String.fromCharCode(((c&31)<<6)|(c2&63));
					i+=2;
				}else{
					//bug修复：guziyimai
					c2=utf.charCodeAt(i+1);
					c3=utf.charCodeAt(i+2);
					str+=String.fromCharCode(((c&15)<<12)|((c2&63)<<6)|(c3&63));
					i+=3;
				}
			}
			return str;
		}
	}	
}

//IE浏览器版本太低，放弃IE吧！
//随着大量复杂正则的引入，严重BUG会直接跳到403页面（IE9以下基本上都会跳）
if(isLowIE) {
	isSBIE=true;
	waringStr="浏览器版本过低，建议使用谷歌内核的浏览器。";
}
getObj("script",1)[0].innerHTML="var ngua=navigator.userAgent,isAndroid=/Android|Harmony|BlackBerry/i.test(ngua),isMobile=isAndroid||/iPhone|iPod|Mobile|SymbianOS/i.test(ngua),isSBIE=/MSIE/i.test(ngua);document.getElementsByTagName('link')[0].href=isMobile?'mobile.css':'computer.css';";

/**
 * 设置、存取背景色
 * @author guziyimai
 */
var _val,_arr=["-无-","豆沙绿","天空蓝","杏仁黄","极光灰","内白外绿","内白外蓝","内白外黄","内白外灰"],mySel=getObj("backColor"),upText=getObj("upText"),downText=getObj("downText");
//初始化背景色下拉框
try{
	var str="";
	for(var i=0;i<9;i++){
		str+='<option value="'+(i+1)+'">'+_arr[i]+'</option>';
	}
	mySel.innerHTML=str;
	mySel.onchange=changeColor;
} catch(e) {}
//读取设置的背景色
try{
	_val=localStorage.getItem("backColor");
	if(!_val)_val=7;
}catch(e){
	_val=7;
}
mySel.value=_val;
saveColor();
//设置、保存背景色
function changeColor(){
	_val=mySel.value;
	try{localStorage.setItem("backColor",_val);}catch(e){}
	saveColor();
}
function saveColor(){
	try{
		var inCls;
		if(_val>5){
			_val-=4;
			inCls="back1";
		}else{
			inCls="back"+_val;
		}
		getObj("outer").className="back"+_val;
		getObj("modal",2)[0].className="modal back"+_val;
		upText.className=inCls;
		downText.className=inCls;
		getObj("help").className="modal-content "+inCls;
		getObj("support").className="modal-content "+inCls;
	}catch(e){}
}
	
/**
 * Ascii码加密、解密
 * @param index取值0-4，共5个不同变种
 * @author guziyimai
 */
window.Ascii={
	preStrArr : [["\\u000","\\u00","\\u0","\\u"],["%u000","%u00","%u0","%u"],["\\x0","\\x"],["&#x000","&#x00","&#x0","&#x"]],
	encode : function (str,index){
		if(!index) index=0;
		var allStr="",str2,preStr=this.preStrArr[index];
		if(index==4){
			if(str.indexOf("%")) str=decodeURIComponent(str);
			try{allStr=str.match(/https?:\/\//i)[0];}catch(e){}
		}
		for(var i=allStr.length;i<str.length;i++){
			str2=str.charCodeAt(i).toString(16);
			if(index==4){
				/[\/\?=&:#]/.test(str[i])?allStr+=str[i]:(allStr+=str2.length>2?encodeURI(str[i]):"%"+str2);
			}else{
				if(index==2&&/\s/.test(str[i])){
					allStr+=str[i];
				}else{
					allStr+=preStr[str2.length-1]+str2;
				}
				if(index==3) allStr+=";";
			}
		}
		if(index==4&&allStr)allStr=allStr.replaceAll("&#","%26%23");
		return allStr;
	},
	decode : function (str){
		str=str.replaceAll("%20","▘");
		if(/(%[a-f0-9]{2}){2}/i.test(str)) return decodeURIComponent(str).replaceAll("▘","%20");
		return window.unescape(str.replace(/\\u/ig,'%u').replace(/\\x(?=[0-9a-f]{4})/ig,'%u').replace(/\\x/ig,'%u00').replaceAll('&#x','%u').replaceAll(';','')).replaceAll("▘","%20");
	}
}

/**
 * 兽音译者编码和解码
 * @author https://www.52pojie.cn/thread-1571575-1-1.html
 */
window.Roar={
	head : "创世秩序",
	rand : function(){
		var head2=this.head,head3="",randStr;
		for(var i=1;i<4;i++){
			randStr=Math.round(Math.random()*(4-i%4));
			head3+=head2[randStr];
			head2=head2.replace(head2[randStr],"");
		}
		this.head=head3+head2;
	},
	encode : function (str) {
		this.rand();
		var result=this.head[3]+this.head[1]+this.head[0],offset=0;
		for(var t=0;t<str.length;t++){
			var c=str.charCodeAt(t),b=12,hex;
			while(b>=0){
				hex=(c>>b)+offset&15;
				offset++;
				result+=this.head[hex>>2];
                result+=this.head[hex&3];
                b-=4;
			}
		}
		return result+this.head[2];
	},
	decode : function (str,head) {
		var result="",i=3,offset=0,n1,n2,b,c;
		if(!head) head=str[2]+str[1]+str[str.length-1]+str[0];
		while(i<str.length-1){
			c=0;b=i+8;
			while(i<b){
				n1=head.indexOf(str[i++]);
				n2=head.indexOf(str[i]);
				if(n1<0||n2<0) return result+"....";
				c=c<<4|((n1<<2|n2)+offset)&15
				if(offset==0){
					offset=4294967295;
				}else{
					offset--;
				}
				i++;
			}
			result+=String.fromCharCode(c);
		}
        return result;
	}
}