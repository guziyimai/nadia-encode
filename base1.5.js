var runUrl=top.location.href;
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

/**
 * 给不支持replaceAll的弱智用
 * @author guziyimai
 */
try{
	"".replaceAll("","");
}catch(err){
	String.prototype.replaceAll=function(a,b){
		return this.split(a).join(b);
	};
}

var nadia_crx=function(){
if(/(pan\.baidu\.com|share\.mockplus\.cn|guziyimai\.github\.io|nadia\-jiami\.netlify\.app|www\.keyfc\.net|hi\.pcmoe\.net)/i.test(runUrl)) return;
var timerNum,timerId,subWin,upStr="",downStr="";
var imgReg=/https?:\/\/[a-z0-9\.~:\/\?#&\+%=\-_@]{6,}?[\.\/](jpe?g|png|bmp|gif|webp|ico)/ig;
var selStr="",sel,endEle,delEle=[],oldEle;
var istieba=runUrl.indexOf("tieba.baidu.com")!=-1,
killRules=".fengchao-wrap-feed,.fengchao-wrap,.mediago-ad-wrapper,.game-wrap-top,.lu-frs-wrapper,.lu-pb-wrapper,.lu-home-wrapper,.notice-wrap-top {display:none;height:0;width:0;opacity:0;pointer-events:none;}";

/**
 * 修改页面元素
 * @author guziyimai
 */
function changeElement(ele,oldStr,newStr){
	//console.log("ele："+ele.innerHTML+"#");
	//console.log("endEle："+endEle.innerHTML+"#");
	//console.log("oldStr："+oldStr+"#");
	//console.log("newStr："+newStr+"#");
	//防止a标签嵌套
	if(ele==endEle&&'a'==ele.tagName.toLowerCase()) return;
	//防止恶意代码注入，代码格式原样展示
	if(newStr.indexOf("<pre>")!=-1||newStr.indexOf("<img ")!=-1) {
		ele.innerHTML=ele.innerHTML.replace(oldStr,newStr);
		return;
	}
	//如果F1、F2模式选取的内容是跨html元素的
	//则最多向上查找5层父元素、向后查找9层兄弟元素
	//var mulText=ele.innerText.replace(/^[^a-z0-9\+=\/\\%\-_\.&\?#;:]+/i,'');
	//if(!mulText) mulText=ele.innerText;
	oldEle=ele.innerHTML;
	var eleText=ele.innerText.trim(),endText=endEle.innerText.trim();
	if(ele!=endEle&&eleText.indexOf(endText)==-1&&endText.indexOf(eleText)==-1) {
		console.log("跨元素拼接");
		delEle=[];
		var temp=ele,nextEle;
		for(var i=0;i<5&&temp.parentElement.innerText==temp.innerText;i++){
			temp=temp.parentElement;
		}
		ele=temp;
		ele.innerHTML=ele.innerText;
		temp=endEle;
		for(var i=0;i<5&&temp.parentElement.innerText==temp.innerText;i++){
			temp=temp.parentElement;
		}
		endEle=temp;
		try{
			temp=ele.nextElementSibling;
			for(var i=0;i<9&&temp.innerText!=endEle.innerText;i++){
				nextEle=temp;
				temp=temp.nextElementSibling;
				if(nextEle.innerText) {
					ele.innerHTML+=nextEle.innerText;
					console.log("i="+i);
				}
				//预删除元素
				delEle.push(nextEle);
			}
		}catch(e){}
		if(endEle.innerText) {
			ele.innerHTML+=endEle.innerText;
			delEle.push(endEle);
		}
		sel=ele;
	}
	//去除转义字符&的影响
	var eleHTML=ele.innerHTML.replaceAll("&nbsp;"," ").replace(/ {2,}/g,' ').replaceAll("&amp;","▁");
	oldStr=oldStr.replaceAll("&","▁");
	newStr=newStr.replaceAll("&","▁").replace(/\n/g,"<br>");
	//图片地址转图片
	var imgs=oldStr.match(imgReg);
	if(!imgs) {
		imgs=newStr.match(imgReg);
		if(imgs) eleHTML=eleHTML.replace(oldStr,newStr);
	}
	var maxHeight=600,loadImg="https://s4.ax1x.com/2022/01/29/H9Sn1A.gif";
	if('span'==ele.tagName.toLowerCase()) maxHeight=200;
	if(imgs){
		var eleHTML3=eleHTML;
		var isSBtieba=/^https?:\/\/tieba\.baidu\.com/i.test(top.location.href);
		for(var i=0;i<imgs.length;i++){
			var splitStrs=eleHTML.split(imgs[i]),tmpStr=imgs[i];
			try{
				tmpStr+=splitStrs[1].match(/^[?▁#@%][a-z0-9\.~:\/\?#▁\+%=\-_@\,]+/ig)[0];
			}catch(e){}
			console.log("加载图片："+imgs[i]);
			//onload的bug：加可能会死循环加载图片！
			var changeStr="<a href='"+tmpStr+"' target='_blank'><img src='"+loadImg+"' style='max-height:"+maxHeight+"px;max-width:100%;height:auto;width:auto;cursor:zoom-in;' alt='"+tmpStr+"' onload='this.src=\""+tmpStr+"\";this.removeAttribute(\"onload\");'></a>";
			if(i==0) changeStr="<br>"+changeStr;
			if(i==imgs.length-1) changeStr+="<br>";
			eleHTML=eleHTML.replace(tmpStr,changeStr);
		}
		if(eleHTML3!=eleHTML) ele.innerHTML=eleHTML.replaceAll("▁","&");
		return;
	}
	//彩蛋：双击变猫娘
	if(newStr=="猫娘") {
		var catUrl,changeStr="快给我变！",conStr="已变身猫娘~";
		var preStr="https://dwz.mk/";
		var cats=["v6Fjmy","IR7FVn","qUrQnq","7FNFne","ru2eQj","nyIvIv","f2UfAj","bmmAn2","nMBBbu","yuyaUn","2eyeYz","m2YJve"];
		catUrl=preStr+cats[Math.round(Math.random()*60)%12];
		newStr="<br><a href='"+catUrl+"' target='_blank'><img src='"+loadImg+"' style='max-height:"+maxHeight+"px;max-width:100%;height:auto;width:auto;cursor:zoom-in;' alt='"+catUrl+"' onload='this.src=\""+catUrl+"\";this.removeAttribute(\"onload\");'></a><span id='suKrrLwG5z'>"+changeStr+"</span><br>";
		ele.innerHTML=ele.innerHTML.replace(oldStr,newStr);
		setTimeout(function(){getObj("suKrrLwG5z").remove();console.log(conStr);},999);
		return;
	}
	//如果密文被标签分离，则去除标签
	var eleHTML2=eleHTML,endEleHTML,temp,aList;
	//去除a标签的影响，或修改确认跳转链接
	if(eleHTML.indexOf(oldStr)==-1||oldStr.match(urlReg)){
		var atags=ele.getElementsByTagName("a");
		if(atags){
			aList=[];
			for(var i=0;i<atags.length;i++){
				temp=atags[i].innerText;
				if(temp && aList.indexOf(temp)==-1 && oldStr.indexOf(temp)!=-1)
				{
					aList.push(temp);
					eleHTML=eleHTML.replaceAll(atags[i].outerHTML,temp);
				}
			}
		}
	}
	//去除结尾空格的影响
	if(eleHTML.indexOf(oldStr)==-1){
		temp=eleHTML.replace(/\s+(?=<br\/?>)/ig,"");
		if(temp.indexOf(oldStr)!=-1) eleHTML=temp;
	}
	//去除br+表情的影响
	if(eleHTML.indexOf(oldStr)==-1){
		temp=eleHTML.replace(/<br\/?>/ig,"");
		var oldStr2=oldStr.replace(/<br\/?>/ig,"");
		if(temp.indexOf(oldStr2)==-1) {temp=temp.replace(/<img.+?>/ig,"");}
		if(temp.indexOf(oldStr2)!=-1) {eleHTML=temp;oldStr=oldStr2;}
	}
	
	//去除空格干扰
	if(eleHTML.indexOf(oldStr)==-1 && !eleHTML.match(/<.+?>/)){
		temp=eleHTML.replace(/\s+/g,"");
		if(temp.indexOf(oldStr)!=-1) eleHTML=temp;
	}
	//防止a标签嵌套
	temp=oldStr.match(urlReg) || oldStr.match(magnetReg);
	if(temp) {
		var num=eleHTML2.indexOf("<a href='"+oldStr+"' target='_blank'>"+oldStr+"</a>");
		if(num!=-1) return;
		if(newStr.indexOf("<a href")!=-1) console.log("将字符串："+temp[0]+" 转换为超链接");
	}
	//console.log("eleHTML："+eleHTML+"#");
	//console.log("oldStr："+oldStr+"#");
	//console.log("newStr："+newStr+"#");
	//如果html结构过于复杂，替换失败，则恢复原本的html代码
	if(eleHTML.indexOf(oldStr)!=-1){
		for(var i=0;i<delEle.length;i++) delEle[i].remove();
		ele.innerHTML=eleHTML.replace(oldStr,newStr).replaceAll("▁","&amp;");
	}else{
		ele.innerHTML=oldEle;
	}
}
/**
 * 存储变量
 * @author guziyimai
 */
var NadiaTQM=getObj("NadiaTQM",1)[0];
var oldKey='',oldTQM='';
function saveTQM(key,tqm){
	if(key==oldKey && tqm==oldTQM) return;
	console.log("储存提取码："+key+","+tqm);
	NadiaTQM.setAttribute("key",key);
	NadiaTQM.setAttribute("tqm",tqm);
	NadiaTQM.click();
	oldKey=key;oldTQM=tqm;
}
NadiaTQM.innerHTML='<div id="nadia_menu" style="display:none;z-index:999;position:absolute;border: 0;background:#FFF;box-shadow:0 2px 10px 0 rgba(0,0,0,.2);border-radius:10px;padding: 10px 8px;font-size:12px;width:auto;height:auto;"><span style="background-color:#4e6ef2;border:none;padding:6px;border-radius: 5px;margin:5px;color:white;cursor:pointer;">解密F1</span><span style="background-color:#4e6ef2;border:none;padding:6px;border-radius: 5px;margin:5px;color:white;cursor:pointer;">去汉字F2</span></div>';

/**
 * AscII加密/解密
 * @author guziyimai
 */
NadiaAscii = {
	decode : function (str) {
		return window.unescape(str.replace(/\\u/ig,'%u').replace(/\\x/ig,'%u00').replaceAll('&#x','%u').replaceAll(';',''));
	}
}

/**
 * Base64加密/解密
 * @author guziyimai
 */
NadiaBase64 = {
	encode : function (str) {
		return window.btoa(unescape(encodeURIComponent(str)));
	},
	decode : function (str) {
		var str2=decodeURIComponent(escape(window.atob(str)));
		if (NadiaBase64.encode(str2).replace(/={1,3}$/, '') != str.replace(/={1,3}$/, '')) return '';
		return str2;
	}
}
//纳迪亚加密用的变量
var keys="0QWqxswE9RYedcvfU8PyuLK7HGrgh1kF6DSipn5XCV3N2oZTJztj";
var codes=[57610,40149,11511,19337,34608,21960,51504,30826,38588,62365,20426,16016,19754,59323,46416,54013];
var blk=5;
var len=keys.length-blk;
var mul1=len;
var mul2=mul1*mul1;
var MCStr="",crx_ver="?";
var zips=[
	"https://",
	"pan.baidu.com/s/",
	"docs.qq.com/",
	"pan.baidu.com/share/init?surl=",
	"share.weiyun.com/",
	"magnet:?xt=urn:btih:",
	"thunder://",
	"提取码",
	"解压码",
	"复制这段内容后打开百度网盘",
	"App，操作更方便哦",
	"--来自百度网盘超级会员V",
	"www.aliyundrive.com/s/",
	"这是我用百度网盘分享的内容",
	"废弃A ",//"复制这段内容打开「",▐
	"废弃B ",//"」APP即可获取",░
	"www.kdocs.cn/l/",//"我用阿里云盘分享了",▒
	"cloud.189.cn/t/",
	"alywp.net/",
	"mega.nz/file/"
];
var zips2="▁▂▃▄▅▆▇█▉▊▋▍▎▏▐░▒▓▔▕▌";
var zipsEStart="";
var zipsELen="";
var check;
var urlReg=/(https?:\/\/|ftp:\/\/)?[a-z0-9\-_]+?\.[a-z0-9\-\._~]{2,}([\/?#&:][a-z0-9\.~:\/\?#&\+%=\-_@]+)?/gi
var magnetReg=/magnet:\?xt=urn:btih:[a-f0-9]{32,}/i;

/**
 * 双击模糊匹配
 * @author guziyimai
 */
document.addEventListener('dblclick',function(){
	try{if(NadiaTQM.getAttribute("runCrx")=="-1") return;}catch(e){}
	//console.log("双击模式");
	menu.style.display="none";
	sel=document.getSelection().anchorNode;
	if(!sel||!sel.wholeText) return false;
	var preEle=sel.previousElementSibling,nextEle=sel.nextElementSibling;
	upStr=sel.wholeText.replace(/^[:\s]+/,'').replace(/\s+$/,'');
	if(!upStr) return false;
	if(upStr.length<7||upStr.length>66666) return false;
	sel=sel.parentElement;
	if(!sel) return false;
	try {
		endEle=document.getSelection().extentNode.parentElement;
		if (
			/^(a|pre|code|xmp)$/i.test(sel.tagName)
			|| sel.parentElement.getAttribute('contenteditable')
			|| sel.getElementsByTagName("input")[0]
			|| sel.getElementsByTagName("textarea")[0]
		) {
			sel = null;
			return;
		}
	} catch (e) {
		endEle=sel;
	}
	//是否为兽音、佛曰等
	var isF2=iscallMode(upStr);
	if(isF2) return true;
	//是否为被空格防和谐的磁力
	var magnetStr=upStr.replace(/\s+/g,"");
	if(magnetStr && magnetStr.length<64) {
		magnetStr=magnetStr.match(/^[a-f0-9]{32,}$/i);
		if(magnetStr && (magnetStr[0].length==40||magnetStr[0].length==32)){
			autoDecode(magnetStr[0]);
			selStr="",sel=null,endEle=null;
			return true;
		}
	}
	selStr=document.getSelection().toString();
	selStr=selStr.replace(/[\s　]+/g,"");
	//console.log("selStr:"+selStr);
	//校验格式
	if(!selStr) return false;
	if(selStr.length>23333) return false;
	if(!/^[a-z0-9\+=\/\\%:：\-_\.~#&]+$/i.test(selStr)){
		return false;
	}
	if('text'==sel.tagName.substr(0,4).toLowerCase()) return false;
	//扩大选取范围，防止截断密文
	var hasImg=false;
	if(preEle){
		preEle=preEle.tagName.toLowerCase();
		if(preEle=="a" || preEle=="img") hasImg=true;
	}else if(nextEle){
		nextEle=nextEle.tagName.toLowerCase();
		if(nextEle=="a" || nextEle=="img") hasImg=true;
	}
	
	//var upStr2=sel.innerHTML;
	//是否有表情包干扰
	if(sel.innerHTML.length<23333 && hasImg){
		var splitStr=upStr.match(/(https?:|ftp:)?[a-z0-9\+=\/\\%\-_&#;:\.\?@]+\(?/gi);
		if(splitStr){
			var i=0;
			for(;i<splitStr.length;i++){
				if(splitStr[i].indexOf(selStr)!=-1) {
					splitStr=splitStr[i];
					break;
				}
			}
			if(i==splitStr.length) {return false;}
		} else {
			splitStr=selStr;
		}
		var temStrs=sel.innerText.split(splitStr);
		var tem1,tem2;
		try{
			tem1=temStrs[0].match(/(https?:|ftp:)?[a-z0-9\+=\/\\%\-_&#;:\.\?]+$/gi);
			tem2=temStrs[1].match(/^[a-z0-9\+=\/\\%\-_&#;:\.\?@]+/gi);
		} catch(e){}
		if(!tem1) tem1='';
		if(!tem2) tem2='';
		upStr=tem1+splitStr+tem2;
	} else {
		var upStr2=upStr.match(/[a-z0-9\+=\/\\%\-_\.~#&:\?;@]{4,}/gi);
		if(upStr2) {
			var i=0;
			for(;i<upStr2.length;i++){
				if(upStr2[i].indexOf(selStr)!=-1) {
					upStr=upStr2[i];
					break;
				}
			}
			if(i==upStr2.length) {return false;}
		} else {return false;}
	}
	MCStr=selStr.match(/[a-f0-9]{32}#[a-f0-9]{32}#\d{1,12}#\S{1,128}/ig);
	if(MCStr||upStr.length<7||upStr.length>99999) return false;
	upStr=upStr.replace(/^#+/,'');
	//再次判断是否为兽音、佛曰等
	var isF2=iscallMode(upStr);
	if(isF2) return true;
	if(autoDecode(upStr)) {selStr="",sel=null,endEle=null;}
});

/**
 * 鼠标拖放后：显示【解密】【去汉字】按钮
 * @author guziyimai
 */
var pagex1,pagex2,pagey1,pagey2,menu=getObj("nadia_menu");
var menuBtns=menu.getElementsByTagName("span");
menu.onmousedown=function(e){
	e.stopPropagation();
}
menu.onmouseup=function(e){
	e.stopPropagation();
}
document.addEventListener('mousedown',function(e){
	menu.style.display="none";
	pagex1=e.pageX;
	pagey1=e.pageY;
});
document.addEventListener('mouseup',function(e){
	pagex2=e.pageX;
	pagey2=e.pageY;
	if(Math.abs(pagex2-pagex1)+Math.abs(pagey2-pagey1)){
		try{if(NadiaTQM.getAttribute("runCrx")=="-1") {return;}}catch(e){}
		var mySel=document.getSelection();
		if(!mySel) return;
		selStr=mySel.toString().replace(/^[:\s]+/,"").replace(/\s+$/,"");
		if(selStr.length<7||selStr.length>23333) return;
		var flag=/[a-z0-9\-~_][a-z0-9\.\+%=\-_~]{2,}/i.test(selStr);
		if(!flag) flag=/(佛曰：|熊曰：|呋食)[^0-9a-z]{7,}/.test(selStr);
		if(!flag) {
			var headStr=selStr.substr(0,3);
			for(var i=3;i<50&&i<selStr.length;i++){
				if(headStr.indexOf(selStr[i])==-1) headStr+=selStr[i];
				if(headStr.length>4) return;
			}
		}
		sel=mySel.anchorNode;
		if(!sel) return;
		sel=sel.parentElement;
		if(!sel) return;
		try {
			if (
				/^(pre|code|xmp)$/i.test(sel.tagName)
				|| sel.parentElement.getAttribute('contenteditable')
				|| sel.getElementsByTagName("input")[0]
				|| sel.getElementsByTagName("textarea")[0]
			) {
				sel = null;
				return;
			}
			//处理“反选”
			endEle=mySel.extentNode.parentElement;
			if(sel!=endEle&&pagex2<pagex1) {
				var temEle=sel;
				sel=endEle;
				endEle=temEle;
			}
			if(sel.tagName.toLowerCase()=="a") {
				if(sel==endEle) {
					sel = null;
					return;
				}else if(sel.parentElement==endEle){
					sel=sel.parentElement;
				}
			}
			if(endEle.innerText.length>23333) return;
		} catch (e) {}
		MCStr=selStr.match(/[a-f0-9]{32}#[a-f0-9]{32}#\d{1,12}#\S{1,128}/ig);
		if(MCStr){
			downStr="";
			for(var i=0;i<MCStr.length;i++){
				if(MCStr[i].length>69) downStr+=MCStr[i]+"\n";
			}
		} else {
			MCStr="";
			downStr=selStr.replace(/[^a-z0-9\-~_\.\/?#&\+%=提取解压码:：;]+/ig,"");
		}
		if(sel.innerText.trim()==endEle.innerText.trim()&&!/(?<![a-z0-9])(https:\/\/)?(pan\.baidu\.com)?\/?s?(hare|wap)?\/?(1|init\?surl=)[a-z0-9_\- ]{22,}/i.test(selStr)) downStr=downStr.replace(/\s+/g,'');
		if(MCStr) {
			menuBtns[0].style.display="inline";
			menuBtns[1].style.display="none";
			menuBtns[0].innerHTML="秒传F1";
		} else {
			menuBtns[0].innerHTML="解密F1";
			if(downStr&&(downStr.match(urlReg)||downStr.match(magnetReg))) {
				menuBtns[0].style.display="none";
			} else {
				menuBtns[0].style.display=selStr.length>6?"inline":"none";
			}
			menuBtns[1].style.display=(downStr&&downStr!=selStr)?"inline":"none";
			if(selStr.length<7&&menuBtns[1].style.display=="none") return;
		}
		if(menuBtns[0].style.display=="none"&&menuBtns[1].style.display=="none") return;
		var leftLen=pagex2-10,topLen=pagey2+18;
		var maxWidth=document.body.clientWidth-150,maxHeight=document.body.scrollHeight-42;
		if(leftLen<0) leftLen=0;
		if(topLen<0) topLen=0;
		if(leftLen>maxWidth) leftLen=maxWidth;
		if(topLen>maxHeight) topLen=maxHeight;
		menu.style.left=leftLen+"px";
		menu.style.top=topLen+"px";
		menu.style.display="block";
	}
});
window.onkeydown=function(event){
	try{if(NadiaTQM.getAttribute("runCrx")=="-1") {return;}}catch(e){}
	if(event.keyCode==112||event.keyCode==113||event.keyCode==121) {
		F1Mode(event.keyCode);
		event.stopPropagation();
		return false;
	}
};
menuBtns[0].onclick=function(e){
	F1Mode(112);
	menu.style.display="none";
	//selStr="",sel=null,endEle=null;
	e.stopPropagation();
};
menuBtns[1].onclick=function(e){
	F1Mode(121);
	e.stopPropagation();
};

/**
 * F1精准匹配&&F2去汉字
 * @author guziyimai
 */
function F1Mode(keycode){
	if(!selStr||!sel) return false;
	if(keycode==112) {
		menu.style.display="none";
		var clean=true;
		if(MCStr) {
			try{crx_ver=NadiaTQM.getAttribute("version");}catch(e){}
			if(crx_ver&&Number(crx_ver.replaceAll(".",""))>131) {
				NadiaTQM.setAttribute("key","baidumiaochuan");
				NadiaTQM.setAttribute("tqm",downStr);
				NadiaTQM.click();
				window.open("https://pan.baidu.com/disk/main","_blank");
			} else {
				alert("此功能需要更新到1.3.2以上版本。");
			}
		} else {
			//是否为佛曰等
			var isF2=iscallMode(selStr);
			if(isF2) return false;
			clean=autoDecode(selStr);
		}
		if(clean) {selStr="",sel=null,endEle=null;}
		return false;
	} else if(keycode==113||keycode==121){
		if(downStr==selStr) return false;
		changeElement(sel,selStr.replace(/\n/g,'<br>'),completeUrl());
		console.log("将字符串："+selStr+" 去除汉字。");
		selStr=downStr;
		if(!selStr || selStr.length<6 || /(?<!解压.{1,3})<a\s.+?<\/a>/.test(selStr)) {
			menu.style.display="none";
			selStr="",sel=null,endEle=null;
		} else {
			menuBtns[1].style.display="none";
		}
		return false;
	}
}

/**
 * 调用外网解密模式
 * @author guziyimai
 */
function callMode(str){
	//console.log("callMode模式");
	upStr=str.match(/(佛曰：|熊曰：|新佛曰：)[^0-9a-z]{5,}/i);
	if(upStr){
		upStr=upStr[0];
	} else if('SB：'==str.substr(0,3)){
		upStr=str;
	} else {
		return false;
	}
	var headStr=upStr.substr(0,3);
	if(headStr=='SB：') upStr=upStr.substr(3);
	console.log("抓取的密文："+upStr);
	NadiaTQM.setAttribute("tqm",upStr);
	var key;
	if(headStr=="SB：") {
		//console.log("AES：");
		key="http://hi.pcmoe.net/aes.html";
	} else if(headStr=="佛曰：") {
		//console.log("佛曰解密：");
		key="https://www.keyfc.net/bbs/tools/tudoucode.aspx";
	} else if(headStr=="熊曰：") {
		//console.log("熊曰解密：");
		key="http://hi.pcmoe.net/index.html";
	} else if(headStr=="新佛曰") {
		//console.log("新佛曰解密：");
		key="http://hi.pcmoe.net/buddha.html";
	} else {
		return false;
	}
	NadiaTQM.setAttribute("key",key);
	NadiaTQM.click();
	subWin=window.open(key,"_blank");
	timerNum=0;
	//console.log("调用："+key);
	timerId=setInterval(function(){
		timerNum++;
		if(subWin.closed){
			clearInterval(timerId);
			timerNum=0;
			timerId=setInterval(function(){
				timerNum++;
				downStr=NadiaTQM.getAttribute("return-roar");
				NadiaTQM.removeAttribute("return-roar");
				if(downStr) {
					clearInterval(timerId);
					console.log("解密后的文字："+downStr);
					if(headStr=="熊曰："&&sel.innerText.indexOf("熊曰：")==-1) upStr=upStr.replace(/^熊曰：/,"");
					changeElement(sel,upStr,completeUrl());
				}else if(timerNum>10){
					clearInterval(timerId);
				}
			},100);	
		} else if(timerNum>60){
			clearInterval(timerId);
		}
	},150);
	return true;
}

/**
 * 自动解密引擎
 * @author guziyimai
 */
function autoDecode(upStr){
	//console.log("autoDecode：upStr="+upStr);
	downStr="";
	if (upStr.length<0x29a) {
		if(upStr.length>16 && upStr.match(/^[01\s]+$/)) return true;
		var bdStr = upStr.match(/(?<![a-z0-9])(https:\/\/)?(pan\.baidu\.com)?\/?s?(hare|wap)?\/?(1|init\?surl=)[a-z0-9_\- ]{22,28}([\?&](pwd|psw)=[a-z0-9]{4})?(?![a-z0-9])/gi),bdStr2;
		//console.log("bdStr="+bdStr);
		if (bdStr) {
			var tqm="";
			bdStr = bdStr[0];
			if (bdStr.match(/(pwd=|psw=| )[a-z0-9]{4}$/i)) {
				tqm=bdStr.substr(-4);
				bdStr=bdStr.replace(/ [a-z0-9]{4}$/i,"");
			}
			bdStr2 = bdStr.replace(/ +/g, '').replace("https://", '').replace('pan.baidu.com', '').replace('init?surl=', '1').replace(/^\/?s?(hare|wap)?\//, '');
			if (bdStr2.length==27) {
				tqm=bdStr2.substr(-4);
				if(/[a-z0-9]{4}/i.test(tqm)) 
					bdStr2=bdStr2.substr(0,bdStr2.length-4)+"?pwd="+tqm;
			}
			if (bdStr2.length==23||bdStr2.length==32) {
				downStr=zips[0]+zips[1]+bdStr2;
				//if(bdStr2.length==0x20) tqm="";
				console.log('抓取的密文：' + bdStr);
				console.log('补全后的文字：' + downStr);
				changeElement(sel, bdStr, completeUrl(tqm));
				return true;
			}
		}
	}

	//是否为完整链接
	var urlStr=upStr.replace(/\s+/g,"").match(urlReg);
	if(urlStr && urlStr.length==1) {
		urlStr=urlStr[0];
		//console.log("这是完整的链接");
		if(urlStr.indexOf("/")!=-1){
			var urlStr2=urlStr;
			if(urlStr.substr(0,4)!="http"&&urlStr.substr(0,4)!="ftp:") urlStr2="https://"+urlStr;
			changeElement(sel,urlStr,"<a href='"+urlStr2+"' target='_blank'>"+urlStr+"</a>");
			return true;
		}
	}
	urlStr=upStr.replace(/\s+/g,"").match(magnetReg);
	if(urlStr && (urlStr[0].length==52 || urlStr[0].length==60)) {
		urlStr=urlStr[0];
		changeElement(sel,urlStr,"<a href='"+urlStr+"' target='_blank'>"+urlStr+"</a>");
		return true;
	}
	//去除汉字的干扰：
	//无视：）】之前的字符
	upStr=upStr.replace(/#\([^0-9a-z]{1,5}\)/ig,"")
	.replace(/^[^:：]{1,200}[:：](?!\/)/,"")
	.replace(/[^a-z0-9\+=\/\\%\-_\.&\?#;:]+/ig,"")
	.replace(/^:/,"");
	if(/^(av|bv|cv)[a-z0-9]{3,12}$/i.test(upStr)){
		isBilibili();
		return true;
	}
	check=upStr.match(/[a-z0-9\+=\/\\%&#;]{7,}/ig);
	if(!check) return true;
	var isAscII=/([\\%]u[a-f0-9]{4}|\\x[a-f0-9]{2}|&#x?[a-f0-9]{2,4})/i.test(upStr);
	var isBase64=/[a-z0-9][4abm\+=\/]/i.test(upStr);
	if(isBase64&&/[\\%&#;]/.test(upStr)) isBase64=false;
	var isMaget=false;
	if(upStr.length>31){
		isMaget=/^[a-f0-9]{32}$/i.test(upStr);
		if(!isMaget) isMaget=/^[a-f0-9]{40}$/i.test(upStr);
	}
	//排除01代码
	//if(upStr.match(/^[01\s]+$/)) isMaget=![];
	//2、是否为ASCII加密
	if(isAscII) {
		downStr=NadiaAscii.decode(upStr);
		//console.log("ASCII解密：");
	} else if(isBase64) {
		//3、是否为Base64加密
		try{
			downStr=NadiaBase64.decode(upStr);
		} catch(e) {
			//AES
			var isAES=upStr.length%0x40;
			if(upStr[0]=='1'&&upStr.length==0x18)isAES=-1;
			if(isAES==0||isAES==0x18||isAES==0x2c){
				callMode('SB：'+upStr);return false;
			}else if(isMaget){
				downStr=zips[5]+upStr;
			}else{
				downStr='';
			}
		}
	} else {
		//4、是否为纳迪亚加密
		downStr=nadiaDecode(upStr);
		//console.log("纳迪亚解密：");
		if(!downStr && isMaget) {
			downStr=zips[5]+upStr;
		}
	}
	console.log("抓取的密文："+upStr);
	if(upStr.length<4 && downStr!="猫娘") return true;
	if(
		downStr=="https://docs.qq.com/doc/DQnJ6eUpLV1daTnZq"
		||downStr=="https://docs.qq.com/doc/DQnh1aUp2Z010aGV4"
		||downStr=="https://docs.qq.com/doc/DQmdkR3lOQ1dJZ3JN"
		||downStr=="https://docs.qq.com/doc/DQk5pV2xnb0VIbm9n"
	) {
		downStr="https://www.kdocs.cn/l/cfRKHVhINM2w";
	}
	if(downStr=="https://www.kdocs.cn/l/cdf3crSMGobX") downStr="https://www.kdocs.cn/l/csHUD6WUaw2R";
	console.log("解密后的文字："+downStr);
	if(downStr) changeElement(sel,upStr,completeUrl());
	return true;
}

/**
 * Bilibili补全
 * @author guziyimai
 */
function isBilibili(){
	var urlStr='';
	if(selStr.length<20){
		var headStr=selStr.match(/(av|bv)[a-z0-9]{3,12}/i);
		if(headStr){
			urlStr='https://www.bilibili.com/video/'+headStr[0];
		} else {
			headStr=selStr.match(/cv[a-z0-9]{3,12}/i);
			if(headStr){
				urlStr='https://www.bilibili.com/read/'+headStr[0];
			}
		}
		if(headStr) {
			console.log("抓取的密文："+headStr[0]);
			console.log("补全后的文字："+urlStr);
			changeElement(sel,headStr[0],"<a href='"+urlStr+"' target='_blank'>"+urlStr+"</a>");
		}
	}
	return urlStr;
}

/**
 * 是否为兽音、佛曰？
 * @author guziyimai
 */
function iscallMode(str){
	//console.log("iscallMode");
	var upStr2=str.replace(/^\S{1,15}\s{1,4}/,"").replace(/\s{1,4}\S{1,15}$/,"");
	if(/^呋食/.test(upStr2)) upStr2="熊曰："+upStr2;
	if(!upStr2) return false;
	if(upStr2.length<12 || upStr2.length>23333) return false;
	if(/\.{3}$/.test(upStr2)) return false;
	//是否为佛曰
	var roarStr=upStr2.match(/^.{0,12}(佛曰：|熊曰：|新佛曰：)[^a-z0-9]{12,}/i);
	if(roarStr) {
		callMode(upStr2);
		return true;
	}
	//是否为兽音
	upStr2=upStr2.replace(/^[:：]/,"");
	//无视：）】之前的字符
	roarStr=upStr2.replace(/^[^:：\)）\]】]{1,200}[:：\)）\]】]/,"").replace(/[\(（\[【][^\(（\[【\)）\]】]{1,99}[\)）\]】]$/,"");
	if(roarStr.match(/[:：\)）\]】]/)) {roarStr=upStr2;} else {upStr2=roarStr;}
	if(roarStr.length>99||roarStr.length%8==4){
		//非标准兽音，还原为标准兽音
		var headStr;
		//容错：密文不完整
		if(roarStr.length%8!=4) {
			headStr=roarStr.substr(0,3);
			for(var i=3;i<60;i++){
				if(roarStr[i]!=headStr[0]&&roarStr[i]!=headStr[1]&&roarStr[i]!=headStr[2]) {
					headStr+=roarStr[i];
					break;
				}
			}
		} else {
			headStr=roarStr.substr(0,3)+roarStr.charAt(roarStr.length-1);
		}
		//替换转义字符
		if(/[\*\+\.\?\\\^\|\$\(\)\[\]\{\}]/.test(headStr)){
			roarStr=roarStr.replaceAll(headStr[0],zips2[0])
			.replaceAll(headStr[1],zips2[1])
			.replaceAll(headStr[2],zips2[2])
			.replaceAll(headStr[3],zips2[3]);
			headStr=roarStr.substring(0,3)+roarStr.charAt(roarStr.length-1);
		}
		//校验是否为4进制
		if(
			headStr[1]!=headStr[0]
			&& headStr[2]!=headStr[1]
			&& headStr[2]!=headStr[0]
			&& headStr[3]!=headStr[2]
			&& headStr[3]!=headStr[1]
			&& headStr[3]!=headStr[0]
			&& new RegExp("^["+headStr+"]+$").test(roarStr)
		) {
			try{
				downStr=NadiaRoar.decode(roarStr,headStr[2]+headStr[1]+headStr[3]+headStr[0]);
				console.log("downStr="+downStr);
				if(!downStr) return false;
				changeElement(sel,upStr2,completeUrl());
				console.log("抓取的密文："+upStr2);
				console.log("解密后的文字："+downStr);
				return true;
			}catch(e){
				return false;
			}
		}
	}
	return false;
}

/**
 * 兽音译者编码和解码
 * @author guziyimai
 */
window.NadiaRoar={
	decode : function (str,head) {
		var result="",i=3,offset=0,n1,n2,b,c;
		if(!head) head=str[2]+str[1]+str[str.length-1]+str[0];
		while(i<str.length-1){
			c=0;b=i+8;
			while(i<b){
				n1=head.indexOf(str[i++]);
				n2=head.indexOf(str[i]);
				if(n1<0||n2<0) return result+"...";
				c=c<<4|((n1<<2|n2)+offset)&15
				if(offset==0){
					offset=4294967295;
				} else {
					offset--;
				}
				i++;
			}
			result+=String.fromCharCode(c);
		}
        return result;
	}
}

/**
 * 纳迪亚加密/解密
 * @author guziyimai
 */
function nadiaDecode(upStr){
	var str;
	var key2=keys;
	var asc=key2.indexOf(upStr[0]);
	if(asc<0) {
		return "";
	}
	var codes2=[];
	for(var i=0;i<16;i++){
		codes2[5*i]=codes[i];
		codes2[5*i+1]=codes[i]+asc;
		codes2[5*i+2]=codes[i]-asc;
		codes2[5*i+3]=codes[i]+asc*2;
		codes2[5*i+4]=codes[i]-asc*2;
	}
	//统一填零字符
	if(asc!=0) key2=key2.substr(asc,len-asc+blk)+key2.substr(0,asc);
	upStr=upStr.substr(1,upStr.length-1);
	upStr=upStr.replaceAll(key2[0],zips2[zips.length]);
	for(var i=1;i<5;i++){
		upStr=upStr.replaceAll(key2[len+i],key2[0]);
	}
	//开始解密
	var a1,a2,a3,ci=0;
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
					return "";
				}
				asc=a1*mul2+a2*mul1+a3;
				asc=asc^codes2[ci++%80];
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
			return "";
		}
		asc=a1*mul2+a2*mul1+a3;
		asc=asc^codes2[ci++%80];
		str=String.fromCharCode(asc);
		downStr+=str;
	}
	for(var i=0;i<zips.length;i++){
		downStr=downStr.replaceAll(zips2[i],zips[i]);
	}
	return downStr;
}

/**
 * 自动补全链接
 * @author guziyimai
 */
function completeUrl(tqm){
	if(!downStr) return "";
	//防止恶意代码注入，代码格式原样展示
	if(/<(a|p|div|span|script|link|iframe)\s.*>/i.test(downStr)) return "<pre>"+downStr.replaceAll("<","&lt;").replaceAll(">","&gt;")+"</pre>";
	if (downStr.indexOf(zips[1])!=-1) downStr=downStr.replace(/(\?psw|&pwd|&psw)=/ig, "?pwd=");
	var myUrl,urlHead="",oldUrl;
	myUrl=downStr.match(urlReg);
	if(myUrl==null){
		myUrl=downStr.match(/(magnet:\?xt=urn|thunder|flashget|qqdl):[a-z0-9:_&\+%=\/\-]{8,}/ig);
	}
	if(myUrl){
		var len=myUrl.length,j=0,tqmArr=[];
		var tqm1=/(?<=(提取|pwd=|ti\s?qu|tqm)[^a-z0-9]{0,4})[a-z0-9]{4}(?![a-z0-9])/gi,tqm2=/(?<!解压.{1,3})(?<=[\s,，:：码马]{1,2})[a-z0-9]{4}(?![a-z0-9])/gi;
		if(myUrl.length==1) {
			//如果密文中仅含1个链接的话，优先从其前后10字符范围内，抓取提取码
			if(tqm) {
				tqmArr=[tqm];
			}else if(selStr){
				tqmArr=selStr.match(tqm1);
				var tqmStr=sel.innerText.split(selStr);
				if(!tqmArr&&tqmStr&&tqmStr[1]) 
					tqmArr=tqmStr[1].match(tqm1);
				if(!tqmArr) 
					tqmArr=selStr.match(tqm2);
				if(!tqmArr&&tqmStr&&tqmStr[1]) 
					tqmArr=tqmStr[1].match(tqm2);
			}
		}
		//console.log(tqmArr);
		//抓取提取码优先级：解密后文字、正选、反选
		if(!tqmArr||tqmArr.length==0){
			tqmArr=downStr.match(tqm1);
			if(!tqmArr) 
				tqmArr=sel.innerText.match(tqm1);
			if(!tqmArr&&endEle) 
				tqmArr=endEle.innerText.match(tqm1);
			if(!tqmArr) 
				tqmArr=downStr.match(tqm2);
			if(!tqmArr) 
				tqmArr=sel.innerText.match(tqm2);
			if(!tqmArr&&endEle) 
				tqmArr=endEle.innerText.match(tqm2);
		}
		if(len>10) len=10;
		//最多只处理10个网址
		for(var i=0;i<len;i++){
			if(myUrl[i].indexOf("/")!=-1||myUrl[i].indexOf("magnet:")!=-1){
				if(downStr.indexOf('href="'+myUrl[i])!=-1||downStr.indexOf('src="'+myUrl[i])!=-1) continue;
				if(!/http|magnet/i.test(myUrl[i])) urlHead=zips[0];
				oldUrl=myUrl[i];
				if(!myUrl[i].match(imgReg)){
					var tqm;
					//阿里云不够稳定，已放弃
					//if(myUrl[i].indexOf('www.aliyundrive.com/s/')!=-1) {
					//	tqm="?pwd="+tqmArr[j++];
					//} else {
					tqm=myUrl[i].match(/(?<=\/s\/)1[a-z0-9_\-]{22}(?!\?p)/gi);
					if (tqm && tqm[0] && tqmArr && tqmArr[j]) {
						urlHead='',
						myUrl[i]=zips[0]+zips[1]+tqm[0];
						console.log("存储提取码："+tqm[0]+","+tqmArr[j]);
						tqm="?pwd="+tqmArr[j++];
					} else {
						tqm='';
					}
					downStr=downStr.replace(oldUrl,"<a href='"+urlHead+myUrl[i]+tqm+"' target='_blank'>"+myUrl[i]+"</a>");
				}
			}
		}
	}
	return downStr;
}

/**
 * 干掉SB的贴吧广告！
 * @author guziyimai
 */
var myStyle=document.createElement("style");
if(istieba) {
	document.body.appendChild(myStyle);
	function killAD(){
		var runCrx="1";
		try{runCrx=NadiaTQM.getAttribute("runCrx");}catch(e){}
		if(runCrx=="-1") {
			myStyle.innerHTML="";
			console.log("屏蔽贴吧广告模块已关闭.");
		} else {
			myStyle.innerHTML=killRules;
			console.log("已清除百度贴吧的广告.");
			try{getObj("label_text",2)[0].parentElement.remove();}catch(e){}
		}
	}
	myStyle.onclick=killAD;
	setTimeout(function(){killAD();myStyle.className="kill_tieba_ad";},50);
}
return "guziyimai 1.3";
}();
