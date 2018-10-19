class level{
	constructor(){
		this.tiles = null
		this.points = null
		this.spawnPoint = null
		this.background = null
	}
}
house0 = new level()
house0.tiles = [[59, 60, 60, 60, 70, 71, 60, 60, 60, 60, 61],
        [56, 57, 57, 57, [72,57], [73,57], 57, 57, [74,57], [75,57], 58],
        [55, 55, 55, 55, 55, 55, 55, 55, 76, 77, 55],
        [55, 55, 55 ,55, 78, 78, 55, 55, 55, 55, 55],
        [55, 55, 55, 79, 64, 65, 55, 80, 81, 82, 55],
        [55, 55, 55, 55, 66, 67, 55, 83, 84, 85, 55],
        [55, 55, 55, 55, 68, 69, 55, 86, 87, 88, 55],
        [55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55],
        [55, 55, 55, 55, 62, 63, 55, 55, 55, 55, 55]]
house0.points = [[8,4,1,3,15],[8,5,1,3,15]]
house0.spawnPoint = [2,5]
house0.background = 55

town0 = new level()
town0.tiles = [[0, 0, 0, 0, 0, 3, 6, 0, 9, 0, 0],
        [15, 17, 17, 17, 16, 4, 7, 0, 10, 2, 0],
        [14, 20, 52 ,53, 18, 5, 8, 0, 11, 2, 0],
        [14, 21, 51, 49, 0, 0, 0, 0, 0, 2, 0],
        [14, 22, 50, 48, 0, 0, 0, 0, 0, 2, 0],
        [13, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
        [2, 1, 1, 1, 1, 0, 0, 1, 1, 2, 0],
        [0, 2, 0, 0, 0, 0, 1, 1, 1, 2, 0],
        [0, 2, 0, 0, 0, 1, 1, 1, 1, 2, 0],
		[0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0],
        [0, 2, 23, 24, 25, 26, 27, 0, 0, 2, 0],
        [2, 12, 28, 29, 30, 31, 32, 0, 0, 3, 2],
        [2, 12, 33, 34, 35, 36, 37, 0, 0, 4, 2],
        [2, 12, 38, 39, 40, 41, 42, 0, 0, 5, 2],
        [2, 12, 43, 44, 45, 46, 47, 0, 0, 0, 2],
		[2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0]]
town0.points = [[13,3, 0,5,7], [1,7,2,5,18]]
town0.spawnPoint = [5,5]
town0.background = 0

town1 = new level()
town1.tiles = [[0, 0, 0, 0, 6, 0, 9, 0, 2, 0, 0,0,0],
        [15, 17, 17, 17, 7, 0, 162, 163, 174, 185, 192,193,0],
        [14, 0, 0 ,0, 8, 0, 194, 195, 196, 197, 164,165,0],
		[14, 0, 0, 0, 100, 90, [166,96], 167, 168, 169, 170,171,0],
		[14, 0, 0, 0, 100, 90, [172,96], 173, 175, 176, 177,178,0],
		[14, 0, 0, 0, 100, 90, [179,96], 180, 181, 182, 183,184,0],
		[14, 0, 0, 0, 100, 90, [186,131], [187,91], [188,91], [189,91], [190,91],[191,92],0],
        [3, 3, 3, 3, 218, 90, 90, 90, 90, 90, 90,96,2],
        [4, 4, 4, 4, 100, 90, 130, 99, 99, 99, 99,95,2],
        [5, 5, 5, 5, 100, 90, 96, 12, 12, 12, 0,0,2],
        [2, 2, 2, 2, 100, 90, 96, 12,132, 133, 144, 155,[156,2],],
        [103, 104, 114, 114, [115,100], 90, 96,12, 157, 158, 159, 160,161,],
        [116, 117, 118, 119, [120,100], 90, 96,12, 134, 135, 136, 137,138,],
		[105, 106, 107, 108, [109,100], 90, 96,12, 139, 140, 141, 142,143,],
        [110, 111, 112, 121, [122,100], 90, 96,12, 145, 146, 147, 148,149,],
        [123, [124,101], [125,91], [126,91], [127,129], 90,131, 91, [150,91], [151,91], [152,91], [153,92],154,],
        [2, 100, 90, 90, 90, 90,90, 90,90, 90,90,96,2],
        [2, 98, 99, 99, 99, 99, 99, 99,99, 99,99, [3,95], 2,],
        [2, 0, 0, 0, 6, 0, 9, 0, 0, 0, 0,4,2],
		[2, 0, 0, 0, 7, 0, 10, 0, 0, 0, 0,5,2],
        [0, 2, 2, 2, 8, 0, 11, 2, 2, 2,2, 2,0],]
town1.points = [[19,5, 1,7,2], [15,10,3],[0,5,5,13,7],[15,1,4],[15,2,4],[6,9,7]]
town1.spawnPoint = [12,5]
town1.background = 0
	
	
route0 = new level()
route0.tiles = [[6,0,9,20,52,52,52,53,1,1,1,1,1,1,1],
		[7,0,10,22,50,50,50,48,0,1,1,1,1,1,1],
		[[8,101],91,[11,91],91,91,91,91,91,91,91,92,0,3,1,3],
        [100,90,90,90,90,90,90,90,90,218,96,12,4,1,4],
        [98,99,99,99,99,99,99,99,128,90,96,0,[3,5],0,[3,5]],
        [2,1,1,1,1,1,1,0,100,90,96,12,4,0,4],
        [2,1,1,1,1,1,1,1,100,90,131,91,[5,91],91,[5,92]],
        [17,17,17,17,17,17,1,1,100,90,90,90,90,90,96],
        [20,52,52,52,52,53,1,1,218,99,99,99,128,90,96],
        [21,51,51,51,51,49,1,1,1,1,1,12,[6,98],99,[9,95]],
        [22,50,50,50,50,48,1,1,1,1,1,12,7,0,10],
		[0,0,0,0,0,0,2,2,2,2,2,2,8,0,11],]
route0.points = [[11,13,2,5,2],[0,1,6]]
route0.spawnPoint = [10,5]
route0.background = 0


route1 = new level()
route1.tiles = [[15,17,17,17,17,16,6,0,9,0],
		[13,17,17,17,17,19,7,0,10,0],
		[20,52,52,52,53,12,8,0,11,0],
        [21,51,51,51,49,0,0,0,0,2],
        [22,50,50,50,48,0,0,0,0,2],
        [2,1,1,12,218,0,0,1,1,2],
        [2,1,1,0,0,0,0,12,1,2],
        [2,1,1,0,0,0,12,1,1,2],
        [2,1,1,0,0,0,1,1,1,2],
        [2,1,1,6,0,9,1,1,1,2],
        [2,1,1,7,0,10,1,1,1,2],
		[0,2,2,8,0,11,2,2,2,0],]
route1.points = [[11,4,6,7,3],[0,1,6],[0,7,10,6,7]]
route1.spawnPoint = [7,5]
route1.background = 0
	
town2 = new level()
town2.tiles = [[[162,17], [163,17], [174,17], [185,17], [192,17],[193,17], 6,0,9,17,17,17,16],
        [194, 195, 196, 197, 164,165, 7,0,[10,103], 104, 114, 114, [115,18]],
		[166, 167, 168, 169, 170,171, 8,0,[11,116], 117, 118, 119, [120,18]],
		[172, 173, 175, 176, 177,178, 0,0,105, 106, 107, 108, [109,18]],
		[179, 180, 181, 182, 183,184, 0,0,110, 111, 112, 121, [122,18]],
		[[186,101], [187,91], [188,91], [189,91], [190,91],[191,91], 91,91,[123,91], [124,91], [125,91], [126,92], [127,18]],
        [[100,15], 90, 90, 90, 90, 90, 90, 90, 90, 90, 90,[96,17],18],
        [[98,14], 99, 99, 99, 128, 90, 90,90, 130, 99, 99,95,18],
        [14, 17, 12, 0, 100, 90, 90, 90, 96, 12, 17,17,19],
        [[132,14], 133, 144, 155,[156,100], 90, 90, 90,96, 0,20, 52 ,53,],
        [157, 158, 159, 160,[161,100], 90, 90,90, 96, 12,21, 51, 49],
        [134, 135, 136, 137,[138,100], 90, 90,90, 96, 0,21, 51, 49,],
		[139, 140, 141, 142,[143,100], 90, 90,90, 96, 12,21, 51, 49],
        [145, 146, 147, 148,[149,100], 90, 90,90, 96, 0,21, 51, 49],
        [[14,150], [151,101], [152,91], [153,91],[154,129], 90,90, 90, 96, 12, 21, 51, 49,],
        [14, 100, 90, 90, 90, 90,90, 90,96, 0,21, 51, 49],
        [14, [12,98], 99, 99, [6,99], 99, [9,99], 99,95, 0,22, 50, 48,],
        [13, 17, 17, 17, 7, 0, 10, 17, 17, 17,17, 17,17],]
town2.points = [[17,5,5,4,4],[14,2,3],[5,10,4],[5,3,8],[0,7,9,4,9]]
town2.spawnPoint = [5,13]
town2.background = 0
	
hospital = new level()
hospital.tiles = [[55,210,198,[212,199],213,[216,202],203,210,],
		[55,211,204,214,215,206,207,211,],
		[55,55,208,209,200,[200,217],201,55,],
		[55,55,55,55,55,55,55,55,],
		[55,55,55,55,55,55,78,78,],
		[64,65,79,55,55,79,64,65,],
		[66,67,79,55,55,55,66,67,],
		[68,69,55,62,63,55,68,69,],]
hospital.points = [[7,3,"outside"],[7,4,"outside"]]
hospital.spawnPoint = [3,6]
hospital.background = 55



shop = new level()
shop.tiles = [[198,[216,199],55,202,203,55,55,55,],
		[204,205,[5,206],206,207,55,55,55,],
		[208,209,[200,217],200,201,55,55,55,],
		[55,55,55,55,55,55,55,55,],
		[55,55,55,55,79,64,65,55,],
		[55,55,55,55,79,66,67,55,],
		[210,55,55,55,55,68,69,210,],
		[211,55,62,63,55,55,55,211,],]
shop.points = [[7,2,"outside"],[7,3,"outside"]]
shop.spawnPoint = [3,6]
shop.background = 55




gym0 = new level()
gym0.tiles = [[230,221,221,221,221,221,221,221,221,221,231],
	[224,226,227,227,227,218,227,227,227,228,223],
	[224,223,222,222,222,222,222,222,222,224,223],
	[224,220,221,221,221,225,221,221,221,229,223],
	[224,222,218,222,218,222,218,222,218,222,223],
	[224,222,222,222,222,222,222,222,222,222,223],
	[224,222,222,222,222,222,222,222,222,222,223],
	[224,222,222,222,222,222,222,62,63,222,223],]
gym0.points = [[7,8,"outside"],[7,7,"outside"]]
gym0.spawnPoint = [6,6]
gym0.background = 222

gym1 = new level()
gym1.tiles = [[15,17,17,17,17,17,17,17,17,17,16],
	[14,0,0,3,3,218,3,3,0,0,18],
	[14,3,3,[3,4],[3,4],0,[3,4],[3,4],3,3,18],
	[14,4,4,[4,5],[4,5],0,[4,5],[4,5],4,4,18],
	[14,5,5,5,5,0,5,5,5,5,18],
	[14,218,0,0,0,0,0,0,12,218,18],
	[14,0,12,0,0,0,218,0,0,0,18],
	[14,0,218,0,0,0,0,0,0,0,18],
	[14,0,0,0,0,0,0,0,0,0,18],
	[14,12,17,12,17,12,17,62,63,12,18],]
gym1.points = [[9,8,"outside"],[9,7,"outside"]]
gym1.spawnPoint = [8,8]
gym1.background = 0

finalLevel = new level()
finalLevel.tiles = [[232,262,262,262,262,263,218,263,262,262,262,262,232],
					[245,232,262,262,262,264,262,264,262,262,262,232,245],
					[250,245,232,262,262,262,262,262,262,262,232,245,250],
					[0,250,245,232,232,233,244,255,256,232,245,250,0],
					[0,0,250,245,257,258,259,260,261,245,250,0,0],
					[0,0,0,250,234,235,236,237,238,250,0,0,0],
					[0,0,0,0,239,240,241,242,243,0,0,0,0],
					[0,0,0,0,245,246,247,248,249,0,0,0,0],
					[0,0,0,0,250,251,252,253,254,0,0,0,0],]
finalLevel.points = [[8,5,9,7,2],[8,6,9,7,2],[8,7,9,7,2]]
finalLevel.spawnPoint = [4,2]
finalLevel.background = 262