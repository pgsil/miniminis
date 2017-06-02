/*JQuery document ready*/
$(document).ready(
	function(){
		/*Binds click for numbers and operators button*/
		$(".calc-btn").each(function(index, obj){
			$(this).on('click', function() { 
				checkButtonType($(this).text());
				addToDisplay($(this).text());
			});
		});
		/*Binds click for equal button*/
		$(".calc-btn-equal").on('click', function(){
			checkButtonType($(this).text());
			lastMathExpression = mathExpression;
			doEval();
			hasOperator = false;
		});
		/*Binds click for clear button*/
		$(".calc-btn-clear").on('click', function(){
			doClear();
		})
	}
);

/*Do the actual calculations*/
let doEval = function(){
	let result = 0;

	try {
		result = eval(mathExpression); 
	} catch (e) {
		alert("ERROR! That's not a valid expression! " + e);
		result = "ERROR";
	}
	mathExpression = "";

	addToDisplay(result);
}

/*Clears the current expression, the last expression and the display*/
let doClear = function(){
	mathExpression = "";
	lastMathExpression = "";
	$(".calc-display-text").html(mathExpression, console.log('DISPLAY CLEARED'));
}

/*Add something to the display*/
let addToDisplay = function(string){
	mathExpression = mathExpression + string;

	$(".calc-display-text").html(mathExpression, console.log('updated display: ' + mathExpression));
};

/*Checks the type of button that was pressed and sets lastKeyType accordingly*/
let checkButtonType = function(text){
	switch(text){
		case "1": case "2": case "3":
		case "4": case "5": case "6":
		case "7": case "8": case "9":
		case "0":
			console.log("clicked a NUMBER!");
			currentKeyType = "NUMBER";
			keyTypeDecider();
			lastKeyType = "NUMBER";
		break;

		case "+":
		case "-":
		case "*":
		case "/":
			console.log("clicked an OPERATOR!");
			currentKeyType = "OPERATOR";
			keyTypeDecider();
			lastKeyType = "OPERATOR";
		break;

		case "=":
			console.log("clicked EQUAL!");
			currentKeyType = "EQUAL";
			keyTypeDecider();
			lastKeyType = "EQUAL";
		break;

		default:
			console.log("ERROR - NO CONFIG IN CHECKBUTTONTYPE SWITCH - FIX ME: " + text);
			currentKeyType = "UNDEFINED";
			keyTypeDecider();
			lastKeyType = "UNDEFINED";
		break;
	}
}

/*Decides what action to take safely according to keypress*/
let keyTypeDecider = function(){
	switch(currentKeyType){
		case "NUMBER":
			/*If we just pressed equal, got a result, and then press a number,*/
			/*clear the display for a new operation.*/
			if(lastKeyType === "EQUAL"){
				doClear();
				break;
			}
			else{
				break;	
			}		

		case "OPERATOR":
			/*If we have an operator in the expression but the last one isn't it,*/
			/*just do the eval*/
			if(hasOperator && lastKeyType != "OPERATOR"){
				doEval();
				break;
			}
			/*If the last character is an operator, change it to the one just pressed*/
			else if(hasOperator && lastKeyType === "OPERATOR"){
				mathExpression = mathExpression.substring(0, mathExpression.length-1)
				break;
			}
			/*If there's no operator yet, just set hasOperator to true*/
			else{
				hasOperator = true;
				break;
			}

		case "EQUAL":
			/*If you just pressed equal, and you press it again, */
			/*we'll redo the last operation.*/
			if(lastKeyType === "EQUAL"){
				/*Regex match for operators +, *, / or - */
				let operatorMatch = lastMathExpression.match(/\+|-|\*|\//);
				/*Index of the operator in the expression*/
				let operatorIndex = operatorMatch.index;
				/*Extracts just the operation from the previous expression. e.g.: 4+1 -> +1; 620*50 -> *50 */
				let previousOperation = lastMathExpression.substring(operatorIndex, lastMathExpression.length);
				/*Set the current operation to current result + previous operation. e.g.: operation: 1+4. Result 5. Press equal again,  operation is now 5+4.*/
				mathExpression = mathExpression + previousOperation;
				
				lastMathExpression = mathExpression;

				break;
			}
			else{
				break;
			}
	}
}

var currentKeyType;
var lastKeyType;
var hasOperator = false;

var mathExpression = "";
var lastMathExpression = "";