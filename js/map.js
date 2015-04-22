//								Width 			Height
// -------------------------------------------------------------
// Canvas 						560				360
// _SizeBlock = 20				20				20
// Bloques que encajan 			560/20 > 28 	360/20 > 18

// Bloques caben en pantalla 	28 * 18 = 504

var currentMap = "";
var map1 = [], map2 = [], map3 = [], map4 = [], map5 = [], map6 = [], map7 = [];
var home = [], portalInput = [], portalOutput = [], blockBrown = [], blockRed = [], blockWhiteVert = [], blockWhiteHor = [];
var portalCrossed = false, portalCrossed2 = false;
var blockBrownCopyMap1 = [], blockBrownCopyMap2 = [];

function createMap(map, width, sound, nameMap, backgroundColor, posX, posY, rotation){
	for(var i = 0; i < map.length; i++) {			// i = row   j = column
		for(var j = 0; j < map[i].length; j++) {
			if(map[i][j] == 5)
				blockBrown.push(new Element(j*width,i*width,width,width));
			else if(map[i][j] == 4)
				blockRed.push(new Element(j*width,i*width,width,width));
			else if(map[i][j] == 3)
				blockWhiteVert.push(new Element(j*width,i*width,width,width));
			else if(map[i][j] == 2)
				blockWhiteHor.push(new Element(j*width,i*width,width,width));
			else if(map[i][j] == 'P1')
				portalInput.push(new Element(j*width,i*width,width,width));
			else if(map[i][j] == 'P2')
				portalOutput.push(new Element(j*width,i*width,width,width));
			else if(map[i][j] == 'H')
				home.push(new Element(j*width,i*width,width,width));
		}
	}
	templateSetBackgroundColor(backgroundColor);
	loadSound(sound, true);
	currentMap = nameMap;

	if(typeof posX != "undefined")		player.x = posX;
	if(typeof posY != "undefined")		player.y = posY;
	if(typeof rotation != "undefined")	player.rotation = rotation;
}
function clearMap(){
	blockBrown.splice(0, blockBrown.length);
	blockRed.splice(0, blockRed.length);
	blockWhiteVert.splice(0, blockWhiteVert.length);
	blockWhiteHor.splice(0, blockWhiteHor.length);
	bullets1.splice(0, bullets1.length);
	bullets2.splice(0, bullets2.length);
	bulletsTest.splice(0, bulletsTest.length);
	portalInput.splice(0, portalInput.length);
	portalOutput.splice(0, portalOutput.length);
	home.splice(0, home.length);
	stopSounds();
}
function makeBackupMap(nameMap){
	if(nameMap == "map1"){
		blockBrownCopyMap1.splice(0, blockBrownCopyMap1.length);
		for(i in blockBrown)
			blockBrownCopyMap1[i] = blockBrown[i];
	}else if(nameMap == "map2"){
		blockBrownCopyMap2.splice(0, blockBrownCopyMap2.length);
		for(i in blockBrown)
			blockBrownCopyMap2[i] = blockBrown[i];
	}
}
function loadBackupMap(nameMap){
	if(nameMap == "map1"){
		if(blockBrownCopyMap1.length != 0){
			// delete the current blocks
			blockBrown.splice(0, blockBrown.length);
			// Put the previous blocks on the current blocks
			for(i in blockBrownCopyMap1)
				blockBrown[i] = blockBrownCopyMap1[i];
		}
	}else if(nameMap == "map2"){
		if(blockBrownCopyMap2.length != 0){
			blockBrown.splice(0, blockBrown.length);
			for(i in blockBrownCopyMap2)
				blockBrown[i] = blockBrownCopyMap2[i];
		}
	}
}
function setPositionPlayer(posX, posY, rotation){
	player.x        = posX;
	player.y        = posY;
	player.rotation = rotation;
}

map1 = [
	[   ,   ,   , 5 , 5 , 5 ,   , 5 , 5 , 5 ,   , 5 ,   ,   ,   , 5 ,   , 5 , 5 , 5 ,   , 5 , 5 , 5 ,   ,   ,   ,   ],
	[   ,   ,   , 5 ,   ,   ,   , 5 ,   ,   ,   , 5 ,   ,   ,   , 5 ,   , 5 ,   , 5 ,   , 5 ,   ,   ,   ,   ,   ,   ],
	[   ,   ,   , 5 , 5 ,   ,   , 5 , 5 ,   ,   , 5 ,   ,   ,   , 5 ,   , 5 , 5 , 5 ,   , 5 , 5 ,   ,   ,   ,   ,   ],
	[   ,   ,   , 5 ,   ,   ,   , 5 ,   ,   ,   , 5 ,   ,   ,   , 5 ,   , 5 ,   ,   ,   , 5 ,   ,   ,   ,   ,'P1','P1'],
	[   ,   ,   , 5 ,   ,   ,   , 5 , 5 , 5 ,   , 5 , 5 , 5 ,   , 5 ,   , 5 ,   ,   ,   , 5 , 5 , 5 ,   ,   ,'P1','P1'],
	[   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ],
	[   ,   ,   , 4 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 4 ,   ,   ,   ,   ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ],
	[ 4 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 4 ],
	[ 2 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ],
	[ 2 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ],
	[ 2 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ],
	[ 2 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ],
	[ 3 , 3 , 3 , 3 , 4 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 4 , 3 , 3 , 3 , 3 ],
	[ 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 ],
	[ 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 ,   ,   ,   ,   ,   ,   ,   ,   , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 ],
	[ 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 ,   ,'H','H','H','H',   , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 ],
	[ 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 ,   ,'H','H','H','H',   , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 ]
	];

map2 = [
	[ 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 ],
	[ 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 ],
	[ 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 ],
	[ 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 ],
	[ 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 ],
	[ 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 ],
	[ 5 ,   ,   , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 ],
	[ 5 ,   ,   , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 ],
	[ 2 ,   ,   , 3 , 3 , 3 ,   ,   , 3 , 3 , 3 ,   , 3 , 3 , 3 , 3 ,   , 3 , 3 , 3 ,   ,   , 3 , 3 , 3 ,   ,   , 2 ],
	[ 2 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ],
	[ 2 ,'P1','P1',   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ],
	[ 2 ,'P1','P1',   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ],
	[ 2 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ],
	[ 2 ,   ,   , 3 , 3 , 3 ,   ,   , 3 , 3 , 3 ,   ,   ,   ,   ,   ,   , 3 , 3 , 3 ,   ,   , 3 , 3 , 3 ,   ,   , 2 ],
	[ 5 ,   ,   , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 ,   ,   , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 ],
	[ 5 ,   ,   , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 ,   ,   ,   ,   , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 ],
	[ 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 ,   ,   ,   ,   , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 ],
	[ 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 ,   ,   ,   ,   ,   ,   , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 ]
	];

map3 = [
	[ 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 ],
	[ 2 ,   ,   ,   ,   ,   ,   , 2 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ,   ,   ,   ,   ,   ,'P2','P2', 2 ],
	[ 2 ,   ,   ,   ,   ,   ,   , 2 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ,   ,   ,   ,   ,   ,'P2','P2', 2 ],
	[ 2 ,   ,   ,   ,   ,   ,   , 2 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ,   ,   ,   ,   ,   ,   ,   , 2 ],
	[ 2 ,   ,   ,   ,   ,   ,   , 2 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 , 3 ,   ,   , 3 , 3 , 3 , 3 , 2 ],
	[ 2 ,   ,   ,   ,   ,   ,   , 3 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ],
	[ 2 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ],
	[ 2 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ],
	[ 2 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ],
	[ 2 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ],
	[ 2 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 3 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ],
	[ 2 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ],
	[ 2 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ],
	[ 2 ,'P1','P1',   ,   ,   ,   ,   ,   ,   ,   , 3 , 2 , 3 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ],
	[ 2 ,'P1','P1',   ,   ,   ,   ,   ,   ,   ,   , 2 , 2 , 2 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ],
	[ 2 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 , 2 , 2 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ],
	[ 2 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 , 2 , 2 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ],
	[ 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 ]
	];

map4 = [
	[ 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 ],
	[ 2 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ],
	[ 2 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ],
	[ 2 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ],
	[ 2 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ],
	[ 2 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ],
	[ 2 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ],
	[ 2 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ],
	[ 2 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ],
	[ 2 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ],
	[ 2 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ],
	[ 2 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ],
	[ 2 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ],
	[ 2 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ],
	[ 2 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ],
	[ 2 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ],
	[ 2 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ],
	[ 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 ]
	];

map5 = [
	[   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ],
	[   ,   ,   ,   ,   ,   ,   , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 ,   ,   ,   ,   ,   ,   ,   ,   ,   ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ]
	];

map7 = [
	[   ,   ,   ,   ,   ,   ,   ,   ,   , 2 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ,   ,   ,   , 2 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ,   ,   ,   , 2 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ,   ,   ,   , 2 ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 2 ,   ,   ,   , 2 ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   , 2 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ]
	];

map6 = [
	[   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 5 , 5 , 5 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 5 , 5 , 5 ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 5 , 5 , 5 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 5 , 5 , 5 ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 5 , 5 , 5 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 5 , 5 , 5 ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 , 5 ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ],
	[   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ]
	];




