/**
 * Base64编码和解码
 * @author guziyimai
 */
window.Base64 = {
	encode : function (str) {
		return window.btoa(unescape(encodeURIComponent(str)));
	},
	decode : function (str) {
		return decodeURIComponent(escape(window.atob(str)));
	}
}

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
	decode : window.unescape
}

/**
 * 给SB的IE用的replaceAll！！！
 * @author guziyimai
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
			i+=a.length;k++;j=i;
		}
		str[2*k]=this.substring(j);
		return str.join("");
	}
}
