//@author guziyimai
//是否是IE
var waringStr,isLowIE,isSBIE;
getObj("menuDiv",2)[0].style.display="block";
/**
 * Ascii码加密、解密
 * @author guziyimai
 */
var preStr=["\\u000","\\u00","\\u0","\\u"];
window.Ascii = {
	encode : function (inputStr) {
		var allStr="",str;
		for(var i=0;i<inputStr.length;i++){
			str=inputStr.charCodeAt(i).toString(16);
			allStr+=preStr[str.length-1]+str;
		}
		return allStr;
	},
	decode : function (str) {
		return window.unescape(str.replace(/\\u/ig,'%u'));
	}
}
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
	isLowIE=true;
	waringStr="浏览器版本过低，建议使用谷歌内核的浏览器";
	throw new Error(waringStr);
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
/**
 * 给SB的IE用的！！！
 * @author guziyimai
 */
try{
	"".replaceAll("","");
}catch(err){
	isSBIE=true;
	String.prototype.replaceAll=function(a,b){
		return this.split(a).join(b);
	};
	Array.prototype.indexOf=function(elt,start){
		var len=this.length;
		if(!start) start=0;
		for(;start<len;start++)
			if(this[start] == elt) return start;
		return -1;
	}
}
