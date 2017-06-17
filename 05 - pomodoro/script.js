$(document).ready(function(){
	let dur;
	let mode = 1;
	let totalTime;
	let interval;

	let workLength = 1500;
	let breakLength = 300;

	let progressBar = new ProgressBar.SemiCircle("#progress-bar", {
	  strokeWidth: 6,
	  easing: 'easeInOut',
	  duration: 1400,
	  color: '#23d160',
	  trailColor: '#eee',
	  trailWidth: 1,
	  svgStyle: null
	});

	function bindButtons(){
	/*Control bindings for workLength*/
		/*Add or subtract seconds*/
		$("#input-seconds-plus").on('click', function(){
			workLength = parseInt(workLength) + 1;
			updateWorkTimePreview();
		});
		$("#input-seconds-minus").on('click', function(){
			workLength = parseInt(workLength) - 1;
			if(workLength < 0){workLength = 0};
			updateWorkTimePreview();
		});

		/*Add or subtract minutes*/
		$("#input-minutes-plus").on('click', function(){
			workLength = parseInt(workLength) + 60;
			updateWorkTimePreview();
		});
		$("#input-minutes-minus").on('click', function(){
			workLength = parseInt(workLength) - 60;
			if(workLength < 0){workLength = 0};
			updateWorkTimePreview();
		});
	/*Control bindings for breakLength*/
		/*Add or subtract seconds*/
		$("#input-break-seconds-plus").on('click', function(){
			breakLength = parseInt(breakLength) + 1;
			updateBreakTimePreview();
		});
		$("#input-break-seconds-minus").on('click', function(){
			breakLength = parseInt(breakLength) - 1;
			if(breakLength < 0){breakLength = 0};
			updateBreakTimePreview();
		});

		/*Add or subtract minutes*/
		$("#input-break-minutes-plus").on('click', function(){
			breakLength = parseInt(breakLength) + 60;
			updateBreakTimePreview();
		});
		$("#input-break-minutes-minus").on('click', function(){
			breakLength = parseInt(breakLength) - 60;
			if(breakLength < 0){breakLength = 0};
			updateBreakTimePreview();
		});

		$("#start-countdown").on('click', function(){
			setUp();
		});
		console.log("buttons bound");
	};

	function updateWorkTimePreview(){
		let t = moment.duration(workLength, "seconds");
		let a = t.get('hours');
		let b = t.get('minutes');
		let c = t.get('seconds');
		let timeFormatted = a + "h " + b + "m " + c + "s";
		$("#work-time-preview").html(timeFormatted);
	}
	function updateBreakTimePreview(){
		let t = moment.duration(breakLength, "seconds");
		let a = t.get('hours');
		let b = t.get('minutes');
		let c = t.get('seconds');
		let timeFormatted = a + "h " + b + "m " + c + "s";
		$("#break-time-preview").html(timeFormatted);
	}

	function updateTimeDisplay(string){
		$('.time-display').html(string);
	}

	function setCountdown(seconds){
		dur = moment.duration(NaN);		
		dur = moment.duration(parseInt(seconds), "seconds");
		totalTime = parseInt(seconds);
	}

	function getTimeRemaining(){
		let hs = dur.hours() ? dur.hours() +"h " : "";
		let ms = dur.minutes() ? dur.minutes() + "m " : "";
		return (hs + ms + dur.seconds() + "s");
	}

	function flipMode(){
		console.log("workLength: " + workLength);
		console.log("breakLength: " + breakLength);
		console.log("mode: " + mode);
		if(mode === 0){
				setCountdown(breakLength);
				mode = 1;
			}
		else{
				setCountdown(workLength);
				mode = 0;
		}
	}

	function progressBarAnimate(){
		let durMax = totalTime;

		progressBar.animate(mapRange(dur.asSeconds(), 0, durMax));
	}

	function tick(){
		if(dur.as('seconds') > 0){
			dur.subtract(1, 'seconds');
			updateTimeDisplay(getTimeRemaining())
		}
		else{
			updateTimeDisplay("TIME IS OVER")
			flipMode();
		};

		if(mode == 0){
			$(".time-mode").html("WORK MODE ENGAGED");
		}
		else{
			$(".time-mode").html("BREAK TIME");
		};

		progressBarAnimate();
	}

	function setUp(){
		clearInterval(interval);
		interval = setInterval(tick, 1000);

		setCountdown(workLength);
		mode = 0;
	}

	function mapRange(input, iMin, iMax){
		let a1 = iMin, a2 = iMax;
		let b1 = 0, b2 = 1;

		let result = b1 + (input - a1)*(b2 - b1)/(a2 - a1);
		return result;
	}

	bindButtons();
});
