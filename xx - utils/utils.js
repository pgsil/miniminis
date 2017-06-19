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

/*Given an input and its minimum and maximum range,*/
/*outputs a linearly-equivalent number in the 0-1 range.*/
/*Example input: 30, 0, 150*/
/*Output: 0.2*/
	function mapRange(input, iMin, iMax){
		let a1 = iMin, a2 = iMax;
		let b1 = 0, b2 = 1;

		let result = b1 + (input - a1)*(b2 - b1)/(a2 - a1);
		return result;
	}