	var notSupportedPre = 'The following technologies are not supported by your browser: '; 
	var notSupportedMsg = '\n';
	if (!Modernizr.localstorage) {notSupportedMsg += '\nLocal Storage.'};
	if (!Modernizr.canvas) {notSupportedMsg += '\ncanvas.'};
	if (!Modernizr.audio.ogg == "probably") {notSupportedMsg += '\naudio.ogg.'};
	if (!Modernizr.input.autocomplete) {notSupportedMsg += '\ninput.autocomplete.'};
	if (!Modernizr.input.autofocus) {notSupportedMsg += '\ninput.autofocus.'};
	if (!Modernizr.input.list) {notSupportedMsg += '\ninput.list.'};
	if (!Modernizr.input.placeholder) {notSupportedMsg += '\ninput.placeholder.'};
	if (!Modernizr.input.max) {notSupportedMsg += '\ninput.max.'};
	if (!Modernizr.input.min) {notSupportedMsg += '\ninput.min.'};
	if (!Modernizr.input.multiple) {notSupportedMsg += '\ninput.multiple.'};
	if (!Modernizr.input.pattern) {notSupportedMsg += '\ninput.pattern.'};
	if (!Modernizr.input.required) {notSupportedMsg += '\ninput.required.'};
	if (!Modernizr.input.step) {notSupportedMsg += '\ninput.step.'};
	if (!Modernizr.inputtypes.color) {notSupportedMsg += '\ninputtypes.color.'};
	if (!Modernizr.inputtypes.date) {notSupportedMsg += '\ninputtypes.date.'};
	if (!Modernizr.inputtypes.email) {notSupportedMsg += '\ninputtypes.email.'};
	if (!Modernizr.inputtypes.month) {notSupportedMsg += '\ninputtypes.month.'};
	if (!Modernizr.inputtypes.number) {notSupportedMsg += '\ninputtypes.number.'};
	if (!Modernizr.inputtypes.range) {notSupportedMsg += '\ninputtypes.range.'};
	if (!Modernizr.inputtypes.search) {notSupportedMsg += '\ninputtypes.search.'};
	if (!Modernizr.inputtypes.tel) {notSupportedMsg += '\ninputtypes.tel.'};
	if (!Modernizr.inputtypes.time) {notSupportedMsg += '\ninputtypes.time.'};
	if (!Modernizr.inputtypes.url) {notSupportedMsg += '\ninputtypes.url.'};
	if (!Modernizr.inputtypes.week) {notSupportedMsg += '\ninputtypes.week.'};
	if (!Modernizr.postmessage) {notSupportedMsg += '\npostmessage.'};
	if (!Modernizr.webworkers) {notSupportedMsg += '\nwebworkers.'};
	if (!Modernizr.json) {notSupportedMsg += '\njson.'};
	
	if (notSupportedMsg.length > 2) {
		var alertMsg = notSupportedPre + notSupportedMsg;
		alert (alertMsg);
	}