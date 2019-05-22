import crypto from 'crypto'

const cmd5 = {
	// 参数加密
	paramsMd5(params){
		// console.log(params)
	    const str = "appsecret=19529988-3048-4C2C-9674-B29DB36AC56F&params=";
	    let rt = Date.parse(new Date()).toString();
	    rt = rt.substr(0,10);
	    let jsonObj = {
	        "rt": rt,
	        "Request":params
	    };
	    let dd = str + JSON.stringify(jsonObj);
	    var md5 = crypto.createHash("md5");
	    md5.update(dd);
	    let sign = md5.digest('hex');
	    jsonObj.sign = sign;
	    return jsonObj;
	}
}


// 导出接口
export default cmd5