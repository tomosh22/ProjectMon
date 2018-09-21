currentBattleMenu = "main"
function LoadLevel(){
		currentLevelCols = currentLevel[0].length;
		currentLevelRows = currentLevel.length - 3;
		
		playerCol = currentLevel[currentLevel.length-2][0];
		playerRow = currentLevel[currentLevel.length-2][1];
		playerXTile = playerRow
		playerYTile = playerCol
		playerXPos = playerCol * 16
		playerYPos = playerRow * 16
		canvas.height = currentLevelRows*16//adjusts canvas to fit the map
		canvas.width = currentLevelCols*16	
	}
firstBattle = {"ready":true, "running":false, "done":[false,false,false,false], "points":[[4,6], [2,6]]}

healing = {"running":false}
shopping = {"running":false}
itemIndex = 0
switchIndex = 0
currentMonsterIndex = 0
enemyMonsterIndex = 0
function distanceTo(y1,y2,x1,x2){
	y = y2 - y1
	x = x2 - x1
	return Math.sqrt(Math.pow(x,2) + Math.pow(y,2))
}
function isStrongAgainst(defend,attack){
	switch (defend){
		case "fire":
			if (["ground","rock","water"].includes(attack)){
				return true
			}
	}
}
function isWeakTo(defend,attack){
	switch(defend){
		case "fire":
			if(["bug","steel","fire","grass","ice","fairy"].includes(attack)){
				return true
			}
	}
	
}
npcBattle = false
function events(){
	for (i=0;i<=npcs.length - 1;i++){
		
			if (npcs[i]["map"] == currentLevel){
				//console.log("npc on map")
				if((distanceTo(playerYTile * 16 + 7,(npcs[i]["y"]-1)*16 + 7,playerXTile * 16 + 7,(npcs[i]["x"]-1)*16 + 7))<23 && npcs[i]["ready"] && !npcBattle){
					
					playerCanMove = false
					
					displayMessage("npc battle", null)
					
					if(menuReady && (zDown||xDown||cDown||vDown)){
						menuReady = false	
						npcBattle = true
						
					}
				}
				if (!(zDown||xDown||cDown||vDown)){
						menuReady = true
					}
				if(npcBattle && menuReady){
					enemyMonsters = npcs[i]["team"]
					if(!LoadBattle(currentMonsters[currentMonsterIndex],enemyMonsters[enemyMonsterIndex])){
						playerCanMove = true
						npcBattle = false
						npcs[i]["ready"] = false
						canvas.height = currentLevelRows*16
						canvas.width = currentLevelCols*16
					}
				}
			}
		
		}
		
	if (firstBattle["ready"] && currentLevel == house0){	//introduction battle
		
		if (!firstBattle["running"]){
			playerCanMove = false
			friendXTile = 4
			friendYTile = 8
			friendXPos = friendXTile * 16
			friendYPos = friendYTile * 16
			firstBattle["running"] = true;
		}
		else{
			friendXTile = Math.round(friendXPos / 16)
			friendYTile = Math.round(friendYPos / 16)
			if(Math.floor(friendYPos / 16) != firstBattle["points"][0][1] - 1 && !firstBattle["done"][0]){
				eventRender();
				context.drawImage(friendSprite, friendXPos, friendYPos);
				friendYPos -= 1;
			
			}
			else{
				firstBattle["done"][0] = true
			}
			//console.log(Math.ceil(friendXPos / 16) != firstBattle["points"][1][0],!firstBattle["done"][1],firstBattle["done"][0])


			if(Math.floor(friendXPos / 16) != firstBattle["points"][1][0] - 1 	&& !firstBattle["done"][1] && 	firstBattle["done"][0]){

				eventRender();
				context.drawImage(friendSprite, friendXPos, friendYPos);
				friendXPos -= 1;
			
			}
			else{
				if(firstBattle["done"][0]){ 
					firstBattle["done"][1] = true
					house0[friendYTile][friendXTile] = [89, 55]
				}
			}
			
			if (firstBattle["done"][1] && 	firstBattle["done"][0] && !firstBattle["done"][2]){
					context.fillStyle = "#FFFFFF"
					context.fillRect(0, canvas.height - 20, canvas.width, 20)
					context.fillStyle = "#000000"
					context.fillText("Battle Trigger",canvas.width / 10, canvas.height - 10)
					if (zDown || xDown || cDown || vDown){
						menuReady = false
						firstBattle["done"][2] = 2
					}
			}
			if (firstBattle["done"][0] && firstBattle["done"][1] && firstBattle["done"][2] && !firstBattle["done"][3]){
				
				if(!LoadBattle(currentMonsters[currentMonsterIndex], enemyMonsters[enemyMonsterIndex])){
					firstBattle["done"][3] = true
				}
			}
			if (firstBattle["done"][0] && firstBattle["done"][1] && firstBattle["done"][2] && firstBattle["done"][3]){
				playerCanMove = true
				firstBattle["ready"] = false								//ends the event and the game continues as normal
				firstBattle["running"] = false
			}
		}
		
		
	} //end of introduction battle
	
	if(currentLevel == maps[3] && healing["running"] == false){		//hospital
		//console.log("in hospital")
		
		if(playerXTile == 5 && playerYTile == 2){
			healing["running"] = true
			menuReady = false
		}
	}
	if(healing["running"]){
		playerCanMove = false
		displayMessage("healing", null)
		currentMonsters.forEach(function(monster){
			monster["hp"] = monster.maxhp
			monster["effect"] = null
		})
				
		if (!(zDown||xDown||cDown||vDown)){
			menuReady = true
		}
		if(menuReady && (zDown||xDown||cDown||vDown)){
			playerCanMove = true
			healing["running"] = false
			playerYPos = 3 * 16
			menuReady = true
		}
	

	}	//end of hospital
	
	if(currentLevel == maps[4] && shopping["running"] == false){		//shop
		//console.log("in hospital")
		
		if(playerXTile == 2 && playerYTile == 2){
			shopping["running"] = true
			menuReady = false
		}
	}
	if(shopping["running"]){
		playerCanMove = false
		displayMessage("shop", null)
		if (!(zDown||xDown||cDown||vDown)){
			menuReady = true
		}
		if(menuReady && (zDown||xDown||cDown||vDown)){
			playerCanMove = true
			shopping["running"] = false
			playerYPos = 3 * 16
			menuReady = true
		}
	

	}	//end of shop
}
hit = ""
effect = ""
enemyMoved = false
enemyDied = false
battleWon = null
function LoadBattle(playerMonster, enemyMonster){
	canvas.width = 176
	canvas.height = 144
	drawMonsters(playerMonster, enemyMonster);
	context.font = "9px Verdana"
	switch(currentBattleMenu){
		case "main":
			drawControls();
			break;
		case "attack":
			//Z1 C2 V3 X4
			drawAttacks(playerMonster);
			if(zDown && menuReady){
				currentBattleMenu = "message"
				useAttack(playerMonster["attacks"][1],playerMonster, enemyMonster)
			}
			if(xDown && menuReady){
				currentBattleMenu = "message"
				useAttack(playerMonster["attacks"][4],playerMonster, enemyMonster)
			}
			if(cDown && menuReady){
				currentBattleMenu = "message"
				useAttack(playerMonster["attacks"][2],playerMonster, enemyMonster)
			}
			if(vDown && menuReady){
				currentBattleMenu = "message"
				useAttack(playerMonster["attacks"][3],playerMonster, enemyMonster)
				
			}
			
			break;
		case "item":
			drawItems();
			if(zDown && menuReady){
				currentBattleMenu = "message"
				useItem(currentItems[itemIndex],playerMonster)
				if (menuReady){currentBattleMenu = "main"}
				
			}
			if(xDown && menuReady){
				currentBattleMenu = "message"
				useItem(currentItems[itemIndex + 1],playerMonster)
				if (menuReady){currentBattleMenu = "main"}
			}
			if(cDown && menuReady){						//NEED TO ADD CHECK THAT THERE ARE MORE ITEMS IN CURRENTITEMS ARRAY
				menuReady = false
				itemIndex += 2
				if (!(zDown||xDown||cDown||vDown)){
				menuReady = true
			}
			}
			break;
		case "switch":
			drawSwitch();
			if(zDown && menuReady){
				currentBattleMenu = "message"
				Switch(switchIndex)
				if (menuReady){currentBattleMenu = "main"}
				
			}
			if(xDown && menuReady){
				currentBattleMenu = "message"
				Switch(switchIndex + 1)
				if (menuReady){currentBattleMenu = "main"}
			}
			if(cDown && menuReady){						//NEED TO ADD CHECK THAT THERE ARE MORE MONSTERS IN CURRENTMONSTERS ARRAY
									
				menuReady = false
				switchIndex += 2
				if (!(zDown||xDown||cDown||vDown)){
				menuReady = true
			}
			}
			break;
		case "message":
			console.log("dislpaying")
			console.log(hit,effect)
			displayMessage(hit,effect)
			menuReady = false
			if (!(zDown||xDown||cDown||vDown)){
				menuReady = true
			}
			if(enemyMonster["hp"] < 1 && menuReady && (zDown||xDown||cDown||vDown)){
				monsterFound = false
				menuReady = true
				for(x=0;x<currentMonsters.length;x++){
					if (enemyMonsters[x] && enemyMonsters[x]["hp"] >= 1 && !monsterFound){
						monsterFound = true
						enemySwitch(x)
						displayMessage()
					}
				}
				if(!monsterFound){
					battleWon = "player"
				}
				
			}
			if (!(zDown||xDown||cDown||vDown)){
				menuReady = true
			}
			
			if ((zDown||xDown||cDown||vDown) && menuReady){
				enemyMoved = false
				currentBattleMenu = "enemyTurn"
				menuReady = false
				if (battleWon == "player"){
					battleWon = null
					enemyMonsterIndex = 0
					currentMonsterIndex = 0
					currentBattleMenu = "main"
					return false
				}
				
				if(battleWon == "enemy"){
					battleWon = null
					enemyMonsterIndex = 0
					currentMonsterIndex = 0
					currentLevel = maps[3]
					LoadLevel()
					playerXPos = 5 * 16
					playerYPos = 2 * 16
					currentBattleMenu = "main"
					return false
				}
			}
			
			break;
		case "enemyMessage":
			displayMessage(hit,effect)
			if (!(zDown||xDown||cDown||vDown)){
				menuReady = true
			}
			if ((zDown||xDown||cDown||vDown) && menuReady){
				currentBattleMenu = "main"
				menuReady = false
			}
			break;
		case "enemyTurn":
			if(!enemyMoved && !enemyDied){
				
				attack = Math.ceil(Math.random() * 4)
				useAttack(enemyMonster["attacks"][attack], enemyMonster, playerMonster)
				hit = enemyMonster["name"] + " a" + hit.slice(1,hit.length)
				effect = enemyMonster["name"] + " a" + effect.slice(1,effect.length)
				enemyMoved = true
				displayMessage()
				if(playerMonster["hp"] < 1){
					effect = playerMonster["name"] + " was killed"
					monsterFound = false
					for(x=0;x<currentMonsters.length;x++){
						if (currentMonsters[x] && currentMonsters[x]["hp"] >= 1 && !monsterFound){
							monsterFound = true
							Switch(x)
						}
					}
					
					if(!monsterFound){
						battleWon = "enemy"
						
					}
				}
				currentBattleMenu = "enemyMessage"
			}
			else{
				if (!(zDown||xDown||cDown||vDown)){
					menuReady = true
				}	
			if ((zDown||xDown||cDown||vDown) && menuReady){
				currentBattleMenu = "main"
				menuReady = false
			}
				}
			if(enemyDied){
				enemyDied = false
				currentBattleMenu = "main"
			}
			if(battleWon == "enemy"){
				hit,effect = "You lose",null
				currentBattleMenu = "message"
				menuReady = false
			}
			break;
	}
	if (!(zDown||xDown||cDown||vDown)){								//workaround for the cross tick button holding problem
				menuReady = true
	}
	
	if (menuReady){
		if(escDown){
			currentBattleMenu = "main"
			menuReady = false
		}
		if(zDown){
			currentBattleMenu = "attack"
			menuReady = false
			console.log("zdown")
		}
		if(xDown){
			currentBattleMenu = "item"
			menuReady = false
		}
		if(cDown){
			currentBattleMenu = "switch"
			menuReady = false
		}
		if(vDown){
			enemyMonsterIndex = 0
			currentMonsterIndex = 0
			return false
		}
	}
	return true
}

function displayMessage(hit,effect){
	//context.clearRect(0,0,canvas.width, canvas.height);
	//currentBattleMenu = "message"
	//menuReady = false
	context.beginPath();
	context.lineWidth=1;
	context.strokeStyle="#000000";
	context.fillStyle = "#FFFFFF";
	context.fillRect(0, canvas.height - 40, canvas.width, 39);
	context.rect(0, canvas.height - 40, canvas.width, 39);
	context.stroke();
	context.fillStyle = "#000000"
	context.fillText(hit, 10, canvas.height - 30)
	if(effect){
		context.fillText(effect, 10, canvas.height - 20)
	}
	
	//context.fillRect(0,0,canvas.height, canvas.width)
}
function useAttack(attack, user, target){
	menuReady = false
	if (user["effect"] != null){
		if (Math.random() < 0.1){
			user["effect"] = null
		}
		if (user["effect"] == "frozen"){
			console.log("enemy turn")
		}
	}
	damage = Math.round(attack["damage"] * user["attack"] / target["defense"])
	if (isStrongAgainst(target["type"],attack["type"])){
		damage *= 2
		console.log("attack is strong")
	}
	if (isWeakTo(target["type"],attack["type"])){
		damage *= 0.5
		console.log("attack is weak")
	}

	hit = ""
	chance = Math.random()
	if (chance < attack["accuracy"] / 100) {
		target["hp"] -= damage
		hit = "Attack landed"
	}
	else{
		hit = "Attack missed"
		}
	if (target["hp"] <= 0){
		target["hp"] = 0
		
	}
	effect = ""
	if (attack["effect"] != null) {
		if (Math.random() <= attack["effect"][1] / 100){					
			target["effect"] = attack["effect"][0]
			effect = "Added effect ," + attack["effect"]
		}
		else{effect = "Failed to apply effect"
		}
	}
	else{effect = "Attack has no extra effect"}
	//return hit,effect
}
function Switch(index){
	menuReady = false
	hit = currentMonsters[currentMonsterIndex]["name"] + " switched out"
	currentMonsterIndex = index
	effect = currentMonsters[currentMonsterIndex]["name"] + " switched in"
	switchIndex = 0
	}
function enemySwitch(index){
	menuReady = false
	hit = enemyMonsters[enemyMonsterIndex]["name"] + " switched out"
	enemyMonsterIndex = index
	effect = enemyMonsters[enemyMonsterIndex]["name"] + " switched in"
	switchIndex = 0
	}

function useItem(item,playerMonster){
	menuReady = false
	if (item["effect"] == "hpRestore"){
		playerMonster["hp"] += item["strength"]
		if(playerMonster["hp"] > playerMonster["maxhp"]){
			playerMonster["hp"] = playerMonster["maxhp"]	
		}
	hit = "Used healing potion"
	effect = "Restored "+ item["strength"]+" health"
	}
	
}
function eventRender() {
			for (y = 0; y < currentLevelRows; y++) {
				for (x = 0; x < currentLevelCols; x++) {
						context.drawImage(sprites[currentLevel[currentLevel.length-1]], x*16, y*16)
				}
			}
			for (y = 0; y < currentLevelRows; y++) {
				for (x = 0; x < currentLevelCols; x++) {
					if (currentLevel[y][x].constructor != Array){
						context.drawImage(sprites[currentLevel[y][x]], x*16, y*16)
					}
					else{
						context.drawImage(sprites[currentLevel[y][x][1]], x*16, y*16)
						context.drawImage(sprites[currentLevel[y][x][0]], x*16, y*16)
					}
				}
			}
			if (currentLevel[playerYTile][playerXTile] == 1){
					if (currentGrassSprite == longGrass2Sprite){
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
			}	
			
			context.drawImage(playerSprite, playerXPos, playerYPos);
    }
	
function drawAttacks(playerMonster){
	attacks = playerMonster["attacks"]
	
	context.beginPath();
	context.lineWidth=1;
	context.strokeStyle="#000000";
	context.rect(0, canvas.height - 40, canvas.width, 39);
	context.fillStyle = "#FFFFFF"
	context.fillRect(0, canvas.height - 40, canvas.width, 39);
	context.stroke();
	
	context.beginPath();
	context.lineWidth=1;
	context.strokeStyle="#000000";
	context.rect(10, canvas.height - 16, 60, 10);
	context.stroke();
	context.fillStyle = "#000000"
	context.fillText("Z:"+attacks[1]["name"],15, canvas.height - 27)
	
	
	context.beginPath();
	context.lineWidth=1;
	context.strokeStyle="#000000";
	context.rect(10, canvas.height - 35, 60, 10);
	context.stroke();
	context.fillStyle = "#000000"
	context.fillText("C:"+attacks[2]["name"],15, canvas.height - 8)
	
	
	context.beginPath();
	context.lineWidth=1;
	context.strokeStyle="#000000";
	context.rect(canvas.width - 70, canvas.height - 34, 60, 10);
	context.stroke();
	context.fillStyle = "#000000"
	context.fillText("V:"+attacks[3]["name"],110, canvas.height - 8)
	
	
	
	context.beginPath();
	context.lineWidth=1;
	context.strokeStyle="#000000";
	context.rect(canvas.width - 70, canvas.height - 17, 60, 10);
	context.stroke();
	context.fillStyle = "#000000"
	context.fillText("X:"+attacks[4]["name"],110, canvas.height - 26)
}
function drawSwitch(){
	context.beginPath();
	context.lineWidth=1;
	context.strokeStyle="#000000";
	context.rect(0, canvas.height - 40, canvas.width, 39);
	context.fillStyle = "#FFFFFF"
	context.fillRect(0, canvas.height - 40, canvas.width, 39);
	context.stroke();
	
	context.beginPath();
	context.lineWidth=1;
	context.strokeStyle="#000000";
	context.rect(10, canvas.height - 36, 60, 31);
	context.stroke();
	context.fillStyle = "#000000"
	context.fillText("Z:"+ currentMonsters[switchIndex]["name"],15, canvas.height - 27)
	context.fillText("HP:",15, canvas.height - 17)
	context.fillText(currentMonsters[switchIndex]["hp"],30, canvas.height - 7)
	
	if (currentMonsters[switchIndex + 1]){
		context.beginPath();
		context.lineWidth=1;
		context.strokeStyle="#000000";
		context.rect(75, canvas.height - 36, 60, 31);
		context.stroke();
		context.fillStyle = "#000000"
		context.fillText("X:"+currentMonsters[switchIndex + 1]["name"],80, canvas.height - 27)
		context.fillText("HP:",80, canvas.height - 17)
		context.fillText(currentMonsters[switchIndex + 1]["hp"],95, canvas.height - 7)
		
		
		context.fillText("C:",150, canvas.height -27)
		context.fillText("Next",145, canvas.height -17)
		context.fillText("Page",145, canvas.height -7)
	}
	
	
}

function drawItems(){
	context.beginPath();
	context.lineWidth=1;
	context.strokeStyle="#000000";
	context.rect(0, canvas.height - 40, canvas.width, 39);
	context.fillStyle = "#FFFFFF"
	context.fillRect(0, canvas.height - 40, canvas.width, 39);
	context.stroke();
	
	context.beginPath();
	context.lineWidth=1;
	context.strokeStyle="#000000";
	context.rect(10, canvas.height - 36, 60, 31);
	context.stroke();
	context.fillStyle = "#000000"
	context.fillText("Z:"+ currentItems[itemIndex]["name"],15, canvas.height - 27)
	context.fillText("Strength:",15, canvas.height - 17)
	context.fillText(currentItems[itemIndex]["strength"],30, canvas.height - 7)
	
	if (currentItems[itemIndex + 1]){
		context.beginPath();
		context.lineWidth=1;
		context.strokeStyle="#000000";
		context.rect(75, canvas.height - 36, 60, 31);
		context.stroke();
		context.fillStyle = "#000000"
		context.fillText("X:"+currentItems[itemIndex + 1]["name"],80, canvas.height - 27)
		context.fillText("Strength:",80, canvas.height - 17)
		context.fillText(currentItems[itemIndex + 1]["strength"],95, canvas.height - 7)
		
		
		context.fillText("C:",150, canvas.height -27)
		context.fillText("Next",145, canvas.height -17)
		context.fillText("Page",145, canvas.height -7)
	}
	
	
}
function drawControls(){
	//control panel
	context.beginPath();
	context.lineWidth=1;
	context.strokeStyle="#000000";
	context.rect(0, canvas.height - 40, canvas.width, 39);
	context.fillStyle = "#FFFFFF"
	context.fillRect(0, canvas.height - 40, canvas.width, 39);
	context.stroke();
	
	//attack button
	context.beginPath();
	context.lineWidth=1;
	context.strokeStyle="#000000";
	context.rect(10, canvas.height - 16, 50, 10);
	context.stroke();
	context.fillStyle = "#000000"
	context.fillText("Z:Attack",15, canvas.height - 27)
	
	//switch button
	context.beginPath();
	context.lineWidth=1;
	context.strokeStyle="#000000";
	context.rect(10, canvas.height - 35, 50, 10);
	context.stroke();
	context.fillStyle = "#000000"
	context.fillText("C:Switch",15, canvas.height - 8)
	
	//run button
	context.beginPath();
	context.lineWidth=1;
	context.strokeStyle="#000000";
	context.rect(canvas.width - 60, canvas.height - 34, 50, 10);
	context.stroke();
	context.fillStyle = "#000000"
	context.fillText("V:Run",125, canvas.height - 8)
	
	
	//item button
	context.beginPath();
	context.lineWidth=1;
	context.strokeStyle="#000000";
	context.rect(canvas.width - 60, canvas.height - 17, 50, 10);
	context.stroke();
	context.fillStyle = "#000000"
	context.fillText("X:Item",125, canvas.height - 26)}
	
function drawMonsters(playerMonster, enemyMonster){
	//players monster stats
	context.beginPath();
	context.lineWidth=1;
	context.strokeStyle="#000000";
	context.rect(100, canvas.height - 75, 75, 30);
	context.stroke();
	context.beginPath()
	context.rect(105, canvas.height - 55, 65, 5)
	context.stroke()
	playerHealthPercent = playerMonster["hp"] / playerMonster["maxhp"]
	if(playerHealthPercent >= 0.75){
		
	context.fillStyle = "#00FF00"
	}
	if(playerHealthPercent < 0.75 && playerHealthPercent >= 0.25){
		context.fillStyle = "orange"
	}
	if(playerHealthPercent < 0.25){
		context.fillStyle = "#FF0000"
	}	
	context.fillRect(105,canvas.height - 55, 65 * playerHealthPercent, 5)
	context.fillStyle = "#000000"
	context.font = ("7px Verdana")
	context.fillText(playerMonster["name"],102, canvas.height - 65)
	context.fillText("HP:"+playerMonster["hp"]+"/"+playerMonster["maxhp"],110, canvas.height-58)
	
	
	
	//enemy monster stats
	context.beginPath();
	context.lineWidth=1;
	context.strokeStyle="#000000";
	context.rect(5, canvas.height - 130, 75, 30);
	context.stroke();
	context.beginPath()
	context.rect(10, canvas.height - 110, 65, 5)
	context.stroke()
	enemyHealthPercent = enemyMonster["hp"] / enemyMonster["maxhp"]
	if(enemyHealthPercent >= 0.75){
		
	context.fillStyle = "#00FF00"
	}
	if(enemyHealthPercent < 0.75 && enemyHealthPercent >= 0.25){
		context.fillStyle = "orange"
	}
	if(enemyHealthPercent < 0.25){
		context.fillStyle = "#FF0000"
	}	
	context.fillRect(10,canvas.height - 110, 65 * enemyMonster["hp"] / enemyMonster["maxhp"], 5)
	context.fillStyle = "#000000"
	context.font = ("7px Verdana")
	context.fillText(enemyMonster["name"],7, canvas.height - 120)
	context.fillText("HP:"+enemyMonster["hp"]+"/"+enemyMonster["maxhp"],15, canvas.height-113)
	
	
	//player monster sprite
	spritePath = "sprites/monsters/back/"+playerMonster["name"]+".png"//USE HGSS SPRITES
	playerMonsterSprite = new Image();
	playerMonsterSprite.src = spritePath;
	playerMonsterSprite.height = 64;
	playerMonsterSprite.width = 64;
	context.drawImage(playerMonsterSprite,10, 40);
	
	//enemy monster sprite
	spritePath = "sprites/monsters/front/"+enemyMonster["name"]+".png"//USE  HGSS SPRITES
	enemyMonsterSprite = new Image();
	enemyMonsterSprite.src = spritePath;
	enemyMonsterSprite.height = 64;
	enemyMonsterSprite.width = 64;
	context.drawImage(enemyMonsterSprite,100, 5);
}