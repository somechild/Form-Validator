
	//maxSize/minSize--> limits in bytes
		//set minSize and/or maxSize to falsey values if no min/max respectively
			//ex. for no min, but 3mb pass 
			/*fileValidator(file, false, 3145728, false);*/


	//file--> can be passed by $('fileSelector')[0].files[0] 
		// *note .files returns an array, you will have to test one file at a time


	//type--> false=any || 'image' || 'text' || 'pdf' || or pass array of allowed file extensions
		// 'image', 'text', 'pdf' simply use the most common of that type
		// you can pass preset 'text', 'image', 'pdf' in the array of allowed file extensions as well
			//ex. ['pdf', 'text', 'xls', 'ppt']
				//--> will check if file is 'pdf' or 'text' presets or if it has the .xls or .ppt extensions as well





fileValidator = function(file, minSize, maxSize, fileType) {

//*****
	//If err
		// err: 0 --> minSize does not match
		// err: 1 --> maxSize does not match
		// err: 2 --> fileType does not match
//*****


	if (!file) return {"isSuccess": false};

	var errNo = -1;


	var isInvalidFileSize = minSize? maxSize? (file.size > maxSize && (errNo = 1)) && (file.size < minSize && (errNo = '0')): (file.size < minSize && (errNo = 1)): maxSize? (file.size > maxSize  && (errNo = 1)): false;

	var regToUse;
	if (fileType)
		if (fileType == 'image')
			regToUse = /\.(jpg|jpeg|png|gif|bmp|thm|svg|tif|tiff|jifif|jp2|jpx|j2k|j2c|psd)$/;
		else if (fileType == 'text')
			regToUse = /\.(doc|docx|log|pages|rtf|txt|wpd|wps|msg|odt|tex)$/;
		else if (fileType == 'pdf')
			regToUse = /\.(pdf)$/;
		else if ((typeof fileType == 'object') && Array.isArray(fileType))
			regToUse = '/\.(' + fileType.reduce(function(running, curr) {
				//should they decide to use one of the presets as well in the array
				var runner = running;
				if (runner == 'image')
					runner = 'jpg|jpeg|png|gif|bmp|thm|svg|tif|tiff|jifif|jp2|jpx|j2k|j2c|psd';
				else if (runner == 'text')
					runner = 'doc|docx|log|pages|rtf|txt|wpd|wps|msg|odt|tex';

				var cur = curr;
				if (cur == 'image')
					cur = 'jpg|jpeg|png|gif|bmp|thm|svg|tif|tiff|jifif|jp2|jpx|j2k|j2c|psd';
				else if (cur == 'text')
					cur = 'doc|docx|log|pages|rtf|txt|wpd|wps|msg|odt|tex';
				//end

				return runner + '|' + cur;
			}) + ')$/';

	
	return {
		"isSuccess": !isInvalidFileSize && !(regToUse? (!file.name.match(regToUse) && (errNo = 2)): false),
		"err": parseInt(errNo)
	};

};



//isArray polyfill

if (!Array.isArray) {
	Array.isArray = function(arg) {
		return Object.prototype.toString.call(arg) === '[object Array]';
	};
}