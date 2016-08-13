/**
 * DISCRETISED ROTATION
 * H Reeve-Black
 * Aug 2016
 */


/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *  SELECT PARAMETERS
 *
 *  rotation parameter lambda in range (0,2)
 *  for rotation number nu use lambda = 2*cos(2*PI*nu)
 *  good ones (rational): nu = 1/5, 2/9
 *  good ones (irrational): lambda = 0.05, 0.15, 0.7
 */

var nu = 2.0/9;
var lambda = 2*Math.cos(2*Math.PI*nu);
var delay_time = 75;	// delay time between lines added

// canvas size
var N = 500;

// counter and list of lines drawn
var line_count = 0;
var lines = [];

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *  SET-UP
 */

function setup() {
	
	// set-up canvas
	var canvas = createCanvas(N, N);
	canvas.parent('myCanvas');
	background(40);
	stroke('#BDBDBD');
	fill(40);
	rect(0, 0, N-1, N-1);
	
	// start with the lower edge of the square
	var line0 = new LineSegment(.0, .0, 1.0, .0);
	lines.push(line0);
	
	frameRate(3);
}


/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *  DRAW
 */
function draw() {
	
	// print how many line segments have been calculated and drawn
	//println(line_count, " / ", lines.length);
	
	if (line_count < lines.length) {
		
		// take the next line in the list and draw it
		var prevSeg = lines[line_count];
		var seg = new LineSegment(prevSeg.x1, prevSeg.y1, prevSeg.x2, prevSeg.y2);
		//seg.print_coords();
		seg.set_pixel_coords();
		line(seg.m1, seg.n1, seg.m2, seg.n2);
		
		 // transform the line under the function F and add the resulting new line(s) to the list
		 // the line is split into segments if it crosses the vertical at x=0 or x=1
		seg.image();
		//seg.print_coords();
		if (seg.length() < pow(10,-7) ) {
			println(" * ", seg.x1, seg.y1, seg.x2, seg.y2);
		} else if (seg.x1 < 0 && seg.x2 > 1) {
			var y_intersect1 = seg.y1 + (0.0 - seg.x1)*(seg.y2 - seg.y1)/(seg.x2 - seg.x1);
			var y_intersect2 = seg.y1 + (1.0 - seg.x1)*(seg.y2 - seg.y1)/(seg.x2 - seg.x1);
			var seg1 = new LineSegment(seg.x1+1, seg.y1, 1.0, y_intersect1);
			var seg2 = new LineSegment(0.0, y_intersect1, 1.0, y_intersect2);
			var seg3 = new LineSegment(0.0, y_intersect2, seg.x2-1, seg.y2);
			seg1.set_pixel_coords();
			seg2.set_pixel_coords();
			seg3.set_pixel_coords();
			if (!findLine(seg1)) lines.push(seg1);
			if (!findLine(seg2)) lines.push(seg2);
			if (!findLine(seg3)) lines.push(seg3);
		} else if (seg.x2 < 0 && seg.x1 > 1) {
			var y_intersect1 = seg.y1 + (0.0 - seg.x1)*(seg.y2 - seg.y1)/(seg.x2 - seg.x1);
			var y_intersect2 = seg.y1 + (1.0 - seg.x1)*(seg.y2 - seg.y1)/(seg.x2 - seg.x1);
			var seg1 = new LineSegment(seg.x2+1, seg.y2, 1.0, y_intersect1);
			var seg2 = new LineSegment(0.0, y_intersect1, 1.0, y_intersect2);
			var seg3 = new LineSegment(0.0, y_intersect2, seg.x1-1, seg.y1);
			seg1.set_pixel_coords();
			seg2.set_pixel_coords();
			seg3.set_pixel_coords();
			if (!findLine(seg1)) lines.push(seg1);
			if (!findLine(seg2)) lines.push(seg2);
			if (!findLine(seg3)) lines.push(seg3);
		} else if (seg.x1 < 0 && seg.x2 > 0) {
			var y_intersect = seg.y1 + (.0 - seg.x1)*(seg.y2 - seg.y1)/(seg.x2 - seg.x1);
			var seg1 = new LineSegment(seg.x1+1, seg.y1, 1.0, y_intersect);
			var seg2 = new LineSegment(.0, y_intersect, seg.x2, seg.y2);
			seg1.set_pixel_coords();
			seg2.set_pixel_coords();
			if (!findLine(seg1)) lines.push(seg1);
			if (!findLine(seg2)) lines.push(seg2);
		} else if (seg.x2 < 0 && seg.x1 > 0) {
			var y_intersect = seg.y1 + (.0 - seg.x1)*(seg.y2 - seg.y1)/(seg.x2 - seg.x1);
			var seg1 = new LineSegment(seg.x2+1, seg.y2, 1.0, y_intersect);
			var seg2 = new LineSegment(0.0, y_intersect, seg.x1, seg.y1);
			seg1.set_pixel_coords();
			seg2.set_pixel_coords();
			if (!findLine(seg1)) lines.push(seg1);
			if (!findLine(seg2)) lines.push(seg2);
		} else if (seg.x1 < 1 && seg.x2 > 1) {
			var y_intersect = seg.y1 + (1.0 - seg.x1)*(seg.y2 - seg.y1)/(seg.x2 - seg.x1);
			var seg1 = new LineSegment(seg.x1, seg.y1, 1.0, y_intersect);
			var seg2 = new LineSegment(0.0, y_intersect, seg.x2-1, seg.y2);
			seg1.set_pixel_coords();
			seg2.set_pixel_coords();
			if (!findLine(seg1)) lines.push(seg1);
			if (!findLine(seg2)) lines.push(seg2);
		} else if (seg.x2 < 1 && seg.x1 > 1) {
			var y_intersect = seg.y1 + (1.0 - seg.x1)*(seg.y2 - seg.y1)/(seg.x2 - seg.x1);
			var seg1 = new LineSegment(seg.x2, seg.y2, 1.0, y_intersect);
			var seg2 = new LineSegment(0.0, y_intersect, seg.x1-1, seg.y1);
			seg1.set_pixel_coords();
			seg2.set_pixel_coords();
			if (!findLine(seg1)) lines.push(seg1);
			if (!findLine(seg2)) lines.push(seg2);
		} else {
			var seg1 = new LineSegment(seg.x1, seg.y1, seg.x2, seg.y2);
			seg1.mod_one();
			seg1.set_pixel_coords();
			if (!findLine(seg1)) lines.push(seg1);
		}
		//delay(delay_time);
	} else {
		noLoop();
	}
	line_count++;
}


 /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *  LINE CLASS
 *
 * object class Line Segment, with end points (x1,y1) and (x2,y2)
 */

function LineSegment (x1, y1, x2, y2) {
	// line coordinates in the range [0,1]
	this.x1 = x1;
	this.x2 = x2;
	this.y1 = y1;
	this.y2 = y2;
	
	//integer coordinates for drawing
	this.m1 = round(this.x1*N);
	this.n1 = round(this.y1*N);
	this.m2 = round(this.x2*N);
	this.n2 = round(this.y2*N);

	// transform the line under rotation F
	this.image = function() {
		var F1 = F(this.x1, this.y1);
		this.x1 = F1[0]; this.y1 = F1[1];
		var F2 = F(this.x2, this.y2);
		this.x2 = F2[0]; this.y2 = F2[1];
		this.set_pixel_coords();
	}
	// transform the line under inverse rotation F^{-1}
	this.inverse_image = function() {
		var F1 = F_inv(this.x1, this.y1);
		this.x1 = F1[0]; this.y1 = F1[1];
		var F2 = F_inv(this.x2, this.y2);
		this.x2 = F2[0]; this.y2 = F2[1];
		this.set_pixel_coords();
	}
	// calculate the integer corrdinates (to be used for drawing)
	this.set_pixel_coords = function() {
		this.m1 = round(this.x1*N);
		this.n1 = round(this.y1*N);
		this.m2 = round(this.x2*N);
		this.n2 = round(this.y2*N);
	}
	this.length = function() {
		return sqrt((this.x2-this.x1)*(this.x2-this.x1) + (this.y2-this.y1)*(this.y2-this.y1));
	}
	this.print_coords = function() {
		console.log(this.x1, this.y1, this.x2, this.y2);
	}
	
	this.print_pixel_coords = function() {
		console.log(this.m1, this.n1, this.m2, this.n2);
	}
	
	this.mod_one = function() {
		var floor = min(Math.floor(this.x1),Math.floor(this.x2));
		this.x1 = this.x1-floor;
		this.x2 = this.x2-floor;
		if (this.x1 < 0 || this.x1>1 || this.x2<0 || this.x2>1){
			println("mod one error");
			noLoop();
		}
	}
	
	this.equals = function(that) {
		return (this.m1 == that.m1 && this.m2 == that.m2 && this.n1 == that.n1 && this.n2 == that.n2);
	}
}

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *  MISC METHODS
 *
 */

var F_inv = function(x, y) {
	return [y, lambda*y-x];
}

var F = function(x, y) {
	return [lambda*x-y, x];
}

var findLine = function(seg) {
	var check = false;
	var i=0;
	while (!check && i<lines.length) {
		check = seg.equals(lines[i]);
		i++;
	}
	console.log(check);
	return check;
}
