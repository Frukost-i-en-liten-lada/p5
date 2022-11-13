// Teletext settings
service = {}
service.name = "namn";
service.lines = true;
service.page = 100;
service.weekname =  ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"];
service.monthname = ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug",
"Sep", "Okt", "Nov", "Dec"];
service.justifiedLetters = ["m", "M", "w", "W", "C", "S", "@", "Q", "D", "E",
"G", "N", "O", "R", "T", "U", "V", "Y", "Å", "Ä", "Ö", "Ü"];
service.colors = ["#000000", "#ff0000", "#00ff00", "#0000ff",
"#ffff00", "#00ffff", "#ff00ff", "#ffffff"];

pagedata =
{
	"page100": ["Test message"],
	"page101": ["Page 101 Test"]
}

// Current Pointer X & Y, Current Background Color variables used by 
//the interpreter
let cpX = 0;
let cpY = 0;
let cbC = 0;

function write(blockX, blockY, string=""){
	if (service.justifiedLetters.includes(string)) {
		text(string, blockX*16+4,blockY*16+12);
	} else {
		text(string, blockX*16+6,blockY*16+12);
	}
}
function printString(x, y, string=""){
	for (i=0;i<string.length;i++){
		write(x+i,y,string[i]);
	}
}

function mouseClicked(){
	if (mouseX <= 3*16 && mouseY <= 1*16){
		newpage = prompt("Ny sida");
		service.page = newpage.toString();
	}
}

function nbg(color){
	while (color >= 8) color -= 8;
	stroke(service.colors[color]);
	fill(service.colors[color]);
}
function justZero(number){
	if (number <= 9) {
		number = "0" + number.toString();
	} else {
		number = number.toString();
	}
	return number;
}

function psj(x, y, string=""){
	printString(x, y, string);
	cpX += string.length;
}
function blockPattern(x, y, pattern){
	if (pattern == 1){
		rect(x*16, y*16, 16, 16);
	} else if (pattern == 2){
		rect(x*16, y*16, 8, 16);
	} else if (pattern == 3){
		rect(x*16+8, y*16, 8, 16);
	} else if (pattern == 4){
		rect(x*16, y*16, 16, 8);
	} else if (pattern == 5){
		rect(x*16, y*16+8, 16, 8);
	} else if (pattern == 6){
		rect(x*16, y*16, 8, 8);
	} else if (pattern == 7){
		rect(x*16+8,y*16,8,8);
	} else if (pattern == 8){
		rect(x*16,y*16+8,8,8);
	} else if (pattern == 9){
		rect(x*16+8,y*16+8,8,8);
	}
}

function interpreter(page) {
	cpX = 0;
	cpY = 1;
	nbg(7);
	// data = [":c:7", "Interpreter Test", ":n:", ":c:4", "Color ", ":c:5", "Test"]
	let pagename = "page" + page.toString();
	if (pagedata.hasOwnProperty(pagename)){
		let data = pagedata[pagename];
		for (const line of data) {
			if (line.slice(0, 3) == ":c:"){
				nbg(line[3]);
			} else if (line == ":n:"){
				cpX = 0;
				cpY++;
			} else if (line.slice(0,3) == ":b:"){
				blockPattern(cpX, cpY, line[3]);
			} else if (line.slice(0,3) == ":a:"){
				cpX++;
			} else {
				psj(cpX, cpY, line);
			}
		}
	}
}

function setup(){
	createCanvas(40*16,25*16);
}

function draw(){
	background(0);
	if (service.lines){
		nbg(3);
		for (i=0;i<40;i++){
			line(i*16,0,i*16,height);
		}
		for (i=0;i<25;i++){
			line(0,i*16,width,i*16);
		}
	}
	nbg(7);
	for (i=0;i<3;i++) {
		write(i,0, service.page.toString()[i]);
	}
	nbg(4);
	for (i=4;i<service.name.length+4;i++){
		write(i, 0, service.name[i-4]);
	}
	// Get time information
	const d = new Date();
	let seconds = d.getSeconds();
	let minutes = d.getMinutes();
	let hours = d.getHours();
	printString(32,0,justZero(hours));
	printString(34,0,":");
	printString(35,0,justZero(minutes));
	printString(37, 0, ":");
	printString(38,0,justZero(seconds));
	let weekday = d.getDay();
	weekday = service.weekname[weekday];
	printString(21,0,weekday);
	let day = d.getDate();
	printString(25,0,day.toString());
	let month = d.getMonth();
	month = service.monthname[month];
	printString(28,0,month.toString());
	//Run interpreter
	interpreter(service.page);
}
