function draw_usage(lang){
	draw_usage_step("basic_1", lang);
	draw_usage_step("basic_2", lang);
	draw_usage_step("basic_3", lang);
	draw_usage_step("basic_4", lang);
	draw_usage_step("album_1", lang);
	draw_usage_step("album_2", lang);
	draw_usage_step("album_3", lang);
	draw_usage_step("setting_1", lang);
}

function draw_usage_basic_1(ctx, lang){
	draw_circle(ctx, 225, 259, 10);
	draw_line(ctx, 227, 267, 230, 290);
	draw_textbox(ctx, "setting button", lang, 220, 290);
}

function draw_usage_basic_2(ctx, lang){
	draw_ellipse(ctx, 205, 67, 35, 20);
	draw_line(ctx, 220, 42, 223, 67);
	draw_textbox(ctx, "done button", lang, 210, 20);
	draw_ellipse(ctx, 182, 110, 50, 20);
	draw_line(ctx, 187, 125, 160, 150);
	draw_textbox(ctx, "service switch", lang, 150, 150);
}	
function draw_usage_basic_3(ctx, lang){
	draw_ellipse(ctx, 200, 60, 35, 20);
	draw_line(ctx, 150, 42, 205, 63);
	draw_textbox(ctx, "camera toggle", lang, 140, 20);
	draw_circle(ctx, 106, 259, 10);
	draw_line(ctx, 98, 260, 20, 290);
	draw_textbox(ctx, "comment toggle", lang, 10, 290);
	draw_ellipse(ctx, 90, 232, 35, 18);
	draw_line(ctx, 20, 203, 94, 235);
	draw_textbox(ctx, "photo/video switch", lang, 10, 180);
	ctx.roundRect(135, 247, 60, 24, 3);
	draw_line(ctx, 165, 271, 180, 290);
	draw_textbox(ctx, "shutter button", lang, 170, 290);
}

function draw_usage_basic_4(ctx, lang){
	draw_line(ctx, 190, 140, 180, 150);
	ctx.roundRect(180, 75, 55, 65, 3);
	draw_textbox(ctx, "upload progress", lang, 170, 150);
	ctx.roundRect(180, 218, 55, 20, 3);
	draw_line(ctx, 190, 220, 180, 205);
	draw_textbox(ctx, "abort button", lang, 170, 185);
}	

function draw_usage_album_1(ctx, lang){
}
function draw_usage_album_2(ctx, lang){
}
function draw_usage_album_3(ctx, lang){
}
function draw_usage_setting_1(ctx, lang){
}
function draw_usage_step(name, lang){
	var canvas = $("#canvas_usage_" + name);
	canvas = canvas[0];
	if (!canvas || !canvas.getContext){
		return false;
	}
	var ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	var img = new Image();
	img.src = "/img/usage/" + name.replace(/_/g, "-") + "-" + lang + ".png";
	img.onload = function() {
		ctx.drawImage(img, 0, 0);
		eval("draw_usage_" + name + "(ctx, lang);");
	}
	return ctx;
}

CanvasRenderingContext2D.prototype.roundRect = function(x, y, width, height, radius, fill, stroke) {
	if (typeof stroke == "undefined") {
		stroke = true;
	}
	if (typeof radius === "undefined") {
		radius = 5;
	}
	this.beginPath();
	this.moveTo(x + radius, y);
	this.lineTo(x + width - radius, y);
	this.quadraticCurveTo(x + width, y, x + width, y + radius);
	this.lineTo(x + width, y + height - radius);
	this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
	this.lineTo(x + radius, y + height);
	this.quadraticCurveTo(x, y + height, x, y + height - radius);
	this.lineTo(x, y + radius);
	this.quadraticCurveTo(x, y, x + radius, y);
	this.closePath();
	if (stroke) {
		this.stroke(stroke);
	}
	if (fill) {
		this.fill(fill);
	}
};

function draw_line(ctx, x1, y1, x2, y2){
	ctx.beginPath();
	ctx.lineWidth = 3;
	ctx.strokeStyle = 'rgb(255, 0, 0)';
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

function draw_ellipse(ctx, x, y, w, h) {
	var kappa = .5522848;
	ox = (w / 2) * kappa,
	oy = (h / 2) * kappa,
	xe = x + w,          
	ye = y + h,          
	xm = x + w / 2,      
	ym = y + h / 2;      

	ctx.beginPath();
	ctx.lineWidth = 3;
	ctx.strokeStyle = 'rgb(255, 0, 0)';
	ctx.moveTo(x, ym);
	ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
	ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
	ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
	ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
	ctx.closePath();
	ctx.stroke();
}

function draw_circle(ctx, x, y, r){
	ctx.beginPath();
	ctx.lineWidth = 3;
	ctx.strokeStyle = 'rgb(255, 0, 0)';
	ctx.arc(x, y, r, 0, Math.PI * 2, false);
	ctx.stroke();
}

function draw_textbox(ctx, text, lang, left, top){
	text = getLang(text);
	var height;
	if(lang == "en"){
		ctx.font = "12px sans-serif";
		height = 12;
	}else{
		ctx.font = "12px sans-serif";
		height = 12;
	}
	var m = ctx.measureText(text);
	ctx.fillStyle = "rgba(255, 255, 255, 0.8)"; 
	ctx.roundRect(left, top, m.width + 20, height + 10, 5, true, true);
	ctx.fillStyle = "black";
	ctx.fillText(text, left + 10, top + height + 3);
}

function getLang(key){
	var value = $.localize.data["lang"][key];
	if(value){
		return value;
	}
	return key;
}
