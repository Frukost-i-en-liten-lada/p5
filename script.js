// Teletext settings
service = {}
service.name = "namn";
service.lines = true;
service.page = 100;
service.weekname =  ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"];
service.monthname = ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug",
"Sep", "Okt", "Nov", "Dec"];
console.log(service.name);

let cpX = 0;
let cpY = 0;

function write(blockX, blockY, string=""){
	if (string == "m") {
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
		prompt("Ny sida");
	}
}

function nbg(color="#000000"){
	stroke(color);
	fill(color);
}
function justZero(number){
	if (number <= 9) {
		number = "0" + number.toString();
	} else {
		number = number.toString();
	}
	return number;
}

console.log(justZero(6));

function setup(){
	createCanvas(40*16,25*16);
}

function draw(){
	background(0);
	stroke("#0000ff");
	if (service.lines){
		for (i=0;i<40;i++){
			line(i*16,0,i*16,height);
		}
		for (i=0;i<25;i++){
			line(0,i*16,width,i*16);
		}
	}
	nbg("#ffffff");
	for (i=0;i<3;i++) {
		write(i,0, service.page.toString()[i]);
	}
	nbg("#ffff00");
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
}
