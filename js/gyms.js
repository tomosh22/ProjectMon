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
gym0Object.bossLocation = [6,2]
gym0Object.map = gym0
gym0Object.difficulty = 11
gym0Object.npcs = [{x:3,y:5,ready:true,level:gym0Object.difficulty, team:[new onix]},
					{x:6,y:5,ready:true,level:gym0Object.difficulty, team:[new geodude]},
					{x:10,y:5,ready:true,level:gym0Object.difficulty, team:[new geodude]},
					{x:13,y:5,ready:true,level:gym0Object.difficulty, team:[new onix]}
					]
gym0Object.boss = [new onix, new geodude]
for(y=0;y<gym0Object.boss.length;y++){
	gym0Object.boss[y].levelUp(Math.ceil(gym0Object.difficulty * 1.1))
}
gym0Object.npcsRemaining = gym0Object.npcs.length
for(x=0;x<gym0Object.npcs.length;x++){
		for(y=0;y<gym0Object.npcs[x]["team"].length;y++){
			gym0Object.npcs[x]["team"][y].levelUp(gym0Object.difficulty)
		}
	}
gyms.push(gym0Object)//adds gym to array




gym1Object = new gym
gym1Object.bossLocation = [5,2]
gym1Object.map = gym1
gym1Object.difficulty = 18
gym1Object.npcs = [{x:7,y:7,ready:true,level:gym1Object.difficulty, team:[new bulbasaur]},
					{x:3,y:8,ready:true,level:gym1Object.difficulty, team:[new bayleef]},
					{x:2,y:6,ready:true,level:gym1Object.difficulty, team:[new bayleef]},
					{x:10,y:6,ready:true,level:gym1Object.difficulty, team:[new bulbasaur]}
					]
gym1Object.boss = [new bulbasaur, new bayleef]
for(y=0;y<gym1Object.boss.length;y++){
	gym1Object.boss[y].levelUp(Math.ceil(gym1Object.difficulty * 1.1))
}
gym1Object.npcsRemaining = gym1Object.npcs.length
for(x=0;x<gym1Object.npcs.length;x++){
		for(y=0;y<gym1Object.npcs[x]["team"].length;y++){
			gym1Object.npcs[x]["team"][y].levelUp(gym1Object.difficulty)
		}
	}
gyms.push(gym1Object)//adds gym to array





function gymsLoop(){
	for (x=0;x<gyms.length;x++){//run through every gym
		gym = gyms[x]
		if (gym.map == currentLevel){//if the player is currently in this gym
			for (i=0;i<=gym.npcs.length - 1;i++){
				// && FALSE SO BATTLES NEVER RUN FOR DEVLOPMENT
				if((distanceTo(playerYTile * 16 + 7,(gym.npcs[i]["y"]-1)*16 + 7,playerXTile * 16 + 7,(gym.npcs[i]["x"]-1)*16 + 7))<23 && gym.npcs[i]["ready"] && !npcBattle){
					
					playerCanMove = false
					
					displayMessage("Gym battle", null)
					
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
						gym.npcs[i]["ready"] = false//this npc is done with
						canvas.height = currentLevelRows*16
						canvas.width = currentLevelCols*16
						gym.npcsRemaining --
						if (gym.npcsRemaining == 0){//boss can only be fought after all the other npcs have been beaten
							gym.bossReady = true
						}
					}
				}
			
		
			}
			if (!npcBattle && !gym.complete && gym.bossReady && distanceTo(playerYTile * 16 + 7, gym.bossLocation[1] * 16, playerXTile * 16, gym.bossLocation[0] * 16) < 23){
				playerCanMove = false
					
					displayMessage("Gym boss battle", null)
					
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
					gym.complete = true//gym = gyms[x] from before
					canvas.height = currentLevelRows*16
					canvas.width = currentLevelCols*16
					switch (x){//which gym was just beaten? (x is from initial for loop)
						case 0:
							gym0Event.ready = true
							break;
						case 1:
							gym1Event.ready = true
							break;
					}
					
				}
			}
		}
	}
}