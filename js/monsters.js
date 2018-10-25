type = {
		normal:"normal",
		fighting:"fighting",
		flying:"flying",
		poison:"poison",
		ground:"ground",
		rock:"rock",
		bug:"bug",
		ghost:"ghost",
		steel:"steel",
		fire:"fire",
		water:"water",
		grass:"grass",
		electric:"electric",
		psychic:"psychic",
		ice:"ice",
		dragon:"dragon",
		dark:"dark"
	}
class monster{
	constructor(){
		this.xp = 0
		this.level = 1
	}
	levelUp(level){
		this.level = level
		this.hp = Math.round(this.baseHp * level)
		this.maxhp = Math.round(this.baseHp * level)
		this.attack = this.baseAttack * level
		this.defense = this.baseDefense * level
		this.speed = this.baseSpeed * level
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
class machop extends monster{
	constructor(){
		super()
		
		this.name = "Machop"
		this.baseHp = 7
		this.baseAttack = 8
		this.baseDefense = 5
		this.baseSpeed = 3.5
		this.attacks={1:null,2:null,3:null,4:null}
		this.learnattacks = [[0,brickBreak],[0,auraSphere],[0,slam],[0,firePunch]]
		this.type = type.fighting
	}
}
class goldeen extends monster{
	constructor(){
		super()
		
		this.name = "Goldeen"
		this.baseHp = 4.5
		this.baseAttack = 6.7
		this.baseDefense = 6
		this.baseSpeed = 6.3
		this.attacks={1:null,2:null,3:null,4:null}
		this.learnattacks = [[0,aquaJet],[0,brine],[0,feint],[0,waterfall]]
		this.type = type.water
	}
}
class geodude extends monster{
	constructor(){
		super()
		
		this.name = "Geodude"
		this.baseHp = 4
		this.baseAttack = 8
		this.baseDefense = 10
		this.baseSpeed = 2
		this.attacks={1:null,2:null,3:null,4:null}
		this.learnattacks = [[0,boneRush],[0,rollout],[0,feint],[0,rockBlast]]
		this.type = type.rock
	}
}
class onix extends monster{
	constructor(){
		super()
		
		this.name = "Onix"
		this.baseHp = 4
		this.baseAttack = 8
		this.baseDefense = 10
		this.baseSpeed = 2
		this.attacks={1:null,2:null,3:null,4:null}
		this.learnattacks = [[0,slam],[0,rollout],[0,stealthRock],[0,rockBlast]]
		this.type = type.rock
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
		this.learnattacks = [[0,firePunch],[0,slam],[0,flamethrower],[0,highJumpKick]]
		this.type = type.fire
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
		this.learnattacks = [[0,confusion],[0,leafBlade],[0,vineWhip],[0,highJumpKick]]
		this.type = type.grass
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
		this.learnattacks = [[0,vineWhip],[0,slam],[0,flamethrower],[0,highJumpKick]]
		this.type = type.electric
	}	
}