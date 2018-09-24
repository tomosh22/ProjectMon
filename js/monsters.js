class monster{
	constructor(){
		this.xp = 0
		this.level = 1
	}
	levelUp(level){
		this.level = level
		this.hp = this.baseHp * level
		this.maxhp = this.baseHp * level
		this.attack = this.baseAttack * level
		this.defense = this.baseDefense * level
		this.attackslearnt = 0
		for(var x=100;x>=0;x--){
			for(var y=0;y<=this.learnattacks.length;y++){
				if(level >= this.learnattacks[y][0] && this.attackslearnt < 4){
					this.attacks[this.attackslearnt + 1] = this.learnattacks[y][1]
					this.attackslearnt++
				}
				if(this.attackslearnt == 4){
					break
				}
		}
		}
	}
}

class charmander extends monster{
	constructor(){
		super()
		
		this.name = "Charmander"
		this.baseHp = 3.9
		this.baseAttack = 5.2
		this.baseDefense = 4.3
		this.baseSpeed = 6.5
		this.attacks={1:null,2:null,3:null,4:null}
		this.learnattacks = [[0,firePunch],[0,slam],[0,flamethrower],[0,highKick]]
	}	
}
class bulbasaur extends monster{
	constructor(){
		super()
		this.name = "Bulbasaur"
		this.baseHp = 4.5
		this.baseAttack = 4.9
		this.baseDefense = 4.9
		this.baseSpeed = 4.5
		this.attacks={1:null,2:null,3:null,4:null}
		this.learnattacks = [[0,confusion],[0,leafBlade],[0,vineWhip],[0,highKick]]
	}	
}
class pikachu extends monster{
	constructor(){
		super()
		this.name = "Pikachu"
		this.baseHp = 3.5
		this.baseAttack = 5.5
		this.baseDefense = 4.0
		this.baseSpeed = 9.0
		this.attacks={1:null,2:null,3:null,4:null}
		this.learnattacks = [[0,vineWhip],[0,slam],[0,flamethrower],[0,highKick]]
	}	
}