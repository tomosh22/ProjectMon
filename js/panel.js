panelIndex = 0
space = "----------------"
space = "&nbsp;".repeat(17)
panelReady = false

//draws information about the currently selected monster
function monsterPanel(){
	
	//clears the panel
	$("#monsters").empty()
	
	panelMonster = currentMonsters[panelIndex]
	var panelItem = $("<p/>")
		.html(panelMonster.name + " Level:" + panelMonster.level)
		.prop("align","center")
		.css("font-size","1.1em");
	$("#monsters").append(panelItem)
	
	var panelItem = $("<p/>")
		.html("Hp:"+ panelMonster.hp +"/" + panelMonster.maxhp)
		.prop("align","center")
		.css("font-size","0.8em");
	$("#monsters").append(panelItem)
	
	var panelItem = $("<p/>")
		.html("Attack:"+Math.round(panelMonster.attack) + "&nbsp;".repeat(3) + "Defense:" + Math.round(panelMonster.defense) + "&nbsp;".repeat(3) + "Speed:"+panelMonster.speed)
		.prop("align","center")
		.css("font-size","0.8em");
	$("#monsters").append(panelItem)
	
	var panelItem = $("<p/>")
		.html(panelMonster.attacks[1].name + "(" + panelMonster.attacks[1].type +")"+":")
		.prop("align","center")
		.css("font-size","0.9em");
	$("#monsters").append(panelItem)
	
	var panelItem = $("<p/>")
		.html("Damage: "+panelMonster.attacks[1].damage + space + "Accuracy: " + panelMonster.attacks[1].accuracy)
		.prop("align","left")
		.css("font-size","0.8em");
	$("#monsters").append(panelItem)
	
	var panelItem = $("<p/>")
		.html(panelMonster.attacks[2].name + "(" + panelMonster.attacks[2].type +")" + ":")
		.prop("align","center")
		.css("font-size","0.9em");
	$("#monsters").append(panelItem)
	
	var panelItem = $("<p/>")
		.html("Damage: "+panelMonster.attacks[2].damage + space + "Accuracy: " + panelMonster.attacks[2].accuracy)
		.prop("align","left")
		.css("font-size","0.8em");
	$("#monsters").append(panelItem)
	
	var panelItem = $("<p/>")
		.html(panelMonster.attacks[3].name + "(" + panelMonster.attacks[3].type +")"+":")
		.prop("align","center")
		.css("font-size","0.9em");
	$("#monsters").append(panelItem)
	
	var panelItem = $("<p/>")
		.html("Damage: "+panelMonster.attacks[3].damage + space + "Accuracy: " + panelMonster.attacks[3].accuracy)
		.prop("align","left")
		.css("font-size","0.8em");
	$("#monsters").append(panelItem)
	
	var panelItem = $("<p/>")
		.html(panelMonster.attacks[4].name +  "(" + panelMonster.attacks[4].type +")"+":")
		.prop("align","center")
		.css("font-size","0.9em");
	$("#monsters").append(panelItem)
	
	var panelItem = $("<p/>")
		.html("Damage: "+panelMonster.attacks[4].damage + space + "Accuracy: " + panelMonster.attacks[4].accuracy)
		.prop("align","left")
		.css("font-size","0.8em");
	$("#monsters").append(panelItem)
	
	var panelItem = $("<p/>")
		.html("<:Previous Monster" + space + "&nbsp;".repeat(7)  +"Next Monster:>")
		.prop("align","left")
		.css("font-size","0.6em");
	$("#monsters").append(panelItem)
	
	//if neither arrow is pressed
	if(!(leftArrowDown || rightArrowDown)){
		panelReady = true
	}
	
	//selects the previous monster
	if (panelReady && leftArrowDown && currentMonsters[panelIndex - 1]){
		panelIndex--
		panelReady = false
	}
	
	//selected the next monster
	if(panelReady && rightArrowDown && currentMonsters[panelIndex + 1]){
		panelIndex++
		panelReady = false
	}
}