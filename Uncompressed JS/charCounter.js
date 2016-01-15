/*
	
	txt --> is the txt to count on

	min, max --> is the minimum and maximum limits of the text
		| pass a falsey value in either if no limit in that category (ex. pass false for min if no minimum)
	
	ignSpace --> if you would like to ignore spaces from the character count
	
	ignLineBrs --> if you would like to ignore line breaks from the character count
	
	toTrim --> if you would like the function to trim spaces before counting characters
	
*/

charCounter = function(txt, min, max, ignSpace, ignLineBrs, toTrim) {

	//If err
		// err: 0 --> less than min
		// err: 1 --> more than max

	var errNo = -1;

	var text = toTrim? text.trim(): text;
		text = ignSpace? ignLineBrs? txt.replace(' ', '').replace(/\s/g, ''): txt.replace(' ', '').replace(/\s/g, '_'): ignLineBrs? txt.replace(/\s/g, ''): txt.replace(/\s/g, '_');

	return {
		"isSuccess": min? !(text.length < min && (errNo = '0')) && (max? !(text.length > max && (errNo = 1)): true): max? !(text.length > max && (errNo = 1)): true,
		"err": parseInt(errNo)
	};
};