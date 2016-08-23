
		</div>
	</div>
	
	<script>
		// height/width of the background animation (see sketch.js)
		var canvasWidth = Math.max(window.innerWidth, window.innerHeight, 1000)-50;
		
		// set width of div which holds the animation
		var canvasBox = document.getElementById("myCanvas");
		canvasBox.style.width = canvasWidth + 'px';
		
		// set width of the contentBox which sits on top of animation
		var contentBox = document.getElementById("contentBox");
		// box should be half of canvas width (right=50, padding=30)
		contentBox.style.width = (canvasWidth/2-50-30) + 'px';
		
		var menuInterval;

		// selects whether to expand or contract a menu div
		function popInOut(elementId) {
			var elem = document.getElementById(elementId);
			var heightString = elem.style.height;
			var val = int(heightString.replace("px",""));
			// expand/contract the selected menu div
			if (val > 0) {
				clearInterval(menuInterval);
				popIn(elementId);
			} else {
				clearInterval(menuInterval);
				popOut(elementId);
			}
		}
		
		// popOut displays the contents of the menu by expanding height of hidden divs
		function popOut(elementId) {
			var elem = document.getElementById(elementId);
			var maxHeight = elem.scrollHeight;
			var val = 0;
			menuInterval = setInterval(frame, 2);
			//elem.style.overflow = 'auto';
			function frame() {
				if (val > maxHeight) {
					clearInterval(menuInterval);
				} else {
					elem.style.height = val + 'px';
					val++;
				}
			}
		}
		// popIn re-hides menu contents
		function popIn(elementId) {
			var elem = document.getElementById(elementId);
			var heightString = elem.style.height;
			var val = int(heightString.replace("px",""));
			menuInterval = setInterval(frame, 2);
			//elem.style.overflow = 'hidden';
			function frame() {
				if (val > 0) {
					val--;
					elem.style.height = val + 'px';
				} else {
					clearInterval(menuInterval);
					
				}
			}
		}
	</script>
</body>
</html>