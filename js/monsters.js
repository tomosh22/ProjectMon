class charmander{
	constructor(){
		this.level = 1
		this.name = "Charmander"
		this.baseHp = 1.1
		this.baseAttack = 2
		this.baseDefense = 1.5
		this.baseSpeed = 1.2
		this.attacks={1:null,2:null,3:null,4:null}
		this.learnattacks = [[0,firePunch],[0,slam],[0,flamethrower],[0,highKick]]
	}	
	
	update(level){
		this.level = level
		this.hp = this.baseHp * level
		this.maxhp = this.baseHp * level
		this.attack = this.baseAttack * level
		this.defense = this.baseDefense * level
		console.log(this)
		this.learnattacks.forEach(function(attack){
			console.log(this)
			slot = emptyAttackSlot(this)
			console.log(slot)
			if(level >= attack[0]){
				
			}
		})
	}
}

function emptyAttackSlot(monster){
	for(x=0;x<=4;x++){				//check all 4 of the monsters attack slots
		if (!monster.attacks[x]){	//if attack slot is null
			return x				//return that slot
		}
	}
	return false					//if no slots are free return false
}
