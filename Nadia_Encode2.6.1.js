var suffix="";
var prefixStr="纳迪亚加密";

var waringStr="推荐电脑端Edge浏览器访问，支持手机浏览器。";
var upHolder="仅限文本加密，请勿用于非法用途。";
var downHolder="对密文添加空格回车、贴吧表情、汉字前缀，并不影响解密。";
var otherDiv=getObj('otherDiv');
var waringDiv=getObj('waringDiv');
var prefix=getObj('prefix');
var upText=getObj('upText');
var downText=getObj('downText');
var tiShi=getObj('tiShi');
var encodeAfter=getObj('encodeAfter');
var decodeAfter=getObj('decodeAfter');
var otherStr="联系作者：guziyimai@qq.com";
var F12Str="一个链接，要经过怎样的加密，才能抵达用户的面前？\n一位新人，要经历怎样的成长，才能站在秋名山之巅？\n探寻加密的奥妙；体验解密的乐趣；成为论坛的主人……"
upText.placeholder=upHolder;
upText.title=upHolder;
downText.placeholder=downHolder;
downText.title=upHolder;
if(typeof waringDiv.innerText ==='string'){
	waringDiv.innerText=waringStr;
	otherDiv.innerText=otherStr;
} else {
	waringDiv.textContent=waringStr;
	otherDiv.textContent=otherStr;
}
//仅允许外部调用网址参数解密，不允许iframe加载或直接盗取JS的加解密方法
window.onload = function(){
	//禁止iframe加载
	var decodeStr=checkEnvironment();
	//将密文前缀的变动，写入cookie
	prefix.onchange=saveCookie;
	encodeAfter.onchange=saveCookie;
	decodeAfter.onchange=saveCookie;
	//读取Cookie
	readCookie();
	//支持其他加密器调用
	//格式：“网址?任意参数=密文（去掉开头汉字）”
	if(decodeStr == null) return;
	var decodeNum=decodeStr.indexOf("=");
	if(decodeNum != -1){
		upText.value=decodeURI(decodeStr.substring(decodeNum+1));
		decode("hfiusfjkxlcheqhlzbc");
	}
	//F12彩蛋
	try{console.log(F12Str);}catch(e){}
}
tiShi.style.opacity=0;
//提示框计时器id
var tsId=0;
//上方字符串
var upStr;
//下方字符串
var downStr="";
//密钥（至少45位），其中6位供特殊用途加密
var keys="0QWqaxswE9RYedcvfU8PyumLK7HGrgh1kF6DSipnA5XCVM3N2oZTJztj";
var blk=5;
var len=keys.length-blk;
var mul1=len;
var mul2=mul1*mul1;
//压缩网址（目前只支持百度云、微云、阿里云、磁力链接、迅雷链接、腾讯文档）
var zips=[
	"https://",
	"pan.baidu.com/s/",
	"docs.qq.com/",
	"pan.baidu.com/share/init?surl=",
	"share.weiyun.com/",
	"aliyunpan://",
	"|application/oct-stream",
	"magnet:?xt=urn:btih:",
	"thunder://",
	"提取码",
	"解压码",
	"复制这段内容后打开百度网盘",
	"App，操作更方便哦",
	"--来自百度网盘超级会员V",
	"guziyimai.github.io"
];
var runUrl=zips[0] + zips[14] + "/JiaMi";
//压缩网址替代字符（9601-9616）,最后1位（9612）供英文压缩标记用
var zips2="▁▂▃▄▅▆▇█▉▊▋▍▎▏▐▌";
//压缩英文索引起止位置
var zipsEStart="";
var zipsELen="";

//给SB的IE用的！！！
try{
	"".replaceAll("1","");
}catch(err){
	String.prototype.replaceAll=function(a,b){
		var str=[];
		var i=0,j=0,k=0;
		while(true){
			i=this.indexOf(a,i);
			if(i == -1) break;
			str[2*k]=this.substring(j,i);
			str[2*k+1]=b;
			i++;k++;j=i;
		}
		str[2*k]=this.substring(j);
		return str.join("");
	}
}

//获取元素
function getObj(id){
	return document.getElementById(id);
}

//禁止外部调用
function checkEnvironment(psw){
	var decodeStr=decodeURI(window.location.href.replace(/&.+/,""));
	if ( psw || window.top!=window.self || decodeStr.substr(0,runUrl.length)!=runUrl ) {
		document.write("不支持iframe嵌套或外网调用！<br>可以传入1个参数调用解密方法（参数名任意），例如：<br>"+runUrl+"?decode=Xio2sJytXpVTj<br>但该方式不支持自动复制或打开网址<br>");
		encode=null;decode=null;showMsg=null;saveCookie=null;copyText=null;openUrl=null;
		throw new Error("不支持iframe嵌套或外网调用！");
		return null;
	}
	return decodeStr;
}

//创建cookie
function saveCookie(notShowMsg){
	if(prefix.value != ""){
		if(/^[^0-9a-zA-Z]+$/.test(prefix.value)){
		} else {
			showMsg("前缀只能是汉字","red");
			prefix.value=prefixStr;
			return;
		}
	}
	console.log(encodeAfter.value);
	console.log(decodeAfter.value);
	document.cookie="prefix="+prefix.value+";encodeAfterOption="+encodeAfter.value+";decodeAfterOption="+decodeAfter.value+";expires=Fri, 31 Dec 9999 23:59:59 GMT";
	prefixStr=prefix.value;
	if(notShowMsg) showMsg("已保存设置","green");
}

//读取cookie
function readCookie(){
	var cookieStr=document.cookie;
	if(""==cookieStr) {
		//创建cookie
		prefix.value=prefixStr;
		saveCookie(false);
		return;
	}
	var cookieArr = cookieStr.split(";");
	for (var i=0; i<cookieArr.length; i++) {
		var cookieVal = cookieArr[i].split("=");
		if(cookieVal[0] == "prefix") {
			prefixStr=cookieVal[1];
		} else if(cookieVal[0] == "encodeAfterOption") {
			encodeAfter.value=cookieVal[1];
		} else if(cookieVal[0] == "decodeAfterOption") {
			decodeAfter.value=cookieVal[1];
		}
	}
}

/**
 * 加密方法
 */
function encode(psw){
	//判断明文是否为空
	upStr=upText.value;
	downText.value="";downStr="";
	if(""==upStr.trim()) {
		showMsg("请在上方输入！","red");
		upText.value="";
		return;
	}
	//禁止外部调用
	var flag=false;
	try{
		flag = !(psw.getAttribute("key")=="FDSFBZXHFRUIFSD");
	}catch(e){
		flag = true;
	}
	checkEnvironment(flag);
	//压缩常用的分享网址
	for(var i=0;i<zips.length;i++){
		upStr=upStr.replaceAll(zips[i],zips2[i]);
	}
	//生成随机秘钥
	var str;
	var key2=keys;
	var asc=Math.floor(Math.random()*(len+blk));
	downStr=key2[asc];
	if(asc!=0) key2=key2.substr(asc,len-asc+blk)+key2.substr(0,asc);
	var blank=key2.substr(len+1,blk);
	//截取英文字符串
	zipsEStart=[];
	zipsELen=[];
	var strE=upStr.match(/[\u0000-\u00ff]{4,}/g);
	if(strE){
		for(var i=0;i<strE.length;i++){
			zipsEStart[i]=upStr.indexOf(strE[i]);
			zipsELen[i]=strE[i].length;
			//强制偶数位对齐
			if(zipsELen[i]%2 == 1) zipsELen[i]--;
		}
	}
	//开始加密
	for(var i=0;i<upStr.length;i++){
		//压缩英文
		var str1=zipsEStart.indexOf(i);
		if(-1 != str1){
			downStr=downStr+key2[len];
			for(var k=0;k<zipsELen[str1];k+=2){
				str="";
				asc = upStr.charCodeAt(i+k)*256 + upStr.charCodeAt(i+k+1);
				for(var j=0;j<3;j++){
					if(0 == asc%len) {
						str=blank[0]+str;
						blank=blank.substr(1,blk)+blank[0];
					} else {
						str=key2[asc%len]+str;
					}
					asc=parseInt(asc/len);
				}
				downStr+=str;
			}
			downStr=downStr+key2[0];
			i=i+zipsELen[str1]-1;
		} else {
			str="";
			asc=upStr.charCodeAt(i);
			//压缩汉字
			for(var j=0;j<3;j++){
				if(0 == asc%len) {
					str=blank[0]+str;
					blank=blank.substr(1,blk)+blank[0];
				} else {
					str=key2[asc%len]+str;
				}
				asc=parseInt(asc/len);
			}
			downStr+=str;
		}
	}
	//与汉字加密保持一致的加密长度
	var strLen=(downStr.length-1)%3;
	if(strLen!=0){
		var rand=Math.floor(Math.random()*len);
		downStr+=key2.substr(rand,3-strLen);
	}
	//加密完成
	if(prefix.value!="") prefixStr=prefix.value+"\n";
	downText.value=prefixStr+downStr;
	//判断加密后是否复制结果
	if(encodeAfter.value==2){
		copyText();
	} else {
		showMsg("加密完成","green");
	}
}

/**
 * 解密方法
 */
function decode(psw){
	//去除密文前的介绍文字、去除空白字符+贴吧表情、判断密文是否为空
	downText.value="";downStr="";
	upStr=upText.value
		.replace(/^[^0-9a-zA-Z]+/,"")
		.replace(/[\s#:：]/g,"")
		.replace(/\(.{1,5}\)/g,"");
	if(""==upStr) {
		showMsg("请在上方输入！","red");
		upText.value="";
		return;
	}else if(upStr.length<4 || (upStr.length-1)%3!=0) {
		showMsg("无法解密！","red");
		return;
	}
	//禁止外部调用
	if(psw != "hfiusfjkxlcheqhlzbc"){
		var flag=false;
		try{
			flag = !(psw.getAttribute("key")=="JHADABWEHCVXNW");
		}catch(e){
			flag = true;
		}
		checkEnvironment(flag);
	}
	//解密随机秘钥
	var str;
	var key2=keys;
	var asc=key2.indexOf(upStr[0]);
	if(asc<0) {
		showMsg("无法解密！","red");
		return;
	}
	if(asc!=0) key2=key2.substr(asc,len-asc+blk)+key2.substr(0,asc);
	upStr=upStr.substr(1,upStr.length-1);
	upStr=upStr.replaceAll(key2[0],zips2[zips.length]);
	for(var i=1;i<5;i++){
		upStr=upStr.replaceAll(key2[len+i],key2[0]);
	}
	//开始解密
	downStr="";
	var a1,a2,a3;
	for(var i=0;i<upStr.length-2;i+=3){
		str=upStr.substr(i,3);
		//是否为英文解压
		if(str[0]==key2[len]){
			i++;
			var asc1,asc2;
			while(true){
				str=upStr.substr(i,3);
				if(str[0]==zips2[zips.length]) {
					break;
				}
				a1=key2.indexOf(str[0]);
				a2=key2.indexOf(str[1]);
				a3=key2.indexOf(str[2]);
				if(a1<0||a2<0||a3<0) {
					showMsg("无法解密！","red");
					return;
				}
				asc=a1*mul2+a2*mul1+a3;
				asc1=(asc&0XFF00)>>8;
				asc2=asc&0X00FF;
				str=String.fromCharCode(asc1,asc2);
				downStr+=str;
				i+=3;
			}
			i-=2;
			continue;
		}
		//汉字解密
		a1=key2.indexOf(str[0]);
		a2=key2.indexOf(str[1]);
		a3=key2.indexOf(str[2]);
		if(a1<0||a2<0||a3<0) {
			showMsg("无法解密！","red");
			return;
		}
		asc=a1*mul2+a2*mul1+a3;
		str=String.fromCharCode(asc);
		downStr+=str;
	}
	//解密压缩网站
	for(var i=0;i<zips.length;i++){
		downStr=downStr.replaceAll(zips2[i],zips[i]);
	}
	//解密成功
	downText.value=suffix+downStr;
	if(psw=="hfiusfjkxlcheqhlzbc" || decodeAfter.value==1){
		showMsg("解密成功","green");
	} else if(decodeAfter.value==2){
		copyText();
	} else if(decodeAfter.value==3){
		openUrl("dsbfjiueywgfsefxbvcbc");
	}
}

/**
 * 简单的消息队列
 * @param msg	提示的消息
 * @param color	提示的颜色
 */
function showMsg(msg,color){
	if(tsId!=0) {
		setTimeout(function(){
			clearInterval(tsId);
			tsId=0;
			tiShi.style.opacity=0;
			showMsg(msg,color);
		},500);
		return;
	}
	var n=0
	tiShi.innerHTML=msg;
	tiShi.style.color=color;
	tsId=setInterval(function(){
		if(n<10){
			tiShi.style.opacity=parseFloat(tiShi.style.opacity)+0.1;
		}else if(n<25){
		}else if(n<35){
			tiShi.style.opacity=parseFloat(tiShi.style.opacity)-0.1;
		}else{
			clearInterval(tsId);
			tiShi.style.opacity=0;
			tsId=0;
		}
		n++;
	}, 32);
}

/**
 * 复制结果
 */
function copyText(){
	if(""==downStr){
		showMsg("请先加密或解密","red");
		return;
	}
	//复制到剪切板
	downText.select();
	document.execCommand('copy');
	showMsg("已复制到剪切板","green");
}

/**
 * 尝试打开网址
 */
function openUrl(psw){
	//禁止外部调用
	if(psw!="dsbfjiueywgfsefxbvcbc") checkEnvironment(true);
	if(""==downStr){
		showMsg("请先解密","red");
		return;
	}
	var myUrl=downStr.match(/[A-Za-z0-9-~]{2,}\.[\u0021-\u007e]+/);
	if(myUrl && myUrl.length>0){
		var tqm=downStr.match(/提取.{0,5}[A-Za-z0-9]{4,10}/);
		if(tqm && tqm.length>0){
			prefixStr=prefix.value;
			prefix.value=tqm[0].replace(/^[^0-9a-zA-Z]+/,"");
			prefix.select();
			document.execCommand('copy');
			showMsg("已复制提取码","green");
			prefix.value=prefixStr;
		}
		window.open("https://"+myUrl[0],"_blank");
	}
}

