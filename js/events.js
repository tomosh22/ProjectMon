currentBattleMenu = "main"
firstBattle = {"ready":true, "running":false, "done":[false,false,false,false], "points":[[4,6], [2,6]]}
function events(){
	
	if (firstBattle["ready"] && currentLevel == house0){
		
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
				console.log
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
					context.fillText("Imma fuck you up kid",canvas.width / 10, canvas.height - 10)
					if (wDown || aDown || sDown || dDown){
						firstBattle["done"][2] = 2
					}
			}
			if (firstBattle["done"][0] && firstBattle["done"][1] && firstBattle["done"][2] && !firstBattle["done"][3]){
				canvas.width = 176
				canvas.height = 144
				if(!LoadBattle(currentMonsters[1], testMonster)){
					firstBattle["done"][3] = true
				}
			}
			if (firstBattle["done"][0] && firstBattle["done"][1] && firstBattle["done"][2] && firstBattle["done"][3]){
				playerCanMove = true
				firstBattle["ready"] = false								//ends the event and the game continues as normal
				firstBattle["running"] = false
			}
		}
		
		
	}
}
hit = ""
effect = ""
enemyMoved = false
function LoadBattle(playerMonster, enemyMonster){
	
	drawMonsters(playerMonster, enemyMonster);
	context.font = "9px Verdana"
	console.log(currentBattleMenu, menuReady)
	
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
				if (menuReady){currentBattleMenu = "main"}
				
			}
			if(xDown && menuReady){
				currentBattleMenu = "message"
				useAttack(playerMonster["attacks"][4],playerMonster, enemyMonster)
				if (menuReady){currentBattleMenu = "main"}
			}
			if(cDown && menuReady){
				currentBattleMenu = "message"
				useAttack(playerMonster["attacks"][2],playerMonster, enemyMonster)
				if (menuReady){currentBattleMenu = "main"}
			}
			if(vDown && menuReady){
				currentBattleMenu = "message"
				useAttack(playerMonster["attacks"][3],playerMonster, enemyMonster)
				if (menuReady){currentBattleMenu = "main"}
				
			}
			
			break;
		case "message":
			displayBattleMessage(hit,effect)
			if (!(zDown||xDown||cDown||vDown)){
				menuReady = true
			}
			if ((zDown||xDown||cDown||vDown) && menuReady){
				enemyMoved = false
				currentBattleMenu = "enemyTurn"
				menuReady = false
			}
			break;
		case "enemyMessage":
			displayBattleMessage(hit,effect)
			if (!(zDown||xDown||cDown||vDown)){
				menuReady = true
			}
			if ((zDown||xDown||cDown||vDown) && menuReady){
				currentBattleMenu = "main"
				menuReady = false
			}
			break;
		case "enemyTurn":
			
				if(!enemyMoved){
					attack = Math.ceil(Math.random() * 4)
					console.log(attack)
					useAttack(enemyMonster["attacks"][attack], enemyMonster, playerMonster)
					hit = enemyMonster["name"] + " a" + hit.slice(1,hit.length)
					effect = enemyMonster["name"] + " a" + effect.slice(1,effect.length)
					enemyMoved = true
					displayBattleMessage()
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
		}
		if(vDown){
			return false
		}
	}
	return true
}

function displayBattleMessage(hit,effect){
	//context.clearRect(0,0,canvas.width, canvas.height);
	//currentBattleMenu = "message"
	//menuReady = false
	context.beginPath();
	context.lineWidth=1;
	context.strokeStyle="#000000";
	context.rect(0, canvas.height - 40, canvas.width, 39);
	context.stroke();
	context.fillStyle = "#000000"
	context.fillText(hit, 10, canvas.height - 30)
	context.fillText(effect, 10, canvas.height - 20)
	//context.fillRect(0,0,canvas.height, canvas.width)
}
function useAttack(attack, user, target){
	console.log(attack, user)
	menuReady = false
	//console.log("using attack")
	if (user["effect"] != null){
		if (Math.random() < 0.1){
			user["effect"] = null
		}
		if (user["effect"] == "frozen"){
			console.log("enemy turn")
		}
	}
			
	// if opponent.isWeakTo(attack[type]) { 
		// damage = attack["damage"] *= 2
	// }
	// if opponent.isStrongAgainst(attack[type]){
		// damage = attack["damage"] *= 0.5
	// }

	hit = ""
	chance = Math.random()
	if (chance < attack["accuracy"] / 100) {
		target["hp"] -= Math.round(attack["damage"] * user["attack"] / target["defense"])
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
function drawControls(){
	//control panel
	context.beginPath();
	context.lineWidth=1;
	context.strokeStyle="#000000";
	context.rect(0, canvas.height - 40, canvas.width, 39);
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
	spritePath = "sprites/monsters/back/"+playerMonster["name"]+".png"
	playerMonsterSprite = new Image();
	playerMonsterSprite.src = spritePath;
	playerMonsterSprite.height = 64;
	playerMonsterSprite.width = 64;
	context.drawImage(playerMonsterSprite,10, 50);
	
	//enemy monster sprite
	spritePath = "sprites/monsters/front/"+enemyMonster["name"]+".png"
	enemyMonsterSprite = new Image();
	enemyMonsterSprite.src = spritePath;
	enemyMonsterSprite.height = 64;
	enemyMonsterSprite.width = 64;
	context.drawImage(enemyMonsterSprite,100, 5);
}