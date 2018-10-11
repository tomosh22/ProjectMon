hit = ""
effect = ""
enemyMoved = false
enemyDied = false
battleWon = null
monsterFound = false
function Tutorial(){
	context.fillStyle = "#FF0000"
	switch (currentBattleMenu){
		case "main":
			context.fillText("Press Z to attack", 10, 55)
		break;
		case "attack":
			context.fillText("Press Z to use "+currentMonsters[currentMonsterIndex].attacks[1].name, 10, 55)
		break;
	}
}
function CaptureTutorial(){
	context.fillStyle = "#FF0000"
	switch (currentBattleMenu){
		case "main":
			context.fillText("Press X to use an item", 10, 55)
		break;
		case "item":
			context.fillText("Press Z to use a capsule",10,55)
		break;
	}
}
function LoadBattle(playerMonster, enemyMonster){
	
	canvas.width = 176
	canvas.height = 144
	drawMonsters(playerMonster, enemyMonster);
	context.font = "9px Verdana"
	switch(currentBattleMenu){
		case "main":
		itemIndex = 0
			drawControls();
			break;
		case "attack":
			if (!(zDown||xDown||cDown||vDown)){
				menuReady = true
			}
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
			if(zDown && menuReady && currentItems[itemIndex]){
				currentBattleMenu = "message"
				useItem(currentItems[itemIndex],playerMonster)
				if (menuReady){currentBattleMenu = "main"}
			}
			if(xDown && menuReady && currentItems[itemIndex + 1]){
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
			displayMessage(hit,effect)
			if(enemyMonster["hp"] < 1 && menuReady && (zDown||xDown||cDown||vDown)){
				//console.log(5*(enemyMonsters[enemyMonsterIndex].level/currentMonsters[currentMonsterIndex].level))
				currentMonsters[currentMonsterIndex].xp += 40*(enemyMonsters[enemyMonsterIndex].level/currentMonsters[currentMonsterIndex].level)
				if(currentMonsters[currentMonsterIndex].xp >= 100 && currentMonsters[currentMonsterIndex].level < 100){
					currentMonsters[currentMonsterIndex].levelUp(currentMonsters[currentMonsterIndex].level + 1)
					currentMonsters[currentMonsterIndex].xp = 0
				}
				monsterFound = false
				menuReady = true
				for(x=0;x<currentMonsters.length;x++){
					if (enemyMonsters[x] && enemyMonsters[x]["hp"] >= 1 && !monsterFound){
						monsterFound = true
						enemySwitch(x)
					}
				}
				if(!monsterFound){
					battleWon = "player"
					currentBattleMenu = "battleWon"
					menuReady = false
					break;
				}
			}
			if (!(zDown||xDown||cDown||vDown)){
				menuReady = true
			}
			if ((zDown||xDown||cDown||vDown) && menuReady &&!monsterFound){
				enemyMoved = false
				currentBattleMenu = "enemyTurn"
				menuReady = false
			}
			if (!(zDown||xDown||cDown||vDown) && monsterFound){
				menuReady = true
			}
			if ((zDown||xDown||cDown||vDown) && menuReady){
				currentBattleMenu = "main"
				menuReady = false
				monsterFound = false
			}
			break;
		case "enemyMessage":
			displayMessage(hit,effect)
			monsterFound = false
			if(playerMonster["hp"] < 1 && menuReady && (zDown||xDown||cDown||vDown)){
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
						currentBattleMenu = "battleWon"
						menuReady = false
						break;
					}
				}
			if (!(zDown||xDown||cDown||vDown)){
				menuReady = true
			}
			if ((zDown||xDown||cDown||vDown) && menuReady && !monsterFound){
				currentBattleMenu = "main"
				menuReady = false
			}
			if ((zDown||xDown||cDown||vDown) && menuReady && monsterFound){
				currentBattleMenu = "enemyMessage"
				menuReady = false
				monsterFound = false
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
			break;
		case "battleWon":
			if (battleWon == "player")
				displayMessage("You Win, £5 has been added to your wallet",null)
				playerMoney+=5
			if (battleWon == "enemy"){
				displayMessage("You lose, £10 has been taken from you",null)
				playerMoney-=10
			}
			if (battleWon == "captured"){
				displayMessage(enemyMonsters[enemyMonsterIndex].name + " was captured")
			}
			if (!(zDown||xDown||cDown||vDown)){
				menuReady = true
			}
			if ((zDown||xDown||cDown||vDown) && menuReady){
				currentBattleMenu = "main"
				battleWon = null
				enemyMonsterIndex = 0
				menuReady = false
				return false
			}
			break;
		case "run":
			if (canCapture){
				displayMessage("You ran away")
				enemyMonsterIndex = 0
				currentMonsterIndex = 0
				return false
			}
			else{
				displayMessage("You can't run from this battle")
				if (!(zDown||xDown||cDown||vDown)){
					menuReady = true
				}
				if ((zDown||xDown||cDown||vDown) && menuReady){
					currentBattleMenu = "main"
					menuReady = false
				}
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
		if(zDown && !tutorialCapture){
			currentBattleMenu = "attack"
			menuReady = false
		}
		if(xDown && !tutorial){
			currentBattleMenu = "item"
			menuReady = false
		}
		if(cDown && !tutorial && !tutorialCapture){
			currentBattleMenu = "switch"
			menuReady = false
		}
		if(vDown && !tutorial && !tutorialCapture){
			currentBattleMenu = "run"
			menuReady = false
		}
	}
	if (tutorial){
		Tutorial()
	}
	if(tutorialCapture){
		CaptureTutorial()
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
}
function useAttack(attack, user, target){
	menuReady = false
	if (user["effect"] != null){
		if (Math.random() < 0.1){
			user["effect"] = null
		}
		if (user["effect"] == "frozen"){
			console.log("frozen")
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
	if (item["effect"] == "capture"){
		if(canCapture){
			currentMonsters.push(enemyMonsters[enemyMonsterIndex])
			currentBattleMenu = "battleWon"
			battleWon = "captured"
		}
		else{
			hit = "Can't capture"
			effect = "This is an NPC battle"
		}
	}
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
	if(currentItems[itemIndex]){
	context.beginPath();
	context.lineWidth=1;
	context.strokeStyle="#000000";
	context.rect(10, canvas.height - 36, 60, 31);
	context.stroke();
	context.fillStyle = "#000000"
	context.fillText("Z:"+ currentItems[itemIndex]["name"],15, canvas.height - 27)
	context.fillText("Strength:",15, canvas.height - 17)
	context.fillText(currentItems[itemIndex]["strength"],30, canvas.height - 7)
	}
	
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
	context.fillStyle = "#7777FF"
	context.fillRect(100,canvas.height-47,75*(playerMonster.xp / 100),1)
	context.fillStyle = "#000000"
	context.fillText("Lvl."+playerMonster.level,145,canvas.height-65)
	
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
	context.fillText("Lvl."+enemyMonster.level,55,canvas.height-120)
	
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