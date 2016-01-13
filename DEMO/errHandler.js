errHandler = function(inptEl, titleEl, errClass, errTxt) {
	inptEl.addClass('hasError');
	titleEl.addClass('hasError').text(errTxt);
	$(window).scrollTop(0);
};