var screenWidth = 0;
var screenHeight = 0;
var B2 = {};

var Global = new GLOBAL2();

$(document).ready(function () {
	Global.initial();
});
var GPSonSuccess = function (position) {
	B2.latitude = position.coords.latitude;
	B2.longitude = position.coords.longitude;
	// console.log('Latitude: ' + position.coords.latitude          + '\n' +
	// 'Longitude: '        + position.coords.longitude         + '\n' +
	// 'Altitude: '         + position.coords.altitude          + '\n' +
	// 'Accuracy: '         + position.coords.accuracy          + '\n' +
	// 'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
	// 'Heading: '          + position.coords.heading           + '\n' +
	// 'Speed: '            + position.coords.speed             + '\n' +
	// 'Timestamp: '         + position.timestamp                + '\n');
};
function GPSonError(error) {
	console.log('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}

function GLOBAL2() {
	var self = this;
	this.me = {};
	this.accessToken = 'd2944105-717f-439a-bef4-fbf3725ce987';
	this.currentPageBarcodeScan = '';
	this.initial = function () {
		screenWidth = $('body').width();
		screenHeight = $('body').height();
		$('.top-bar').css({
			height: screenHeight * 0.107
		});
		B2.latitude = 18.7460818;
		B2.longitude = 98.9583099;
		// navigator.geolocation.getCurrentPosition(GPSonSuccess, GPSonError);

		//document.addEventListener("hello", yourCallbackFunction, false);
		//function yourCallbackFunction() {
		//	var $input = $('.hiddenBarcodeInput input');
		//	//if(!$input.is(":focus")) {
		//		$input.focus();
		//	//}
		//	cordova.plugins.Keyboard.close();
		//}
		//
		//document.addEventListener("hello_up", function () {
		//	//console.log('hello_up');
		//	//var $input = $('.hiddenBarcodeInput input');
		//	//$input.val('');
		//	//$input.remove();
		//	//
		//	//$('.hiddenBarcodeInput').append('<input type="text" value="" disabled="disabled" />');
		//	var $input2 = $('.hiddenBarcodeInput input');
		//	$input2.blur();
		//	cordova.plugins.Keyboard.close();
		//
		//	//setTimeout(function () {
		//	//	$input2.removeAttr('disabled');
		//	//	Global.onScanBarcode({});
		//	//}, 10);
		//}, false);
		//Global.onScanBarcode({
		//	success: function (code) {
		//
		//	}
		//});
		window.addEventListener('native.onscanbarcode', function (e) {
			self.whenScanBarcodeHappen({
				barCode: e.scanResult
			});
		});

		if (!localStorage.api_url_1) {
			localStorage.api_url_1 = 'http://s01xp.dyndns.org:8080/SmartQWs';
		}
		if (!localStorage.api_url_2) {
			localStorage.api_url_2 = 'http://s01xp.dyndns.org:8080/SmartQWs';
		}
		if (!localStorage.printer_ip_address) {
			localStorage.printer_ip_address = '192.168.1.50';
		}
		if (!localStorage.printer_ip_address_2) {
			localStorage.printer_ip_address_2 = '192.168.1.51';
		}
		if (!localStorage.is_print_copy) {
			localStorage.is_print_copy = '1';
		}
		if (!localStorage.printer_ip_1_cutting) {
			localStorage.printer_ip_1_cutting = '1';
		}
		if (!localStorage.printer_ip_2_cutting) {
			localStorage.printer_ip_2_cutting = '1';
		}

	};
	this.onKeyDown = function (callback) {
		var key = '';
		if (callback.id) {
			key = '.' + callback.id;
		}
		$(document)
			.off("_keydown" + key)
			.on("_keydown" + key, function (e) {
				//console.log(e.originalEvent.keyCode);
				var key = '';
				switch (e.originalEvent.keyCode) {
					case 111:
						key = 'esc';
						break;
					case 137:
						key = 'f1';
						break;
					case 138:
						key = 'f2';
						break;
					case 19:
						key = 'arrowUp';
						break;
					case 20:
						key = 'arrowDown';
						break;
					case 21:
						key = 'arrowLeft';
						break;
					case 22:
						key = 'arrowRight';
						break;
					case 56:
						key = '.';
						break;
					case 139: // scan center
					case 140: // scan right
					case 141: // scan left
						key = 'scanBarcode';
						break;
					case 82:
						key = 'menu';
						break;
					case 4:
						key = 'back';
						break;
					case 5:
						key = 'phoneGreen';
						break;
					case 7:
						key = 0;
						break;
					case 8:
						key = 1;
						break;
					case 9:
						key = 2;
						break;
					case 10:
						key = 3;
						break;
					case 11:
						key = 4;
						break;
					case 12:
						key = 5;
						break;
					case 13:
						key = 6;
						break;
					case 14:
						key = 7;
						break;
					case 15:
						key = 8;
						break;
					case 16:
						key = 9;
						break;
					case 67:
						key = 'x';
						break;
					case 66:
						key = 'enter';
						break;
					case 17:
						key = '*';
						break;
					case 136:
						key = 'orange';
						break;
					case 18:
						key = '#';
						break;
				}
				callback.success(key);
			});
	};
	this.offKeyDown = function (id) {
		var key = '';
		if (id) {
			key = '.' + id;
		}
		$(document).off("_keydown" + key);
	};
	this.onScanBarcode = function (callback) {
		if (!callback.key) {
			callback.key = '';
		} else {
			callback.key = '.' + callback.key;
		}
		$('.hiddenBarcodeInput input').off('focus' + callback.key).on('focus' + callback.key, function (e) {
			setTimeout(function () {
				cordova.plugins.Keyboard.close();
			}, 1);
			cordova.plugins.Keyboard.close();
		});
		$('.hiddenBarcodeInput input').off('input' + callback.key).on('input' + callback.key, function (e) {
			e.preventDefault();
			var $input = $(this);
			var value = $input.val();
			if (value != '') {
				self.whenScanBarcodeHappen({
					barCode: value
				});
				if (callback.success) callback.success(value);
				$input.val('');
				//$input.remove();

				//var $input2 = $('<input type="text" value="" disabled="disabled" />');
				//$('.hiddenBarcodeInput').append($input2);
				//setTimeout(function () {
				//	$input2.blur();
				//	cordova.plugins.Keyboard.close();
				//});
				//$input2.on('focus', function () {
				//	cordova.plugins.Keyboard.close();
				//});
				cordova.plugins.Keyboard.close();

				//setTimeout(function () {
				//	$input2.removeAttr('disabled');
				//	Global.onScanBarcode({});
				//}, 5);
			}
			return false;
		});
	};
	this.whenScanBarcodeHappen = function (callback) {
		var barCode = callback.barCode;
		console.log('BARCODE: ' + barCode);
		if (Global.isElementAreOnTopPage('pageone')) {
		alert("asd");
			Login.login(barCode);
			return true;
		}
		if (Global.isElementAreOnTopPage('search-item') &&
			$('#modal-item-edit').size() == 0 &&
			(!$('#search-item').attr('data-page') || $('#search-item').attr('data-page') == '')) {
			var $parent = $('#search-item');
			$parent.find('.Material-Input').val(barCode);
			Item.list();
		}
		if (Global.isElementAreOnTopPage('staff') && $('#modal-user-edit').size() == 0) {
			var $parent = $('#staff');
			$parent.find('.Material-Input').val(barCode);
			Staff.list();
		}
		if (Global.isElementAreOnTopPage('search-item') &&
			$('#modal-item-view').size() == 0 &&
			$('#search-item').attr('data-page') == 'pickup-search') {
			var $parent = $('#search-item');
			$parent.find('.Material-Input').val(barCode);
			Pickup.searchItem();
		}
		if (Global.isElementAreOnTopPage('search-item') &&
			$('#modal-item-view').size() == 0 &&
			$('#search-item').attr('data-page') == 'checkout-search') {
			var $parent = $('#search-item');
			$parent.find('.Material-Input').val(barCode);
			checkout.searchItem();
		}
		if (Global.isElementAreOnTopPage('pickupDetail') && $('#modal-manage-sale-code').size() == 0) {
			// barCode
			Pickup.manageProduct(barCode, 'increaseOne', 0);
		}
		if (Global.isElementAreOnTopPage('checkout')) {
			// barCode
			checkout.manageProduct(barCode, 'increaseOne', 0);
		}
		if (Global.isElementAreOnTopPage('billing')) {
			var $parent = $('#billing');
			$parent.find('.Material-Input').val(barCode);
			billing.searchCustomer();
		}
		//console.log(barCode);
		$(window).trigger('manageSaleCode', {barCode: barCode});
	};
	this.getMyBooking = function () {
		if (!localStorage.myBooking) {
			return [];
		}
		var myBooking = localStorage.myBooking;
		myBooking = JSON.parse(myBooking);
		return myBooking;
	};
	this.addMyBooking = function (data) {
		if (!localStorage.myBooking) {
			var newBooking = [data];
			localStorage.myBooking = JSON.stringify(newBooking);
		} else {
			var myBooking = localStorage.myBooking;
			myBooking = JSON.parse(myBooking);
			myBooking.push(data);
			localStorage.myBooking = JSON.stringify(myBooking);
		}
	};
	this.addFavorite = function (key) {
		if (localStorage.favorite) {
			var favorite = (localStorage.favorite).split(',');
		} else {
			var favorite = [];
		}
		favorite.push(key);
		localStorage.favorite = favorite;
	};
	this.removeFavorite = function (key) {
		var favorite = (localStorage.favorite).split(',');
		var index = favorite.indexOf(key);
		if (index > -1) {
			favorite.splice(index, 1);
		}
		localStorage.favorite = favorite;
	};
	this.timeInfo = function (time_sent) {
		var time_;
		// if(time_sent<86400){
		// var hours = Math.floor(time_sent / 3600);
		// var minutes = Math.floor(time_sent % 3600 / 60);
		// var seconds = time_sent % 60;
		// if(hours<10){hours='0'+hours;}
		// if(minutes<10){minutes='0'+minutes;}
		// if(seconds<10){seconds='0'+seconds;}
		// time_ = hours+':'+minutes+':'+seconds;
		// if (time_sent<=0) {
		// time_ = 'หมดเวลา';
		// }
		// }else{
		var days = time_sent / 86400;
		days = parseInt(days);
		var cal = days * 86400;
		var count2 = time_sent - cal;
		var hours = Math.floor(count2 / 3600);
		var minutes = Math.floor(count2 % 3600 / 60);
		var seconds = count2 % 60;
		if (hours < 10) {
			hours = '0' + hours;
		}
		if (minutes < 10) {
			minutes = '0' + minutes;
		}
		if (seconds < 10) {
			seconds = '0' + seconds;
		}
		//time_ = days+' วัน '+hours+':'+minutes+':'+seconds;
		// }
		return {
			days: days,
			hours: hours,
			minutes: minutes,
			seconds: seconds
		};
	};
	this.ajax = function (object) {
		if (typeof (object.method) == 'undefined')
			object.method = 'POST';
		if (typeof (object.dataType) == 'undefined')
			object.dataType = 'json';
		if (typeof (object.isNotAccessToken) == 'undefined') {
			object.data.accessToken = this.accessToken;
		}
		if (object.data.isNotAccessToken) {
			delete object.data.isNotAccessToken;
			delete object.data.accessToken;
		}
		var data = {};
		if (typeof (object.isJsonStringify) == 'undefined') {
			data = JSON.stringify(object.data);
		} else {
			if (object.isJsonStringify == true) {
				data = JSON.stringify(object.data);
			} else {
				data = object.data;
			}
		}
		$.ajax({
			'type': object.method,
			'data': data,
			'url': object.url,
			'processData': false,
			'contentType': 'application/json',
			'dataType': object.dataType
		}).done(function (response, textStatus, jqXHR) {
			// console.log(response);
			if (typeof object.done == 'function')
				object.done(response);
		}).fail(function (jqXHR, textStatus, errorThrown) {
			// console.log(response);
			if (typeof object.fail == 'function')
				object.fail(jqXHR);
		});
	};
	this.haddleError = function (callback) {
		if (callback.error) {
			if (callback.message == 'No login') {
				window.location = 'login.html';
				return false;
			}
			alert(callback.message);
			return false;
		} else {
			return true;
		}
	};
	this.getHashValue = function (callback) {
		var hash = window.location.hash;
		try {
			return window.location.hash.match(new RegExp(callback.key + '=([^&]*)'))[1];
		} catch (err) {
			console.log(err);
		}
	};
	this.isEmpty = function (mixed_var) {
		var undef, key, i, len;
		var emptyValues = [undef, null, false, 0, "", "0"];
		if (typeof (mixed_var) == 'undefined') {
			return true;
		}
		for (i = 0, len = emptyValues.length; i < len; i++) {
			if (mixed_var === emptyValues[i]) {
				return true;
			}
		}
		if (typeof mixed_var === "object") {
			for (key in mixed_var) {
				// TODO: should we check for own properties only?
				//if (mixed_var.hasOwnProperty(key)) {
				return false;
				//}
			}
			return true;
		}
		return false;
	};
	this.sterilizeEmptyToDat = function (mixed_var) {
		var undef, key, i, len;
		var emptyValues = [undef, null, false, 0, "", "0"];
		if (typeof (mixed_var) == 'undefined') {
			return '-';
		}
		for (i = 0, len = emptyValues.length; i < len; i++) {
			if (mixed_var === emptyValues[i]) {
				return '-';
			}
		}
		if (typeof mixed_var === "object") {
			for (key in mixed_var) {
				// TODO: should we check for own properties only?
				//if (mixed_var.hasOwnProperty(key)) {
				return mixed_var;
				//}
			}
			return '-';
		}
		return mixed_var;
	};
	this.isValidUrl = function (str) {
		var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
			'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
			'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
			'(\\#[-a-z\\d_]*)?$', 'i');
		// fragment locator
		if (!pattern.test(str)) {
			return false;
		} else {
			return true;
		}
	};
	this.uploadListener = function (callback) {
		var option = callback.option;
		var parent = option.element;
		var h = '<button class="btn btn-theme fileinput-button">' + '<span id="title-upload-button">อัพโหลด</span>' + '<input class="btn btn-success" type="file" name="files[]" multiple="">' + '</button><br \><br \>' + '<div id="progress" class="progress progress-striped active progress-sm">' + '<div class="progress-bar progress-bar-success bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="width: 0%">' + '</div>' + '</div>';
		parent.html(h);
		var fileUpload = parent.find('input[type="file"]');
		var parentProcessBar = parent.find('#progress');
		var processBar = parent.find('.bar');
		var jqXHR;
		$(function () {
			var numberFilesUpload = 0;
			fileUpload.fileupload({
				url: option.url,
				dataType: 'json',
				autoUpload: true,
				acceptFileTypes: option.acceptFileTypes, // /(\.|\/)(gif|jpe?g|png)$/i
				maxFileSize: 100000000,
				maxChunkSize: 2000000,
				add: function (e, data) {
					if (data.autoUpload || (data.autoUpload !== false && $(this).fileupload('option', 'autoUpload'))) {
						data.process().done(function () {
							if (numberFilesUpload >= option.maxFileUpload) {
								alert("คุณสามารถอัพโหลดได้ " + option.maxFileUpload + " ภาพ");
							} else {
								data.submit();
								numberFilesUpload++;
							}
						});
					}
				},
				done: function (e, data) {
					$.each(data.result.files, function (index, file) {
						numberFilesUpload = numberFilesUpload - 1;
						parentProcessBar.css('display', 'none');
						callback.success({
							index: index,
							file: file
						});
					});
				},
				progressall: function (e, data) {
					var progress = parseInt(data.loaded / data.total * 100, 10);
					processBar.css('width', progress + '%');
					if (progress <= 100) {
						parentProcessBar.css('display', 'block');
					}
				}
			});
		});
	};
	this.makeByteToReable = function (num_byte) {
		if (num_byte <= 1024) {
			return '1K';
		} else if (num_byte < 1048576) {
			return Math.ceil(num_byte / 1024) + 'K';
		} else if (num_byte < 1073741824) {
			return Math.ceil(num_byte / 1048576) + 'M';
		} else {
			return Math.ceil(num_byte / 1073741824) + 'G';
		}
	};
}
GLOBAL2.prototype.isElementAreShowing = function (query) {
	return !($(query).size() == 0 || $(query).is(':hidden') || $.inArray($(query).css('display'), ['none']) !== -1);
};
GLOBAL2.prototype.isElementAreOnTopPage = function (query) {
	var isPageLast = false;
	var id = '';
	$($(".Main .Page").get()).each(function () {
		id = $(this).attr('id');
	});
	if (id == query) {
		isPageLast = true;
	}
	return isPageLast;
};
GLOBAL2.prototype.hideKeyboard = function () {
	document.activeElement.blur();
	var inputs = document.querySelectorAll('input');
	for (var i = 0; i < inputs.length; i++) {
		inputs[i].blur();
	}
};
GLOBAL2.prototype.createCookie = function (name, value, days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		var expires = "; expires=" + date.toGMTString();
	} else
		var expires = "";
	document.cookie = name + "=" + value + expires + "; path=/";
};
GLOBAL2.prototype.getCookie = function (name) {
	var value = "; " + document.cookie;
	var parts = value.split("; " + name + "=");
	if (parts.length == 2)
		return parts.pop().split(";").shift();
};
GLOBAL2.prototype.timePastFromNow = function (timeUnix) {
	// date is the moment you're calculating the age of
	var now = moment().unix();
	//var diff = (now - timeUnix) / (60 * 60 * 24 * 365);
	//var years = Math.floor(diff);
	var diff = (now - timeUnix) * 0.0166667;
	//console.log(diff);
	if (diff <= 1) {
		return '<1m';
	} else if (diff >= 60) {
		return Math.floor(diff / 60) + 'h';
	} else {
		return Math.floor(diff) + 'm';
	}
};
GLOBAL2.prototype.translateKeyCode = function (code) {
	switch (code) {
		case 13:
			return 'enter';
			break;
		case 35:
			return '#';
			break;
		case 42:
			return '*';
			break;
		case 48:
			return 0;
			break;
		case 49:
			return 1;
			break;
		case 50:
			return 2;
			break;
		case 51:
			return 3;
			break;
		case 52:
			return 4;
			break;
		case 53:
			return 5;
			break;
		case 54:
			return 6;
			break;
		case 55:
			return 7;
			break;
		case 56:
			return 8;
			break;
		case 57:
			return 9;
			break;
		default :
			return false;
	}
};

Number.prototype.format = function (n, x) {
	var re = '(\\d)(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
	return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$1,');
	// console.log(this, parseFloat(this));
	// return (parseFloat(this)+"").replace(new RegExp(re, 'g'), '$1,');
};

//http://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript
//Number.prototype.format = function(c, d){
//	var c = 5,
//		d = '.',
//		t = ',';
//	var n = this,
//		c = isNaN(c = Math.abs(c)) ? 2 : c,
//		d = d == undefined ? "." : d,
//		t = t == undefined ? "," : t,
//		s = n < 0 ? "-" : "",
//		i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
//		j = (j = i.length) > 3 ? j % 3 : 0;
//	return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
//};

moment.fn.minutesFromNow = function () {
	return Math.floor((+new Date() - (+this)) / 60000) + 'm';
};
(function ($) {
	$.event.special.destroyed = {
		remove: function (o) {
			if (o.handler) {
				o.handler()
			}
		}
	}
})(jQuery);