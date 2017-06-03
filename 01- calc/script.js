/*JQuery document ready*/
$(document).ready(
	function(){

		var mathExpression = "";
		var lastMathExpression = "";

		let lastKeyType;
		let setLastKeypress = function(keytype){
			lastKeyType = keytype;
		}
		let currentKeyType;
		let setCurrentKeyType= function(keytype){
			currentKeyType = keytype;
		}
		let hasOperator = false;
		let operatorCheck = function(){
			/*If we have an operator in the expression but the last one isn't it,*/
			/*just do the eval*/
			if(hasOperator && lastKeyType != "OPERATOR"){
				doEval();
			}
			/*If the last character is an operator, change it to the one just pressed*/
			else if(hasOperator && lastKeyType === "OPERATOR"){
				mathExpression = mathExpression.substring(0, mathExpression.length-1);
			}
			/*If there's no operator yet, just set hasOperator to true*/
			else{
				hasOperator = true;
			}
		}
		let equalCheck = function(){
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
			}
		}
		/*Updates display with input var toDisplay*/
		let updateDisplay = function(toDisplay){
			$(".calc-display-text").html(toDisplay, console.log('updated display: ' + mathExpression));
		}

		/*Binds click for NUMBER buttons*/
		$(".calc-btn").each(function(index, obj){
			$(this).on('click', function() { 
				if(lastKeyType === "EQUAL"){
					doClear();
				}
				addToDisplay($(this).text());
				setLastKeypress("NUMBER");
			});
		});

		/*Binds click for OPERATOR buttons*/
		$(".calc-btn-op").each(function(index, obj){
			$(this).on('click', function() {
				setCurrentKeyType("OPERATOR");

				operatorCheck();

				addToDisplay($(this).text());

				setLastKeypress("OPERATOR");
			});
		});

		/*Binds click for EQUAL button*/
		$(".calc-btn-equal").on('click', function(){
			equalCheck();

			lastMathExpression = mathExpression;

			doEval();

			hasOperator = false;

			setLastKeypress("EQUAL");
		});

		/*Binds click for CLEAR button*/
		$(".calc-btn-clear").on('click', function(){
			doClear();
		});
	
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
		};

		/*Clears the current expression, the last expression and the display*/
		let doClear = function(){
			mathExpression = "";
			lastMathExpression = "";
			$(".calc-display-text").html(mathExpression);
		};

		/*Add something to the display*/
		let addToDisplay = function(string){
			mathExpression = mathExpression + string;

			updateDisplay(mathExpression);
		};
	}
);

