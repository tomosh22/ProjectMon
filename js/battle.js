hit = ""
effect = ""
enemyMoved = false
enemyDied = false
battleWon = null
monsterFound = false
battleWon2 = null
canRun = true
function Tutorial(){//first battle when the friend comes into the spawn house
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
function CaptureTutorial(){//second battle when the friends shows the player how to capture monsters
	context.fillStyle = "#FF0000"//red text
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
			if (!(zDown||xDown||cDown||vDown)){//if no controls are being pressed
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
			drawItems();//draw controls for using items
			if(zDown && menuReady && currentItems[itemIndex]){
				currentBattleMenu = "message"
				useItem(currentItems[itemIndex],playerMonster)
				currentItems.splice(itemIndex,1);//remove the used item from inventory
				itemIndex = 0//reset the menu
			}
			if(xDown && menuReady && currentItems[itemIndex + 1]){
				currentBattleMenu = "message"
				useItem(currentItems[itemIndex + 1],playerMonster)
				currentItems.splice(itemIndex + 1,1);//remove the used item from inventory
				itemIndex = 0 //reset the menu
			}
			if(cDown && menuReady && currentItems.length > itemIndex + 2){	//if there are more items to be shown
				menuReady = false
				itemIndex += 2//load the next 2 items
				if (!(zDown||xDown||cDown||vDown)){//if no controls are being pressed
					menuReady = true
				}
			}
			else{
				if(cDown && menuReady){//if there are no more items to be shown
					currentBattleMenu = "main"//go back to main menu
					itemIndex = 0
					menuReady = false
				}
				
			}
			break;
		case "switch":
			drawSwitch();//draws the controls for monster switching
			if(zDown && menuReady){
				currentBattleMenu = "message"
				Switch(switchIndex)//switch monster
				switchIndex = 0//reset the menu
			}
			if(xDown && menuReady){
				currentBattleMenu = "message"
				Switch(switchIndex + 1)//switch monster
				switchIndex = 0//reset the menu
			}
			if(cDown && menuReady && currentMonsters.length > switchIndex + 2){//if there are more monsters left to be shown	
				menuReady = false
				switchIndex += 2//loads the next 2 monsters
				if (!(zDown||xDown||cDown||vDown)){//if no controls are being pressed
					menuReady = true
				}
			}
			else{
				if(cDown && menuReady){//if there are no more monsters go back to main menu
					currentBattleMenu = "main"
					switchIndex = 0//reset the menu
					menuReady = false
				}
			}
			break;
		case "message":
			displayMessage(hit,effect)
			if(enemyMonster["hp"] < 1 && menuReady && (zDown||xDown||cDown||vDown)){//if an enemy monster has been killed
				currentMonsters[currentMonsterIndex].xp += 150*(enemyMonsters[enemyMonsterIndex].level/currentMonsters[currentMonsterIndex].level)//add xp based on the level difference between the 2 monsters
				if(currentMonsters[currentMonsterIndex].xp >= 100 && currentMonsters[currentMonsterIndex].level < 100){//if xp has reached the max then level up
					currentMonsters[currentMonsterIndex].levelUp(currentMonsters[currentMonsterIndex].level + 1)
					currentMonsters[currentMonsterIndex].xp = 0//reset xp
				}
				monsterFound = false
				menuReady = true
				for(x=0;x<currentMonsters.length;x++){
					if (enemyMonsters[x] && enemyMonsters[x]["hp"] >= 1 && !monsterFound){//see if the enemy has any more monsters left to fight
						monsterFound = true
						enemySwitch(x)//switch in the enemy's monster
					}
				}
				if(!monsterFound){//if there are no more enemy monsters then the player wins
					battleWon = "player"
					currentBattleMenu = "battleWon"//load battle ending sequence
					menuReady = false
					break;
				}
			}
			if (!(zDown||xDown||cDown||vDown)){//if no controls are being pressed
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
			if(playerMonster["hp"] < 1 && menuReady && (zDown||xDown||cDown||vDown)){//if the players monster has been killed
					effect = playerMonster["name"] + " was killed"
					monsterFound = false
					for(x=0;x<currentMonsters.length;x++){
						if (currentMonsters[x] && currentMonsters[x]["hp"] >= 1 && !monsterFound){//see if the player has any more monsters to fight
							monsterFound = true
							Switch(x)//switch in the next monster
						}
					}
					if(!monsterFound){//if the player has no more monsters then the enemy wins
						battleWon = "enemy"
						currentBattleMenu = "battleWon"
						menuReady = false
						break;
					}
				}
			
			if (!(zDown||xDown||cDown||vDown)){//if no controls are being pressed
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
				
				attack = Math.ceil(Math.random() * 4)//uses a random attack from their 4
				useAttack(enemyMonster.attacks[attack], enemyMonster, playerMonster)
				hit = enemyMonster.name + " used " + enemyMonster.attacks[attack].name
				enemyMoved = true
				displayMessage()
				currentBattleMenu = "enemyMessage"
			}
			else{
				if (!(zDown||xDown||cDown||vDown)){//if no controls are being pressed
					menuReady = true
				}	
			if ((zDown||xDown||cDown||vDown) && menuReady){
				currentBattleMenu = "main"
				menuReady = false
			}
				}
			if(enemyDied){
				enemyDied = false//reset the enemyDied variable for the next monster
				currentBattleMenu = "main"
			}
			break;
		case "battleWon":
			if (battleWon == "player")
				displayMessage("You Win, £5 has been awarded",null)
				playerMoney+=5
			if (battleWon == "enemy"){
				displayMessage("You lose, £5 has been removed",null)
				playerMoney-=5
				
			}
			battleWon2 = battleWon//need a variable for the event loop to determine if an npc has been beaten
			if (battleWon == "captured"){
				displayMessage(enemyMonsters[enemyMonsterIndex].name + " was captured")
			}
			if (!(zDown||xDown||cDown||vDown)){//if no controls are being pressed
				menuReady = true
			}
			if ((zDown||xDown||cDown||vDown) && menuReady){
				currentBattleMenu = "main"
				enemyMonsterIndex = 0//reset battle variables
				menuReady = false
				if (battleWon == "enemy"){//player must be sent to the hospital to regain hp
					if([7,8].includes(levelIndex)){//if the player is in a gym
						outsideLocation = maps[outsideIndex].spawnPoint//set the spawn point to outside the gym
					}
					else{
						outsideLocation = currentLevel.spawnPoint
					}
					currentLevel = maps[3]//go to the hospital
					levelIndex = 3
					LoadLevel(5,2)//places the user on the healing spot in the hospital so they can't go outside without healing
					battleWon = null
					
				}
				battleWon = null
				return false
			}
			break;
		case "run":
			if (canCapture){
				chance = currentMonsters[currentMonsterIndex].speed / enemyMonsters[enemyMonsterIndex].speed //higher chance of escaping if player is faster
				if (runSuccess(chance) && canRun){//can't run from npc battles
					battleWon = null
					currentBattleMenu = "main"//reset battle variables
					displayMessage("You ran away")
					enemyMonsterIndex = 0
					currentMonsterIndex = 0
					return false
				}
				else{
					displayMessage("You didn't manage to escape")
					canRun = false
					if (!(zDown||xDown||cDown||vDown)){//if no controls are being pressed
						menuReady = true
					}
					if ((zDown||xDown||cDown||vDown) && menuReady){
						currentBattleMenu = "enemyTurn"
						menuReady = false
						canRun = true
						enemyMoved = false
					}
				}
			}
			else{
				displayMessage("You can't run from this battle")
				if (!(zDown||xDown||cDown||vDown)){//if no controls are being pressed
					menuReady = true
				}
				if ((zDown||xDown||cDown||vDown) && menuReady){
					currentBattleMenu = "main"
					menuReady = false
				}
			}
			break;
	}
	if (!(zDown||xDown||cDown||vDown)){//workaround for the cross tick button holding problem
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
		Tutorial()//for the introduction battle
	}
	if(tutorialCapture){
		CaptureTutorial() //for when the user is shown how to capture monsters
	}
	return true//if the battle is to carry on
}
function runSuccess(chance){
	if (chance > 1.2){
		random = 0.25
	}
	if (chance>=0.8 && chance <= 1.2){
		random = 0.5
	}
	if (chance<0.8){
		random = 0.75
	}
	//return false
	return Math.random() > random
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
	if(effect){//if effect isn't null
		context.fillText(effect, 10, canvas.height - 20)
	}
}
function useAttack(attack, user, target){
	menuReady = false
	if (user["effect"] != null){//if the user's monster has a status effect
		if (Math.random() < 0.1){
			user["effect"] = null//1/10 chance of removing effect
		}
		if (user["effect"] == "frozen"){
			console.log("frozen")
		}
	}
	effect = ""
	damage = Math.round(attack["damage"] * user["attack"] / target["defense"])
	if (attackIsStrong(target["type"],attack["type"])){
		damage *= 2//double damage for a good type matchup
		effect="Attack is strong"
	}
	else{
		if (defenceIsStrong(target["type"],attack["type"])){
			damage *= 0.5//half damage for a bad type matchup
			effect="Defense is strong"
		}
	}
	hit = ""
	chance = Math.random()
	if (chance < attack["accuracy"] / 100) {//accuracy of an attack is its % chance of hitting
		target["hp"] -= Math.round(damage)//deals damage
		hit = "Attack landed"
	}
	else{
		hit = "Attack missed"
		}
	if (target["hp"] <= 0){
		target["hp"] = 0
	}
	if (attack["effect"] != null) {//if the attack has a chance of applying an effect
		if (Math.random() <= attack["effect"][1] / 100){					
			target["effect"] = attack["effect"][0]//adds the effect to the target
			effect = "Added effect ," + attack["effect"]
		}
		else{effect = "Failed to apply effect"
		}
	}
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
		if(playerMonster["hp"] > playerMonster["maxhp"]){//makes sure hp doesn't go over the maximum
			playerMonster["hp"] = playerMonster["maxhp"]	
		}
	hit = "Used healing potion"
	effect = "Restored "+ item["strength"]+" health"
	}
	if (item["effect"] == "capture"){
		if(canCapture){	//will be false for npc battles
			currentMonsters.push(enemyMonsters[enemyMonsterIndex])//adds the enemy monster to the user's monsters list
			currentBattleMenu = "battleWon"//battle is over
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
	
	if (currentMonsters[switchIndex + 1]){//if the monster exists
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
	if(currentItems[itemIndex]){//if the item exists
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
	
	if (currentItems[itemIndex + 1]){//if the item exists
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
	playerHealthPercent = playerMonster.hp / playerMonster.maxhp
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
	context.fillText(playerMonster.name,102, canvas.height - 65)
	context.fillText("HP:"+playerMonster.hp+"/"+playerMonster.maxhp,110, canvas.height-58)
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
	enemyHealthPercent = enemyMonster.hp / enemyMonster.maxhp
	if(enemyHealthPercent >= 0.75){
		
	context.fillStyle = "#00FF00"
	}
	if(enemyHealthPercent < 0.75 && enemyHealthPercent >= 0.25){
		context.fillStyle = "orange"
	}
	if(enemyHealthPercent < 0.25){
		context.fillStyle = "#FF0000"
	}	
	context.fillRect(10,canvas.height - 110, 65 * enemyMonster.hp / enemyMonster.maxhp, 5)
	context.fillStyle = "#000000"
	context.font = ("7px Verdana")
	context.fillText(enemyMonster.name,7, canvas.height - 120)
	context.fillText("HP:"+enemyMonster.hp+"/"+enemyMonster.maxhp,15, canvas.height-113)
	context.fillText("Lvl."+enemyMonster.level,55,canvas.height-120)
	
	//player monster sprite
	spritePath = "sprites/monsters/back/"+playerMonster.name+".png"
	playerMonsterSprite = new Image();
	playerMonsterSprite.src = spritePath;
	playerMonsterSprite.height = 64;
	playerMonsterSprite.width = 64;
	context.drawImage(playerMonsterSprite,10, 40);
	
	//enemy monster sprite
	spritePath = "sprites/monsters/front/"+enemyMonster.name+".png"
	enemyMonsterSprite = new Image();
	enemyMonsterSprite.src = spritePath;
	enemyMonsterSprite.height = 64;
	enemyMonsterSprite.width = 64;
	context.drawImage(enemyMonsterSprite,100, 5);
}