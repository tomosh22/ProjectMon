class gym{
	constructor(){
		this.complete = false
		this.npcs = []
		this.bossReady = false
		this.map = null
		this.npcsRemaining = 0
		this.difficulty = 1
		this.bossLocation = []
	}
}
gyms = []


gym0Object = new gym
gym0Object.bossLocation = [5,2]
gym0Object.map = gym0
gym0Object.difficulty = 11
gym0Object.npcs = [{x:3,y:5,ready:true,level:gym0Object.difficulty, team:[new bulbasaur, new pikachu]},
					{x:6,y:5,ready:true,level:gym0Object.difficulty, team:[new bulbasaur, new pikachu]},
					{x:8,y:5,ready:true,level:gym0Object.difficulty, team:[new bulbasaur, new pikachu]},
					{x:10,y:5,ready:true,level:gym0Object.difficulty, team:[new bulbasaur, new pikachu]}
					]
gym0Object.boss = [new bulbasaur, new pikachu]
for(y=0;y<gym0Object.boss.length;y++){
	gym0Object.boss[y].levelUp(Math.ceil(gym0Object.difficulty * 1.1))
}
gym0Object.npcsRemaining = gym0Object.npcs.length
for(x=0;x<gym0Object.npcs.length;x++){
		for(y=0;y<gym0Object.npcs[x]["team"].length;y++){
			gym0Object.npcs[x]["team"][y].levelUp(gym0Object.difficulty)
		}
	}
gyms.push(gym0Object)




gym1Object = new gym
gym1Object.bossLocation = [5,2]
gym1Object.map = gym1
gym1Object.difficulty = 18
gym1Object.npcs = [{x:7,y:7,ready:true,level:gym1Object.difficulty, team:[new bulbasaur, new pikachu]},
					{x:3,y:8,ready:true,level:gym1Object.difficulty, team:[new bulbasaur, new pikachu]},
					{x:2,y:6,ready:true,level:gym1Object.difficulty, team:[new bulbasaur, new pikachu]},
					{x:10,y:6,ready:true,level:gym1Object.difficulty, team:[new bulbasaur, new pikachu]}
					]
gym1Object.boss = [new bulbasaur, new pikachu]
for(y=0;y<gym1Object.boss.length;y++){
	gym1Object.boss[y].levelUp(Math.ceil(gym1Object.difficulty * 1.1))
}
gym1Object.npcsRemaining = gym1Object.npcs.length
for(x=0;x<gym1Object.npcs.length;x++){
		for(y=0;y<gym1Object.npcs[x]["team"].length;y++){
			gym1Object.npcs[x]["team"][y].levelUp(gym1Object.difficulty)
		}
	}
gyms.push(gym1Object)





function gymsLoop(){
	for (x=0;x<gyms.length;x++){
		gym = gyms[x]
		if (gym.map == currentLevel){
			for (i=0;i<=gym.npcs.length - 1;i++){
				// && FALSE SO BATTLES NEVER RUN FOR DEVLOPMENT
				if((distanceTo(playerYTile * 16 + 7,(gym.npcs[i]["y"]-1)*16 + 7,playerXTile * 16 + 7,(gym.npcs[i]["x"]-1)*16 + 7))<23 && gym.npcs[i]["ready"] && !npcBattle){
					
					playerCanMove = false
					
					displayMessage("gym battle", null)
					
					if(menuReady && (zDown||xDown||cDown||vDown)){
						menuReady = false	
						npcBattle = true
						
					}
				}
				if (!(zDown||xDown||cDown||vDown)){
						menuReady = true
					}
				if(gym.npcs[i].ready && npcBattle && menuReady && distanceTo(playerYTile * 16 + 7,(gym.npcs[i]["y"]-1)*16 + 7,playerXTile * 16 + 7,(gym.npcs[i]["x"]-1)*16 + 7)<23 ){
					enemyMonsters = gym.npcs[i]["team"]
					canCapture = false
					if(!LoadBattle(currentMonsters[currentMonsterIndex],enemyMonsters[enemyMonsterIndex])){
						playerCanMove = true
						npcBattle = false
						gym.npcs[i]["ready"] = false
						canvas.height = currentLevelRows*16
						canvas.width = currentLevelCols*16
						gym.npcsRemaining --
						if (gym.npcsRemaining == 0){
							gym.bossReady = true
						}
					}
				}
			
		
			}
			if (!npcBattle && !gym.complete && gym.bossReady && distanceTo(playerYTile * 16 + 7, gym.bossLocation[1] * 16, playerXTile * 16, gym.bossLocation[0] * 16) < 23){
				playerCanMove = false
					
					displayMessage("gym boss battle", null)
					
					if(menuReady && (zDown||xDown||cDown||vDown)){
						menuReady = false	
						npcBattle = true
					}
			}
			if (!(zDown||xDown||cDown||vDown)){
						menuReady = true
					}
			if (npcBattle && menuReady && !gym.complete && distanceTo(playerYTile * 16 + 7, gym.bossLocation[1] * 16, playerXTile * 16, gym.bossLocation[0] * 16) < 23){
				enemyMonsters = gym.boss
				canCapture = false
				if(!LoadBattle(currentMonsters[currentMonsterIndex],enemyMonsters[enemyMonsterIndex])){
					//playerCanMove = true
					
					npcBattle = false
					gym.complete = true
					canvas.height = currentLevelRows*16
					canvas.width = currentLevelCols*16
					console.log(x)
					switch (x){
						case 0:
							console.log("zero")
							gym0Event.ready = true
							break;
						case 1:
							console.log("one")
							gym1Event.ready = true
							break;
					}
					console.log(gym1Event.ready)
					
				}
			}
		}
	}
}