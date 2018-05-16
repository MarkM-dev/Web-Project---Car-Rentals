// worker calculates price by the following logic: 
// up to 90 km (not including) - 1.2 nis per km.
// above 90 (including) - 108 (cost of 90 km) + (remaining km) * 0.9.
onmessage = function(x) {
	var x = x.data;
	if (x < 90) {
		var sum = x * 1.2;
	} else {
		var sum = 108 + ((x - 90) * 0.9)
	};
  postMessage(sum);
}
