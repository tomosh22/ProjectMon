$(document).ready(function() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    
    tickCounter = 0
	menuReady = false
    
	maps = {0:house0, 1:town0, 2:town1, 3:hospital, 4:shop,5:route0}
    currentLevel = maps[5];
	levelIndex = 5
	playerCanMove = true
	LoadLevel();
	
	currentMonsters = [new bulbasaur,new pikachu,new charmander]
	for(x=0;x<currentMonsters.length;x++){
		currentMonsters[x].levelUp(1000)
	}
	enemyMonsters = [new charmander]
	for(x=0;x<enemyMonsters.length;x++){
		enemyMonsters[x].levelUp(1)
	}				
	wildMonsters = {1:[new charmander]}
	levelDifficulty = {1:1}
	
	//player inventory, items can be used during battle
	playerMoney = 50
	currentItems = [{name:"Capsule","effect":"capture","strength":10,"price":4}]
	shopItems = [{name:"HP Potion","effect":"hpRestore","strength":10,"price":2},{name:"Capsule","effect":"capture","strength":10,"price":4},
				{name:"HP Potion","effect":"hpRestore","strength":20,"price":3},{name:"Capsule","effect":"capture","strength":20,"price":6}
				]
	//every 16x16 sprite in the game assigned to a number to make map designing easier
	sprites = {d:devTile,0 : grassSprite, 1:longGrassSprite, 2:bushSprite, 3:treeTopSprite, 4:treeMiddleSprite, 5:treeBottomSprite, 6:lampTopLeftSprite,7:lampMiddleLeftSprite, 8:lampBottomLeftSprite, 9:lampTopRightSprite, 10:lampMiddleRightSprite, 11:lampBottomRightSprite,12:flowerSprite, 13:woodFenceBottomLeftSprite, 14:woodFenceMiddleLeftSprite, 15:woodFenceTopLeftSprite, 16:woodFenceTopRightSprite, 17:woodFenceTopSprite, 18:woodFenceMiddleRightSprite, 19:woodFenceBottomRightSprite, 20:waterTopLeftSprite,21:waterMiddleLeftSprite, 22:waterBottomLeftSprite, 23:house00Sprite, 24:house01Sprite, 25:house02Sprite,26:house03Sprite, 27:house04Sprite, 28:house05Sprite, 29:house06Sprite, 30:house07Sprite, 31:house08Sprite,32:house09Sprite, 33:house010Sprite, 34:house011Sprite, 35:house012Sprite,36:house013Sprite,37:house014Sprite,38:house015Sprite,39:house016Sprite,40:house017Sprite,41:house018Sprite,42:house019Sprite,43:house020Sprite,44:house021Sprite,45:house022Sprite,46:house023Sprite,47:house024Sprite, 48:waterBottomRightSprite,49:waterMiddleRightSprite, 50:waterBottomMiddleSprite, 51:waterSprite, 52:waterTopSprite, 53:waterTopRightSprite, 55:woodFloorSprite, 56:woodWallBottomLeftSprite, 57:woodWallBottomMiddleSprite, 58:woodWallBottomRightSprite,59:woodWallTopLeftSprite, 60:woodWallTopMiddleSprite, 61:woodWallTopRightSprite, 62:redRug1Sprite, 63:redRug2Sprite, 64:woodTable1Sprite,65:woodTable2Sprite,66:woodTable3Sprite,67:woodTable4Sprite,68:woodTable5Sprite,69:woodTable6Sprite, 70:curtain1Sprite,71:curtain2Sprite,72:curtain3Sprite,73:curtain4Sprite,74:tv1Sprite,75:tv2Sprite,76:tv3Sprite,77:tv4Sprite,78:blueStoolSprite, 79:blueCushionSprite, 80:blueRug1Sprite,81:blueRug2Sprite,82:blueRug3Sprite,83:blueRug4Sprite,84:blueRug5Sprite,85:blueRug6Sprite,86:blueRug7Sprite,87:blueRug8Sprite,88:blueRug9Sprite, 89:friendSprite, 90:path0MiddleSprite,91:path0TopMiddleSprite,92:path0TopRightSprite,93:longGrass2Sprite,94:longGrass3Sprite,95:path0BottomRightSprite,96:path0MiddleRightSprite,97:playerSprite,98:path0BottomLeftSprite,99:path0BottomMiddleSprite,100:path0MiddleLeftSprite,101:path0TopLeftSprite,102:ThumbSprite,103:shop0Sprite,104:shop1Sprite,105:shop10Sprite,106:shop11Sprite,107:shop12Sprite,108:shop13Sprite,109:shop14Sprite,110:shop15Sprite,111:shop16Sprite,112:shop17Sprite,113:shop2Sprite,114:shop3Sprite,115:shop4Sprite,116:shop5Sprite,117:shop6Sprite,118:shop7Sprite,119:shop8Sprite,120:shop9Sprite,121:shop18Sprite,122:shop19Sprite,123:shop20Sprite,124:shop21Sprite,125:shop22Sprite,126:shop23Sprite,127:shop24Sprite,128:path0LeftDownSprite,129:path0LeftUpSprite,130:path0RightDownSprite,131:path0RightUpSprite,132:hospital0Sprite,133:hospital1Sprite,134:hospital10Sprite,135:hospital11Sprite,136:hospital12Sprite,137:hospital13Sprite,138:hospital14Sprite,139:hospital15Sprite,140:hospital16Sprite,141:hospital17Sprite,142:hospital18Sprite,143:hospital19Sprite,144:hospital2Sprite,145:hospital20Sprite,146:hospital21Sprite,147:hospital22Sprite,148:hospital23Sprite,149:hospital24Sprite,150:hospital25Sprite,151:hospital26Sprite,152:hospital27Sprite,153:hospital28Sprite,154:hospital29Sprite,155:hospital3Sprite,156:hospital4Sprite,157:hospital5Sprite,158:hospital6Sprite,159:hospital7Sprite,160:hospital8Sprite,161:hospital9Sprite,162:gym00Sprite,163:gym01Sprite,164:gym010Sprite,165:gym011Sprite,166:gym012Sprite,167:gym013Sprite,168:gym014Sprite,169:gym015Sprite,170:gym016Sprite,171:gym017Sprite,172:gym018Sprite,173:gym019Sprite,174:gym02Sprite,175:gym020Sprite,176:gym021Sprite,177:gym022Sprite,178:gym023Sprite,179:gym024Sprite,180:gym025Sprite,181:gym026Sprite,182:gym027Sprite,183:gym028Sprite,184:gym029Sprite,185:gym03Sprite,186:gym030Sprite,187:gym031Sprite,188:gym032Sprite,189:gym033Sprite,190:gym034Sprite,191:gym035Sprite,192:gym04Sprite,193:gym05Sprite,194:gym06Sprite,195:gym07Sprite,196:gym08Sprite,197:gym09Sprite,198:hospitalDesk0Sprite,199:hospitalDesk1Sprite,200:hospitalDesk10Sprite,201:hospitalDesk11Sprite,202:hospitalDesk2Sprite,203:hospitalDesk3Sprite,204:hospitalDesk4Sprite,205:hospitalDesk5Sprite,206:hospitalDesk6Sprite,207:hospitalDesk7Sprite,208:hospitalDesk8Sprite,209:hospitalDesk9Sprite,210:potPlant0Sprite,211:potPlant1Sprite,212:healer0Sprite,213:healer1Sprite,214:healer2Sprite,215:healer3Sprite,216:nurseSprite,217:triggerMatSprite, 218:npcSprite}
	//sprites that the player can walk through, grass, floor, etc.				
	nocollision = [0,1,44, 39, 55, 62, 63, 79,80,81,82,83,84,85,86,87,88,78,90, 91,92,93,94,95,96,98,99,100,101,128,129,130,131,125,124,152,188,189,200,201,209, ]
	npcs = [{map:maps[2],x:5,y:8,ready:true,level:10, team:[new bulbasaur, new pikachu]},
			{map:maps[5],x:9,y:9,ready:true,level:10, team:[new bulbasaur, new pikachu]},
			{map:maps[5],x:10,y:4,ready:true,level:10, team:[new bulbasaur, new pikachu]}
			]
	//npcs=[]
	for(x=0;x<npcs.length;x++){
		for(y=0;y<npcs[x]["team"].length;y++){
			npcs[x]["team"][y].levelUp(npcs[x].level)
		}
	}
	wDown = false;
    aDown = false;
    sDown = false;
    dDown = false;
	
	zDown = false;
	xDown = false;
	cDown = false;
	vDown = false
	escDown = false
    document.addEventListener("keydown", function(key) {//reads the keycode of any button that is pressed down and sets corresponding boolean to true
        switch (key.keyCode) {
			case 87:
                wDown = true;
                break;
            case 65:
                aDown = true;
                break;
            case 83:
                sDown = true;
                break;
            case 68:
                dDown = true;
                break;
			case 90:
                zDown = true;
                break;
			case 88:
                xDown = true;
                break;
            case 67:
                cDown = true;
                break;
			case 86:
                vDown = true;
                break;
			case 27:
                escDown = true;
                break;
        }
    });
    document.addEventListener("keyup", function(key) {//reads the keycode of any button that is released and sets corresponding boolean to false
        switch (key.keyCode) {
			case 87:
                wDown = false;
                break;
            case 65:
                aDown = false;
                break;
            case 83:
                sDown = false;
                break;
            case 68:
                dDown = false;
                break;
            case 90:
                zDown = false;
                break;
			case 88:
                xDown = false;
                break;
			case 67:
                cDown = false;
                break;
			case 86:
                vDown = false;
                break;
			case 27:
                escDown = false;
                break;
        }
    });

	function LoadLevel(x,y){
		if(!x || !y){
			playerCol = currentLevel[currentLevel.length-2][0];
			playerRow = currentLevel[currentLevel.length-2][1];
			playerXTile = playerRow
			playerYTile = playerCol
			playerXPos = playerCol * 16
			playerYPos = playerRow * 16
			
		}
		else{
			playerXTile = x
			playerYTile = y
			playerXPos = playerXTile * 16
			playerYPos = playerYTile * 16
		}
		currentLevelCols = currentLevel[0].length;
		currentLevelRows = currentLevel.length - 3;
		canvas.height = currentLevelRows*16//adjusts canvas to fit the map
		canvas.width = currentLevelCols*16	
	}
	currentGrassSprite = null
    function render() {
		//console.log(renderIgnore[0])
		
		if(playerCanMove){
			for (y = 0; y < currentLevelRows; y++) {
				for (x = 0; x < currentLevelCols; x++) {//iterates through the current map
						context.drawImage(sprites[currentLevel[currentLevel.length-1]], x*16, y*16)//draws the background of the map as soom sprites have transparency
				}
			}
			for (y = 0; y < currentLevelRows; y++) {
				for (x = 0; x < currentLevelCols; x++) {
					if (currentLevel[y][x].constructor != Array){//i used arrays to represent tiles that need their own background
							context.drawImage(sprites[currentLevel[y][x]], x*16, y*16)
					}
					else{
							context.drawImage(sprites[currentLevel[y][x][1]], x*16, y*16)//index one is the special background
							context.drawImage(sprites[currentLevel[y][x][0]], x*16, y*16)//index zero is the foreground sprite, drawn on top of the background
					}
				}
			}
			//console.log(playerXTile, playerYTile)
			
			//animates long grass sprite if the player is standing on one
			if (currentLevel[playerYTile][playerXTile] == 1){
					if (currentGrassSprite == longGrass2Sprite){//alternates between slightly different sprites to appear to be moving
						
						if (tickCounter % 7 == 0){
							
							currentGrassSprite = longGrass3Sprite
							context.drawImage(longGrass3Sprite, Math.round((playerXPos) / 16) * 16, Math.round((playerYPos) / 16) * 16)
						}
					}
					else{
						if (tickCounter % 7 == 0){
							
							currentGrassSprite = longGrass2Sprite
							context.drawImage(longGrass2Sprite, Math.round((playerXPos) / 16) * 16, Math.round((playerYPos) / 16) * 16)
						}
					}
			}//end of long grass animation
			
			context.drawImage(playerSprite, playerXPos, playerYPos);//draws the player on top of everything
		}
		
		context.fillStyle = "#FFFFFF"
		context.fillRect(playerXTile * 16 + 7,playerYTile * 16 + 7,2,2)//draws the centre of the players current tile for development purposes
			
    }

	var devTool = $("<button/>")//creating html elements for development tools
			.html("Go to hospital")
			.click(function(){
				console.log("clicked")
				currentLevel = maps[3]
				levelIndex = 3
				LoadLevel()
			});
		$("#devTools2").append(devTool)//adding tool to html div for development tools
		
		var devTool = $("<button/>")
			.html("Go to spawn")
			.click(function(){
				console.log("clicked")
				currentLevel = maps[0]
				levelIndex = 0
				LoadLevel()
			});
		$("#devTools2").append(devTool)
		
    function update() {
		
		tickCounter++;//used for animating long grass sprites
		if (tickCounter == 61){//resets at 60 ticks
			tickCounter = 1
		}
		
		$("#devTools").empty()//clears html div
		var devTool = $("<p/>")
			.html("playerXTile "+playerXTile);
		$("#devTools").append(devTool)
		
		var devTool = $("<p/>")
			.html("playerYTile "+playerYTile);
		$("#devTools").append(devTool)
		
		var devTool = $("<p/>")
			.html("menuReady "+menuReady);
		$("#devTools").append(devTool)
		
		var devTool = $("<p/>")
			.html("monsterFound "+monsterFound);
		$("#devTools").append(devTool)
		
		var devTool = $("<p/>")
			.html("currentBattleMenu "+currentBattleMenu);
		$("#devTools").append(devTool)
		
		var devTool = $("<p/>")
			.html("canCapture "+canCapture);
		$("#devTools").append(devTool)
		
		for(x=0;x<=currentMonsters.length - 1;x++){//for each of the player's current monsters
			var devTool = $("<p/>")
				.html(currentMonsters[x].name+ " hp " + currentMonsters[x].hp);//create a html element displaying their current health
			$("#devTools").append(devTool)//add html element to html div for devlopment tools
		}
		
		
		
		currentLevel[currentLevel.length - 3].forEach(function(point){//array in map variable containing exit locations
			if(playerXTile == point[1] && playerYTile == point[0]){//if the player is on an exit point
					context.clearRect(0,0, canvas.width, canvas.height)//clear the current map
					x = point[3]
					y = point[4]
					currentLevel = maps[point[2]];
					levelIndex = point[2]
					LoadLevel(x,y);//load the new map
			}
		})
		
		playerXTile = Math.round(playerXPos / 16);
		playerYTile = Math.round(playerYPos / 16);
		events();//loads events such as npc battles, hospital healing, etc.
		if(playerCanMove){
			if (wDown && (nocollision.includes(currentLevel[Math.floor((playerYPos / 16))][playerXTile]) || nocollision.includes(currentLevel[Math.floor((playerYPos / 16))][playerXTile][0]))){
						playerYPos -= 1;
			}
			else{
				if (aDown && (nocollision.includes(currentLevel[playerYTile][Math.floor((playerXPos / 16))]) || nocollision.includes(currentLevel[playerYTile][Math.floor((playerXPos / 16))][0]))){ 
						playerXPos -=1;
				}
				else{
					if (sDown && (nocollision.includes(currentLevel[Math.floor((playerYPos / 16) + 1 )][playerXTile])|| nocollision.includes(currentLevel[Math.floor((playerYPos / 16) + 1 )][playerXTile][0]))){ 
									playerYPos += 1;
					}
					else{
						if (dDown && (nocollision.includes(currentLevel[playerYTile][Math.floor((playerXPos / 16) + 1)]) || nocollision.includes(currentLevel[playerYTile][Math.floor((playerXPos / 16) + 1)][0]))){
							playerXPos += 1
						}
					}
				}
			}
		}
        
		if(currentLevel[playerYTile][playerXTile] == 1){//if player is standing on long grass
			if (playerCanMove){
				trigger = Math.floor(Math.random() * 50)// 1/50 chance per tick (60th of a second) that a wild monster battle will be triggered
				if(trigger == 0){
					index = Math.floor(Math.random() * wildMonsters[levelIndex].length)
					playerCanMove = false
					enemyMonsters = [wildMonsters[levelIndex][index]]
					enemyMonsters[0].levelUp(levelDifficulty[levelIndex])
				}
			}
			else{
				canCapture = true
				if(!LoadBattle(currentMonsters[currentMonsterIndex],enemyMonsters[enemyMonsterIndex])){
					playerCanMove = true
					canvas.height = currentLevelRows*16
					canvas.width = currentLevelCols*16
				}
			}
		}
		

        render();//draws the map
		
    }
	setInterval(update,1000/60)//game loop runs every 60th of a second (60 frames per second)

});