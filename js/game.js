
$(document).ready(function() {
	
	

    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    
    tickCounter = 0
	
    
	currentLevelCols = 0;
	currentLevelRows = 0;
	playerCol = 0;
    playerRow = 0;
	playerXTile = 0
	playerYTile = 0
	
    movementSpeed = 1;
    playerXSpeed = 0;
    playerYSpeed = 0;
	maps = {0:house0, 1:town0}
    currentLevel = maps[0];
	playerCanMove = true
	LoadLevel();
	
	currentMonsters = {1:{name:"bulbasaur", hp:30, maxhp:30}}
	
	
	sprites = {0 : grassSprite, 1:longGrassSprite, 2:bushSprite, 3:treeTopSprite, 4:treeMiddleSprite, 5:treeBottomSprite, 6:lampTopLeftSprite,
				   7:lampMiddleLeftSprite, 8:lampBottomLeftSprite, 9:lampTopRightSprite, 10:lampMiddleRightSprite, 11:lampBottomRightSprite,
					12:flowerSprite, 13:woodFenceBottomLeftSprite, 14:woodFenceMiddleLeftSprite, 15:woodFenceTopLeftSprite, 
					16:woodFenceTopRightSprite, 17:woodFenceTopSprite, 18:woodFenceMiddleRightSprite, 19:woodFenceBottomRightSprite, 20:waterTopLeftSprite
					,21:waterMiddleLeftSprite, 22:waterBottomLeftSprite, 23:house00Sprite, 24:house01Sprite, 25:house02Sprite,
					26:house03Sprite, 27:house04Sprite, 28:house05Sprite, 29:house06Sprite, 30:house07Sprite, 31:house08Sprite,
					32:house09Sprite, 33:house010Sprite, 34:house011Sprite, 35:house012Sprite,36:house013Sprite,37:house014Sprite,
					38:house015Sprite,39:house016Sprite,40:house017Sprite,41:house018Sprite,42:house019Sprite,43:house020Sprite,
					44:house021Sprite,45:house022Sprite,46:house023Sprite,47:house024Sprite, 48:waterBottomRightSprite,
					49:waterMiddleRightSprite, 50:waterBottomMiddleSprite, 51:waterSprite, 52:waterTopSprite, 53:waterTopRightSprite, 54:gym1Sprite,
					55:woodFloorSprite, 56:woodWallBottomLeftSprite, 57:woodWallBottomMiddleSprite, 58:woodWallBottomRightSprite,
					59:woodWallTopLeftSprite, 60:woodWallTopMiddleSprite, 61:woodWallTopRightSprite, 62:redRug1Sprite, 63:redRug2Sprite, 64:woodTable1Sprite,
					65:woodTable2Sprite,66:woodTable3Sprite,67:woodTable4Sprite,68:woodTable5Sprite,69:woodTable6Sprite, 
					70:curtain1Sprite,71:curtain2Sprite,72:curtain3Sprite,73:curtain4Sprite,74:tv1Sprite,75:tv2Sprite,76:tv3Sprite,77:tv4Sprite,
					78:blueStoolSprite, 79:blueCushionSprite, 80:blueRug1Sprite,81:blueRug2Sprite,82:blueRug3Sprite,83:blueRug4Sprite,84:blueRug5Sprite,
					85:blueRug6Sprite,86:blueRug7Sprite,87:blueRug8Sprite,88:blueRug9Sprite, 89:friendSprite}
					
	nocollision = [0,1,44, 39, 55, 62, 63, 79]
	
    //playerYPos = playerRow * 16;
    //playerXPos = playerCol * 16;

	wDown = false;
    aDown = false;
    sDown = false;
    dDown = false;
	
	zDown = false;
	xDown = false;
	cDown = false;
	vDown = false
    document.addEventListener("keydown", function(key) {
        switch (key.keyCode) {
			case 87:
                wDown = true;
                break;
            case 65:
                aDown = true;
                break;
            case 83:
                sDown = true;
                break;
            case 68:
                dDown = true;
                break;
			case 90:
                zDown = true;
                break;
			case 88:
                xDown = true;
                break;
            case 67:
                cDown = true;
                break;
			case 86:
                vDown = true;
                break;
        }
    });
    document.addEventListener("keyup", function(key) {
        switch (key.keyCode) {
			case 87:
                wDown = false;
                break;
            case 65:
                aDown = false;
                break;
            case 83:
                sDown = false;
                break;
            case 68:
                dDown = false;
                break;
            case 90:
                zDown = false;
                break;
			case 88:
                xDown = false;
                break;
			case 67:
                cDown = false;
                break;
			case 86:
                vDown = false;
                break;
        }
    });

	function LoadLevel(){
		currentLevelCols = currentLevel[0].length;
		currentLevelRows = currentLevel.length - 3;
		
		playerCol = currentLevel[currentLevel.length-2][0];
		playerRow = currentLevel[currentLevel.length-2][1];
		//console.log(playerRow, playerCol)
		playerXTile = playerRow
		playerYTile = playerCol
		playerXPos = playerCol * 16
		playerYPos = playerRow * 16
		canvas.height = currentLevelRows*16
		canvas.width = currentLevelCols*16
	}
	currentGrassSprite = null
    function render() {
		//console.log(renderIgnore[0])
		
		if(playerCanMove){
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
			//console.log(playerXTile, playerYTile)
			
			if (currentLevel[playerYTile][playerXTile] == 1){
				//if (playerXPos % 16 != 8 && playerYPos % 16 != 8 ){//&& playerXPos % 16 != 7 && playerYPos % 16 != 7 && playerXPos % 16 != 9 && playerYPos % 16 != 9){
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
					
			//}
			}	
			
			context.drawImage(playerSprite, playerXPos, playerYPos);
			context.fillStyle="#FF0000"
			//context.fillRect(2*16,6*16,16,16)
		}
    }



   animate = (function(callback) {
        return requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
            function(callback) {
                setTimeout(callback, 1000 / 60);
            };
    })();


	
    function update() {
		tickCounter++;
		if (tickCounter == 61){
			tickCounter = 1
		}
		
		events();
		
		playerXTile = Math.round(playerXPos / 16);
		playerYTile = Math.round(playerYPos / 16);
		//console.log(playerXTile, playerYTile)
        playerXSpeed = 0;
        playerYSpeed = 0;
		if(playerCanMove){
			if (wDown && (nocollision.includes(currentLevel[Math.floor((playerYPos / 16))][playerXTile]))){ //&& !(renderIgnore.toString() == String(playerXTile)+","+String(playerYTile - 1))) {
						playerYPos -= movementSpeed;
			}
			else{
				if (aDown && (nocollision.includes(currentLevel[playerYTile][Math.floor((playerXPos / 16))]))){ //&& !(renderIgnore.toString() == String(playerXTile - 1)+","+String(playerYTile)) ) {
						playerXPos -=movementSpeed;
				}
				else{
					if (sDown && (nocollision.includes(currentLevel[Math.floor((playerYPos / 16) + 1 )][playerXTile]))){ //&& !(renderIgnore.toString() == String(playerXTile)+","+String(playerYTile + 1))) {
									playerYPos += movementSpeed;
					}
					else{
						if (dDown && (nocollision.includes(currentLevel[playerYTile][Math.floor((playerXPos / 16) + 1)]))){//&& !(renderIgnore.toString() == String(playerXTile + 1)+","+String(playerYTile))) {
							playerXPos += movementSpeed
						}
					}
				}
			}
		}
        
		if(currentLevel[playerYTile][playerXTile] == 1){
			trigger = Math.floor(Math.random() * 200)
			if(trigger == 0){
				//console.log("Battle Triggered")
			}
		}
		currentLevel[currentLevel.length - 3].forEach(function(point){
			//console.log(point);
			if(playerXTile == point[1] && playerYTile == point[0]){
					context.clearRect(0,0, canvas.width, canvas.height)
					//console.log(point[2])
					currentLevel = maps[point[2]];
					LoadLevel();
			}
		})

        render();



        animate(function() {
            update();
        });
    }

    update();

});