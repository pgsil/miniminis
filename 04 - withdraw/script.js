$(document).ready(function(){
	/*Bind number input to update variable*/
	$('#money-input').on('input', function(){
			money = $('#money-input').val();
			console.log(money)
	});
	/*Bind "withdraw" button click to runApp()*/
	$('#money-submit').on('click', function(){
		runApp();
	});
	/*crel2 variable*/
	let c = crel2;
	/*Declare our money number (synced with money input)*/
	let money = 0;
	/*Declare array where we'll store the strings*/
	let textArray = [];
	/*Checks if current money is divisible by 5. Warns you if not.*/
	function isDivisible(){
		if(money % 5){
			return false
		}
		return true
	}
	/*Declare array of note types*/
	let noteTypes = [50,20,10,5];
	/*Calculates notes. Prefers larger notes.*/
	function outputNotes(){
		if(isDivisible()){
			let amountLeft = money;
			for (var i = 0; i < noteTypes.length; i++) {

				let result = Math.floor(amountLeft / noteTypes[i]);
				let remainder = amountLeft % noteTypes[i];
				amountLeft = remainder;

				if(result > 0){
					textArray.push("$" + noteTypes[i] +" notes: " + result);
				}

			}
		}
		else{
			console.log("ERROR: Not divisible by 5!");
		}
	}
	/*Empties the strings array, runs outputNotes(), runs renderInfo().*/
	function runApp(){
		textArray = [];	
		outputNotes();
		renderInfo();
	}
	/*Appends strings to the results-div div.*/
	function renderInfo(){
		$('#results-div').empty();

		for (var i = 0; i < textArray.length; i++) {
			$('#results-div').append(c('div'), 
										c('p'), 
											c('span', textArray[i])
									);
		}
	}
});
