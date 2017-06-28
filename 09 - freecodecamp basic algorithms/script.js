/*Reverse the provided string.*/
function reverseString(str) {
	return str.split('').reverse().join();
}
reverseString("hello");

/*Return the factorial of the provided integer.*/
function factorialize(num) {
	var cur = 1;
	for (var i = 1; i < num+1; i++) {
		cur = cur * i;
	}
	return cur;
}
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
}
palindrome("hahah");

/*Return the length of the longest word in the provided sentence.*/
function findLongestWord(str) {
  let strarr = str.split(" ");
  
  strarr = strarr.sort((a,b) => {
    let result = a.length > b.length ? -1 : 1; return result;});
  
  console.log(strarr[0] + ": " + strarr[0].length); 
  return strarr[0].length;
}

findLongestWord("The quick brown fox jumped over the lazy dog");


