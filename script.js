// Teletext settings
service = {}
service.name = "teletext";
service.lines = true;
console.log(service.name);

let cpX = 0;
let cpY = 0;

function write(blockX, blockY, string="j"){
	text(string, blockX*16+6,blockY*16+12)
}

function nbg(color="#000000"){
	stroke(color);
	fill(color);
}

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
	nbg("#ffff00")
	for (i=0;i<service.name.length;i++){
		write(i, 0, service.name[i]);
	}
	// Get time information
	const d = new Date();
	let seconds = d.getSeconds().toString();
	let minutes = d.getMinutes().toString();
	let hours = d.getHours().toString();
	for (i=0;i<hours.length;i++){
		write(32+i,0,hours[i]);
	}
	write(34, 0, ":");
	for (i=0;i<minutes.length;i++){
		write(35+i,0,minutes[i]);
	}
	write(37, 0, ":");
	for (i=0;i<seconds.length;i++){
		write(38+i,0,seconds[i]);
	}
}
