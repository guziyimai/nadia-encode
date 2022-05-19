//是否是IE
//@author guziyimai
getObj("waringDiv").style.opacity=0;
var waringStr,isLowIE,isSBIE;
/**
 * 给SB的IE用的！！！
 * @author guziyimai
 */
try{
	new RegExp("(?<!.)");
}catch(e1){
	isSBIE=true;//会误伤火狐，但Nadia插件也不支持火狐内核
}
try{
	"".indexOf("");
}catch(e2){
	isLowIE=true;//IE8以下
}
try{
	"".replaceAll("","");
}catch(e3){
	//isSBIE=true;//会误伤115
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
		var elements = new Array();
		for (var i=0; i<children.length; i++){
			var child = children[i];
			var classNames = child.className.split(' ');
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

getObj("script",1)[0].innerHTML="var ngua=navigator.userAgent,isAndroid=/Android|Harmony|BlackBerry/i.test(ngua),isMobile=isAndroid||/iPhone|iPod|Mobile|SymbianOS/i.test(ngua),is86=/x86|win32|wow32/i.test(ngua),isFF=/firefox/i.test(ngua);document.getElementsByTagName('link')[0].href=isMobile?'mobile.css':'computer.css';"
if(!isAndroid) getObj("helpTxt",2)[2].innerHTML=isMobile?"":"注：PC端解压失败或没有解压软件的，可以使用我提供的WinRAR。</div>";
getObj("menuDiv",2)[0].style.display="block";

/**
 * Base64编码和解码
 * @author guziyimai
 */
try{
	window.btoa("");
	window.Base64 = {
		encode : function (str) {
			return window.btoa(unescape(encodeURIComponent(str)));
		},
		decode : function (str) {
			return decodeURIComponent(escape(window.atob(str)));
		}
	}
} catch(e){
	/**
	 * IE8、IE9兼容（IE7及以下，缺失的函数太多，不予支持）
	 * @author https://blog.csdn.net/qq_34039868/article/details/103919535
	 */
	isLowIE=true;
	window.Base64 = {
		_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
		encode : function (input) {
			var output = "";
			var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
			var i = 0;
			input = Base64._utf8_encode(input);
			while (i < input.length) {
				chr1 = input.charCodeAt(i++);
				chr2 = input.charCodeAt(i++);
				chr3 = input.charCodeAt(i++);
				enc1 = chr1 >> 2;
				enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
				enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
				enc4 = chr3 & 63;
				if (isNaN(chr2)) {
					enc3 = enc4 = 64;
				} else if (isNaN(chr3)) {
					enc4 = 64;
				}
				output = output +
					Base64._keyStr.charAt(enc1) + Base64._keyStr.charAt(enc2) +
					Base64._keyStr.charAt(enc3) + Base64._keyStr.charAt(enc4);
			}
			return output;
		},
		decode : function (input) {
			var output = "";
			var chr1, chr2, chr3;
			var enc1, enc2, enc3, enc4;
			var i = 0;
			input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
			while (i < input.length) {
				enc1 = Base64._keyStr.indexOf(input.charAt(i++));
				enc2 = Base64._keyStr.indexOf(input.charAt(i++));
				enc3 = Base64._keyStr.indexOf(input.charAt(i++));
				enc4 = Base64._keyStr.indexOf(input.charAt(i++));
				chr1 = (enc1 << 2) | (enc2 >> 4);
				chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
				chr3 = ((enc3 & 3) << 6) | enc4;
				output = output + String.fromCharCode(chr1);
				if (enc3 != 64) {
					output = output + String.fromCharCode(chr2);
				}
				if (enc4 != 64) {
					output = output + String.fromCharCode(chr3);
				}
			}
			output = Base64._utf8_decode(output);
			return output;
		},
		_utf8_encode : function (string) {
			string = string.replace(/\r\n/g,"\n");
			var utftext = "";
			for (var n = 0; n < string.length; n++) {
				var c = string.charCodeAt(n);
				if (c < 128) {
					utftext += String.fromCharCode(c);
				}
				else if((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				}
				else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}

			}
			return utftext;
		},
		_utf8_decode : function (utftext) {
			var string = "";
			var i = 0;
			var c = c1 = c2 = 0;
			while ( i < utftext.length ) {
				c = utftext.charCodeAt(i);
				if (c < 128) {
					string += String.fromCharCode(c);
					i++;
				}
				else if((c > 191) && (c < 224)) {
					c2 = utftext.charCodeAt(i+1);
					string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
					i += 2;
				}
				else {
					c2 = utftext.charCodeAt(i+1);
					c3 = utftext.charCodeAt(i+2);
					string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
					i += 3;
				}
			}
			return string;
		}
	}
	
	
}

//IE浏览器版本太低，放弃IE吧！
if(isLowIE) {
	isSBIE=true;
	waringStr="浏览器版本过低，建议使用谷歌内核的浏览器。";
}

/**
 * Ascii码加密、解密
 * @author guziyimai
 */
window.Ascii = {
	preStrArr : [["\\u000","\\u00","\\u0","\\u"],["%u000","%u00","%u0","%u"],["\\x0","\\x"],["&#x000","&#x00","&#x0","&#x"]],
	encode : function (inputStr,preIndex) {
		if(!preIndex) preIndex=0;
		var allStr="",str,preStr=this.preStrArr[preIndex];
		for(var i=0;i<inputStr.length;i++){
			str=inputStr.charCodeAt(i).toString(16);
			allStr+=preStr[str.length-1]+str;
			if(preIndex==3) allStr+=";";
		}
		return allStr;
	},
	decode : function (str) {
		return window.unescape(str.replace(/\\u/ig,'%u').replace(/\\x(?=[0-9a-f]{4})/ig,'%u').replace(/\\x/ig,'%u00').replaceAll('&#x','%u').replaceAll(';',''));
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
