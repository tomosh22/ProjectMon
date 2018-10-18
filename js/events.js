currentBattleMenu = "main"
function LoadLevel(x,y){
		if(!x || !y){
			playerCol = currentLevel.spawnPoint[0];
			playerRow = currentLevel.spawnPoint[1];
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
		currentLevelCols = currentLevel.tiles[0].length;
		currentLevelRows = currentLevel.tiles.length
		canvas.height = currentLevelRows*16//adjusts canvas to fit the map
		canvas.width = currentLevelCols*16	
	}
function eventMessage(one,two,three){
	context.fillStyle = "#FFFFFF"
	context.fillRect(0, canvas.height - 40, canvas.width, 40)
	if(one){
	context.fillStyle = "#000000"
	context.fillText(one,5, canvas.height - 30)
	}
	if(two){
	context.fillStyle = "#000000"
	context.fillText(two,5, canvas.height - 20)
	}
	if(three){
	context.fillStyle = "#000000"
	context.fillText(three,5, canvas.height - 10)
	}
	context.rect(0, canvas.height - 40, canvas.width, 40);
	context.stroke();
}
class event{
	constructor(){
		this.ready = true// FALSE SO THAT EVENTS DONT RUN FOR DEVELOPMENT
		this.running = false
		this.done = []
	}
}
finalBoss = new event()
finalBoss.ready = false //TRUE FOR DEVELEOPMENT
firstBattle = new event()
firstCapture = new event()
outsideGym = new event()
gym0Event = new event()
gym0Event.ready = false


gym1Event = new event()
gym1Event.ready = false
gymsBeaten = 0
numberOfGyms = 2
healing = {"running":false}
shopping = {"running":false}
canCapture = false
itemIndex = 0
switchIndex = 0
currentMonsterIndex = 0
enemyMonsterIndex = 0
tutorial = false
tutorialCapture = false
function distanceTo(y1,y2,x1,x2){
	return Math.sqrt(Math.pow(x2 - x1,2) + Math.pow(y2 - y1,2))
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
finalBossTeam = [new pikachu,new charmander]
for(x=0;x<finalBossTeam.length;x++){
		finalBossTeam[x].levelUp(1)
	}
npcBattle = false
function events(){
	if (finalBoss.ready && playerYTile == 1 && playerXTile == 6 && currentLevel == finalLevel){
		playerCanMove = false
		
		if(!finalBoss.done[0]){
			eventMessage("Well done, you have beaten every gym.", "Now let's see if you are worthy of the title","of champion.")
			if (!(zDown || xDown || cDown || vDown)){
				menuReady = true
			}
			if ((zDown || xDown || cDown || vDown) && menuReady){
				finalBoss.done[0] = true
				menuReady = false
			}
		}
		if (!(zDown||xDown||cDown||vDown)){
			menuReady = true
		}
		if (menuReady && finalBoss.done[0] && !finalBoss.done[1]){
			npcBattle = true
			canCapture = false
			enemyMonsters = finalBossTeam
			if(!LoadBattle(currentMonsters[currentMonsterIndex],enemyMonsters[enemyMonsterIndex])){
				finalBoss.done[1] = true
			}
		}
		if(finalBoss.done[1]){
			LoadLevel(playerXTile,playerYTile)
			eventRender()
			eventMessage("Well done, you have proven yourself to be", "the strongest trainer in the world!")
		}
	}
	if(gymsBeaten == numberOfGyms){
		finalBoss.ready = true
	}
	if (gym0Event.ready){
		eventRender()
		eventMessage("Well done, you have beaten the first", "gym! If you beat all the others you", "can become the champion.")
		
		if (!(zDown || xDown || cDown || vDown)){
			menuReady = true
		}
		if ((zDown || xDown || cDown || vDown) && menuReady){
			gymsBeaten++
			menuReady = false
			playerCanMove = true
			gym0Event.ready = false
		}
		
	}
	if (gym1Event.ready){
		eventRender()
		eventMessage("Wow, that's 2 gyms beaten now!")
		
		if (!(zDown || xDown || cDown || vDown)){
			menuReady = true
		}
		if ((zDown || xDown || cDown || vDown) && menuReady){
			gymsBeaten++
			menuReady = false
			playerCanMove = true
			gym1Event.ready = false
		}
		
	}
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
				if(npcs[i].ready && npcBattle && menuReady && distanceTo(playerYTile * 16 + 7,(npcs[i]["y"]-1)*16 + 7,playerXTile * 16 + 7,(npcs[i]["x"]-1)*16 + 7)<23 ){
					enemyMonsters = npcs[i]["team"]
					canCapture = false
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
	if (outsideGym.ready && currentLevel == maps[2]){
		if (!outsideGym.running){
			friendXPos = 8 * 16
			friendYPos = 6 * 16
			playerCanMove = false
			outsideGym.running = true
			menuReady = false
		}
		else{
			if (!outsideGym.done[0]){
				eventRender()
		
				context.drawImage(friendSprite, friendXPos, friendYPos);
		
				eventMessage("Hey, over here!")
				if (!(zDown || xDown || cDown || vDown)){
					menuReady = true
				}
				if ((zDown || xDown || cDown || vDown) && menuReady){
					outsideGym.done[0] = true
					menuReady = false
				}
			}
			if(outsideGym.done[0] && !outsideGym.done[1]){
				if(Math.floor(friendXPos / 16) != 4){
				eventRender();
				context.drawImage(friendSprite, friendXPos, friendYPos);
				friendXPos--;
				
			}
			else{
				outsideGym.done[1] = true
			}
			}
			if(outsideGym.done[1] && !outsideGym.done[2]){
				if(Math.floor(friendYPos / 16) != 16){
				eventRender();
				context.drawImage(friendSprite, friendXPos, friendYPos);
				friendYPos++;
			
			}
			else{
				outsideGym.done[2] = true
			}
			}
			if (outsideGym.done[2] && !outsideGym.done[3]){
				eventRender()
				context.drawImage(friendSprite, friendXPos, friendYPos);
				eventMessage("I just beat the gym, it wasn't even that hard.","I'm going to beat every gym and become", "the best trainer in the world, just you wait!")
				if (!(zDown || xDown || cDown || vDown)){
					menuReady = true
				}
				if ((zDown || xDown || cDown || vDown) && menuReady){
					outsideGym.done[3] = true
					menuReady = false
				}
			}
			if (outsideGym.done[3] && !outsideGym.done[4]){
				if(Math.floor(friendYPos / 16) != 0){
					eventRender();
					context.drawImage(friendSprite, friendXPos, friendYPos);
					friendYPos--;
				}
				else{
					playerCanMove = true
					outsideGym.running = false
					outsideGym.ready = false
				}
			}
		}
		
	}
	if (firstCapture.ready && currentLevel == town0){
		if (!firstCapture.running){
			playerCanMove = false
			eventRender()
			friendXTile = 4
			friendYTile = 15
			friendXPos = friendXTile * 16
			friendYPos = friendYTile * 16
			context.drawImage(friendSprite, friendXPos, friendYPos);
			
			firstCapture.running = true;
			tutorialCapture = true
		}
		else{
			if(Math.floor(friendXPos / 16) != 7){
				eventRender();
				context.drawImage(friendSprite, friendXPos, friendYPos);
				friendXPos++;
			}
			else{
				firstCapture.done[0] = true
			}
			if(firstCapture.done[0] && !firstCapture.done[1])
				if(Math.floor(friendYPos / 16) != 7){
				eventRender();
				context.drawImage(friendSprite, friendXPos, friendYPos);
				friendYPos--;
			}
			else{
				firstCapture.done[1] = true
			}
			if(firstCapture.done[1] && !firstCapture.done[2]){
				eventMessage("Here, I'll show you how to","capture monsters.")
				if (zDown || xDown || cDown || vDown){
					menuReady = false
					firstCapture.done[2] = true
					canCapture = true
					enemyMonsters = [wildMonsters[levelIndex][0]]
					enemyMonsters[0].levelUp(levelDifficulty[levelIndex])
				}
			}
			if (firstCapture.done[2] && !firstCapture.done[3]){
				
				if(!LoadBattle(currentMonsters[currentMonsterIndex], enemyMonsters[enemyMonsterIndex])){
					firstCapture["done"][3] = true
					menuReady = false
					canvas.height = currentLevelRows*16
					canvas.width = currentLevelCols*16
				}
			}
			if(firstCapture.done[3] && !firstCapture.done[4]){
				eventRender()
				eventMessage("Well done, it's best to lower a","monster's HP or give it a status ","effect before trying to capture it.")
				if (!(zDown || xDown || cDown || vDown)){
					menuReady = true
				}
				if ((zDown || xDown || cDown || vDown) && menuReady){
					firstCapture.done[4] = true
					menuReady = false
				}
			}
			if(firstCapture.done[4] && !firstCapture.done[5]){
				eventRender()
				eventMessage("OK, I'm off to the next town to","challenge the gym.","Here's some capsules to get you started.")
				context.fillText("",5, canvas.height - 2)
				if (!(zDown || xDown || cDown || vDown)){
					menuReady = true
				}
				if ((zDown || xDown || cDown || vDown) && menuReady){
					firstCapture.done[5] = true
				}
			}
			if(firstCapture.done[5] && !firstCapture.done[6]){
				if(Math.floor(friendYPos / 16) != 0){
					eventRender();
					context.drawImage(friendSprite, friendXPos, friendYPos);
					friendYPos--;
				}
				else{
					playerCanMove = true
					tutorialCapture = false
					firstCapture.running = false
					firstCapture.ready = false
				}
			}
		}
	}
	if (firstBattle.ready && currentLevel == house0){	//introduction battle
		
		if (!firstBattle.running){
			playerCanMove = false
			friendXTile = 4
			friendYTile = 8
			friendXPos = friendXTile * 16
			friendYPos = friendYTile * 16
			firstBattle.running = true;
			tutorial = true
		}
		else{
			friendXTile = Math.round(friendXPos / 16)
			friendYTile = Math.round(friendYPos / 16)
			if(Math.floor(friendYPos / 16) != 6 - 1 && !firstBattle.done[0]){
				eventRender();
				context.drawImage(friendSprite, friendXPos, friendYPos);
				friendYPos -= 1;
			
			}
			else{
				firstBattle.done[0] = true
			}
			//console.log(Math.ceil(friendXPos / 16) != firstBattle["points"][1][0],!firstBattle["done"][1],firstBattle["done"][0])


			if(Math.floor(friendXPos / 16) != 2 - 1 	&& !firstBattle.done[1] && 	firstBattle.done[0]){

				eventRender();
				context.drawImage(friendSprite, friendXPos, friendYPos);
				friendXPos -= 1;
			
			}
			else{
				if(firstBattle.done[0]){ 
					firstBattle.done[1] = true
					//house0[6][2] = [89, 55]
				}
			}
			
			if (firstBattle.done[1] && 	firstBattle.done[0] && !firstBattle.done[2]){
					eventMessage("Battle trigger")
					if (zDown || xDown || cDown || vDown){
						menuReady = false
						firstBattle.done[2] = true
					}
			}
			if (firstBattle.done[0] && firstBattle.done[1] && firstBattle.done[2] && !firstBattle.done[3]){
				canCapture = false
				if(!LoadBattle(currentMonsters[currentMonsterIndex], enemyMonsters[enemyMonsterIndex])){
					firstBattle["done"][3] = true
					menuReady = false
				}
			}
			if (firstBattle.done[0] && firstBattle.done[1] && firstBattle.done[2] && firstBattle.done[3] && !firstBattle.done[4]){
				LoadLevel()
				eventRender()
				eventMessage("Wow you won!","I'm going to improve my team!")
				if (!(zDown||xDown||cDown||vDown)){
					menuReady = true
				}
				if ((zDown||xDown||cDown||vDown) && menuReady){
					firstBattle["done"][4] = true
				}
				
			}
			if(firstBattle.done[4] && !firstBattle.done[5]){
				if(Math.floor(friendXPos / 16) != 4 ){
					eventRender();
					context.drawImage(friendSprite, friendXPos, friendYPos);
					friendXPos++
				}
				else{
					firstBattle.done[5] = true
				}
			}
			if(firstBattle.done[5]){
				if(Math.floor(friendYPos / 16) != 8 ){
					eventRender();
					context.drawImage(friendSprite, friendXPos, friendYPos);
					friendYPos++
				}
				else{
					firstBattle.ready = false
					firstBattle.running = false
					playerCanMove = true
					tutorial = false
				}
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
		if(LoadShop()){
			playerCanMove = true
			LoadLevel()
			shopping["running"] = false
		}
	

	}	//end of shop
}
currentSelection = 0
function LoadShop(){
	canvas.width = 200
	canvas.height = 300
	context.strokeStyle = "#000000"
	context.fillStyle = "#000000"
	context.rect(0,0,canvas.width,canvas.height)
	context.stroke()
	context.fillText("£"+playerMoney,160,10)
	x = 0
	xOffset = 10
	yOffset = 20
	newRow = true
	
	for(x=0;x<shopItems.length;x++){
		if(x==currentSelection){
			context.fillStyle="#0000FF"
		}
		else{
			context.fillStyle="#000000"
		}
		context.rect(xOffset,yOffset,80,40)
		context.stroke()
		context.fillText(shopItems[x]["name"],xOffset+5,yOffset+10)
		context.fillText("Strength: "+shopItems[x]["strength"],xOffset+5,yOffset+20)
		context.fillText("Price: "+"5",xOffset+5,yOffset+30)
		xOffset += 100
		newRow = !newRow
		if(newRow){
			xOffset = 10
			yOffset += 50
		}
	}
	if((zDown||xDown||cDown||vDown) && menuReady){
		if (playerMoney >= 5){
			menuReady = false
			playerMoney -= 5					//PRICE OF ITEM NEEDS ADDING
			currentItems.push(shopItems[currentSelection])
		}
	}
	if(wDown && menuReady){
		menuReady = false
		currentSelection -= 2
		if(currentSelection < 0){
			currentSelection = 0
		}
	}
	if(aDown && menuReady){
		menuReady = false
		currentSelection -= 1
		if(currentSelection < 0){
			currentSelection = 0
		}
	}
	if(sDown && menuReady){
		menuReady = false
		currentSelection += 2
		if(currentSelection > x-1){
			currentSelection = x-1
		}
	}
	if(dDown && menuReady){
		menuReady = false
		currentSelection += 1
		if(currentSelection > x-1){
			currentSelection = x-1
		}
	}
	if (!(wDown||aDown||sDown||dDown||zDown||xDown||cDown||vDown)){
				menuReady = true
		}
	if(escDown && menuReady){
		return true
	}
}

function eventRender() {
			for (y = 0; y < currentLevelRows; y++) {
				for (x = 0; x < currentLevelCols; x++) {
						context.drawImage(sprites[currentLevel.background], x*16, y*16)
				}
			}
			for (y = 0; y < currentLevelRows; y++) {
				for (x = 0; x < currentLevelCols; x++) {
					if (currentLevel.tiles[y][x].constructor != Array){
						context.drawImage(sprites[currentLevel.tiles[y][x]], x*16, y*16)
					}
					else{
						context.drawImage(sprites[currentLevel.tiles[y][x][1]], x*16, y*16)
						context.drawImage(sprites[currentLevel.tiles[y][x][0]], x*16, y*16)
					}
				}
			}
			if (currentLevel.tiles[playerYTile][playerXTile] == 1){
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
	
