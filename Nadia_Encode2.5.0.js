var suffix="";

var otherStr="联系作者：guziyimai@qq.com";
var waringStr="推荐电脑端使用谷歌内核浏览器访问，支持IE和手机浏览器。";
var upHolder="仅限文本加密，请勿用于非法用途。";
var downHolder="对密文添加空格回车、贴吧表情、汉字前缀，并不影响解密。";
var otherDiv=document.getElementById('otherDiv');
var waringDiv=document.getElementById('waringDiv');
var mainDiv=document.getElementById('mainDiv');
var prefix=document.getElementById('prefix');
var upText=document.getElementById('upText');
var downText=document.getElementById('downText');
var tiShi=document.getElementById('tiShi');
var myIframe=document.getElementById('myIframe');
upText.placeholder=upHolder;
downText.placeholder=downHolder;
mainDiv.title=upHolder;
if(typeof waringDiv.innerText ==='string'){
	waringDiv.innerText=waringStr;
	otherDiv.innerText=otherStr;
}else {
	waringDiv.textContent=waringStr;
	otherDiv.textContent=otherStr;
}
//仅允许外部调用网址参数解密，不允许iframe加载或直接盗取JS的加解密方法
window.onload = function(){
	//禁止iframe加载
	var decodeStr=checkEnvironment();
	//支持其他加密器调用
	//格式：“网址?任意参数=密文（去掉开头汉字）”
	var decodeNum=decodeStr.indexOf("=");
	if(decodeNum != -1){
		upText.value=decodeURI(decodeStr.substring(decodeNum+1));
		decode("hfiusfjkxlcheqhlzbczxjoiiqwezbcx");
	}
}
tiShi.style.opacity=0;
//提示框计时器id
var tsId=0;
//上方字符串
var upStr;
//下方字符串
var downStr;
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

/**
 * 给SB的IE用的！！！
 */
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

/**
 * 禁止外部调用
 */
function checkEnvironment(psw){
	var decodeStr=window.location.href;
	if ( psw || window.top!=window.self || decodeStr.substr(0,runUrl.length)!=runUrl ) {
		document.write("不支持iframe嵌套或外网调用！<br>可以传入1个参数调用解密方法（参数名任意），例如：<br>"+runUrl+"?decode=Xio2sJytXpVTj");
		encode=null;decode=null;showMsg=null
		throw new Error("不支持iframe嵌套或外网调用！");
		return null;
	}
	return decodeStr;
}

/**
 * 加密方法
 */
function encode(psw){
	//判断明文是否为空
	upStr=upText.value;
	downText.value="";
	if(""==upStr.trim()) {
		showMsg("请在上方输入！","red");
		upText.value="";
		return;
	}
	//添加前缀
	var prefixStr=prefix.value;
	if(prefixStr != ""){
		if(/^[^0-9a-zA-Z]+$/.test(prefixStr)){
			prefixStr+="\n";
		} else {
			showMsg("前缀只能是汉字","red");
			return;
		}
	}
	//禁止外部调用
	checkEnvironment(!psw || !(psw.getAttribute("key")=="FDSFBZXHFRUIFSD"));
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
	//复制到剪切板
	downText.value=prefixStr+downStr;
	downText.select();
	document.execCommand('copy');
	showMsg("已复制到剪切板","green");
}

/**
 * 解密方法
 */
function decode(psw){
	//去除密文前的介绍文字、去除空白字符+贴吧表情、判断密文是否为空
	downText.value="";
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
	if(psw != "hfiusfjkxlcheqhlzbczxjoiiqwezbcx"){
		checkEnvironment(!psw || !(psw.getAttribute("key")=="JHADABWEHCVXNW"));
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
	//复制到剪切板
	downText.value=suffix+downStr;
	downText.select();
	document.execCommand('copy');
	showMsg("已复制到剪切板","green");
}

/**
 * 显示错误提示
 * @param msg	提示的消息
 * @param color	提示的颜色
 */
function showMsg(msg,color){
	if(tsId!=0) {
		tiShi.style.opacity=0;
		clearInterval(tsId);
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
			tiShi.style.opacity=0;
			clearInterval(tsId);
			tsId=0;
		}
		n++;
	}, 32);
}
