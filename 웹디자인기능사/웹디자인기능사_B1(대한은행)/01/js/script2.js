$(document).ready(function () {
	setInterval(function () {
		$(".slidelist a:last").prependTo(".slidelist");
		$(".slidelist").css({ "marginLeft": "-1200px" });
		$(".slidelist").animate({ "marginLeft": "0" });
	}, 3000);
});