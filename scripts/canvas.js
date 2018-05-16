		// Func preloads images.
	function PreloadImages() {
		slideNum=0;
		images=new Array();
		var pic=new Image();

		images[0]="images/canvas/image-1.jpg";
		images[1]="images/canvas/image-2.jpg";
		images[2]="images/canvas/image-3.jpg";
		images[3]="images/canvas/image-4.jpg";
		images[4]="images/canvas/image-5.jpg";
		
		for (var i=0; i<images.length; i++) {
			pic.src=images[i];
		}
		changeImage()
	}

		// func draws the image.
	function drawImage(currentImageURL) {
		canvas = document.getElementById('myCanvas');    
		context = canvas.getContext('2d');
		
		var img = new Image();
		img.src = currentImageURL;
	
		img.onload = function () {context.drawImage(img, 0, 0, 400, 360);};
		
	}
	
		// func changes the image every 3 seconds.
	function changeImage() {
		drawImage(images[slideNum]);
		if (slideNum < 4) {
			slideNum++
		}	else {
				slideNum=0
			}
		setTimeout('changeImage()',3000)
	}