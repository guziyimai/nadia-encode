//定义变量
var waringStr="推荐电脑端Edge或谷歌浏览器访问，支持手机浏览器。";
var upHolder="仅限文本加密，请勿用于非法用途。";
var upHolderTS="对于特征明显的AscII或Base64加密，可以直接点击“解密”按钮解密。";
var downHolder="对纳迪亚密文添加空格回车、贴吧表情、汉字前缀，并不影响解密。";
var authorStr="联系作者：guziyimai@qq.com";
var F12Str="一个链接，要经过怎样的加密，才能抵达用户的面前？\n一位新人，要经历怎样的成长，才能站在秋名山之巅？\n探寻加密的奥妙；体验解密的乐趣；成为论坛的主人……"
var upSpanStr="请将要加密或解密的文字复制到此 :";
var downSpanStr="结果显示区域 :";
var authorDiv=getObj('authorDiv');
var waringDiv=getObj('waringDiv');
var upText=getObj('upText');
var downText=getObj('downText');
var tiShi=getObj('tiShi');
var encodeAfter=getObj('encodeAfter');
var decodeAfter=getObj('decodeAfter');
var completeAfter=getObj('completeAfter');
var completeUrl=getObj('completeUrl');
var completeSpan=getObj('completeSpan');
var nadiaSpan=getObj('nadiaSpan');
var asciiSpan=getObj('asciiSpan');
var base64Span=getObj('base64Span');
var encodeSetSpan=getObj('encodeSetSpan');
var upSpan=getObj('upSpan');
var li1,li2,li3,li4,liNow;
var copyBtn=document.getElementsByClassName("btn2")[0];
var isWindos=navigator.userAgent.match(/windows/i);
upText.placeholder=upHolderTS;
upText.title=upHolder;
downText.placeholder=downHolder;
downText.title=upHolder;
tiShi.style.opacity=0;
upSpan.innerHTML=upSpanStr;
downSpan.innerHTML=downSpanStr;
//提示框计时器id
var tsId=0;
//上方字符串
var upStr;
//下方字符串
var downStr="";
//密钥（56位），其中6位供特殊用途加密
var keys="0QWqaxswE9RYedcvfU8PyumLK7HGrgh1kF6DSipnA5XCVM3N2oZTJztj";
var blk=5;
var len=keys.length-blk;
var mul1=len;
var mul2=mul1*mul1;
var regs=[/^ascii[^a-z0-9\+=\/\\]{1,6}/i,/^base64[^a-z0-9\+=\/\\]{1,6}/i];
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
	"www.aliyundrive.com/s/",
	"这是我用百度网盘分享的内容",
	"复制这段内容打开「",
	"」APP即可获取",
	"我用阿里云盘分享了",
	"cloud.189.cn/t/",
	"guziyimai.github.io"
];
//压缩网址替代字符（9601-9612）,最后1位（9612）供英文压缩标记用
var zips2="▁▂▃▄▅▆▇█▉▊▋▍▎▏▐░▒▓▔▕▖▌";
var runUrl=zips[0] + zips[20] + "/JiaMi/";
//压缩英文索引起止位置
var zipsEStart="";
var zipsELen="";
//禁用缓存！！！
getObj('notCache').innerHTML=Math.random();
//火狐兼容性
if(typeof waringDiv.innerText==='string'){
	waringDiv.innerText=waringStr;
	authorDiv.innerText=authorStr;
} else {
	waringDiv.textContent=waringStr;
	authorDiv.textContent=authorStr;
}

//仅允许外部调用网址参数解密，不允许iframe加载或直接盗取JS的加解密方法
window.onload = function(){
	//禁止iframe加载
	var decodeStr=checkEnvironment();
	//默认选取纳迪亚加密
	var lis=document.getElementsByTagName("li");
	li1=lis[0],li2=lis[1],li3=lis[2],li4=lis[3];
	if("#"==decodeStr.charAt(decodeStr.length-2)){
		convertEngine(lis[decodeStr.charAt(decodeStr.length-1)-1]);
	} else {
		convertEngine(li1);
	}
	//给补全链接下拉框绑定事件
	completeUrl.onchange=function(){completed(this);}
	//读取Cookie
	readCookie("2333jhdsayewnmbcx");
	//将密文前缀的变动，写入cookie
	encodeAfter.onchange=saveCookie;
	decodeAfter.onchange=saveCookie;
	completeAfter.onchange=saveCookie;
	//支持其他加密器调用
	//格式：“网址?任意参数=密文（去掉开头汉字）”
	if(decodeStr == null) return;
	var decodeNum=decodeStr.indexOf("=");
	if(decodeNum != -1){
		upText.value=decodeURI(decodeStr.substring(decodeNum+1));
		nadiaDecode("hfiusfjkxlcheqhlzbc");
	}
	//F12彩蛋
	try{console.log(F12Str);}catch(e){}
}

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
			i+=a.length;k++;j=i;
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
	if (psw || window.top!=window.self || decodeStr.replace(/#\d/,"").substr(0,runUrl.length+1)!=decodeURI(runUrl)) {
		document.write("不支持iframe嵌套或外网调用！<br>可以传入1个参数调用解密方法（参数名任意），例如：<br>"+runUrl+"?decode=Xio2sJytXpVTj<br>但该方式不支持自动复制或打开网址<br>");
		nadiaEncode=null;nadiaDecode=null;showMsg=null;saveCookie=null;
		readCookie=null;initCookie=null;copyText=null;convertEngine=null;
		ortherDecode=null;ortherEncode=null;completed=null;openUrl=null;
		throw new Error("不支持iframe嵌套或外网调用！");
		return null;
	}
	return decodeStr;
}

//创建cookie
function saveCookie(notShowMsg){
	var expiresTime=";expires=Fri, 31 Dec 9999 23:59:59 GMT";
	//这3句不能合并，每个变量要存1个Cookie
	document.cookie="encodeAfterOption="+encodeAfter.value+expiresTime;
	document.cookie="decodeAfterOption="+decodeAfter.value+expiresTime;
	document.cookie="completeAfterOption="+completeAfter.value+expiresTime;
	if(notShowMsg) showMsg("已保存设置","green");
}

/**
 * 读取cookie
 * 天坑的cookie，瞎JB加空格！！！
 */
function readCookie(psw){
	//禁止外部调用
	var flag=false;
	try{
		flag = psw!="2333jhdsayewnmbcx";
	}catch(e){
		flag = true;
	}
	checkEnvironment(flag);
	var cookieStr=document.cookie;
	if(""==cookieStr) {
		//创建cookie
		initCookie();
		return;
	}
	var cookieArr = cookieStr.split(";");
	for (var i=0; i<cookieArr.length; i++) {
		var cookieVal = cookieArr[i].split("=");
		if(cookieVal[0].replace(/\s/g,"") == "encodeAfterOption") {
			encodeAfter.value=cookieVal[1].replace(/\s/g,"");
		} else if(cookieVal[0].replace(/\s/g,"") == "decodeAfterOption") {
			decodeAfter.value=cookieVal[1].replace(/\s/g,"");
		} else if(cookieVal[0].replace(/\s/g,"") == "completeAfterOption") {
			completeAfter.value=cookieVal[1].replace(/\s/g,"");
		}
	}
}

/**
 * 初始化cookie
 */
function initCookie(){
	encodeAfter.value="2";
	decodeAfter.value=isWindos?"3":"2";
	completeAfter.value=isWindos?"3":"2";
	saveCookie(false);
}

/**
 * 切换加密引擎
 */
function convertEngine(obj,notClean){
	//切换前，如果已经操作过，则进行“清空”
	if(!notClean && downText.value!=""){
		upText.value="";upStr="";
		downText.value="";downStr="";
	}
	if(liNow==obj) return;
	//切换加密引擎
	if(obj==li2){
		completeSpan.style.display="inline-block";
		copyBtn.style.display="none";
		encodeSetSpan.style.display="none";
		upSpan.innerHTML="请复制无头链接到此：";
	} else {
		completeSpan.style.display="none";
		copyBtn.style.display="inline-block";
		encodeSetSpan.style.display="inline-block";
		upSpan.innerHTML=upSpanStr;
		downSpan.innerHTML=downSpanStr;
	}
	var as=document.getElementsByTagName("a");
	if(obj==li1){
		nadiaSpan.style.display="inline-block";
		asciiSpan.style.display="none";
		base64Span.style.display="none";
		downText.placeholder=downHolder;
		upText.placeholder=upHolderTS;
		as[0].click();
	} else if(obj==li2){
		nadiaSpan.style.display="none";
		asciiSpan.style.display="none";
		base64Span.style.display="none";
		upText.placeholder=upHolder;
		downText.placeholder="终于不用自己手动搜链接头啦…";
		as[1].click();
	} else if(obj==li3){
		nadiaSpan.style.display="none";
		asciiSpan.style.display="inline-block";
		base64Span.style.display="none";
		upText.placeholder=upHolder;
		downText.placeholder="对ASCII密文添加空格回车、贴吧表情，并不影响解密。";
		as[2].click();
	} else if(obj==li4){
		nadiaSpan.style.display="none";
		asciiSpan.style.display="none";
		base64Span.style.display="inline-block";
		upText.placeholder=upHolder;
		downText.placeholder="对Base64密文添加空格回车、贴吧表情，并不影响解密。";
		as[3].click();
	}
	//切换后，修改选项卡样式
	if(liNow) liNow.className="menu";
	obj.className="menu2";
	liNow=obj;
}

/**
 * 纳迪亚加密
 */
function nadiaEncode(psw){
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
	} catch(e) {
		flag = true;
	}
	checkEnvironment(flag);
	//统一百度云、阿里云的说明文字
	upStr=upStr.replace(/\s?APP\s/i,"APP");
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
	downText.value=downStr;
	//判断加密后是否复制结果
	if(encodeAfter.value==2){
		copyText();
	} else {
		showMsg("加密完成","green");
	}
}

/**
 * 纳迪亚解密
 */
function nadiaDecode(psw,notConvert){
	downText.value="";downStr="";
	if(!notConvert) {
		upStr=upText.value;
		if(""==upStr) {
			showMsg("请在上方输入！","red");
			upText.value="";
			return false;
		}
		//如果字数小于2万，先检测是否为其他加密方式
		if(upStr.length>4){
			var preStr=upStr.substring(0,2);
			//密文小于2万字才自动切换解密引擎
			if(upStr.length<23333) {
				//Ascll码解密
				if(/\\u[a-f0-9]{4}/i.test(upStr)){
					if(ortherDecode("ascii",true)) convertEngine(li3,true);
					return false;
				} else if(regs[0].test(upStr)){
					if(ortherDecode("ascii",true)) convertEngine(li3,true);
					return false;
				}
				//Base64解密
				if(/[\+=\/]/.test(upStr)){
					if(ortherDecode("base64",true)) convertEngine(li4,true);
					return false;
				} else if(regs[1].test(upStr)){
					if(ortherDecode("base64",true)) convertEngine(li4,true);
					return false;
				}
				//兽音译者，自己去搜
				preStr=upStr.substring(0,3)+upStr.substring(upStr.length-1);
				if(new RegExp("^["+preStr+"]+$").test(upStr)){
					showMsg("请搜索：兽音译者","red");
					return false;
				}
			}
			preStr=upStr.substring(0,2);
			//佛曰、熊曰无法解密，自己去搜
			if(preStr=="佛曰"||preStr=="新佛"){
				showMsg("请搜索：与佛论禅","red");
				return false;
			} else if(preStr=="熊曰"){
				showMsg("请搜索：与熊论道","red");
				return false;
			}
		}
		//去除密文前的介绍文字、去除空白字符+贴吧表情、判断密文是否为空
		upStr=upStr.replace(/^[^0-9a-z\+=\/\\]+/i,"")
			.replace(/[\s#]/g,"")
			.replace(/\(.{1,5}\)/g,"");
	}
	if(""==upStr || upStr.length<4 || (upStr.length-1)%3!=0) {
		showMsg("无法解密！","red");
		return false;
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
		return false;
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
					return false;
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
			return false;
		}
		asc=a1*mul2+a2*mul1+a3;
		str=String.fromCharCode(asc);
		downStr+=str;
	}
	//解密压缩网站
	for(var i=0;i<zips.length;i++){
		downStr=downStr.replaceAll(zips2[i],zips[i]);
	}
	//解密成功后的操作
	downText.value=downStr;
	if(psw=="hfiusfjkxlcheqhlzbc" || decodeAfter.value==1){
		showMsg("解密成功","green");
	} else if(decodeAfter.value==2){
		copyText();
	} else if(decodeAfter.value==3){
		openUrl("dsbfjiueywgfsefxbvcbc");
	}
	return true;
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
		},800);
		return;
	}
	var n=0
	tiShi.innerHTML=msg;
	tiShi.style.color=color;
	tsId=setInterval(function(){
		if(n<10){
			tiShi.style.opacity=parseFloat(tiShi.style.opacity)+0.1;
		} else if(n<25){
		} else if(n<35){
			tiShi.style.opacity=parseFloat(tiShi.style.opacity)-0.1;
		} else {
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
	if(!downText.value){
		showMsg("请先加解密或补全","red");
		return;
	}
	//复制到剪切板
	downText.select();
	document.execCommand('copy');
	showMsg("已复制到剪切板","green");
}

/**
 * 尝试打开网址
 * 打开匹配到的第1个网址，复制匹配到的第1个提取码
 */
function openUrl(psw){
	//禁止外部调用
	if(psw!="dsbfjiueywgfsefxbvcbc") checkEnvironment(true);
	if(""==downStr){
		showMsg("请先解密或补全","red");
		return;
	}
	var myUrl;var urlHead="";
	//有协议头的
	myUrl=downStr.match(/(http|https|ftp):\/\/[a-z0-9\-~]{1,}\.[a-z0-9\-\._~:\/\?#&\+%=]+/i);
	//磁力链接等
	if(myUrl==null){
		myUrl=downStr.match(/(magnet:\?xt=urn|thunder|flashget|qqdl)[a-z0-9:_&\+%=\/\-]+/i);
	}
	//无协议头的，默认用https补全
	if(myUrl==null){
		urlHead=zips[0];
		myUrl=downStr.match(/[a-z0-9\-~]{1,}\.[a-z0-9\-\._~:\/\?#&\+%=]{2,}/i);
	}
	if(myUrl!=null){
		var tqm;
		//以“提取”或“访问”字样定位提取码
		tqm=downStr.match(/提取.{0,5}[a-z0-9]{4,8}/i);
		if(tqm==null) tqm=downStr.match(/访问.{0,5}[a-z0-9]{4,8}/i);
		//没有则以空白字符定位提取码
		if(tqm==null) {
			tqm=downStr.match(/[\s,，:：][a-z0-9]{4,6}[:\/\.]?/i);
			//但要防止将链接头误识别为提取码
			if(tqm && /[:\/\.]$/.test(tqm[0].charAt(tqm[0].length-1))) tqm=null;
		}
		if(tqm && tqm.length>0){
			downText.value=tqm[0].replace(/^[^0-9a-z]+/i,"");
			downText.select();
			document.execCommand('copy');
			showMsg("已复制提取码","green");
			downText.value=downStr;
		}
		window.open(urlHead+myUrl[0],"_blank");
	} else {
		//实在无法解析网址
		showMsg("解密成功","green");
	}
}

/**
 * 补全链接控制器
 */
function completed(head){
	var myUrl,downSpanStr2;
	if(head.value==0) return;
	downStr=upText.value;
	if(""==downStr.replace(/\s/g,"")) {
		showMsg("请在上方输入！","red");
		upText.value="";
		setTimeout(function(){head.value=0;},400);
		return;
	}
	//禁止外部调用
	var flag=false;
	try{
		flag = !(head.getAttribute("key")=="bjzh3xUUGA2USFAS4mn4as6d");
	} catch(e) {
		flag = true;
	}
	checkEnvironment(flag);	
	//第1次匹配：网址（迅雷、磁力链接考虑拼接空白字符）
	if(2==head.value || 3==head.value){
		myUrl=downStr.match(/[a-z0-9\/][a-z0-9\-\._:\/\?#&\+%= 　	]{6,}/ig);
	} else {
		myUrl=downStr.match(/[a-z0-9\/][a-z0-9\-\._:\/\?#&\+%=]{5,}/ig);
	}
	if(myUrl==null){
		showMsg("格式校验失败！","red");
		setTimeout(function(){head.value=0;},400);
		return;
	}
	//第2次匹配：具体格式
	if(1==head.value){
		//补全百度云
		downSpanStr2="补全百度云结果：";
		completedService(/1[a-z0-9_\-]{5,}/i,33,zips[0]+zips[1]);
	} else if(2==head.value){
		//补全磁力链接
		downSpanStr2="补全磁力链接结果：";
		completedService(/[a-z0-9]{32,}/i,0,zips[7],true);
	} else if(3==head.value){
		//补全迅雷
		downSpanStr2="补全迅雷链接结果：";
		completedService(/QU[a-z0-9\+=\-_]{18,}/i,9999,zips[8],true);
	} else if(4==head.value){
		//补全微云
		downSpanStr2="补全微云结果：";
		completedService(/[a-z0-9_\-]{6,}/i,33,zips[0]+zips[4]);
	} else if(5==head.value){
		//补全阿里云
		downSpanStr2="补全阿里云结果：";
		completedService(/[a-z0-9_\-]{8,}/i,33,zips[0]+zips[14]);
	}

	//补全链接服务层
	function completedService(reg,maxLen,replaceStr,isTrim){
		var str,str2,arr=[],i=0,j=0,k=0,matchNum=0,pass=false,isTQM=false;
		for(;i<myUrl.length;i++){
			//只对迅雷、磁力链接去除中间的空格
			if(isTrim) myUrl[i]=myUrl[i].replace(/[ 　	]+$/,"");
			//去掉链接头，以便验证格式
			str=myUrl[i].replace(/[a-z]+:?[a-z0-9\/\.]+\//i,"")
				.replace("magnet:?xt=","")
				.replace("urn:btih:","")
				.replace("init?surl=","1")
				.replace(/^\/?s?\//i,"")
			if(isTrim) 	str=str.replace(/[ 　	]+/g,"");
			//去掉链接尾，严格验证链接格式
			str2=str.replace(/[#&\?].+/i,"");
			//不能是纯数字
			if(reg.test(str2)&&!/^\d+$/.test(str2)){
				if(
					(maxLen==0&&str2.length!=32&&str2.length!=40)
					||(maxLen!=0 && str2.length>maxLen)
				){} else {
					str=replaceStr+str;
					k=downStr.indexOf(myUrl[i],k);
					arr[2*i]=downStr.substring(j,k);
					//如果前面明确写了是提取码、访问码、密码，则不补全
					if(k>4){
						isTQM=/(提取|访问|密码)/.test(downStr.substring(k-6,k-1));
					}
					if(myUrl[i]!=str && !isTQM){
						arr[2*i+1]=str;
						matchNum++;
					} else {
						arr[2*i+1]=myUrl[i];
						//跳过完整的链接
						pass=true;
					}
					k+=myUrl[i].length;j=k;
				}
			}
		}
		
		if(matchNum==0){
			if(pass==true){
				showMsg("补全了0个链接","green");
			} else {
				showMsg("格式校验失败","red");
			}
		} else {
			arr[2*i+2]=downStr.substring(j);
			downStr=arr.join("");
			downText.value=downStr;
			showMsg("补全了"+matchNum+"个链接","green");

			//补全成功后的操作
			if(completeAfter.value==2){
				copyText();
			} else if(completeAfter.value==3){
				openUrl("dsbfjiueywgfsefxbvcbc");
			}
			//下方提示文字的修改
			downSpan.innerHTML=downSpanStr2;
		}
		//补全后归位
		setTimeout(function(){head.value=0;},400);
	}
}

/**
 * 其他加密方法：base64 / ASCII
 */
function ortherEncode(engine){
	//判断明文是否为空
	upStr=upText.value;
	downText.value="";downStr="";
	if(""==upStr.trim()) {
		showMsg("请在上方输入！","red");
		upText.value="";
		return;
	}

	if("base64"==engine){
		//Base64加密
		downStr=Base64.encode(upStr);
	} else if("ascii"==engine){
		//ASCII加密
		var str;
		for(var i=0;i<upStr.length;i++){
			str=upStr.charCodeAt(i).toString(16);
			if(str.length==2) {
				str="\\u00"+str;
			} else if(str.length==3) {
				str="\\u0"+str;
			} else if(str.length==1) {
				str="\\u000"+str;
			} else {
				str="\\u"+str;
			}
			downStr+=str;
		}
	}
	//加密完成
	downText.value=downStr;
	//判断加密后是否复制结果
	if(encodeAfter.value==2){
		copyText();
	} else {
		showMsg("加密完成","green");
	}
}

/**
 * 其他解密方法：base64 / ASCII
 * 在指定的解密方法解密失败后，如果文字小于2万，则再次尝试纳迪亚解密
 */
function ortherDecode(engine,notConvert){
	downText.value="";downStr="";
	var realEngine=engine;
	var nadiaDecodeBtn=document.getElementsByTagName("input")[1];
	//去除密文前的介绍文字、去除空白字符+贴吧表情、判断密文是否为空
	upStr=upText.value;
	if(""==upStr) {
		showMsg("请在上方输入！","red");
		upText.value="";
		return false;
	}
	upStr=upStr.replace(regs[0],"")
		.replace(regs[1],"")
		.replace(/^[^0-9a-z\+=\/\\]+/i,"")
		.replace(/[\s#]+/g,"")
		.replace(/\(.{1,5}\)/g,"")
		.replace(/\\/g,'%');
	if(""==upStr) {
		showMsg("无法解密！","red");
		return false;
	}
	//如果密文小于2万字，进行格式校验和自动切换解密引擎
	if(upStr.length<23333){
		//实际格式校验
		if(engine=="ascii" && !/%u[a-f0-9]{4}/i.test(upStr)){
			//如果开头文字明确说了是ASCII码加密，格式却不是ASCII，则提示无法解密
			if(regs[0].test(upText.value)){
				showMsg("无法解密！","red");
				return false;
			} else if(/[\+=\/]/.test(upStr)) {
				realEngine="base64";
			} else {
				realEngine="nadia";
			}
		} else if(engine=="base64" && !/^[0-9a-z\+\/=]+$/i.test(upStr)){
			//如果开头文字明确说了是Base64加密，格式却不是Base64，则提示无法解密
			if(regs[1].test(upText.value)){
				showMsg("无法解密！","red");
				return false;
			} else if(/%u[a-f0-9]{4}/i.test(upStr)) {
				realEngine="ascii";
			} else {
				//无法区分是Base64加密还是纳迪亚加密
				showMsg("无法解密！","red");
				return false;
			}
		}
		//自动切换解密引擎
		if(!notConvert && realEngine!=engine) {
			if(realEngine=="ascii"){
				if(ortherDecode("ascii",true)) convertEngine(li3,true);
			} else if(realEngine=="base64"){
				if(ortherDecode("base64",true)) convertEngine(li4,true);
			} else {
				if(nadiaDecode(nadiaDecodeBtn,true)) convertEngine(li1,true);
			}
			return false;
		}
	}
	//加密
	try{
		if("base64"==engine){
			downStr=Base64.decode(upStr);
		} else if("ascii"==engine){
			downStr=unescape(upStr);
			if(upStr==downStr){
				showMsg("无法解密！","red");
				return false;
			}
		}
	} catch(e) {
		showMsg("无法解密！","red");
		return false;
	}
	//解密成功后的操作
	downText.value=downStr;
	if(decodeAfter.value==1){
		showMsg("解密成功","green");
	} else if(decodeAfter.value==2){
		copyText();
	} else if(decodeAfter.value==3){
		openUrl("dsbfjiueywgfsefxbvcbc");
	}
	return true;
}

