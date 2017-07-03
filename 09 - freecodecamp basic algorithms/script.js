/*Reverse the provided string.*/
function reverseString(str) {
	return str.split('').reverse().join();
};
reverseString("hello");

/*Return the factorial of the provided integer.*/
function factorialize(num) {
	var cur = 1;
	for (var i = 1; i < num+1; i++) {
		cur = cur * i;
	}
	return cur;
};
factorialize(5);

/*Check if a string is a palindrome*/
function palindrome(str) {
  var strchk = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  strchk = strchk.split('');


  var revstr = strchk.reverse().join('');
  strchk = strchk.reverse().join('');

  console.log("Source: " + strchk);
  console.log("Reverse: " + revstr);
  
  if(strchk === revstr){
    return true;
  }
  else{
    return false;
  }
};
palindrome("hahah");

/*Return the length of the longest word in the provided sentence.*/
function findLongestWord(str) {
  let strarr = str.split(" ");
  
  strarr = strarr.sort((a,b) => {
    let result = a.length > b.length ? -1 : 1; return result;});
  
  console.log(strarr[0] + ": " + strarr[0].length); 
  return strarr[0].length;
};
findLongestWord("The quick brown fox jumped over the lazy dog");

/*Return the provided string with the first letter of each word capitalized.*/
/*Make sure the rest of the word is in lower case.*/

function titleCase(str) {
	let strarr = str.toLowerCase().split(" ");

	for (var i = 0; i < strarr.length; i++) {
	  	strarr[i] = strarr[i].split("");
	  	strarr[i][0] = strarr[i][0].toUpperCase();
	  	strarr[i] = strarr[i].join("");
	};

	return strarr.join(" ");
};
titleCase("I'm a little tea pot");

/*Return an array consisting of the largest number from each provided sub-array.*/
/*For simplicity, the provided array will contain exactly 4 sub-arrays.*/
function largestOfFour(arr) {
	let resarr = [];

	for (var i = 0; i < arr.length; i++) {
		let big = 0;

		for (var j = 0; j < arr[i].length; j++) {
			if(arr[i][j] > big){
				big = arr[i][j];
			}
		}

		resarr.push(big);
	}

	return resarr;
};
largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]);

/*Check if a string (first argument, str) ends with the given target string (second argument, target).*/
function confirmEnding(str, target) {

	if(str.substr(-target.length) === target){
		return true
	}
	else{
		return false
	}
};
confirmEnding("Bastian", "n");

/*Repeat a given string (first argument) num times (second argument).*/
/*Return an empty string if num is not a positive number.*/
function repeatStringNumTimes(str, num) {
	if(num < 1){
		return ""
	};
	let originalStr = str;
	for (var i = 0; i < num-1; i++) {
		str = str + originalStr;
	};
	return str;
};
repeatStringNumTimes("abc", 3);

/*Truncate a string (first argument) if it is longer than the given maximum string length (second argument).*/
/*Return the truncated string with a ... ending.*/
function truncateString(str, num) {
	if(num <= 3){
		str = str.slice(0, num) + "...";
		return str;		
	}
	else{
		str = str.slice(0, num - 3) + "...";
		return str;
	}
}

truncateString("A-tisket a-tasket A green and yellow basket", 11);
