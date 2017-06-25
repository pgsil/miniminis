$(document).ready(function(){
	let pile = [];
	let playerPile = [];

	let playerPos = 0;

	let restartingGame = false;

	let playingNotes = false;

	/*Set button binds*/
	function bindButtons(){
		$("#bt-01").on("click", function(){
			playerClick(1);
			console.log("CLICKED");
		});
		$("#bt-02").on("click", function(){
			playerClick(2);
			console.log("CLICKED");
		});
		$("#bt-03").on("click", function(){
			playerClick(3);
			console.log("CLICKED");
		});
		$("#bt-04").on("click", function(){
			playerClick(4);
			console.log("CLICKED");
		});
	}
	bindButtons();

	/*Changes color of a tile and plays anime animation*/
	function changeColor(id, type){
		this.bt1on = "red";
		this.bt1off = "#a90000";

		this.bt2on ="blue";
		this.bt2off ="#00008a";

		this.bt3on = "green";
		this.bt3off ="#005000";

		this.bt4on = "yellow";
		this.bt4off = "#ad9500";		

		$("#bt-0" + id).css("background-color", this["bt" + id + type]);

		if(type ==="on"){
			anime({
			targets: "#bt-0" + id,
			scale: [		
				{ value: 1.2, duration: 400, elasticity: 100},
				{ value: 1, duration: 600,elasticity: 500,easing:"easeOutElastic"}
				],
			loop: 1
			});
		};
	}

	/*Lights a tile up, plays its sound, then turns the tile off again*/
	function flashButton(id){
		changeColor(id, "on");

		setTimeout(function(){changeColor(id, "off")}, 700);
		document.getElementById("snd" + id).currentTime = 0;
		document.getElementById("snd" + id).play();
	}

	/*Adds a new number to tile sequence*/
	function addToPile(){
		function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
		}

		pile.push(getRandomInt(1,5));
	}

	/*Plays back the tile sequence*/
	function showSteps(){
		playingNotes = true;
		for (let i=0; i<pile.length; i++) {
			setTimeout( function timer(){
				flashButton(pile[i]);
				if(i===pile.length-1){playingNotes = false};
			}, i*1000 );
		}
	}

	/*Player click handler*/
	function playerClick(id){
		/*If tile sequence isn't being played*/
		if(!playingNotes){
			/*Flash the tile the player clicked*/
			flashButton(id);
			/*If correct tile clicked*/
			if(id === pile[playerPos]){
				/*Add to the player's tile sequence*/
				playerPile.push(id);
				/*Move up the player's current position on the sequence*/
				playerPos++;

				/*Util function to compare array contents reliably*/
				function arraysEqual(a, b) {
					if (a === b) return true;
					if (a == null || b == null) return false;
					if (a.length != b.length) return false;

					for (var i = 0; i < a.length; ++i) {
						if (a[i] !== b[i]) return false;
					}
					return true;
				}

				/*If arrays are equal, this round's complete.*/
				if(arraysEqual(pile, playerPile)){
					/*Reset position and the player's sequence*/
					playerPos = 0;
					playerPile = [];

					setTimeout(function(){
						document.getElementById("snd-good").play();
						addToPile();
					}, 200);

					setTimeout(function(){showSteps()}, 2000);
				}
			}
			/*If wrong tile clicked*/
			else{
				/*Prevent multiple restarts by checking restartingGame*/
				if(!restartingGame){

					restartingGame = true;

					/*Do shake animation*/
					anime({
						targets: '#simon-btns-container',
						translateX: [		
								{ value: 30, duration: 500, elasticity: 1000 },
								{ value: 0, duration: 300,elasticity: 300}
						],
						rotate: [		
								{ value: 30, duration: 400, elasticity: 10 },
								{ value: -30, duration: 400,elasticity: 10},
								{ value: 0, duration: 300,elasticity: 300}
						],
						duration: 1000,
					});

					setTimeout(function(){
						document.getElementById("snd-bad").play();
					}, 200);

					/*Reset everything and start a new game*/
					setTimeout(function(){
						playerPos = 0; 
						playerPile = [];
						pile = [];		
						addToPile();
						showSteps();
						restartingGame = false;
					}, 3000);
				}
			}
		}
	}

	/*Initialize game*/
	setTimeout(function(){
		addToPile();
		showSteps();
	}, 2000);
	
});
