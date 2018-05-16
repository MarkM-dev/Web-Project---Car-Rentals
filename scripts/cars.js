$(document).ready(function () {
    if (localStorage.getItem('carlist') == null) {
        var listOfCars = [
		{ manufacturer: "Cadillac", model: "Eldorado", gear: "Automatic", license: "1a", available: "Available"},
        { manufacturer: "Citroen", model: "2CV", gear: "Manual", license: "2b", available: "Available"},
        { manufacturer: "DeLorean", model: "DMC-12", gear: "Automatic", license: "3c", available: "Available"},
        { manufacturer: "Porsche", model: "356", gear: "Manual", license: "4d", available: "Available"},
        { manufacturer: "Triumph", model: "TR6", gear: "Manual", license: "5e", available: "Available"}];
        localStorage.setItem("carlist", JSON.stringify(listOfCars));
    }
});
