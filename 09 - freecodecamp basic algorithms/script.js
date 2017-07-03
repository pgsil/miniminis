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
	if(num < str.length){
		if(num <= 3){
			str = str.slice(0, num) + "...";
			return str;		
		}
		else{
			str = str.slice(0, num - 3) + "...";
			return str;
		}
	}
	return str
};
truncateString("A-tisket a-tasket A green and yellow basket", 11);

/*Write a function that splits an array (first argument) into groups the length of size (second argument),*/
/*and returns them as a two-dimensional array.*/
function chunkArrayInGroups(arr, size) {
	let result = [];
	let temparr = [];

	for (var i = 0; i < arr.length; i++){	

		if(temparr.length < size){
			temparr.push(arr[i]);
		}
		else{
			result.push(temparr);
			temparr = [];
			temparr.push(arr[i]);
		}

		if(i==arr.length-1){
			result.push(temparr);
		}
	}

	return result;
};
chunkArrayInGroups(["a", "b", "c", "d"], 2);

/*Return the remaining elements of an array after chopping off n elements from the head.*/
function slasher(arr, howMany) {
  for (var i = 0; i < howMany; i++) {
  	arr = arr.slice(1, arr.length);
  }
  return arr;
};
slasher([1, 2, 3], 2);

/*Return true if the string in the first element of the array contains*/
/*all of the letters of the string in the second element of the array.*/
function mutation(arr) {
	let src = arr[0],
		tgt = arr[1],
		success = true;

	src = src.toLowerCase();
	tgt = tgt.toLowerCase();

	src = src.split("");
	tgt = tgt.split("");

	for (var i = 0; i < tgt.length; i++) {
		if(src.indexOf(tgt[i]) < 0){
			success = false;
		}
	}

	return success;
};
mutation(["hello", "hey"]);

/*Remove all falsy values from an array.*/
function bouncer(arr) {	
	arr = arr.filter(function(elem){
		if(!!elem === true){
			return elem;
		}
	});
	return arr;
};
bouncer([7, "ate", "", false, 9]);
