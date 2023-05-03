/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */

"use strict";

const DECAL_PAINTINGS = [
    "AA1", "AA2", "AA3", "AA5", "AA7", "AA8", "AA9", "AMC", "Amberstar", "Apshai", "Arena",
    "BFF", "Bagitman", "Barbarian1", "Barbarian5", "BeachHead", "BoogaBoo1", "BoogaBoo3",
    "C64", "CH1", "CSB1", "CW1", "CW6", "Castle", "Commando2",
    "CrystalCastles", "CyberPunk1", "DDID2", "DK", "DK2", "DM1", "DM11", "DM12", "DM4", "DM5", "DM6",
    "Drelbs", "EOB1", "EOB2", "EOB3", "EOB4", "Eric", "FA3", "FF2", "FF4",
    "Fred1", "Fred2", "Frogger", "Galaxian3", "Ghostbusters", "Goonies", "GreenBeret", "HL1", "HL2", "HL3",
    "HL4", "HL5", "HOB11", "HOB2", "HOB5", "Hero1", "Hero10", "Hero2", "Hero3", "HoraceSki",
    "IM", "Iceman", "Imhotep", "Impossible_Mission4", "JSW", "JSW2", "JSW3", "Jumpman", "JumpmanJr", "KQ1",
    "Kangaroo", "Karateka", "Killerwat", "Knightlore", "LSL20", "LSL6", "LTUT", "LastNinja1", "Lode",
    "Maniac", "ManicMiner", "Miner", "MonkeyIsland", "Montezuma", "Moon", "Oblivion", "Oblivion2", "OperationWolf",
    "OperationWolf2", "PAC2", "Penta", "Phara", "Pipeline", "Pitfall", "Pitfall3", "Pitfall4", "Pitstop", "Pooyan",
    "Portal1", "Prince1", "Prince2", "RRR", "RickDangerous", "SOF", "SQ1", "SVS1", "SVS10", "SVS2", "SVS3", "SVS4",
    "SW4", "Scramble3", "Scramble4", "Skyrim", "Sorcery2", "Sorcery3", "TR1", "TR1", "TR10", "TR2", "TR2", "TR3",
    "TheSentinel", "Tut2", "UU", "UU2", "Ultima1", "Ultima2", "Under", "VIC20", "Valhalla", "WOW1",
    "WOW2", "Walls", "Wally", "Winter", "Wolf1", "Zak", "Zaxxon", "ZimSalaBim", "Zong", "galaxian", "sabre2",
    "zx1", "Witcher5", "LSL9", "Shamus1", "PharaohCurse3", "Witcher4", "Witcher3", "TempleOfApshai", "Witcher2", "KnightLore2",
    "Witcher1", "Spelunker", "ShamusCase2", "Ishar2", "Pitfall5", "PharaohCurse2", "Frontier", "LSL8", "SP2", "SP1",
    "SVS24", "SVS23", "KQ10", "Shamus20", "Pitfall21", "Apshai6", "Apshai5", "MontyMole", "PacClose", "PacGhost", "Pitfall20", "SVS22", "SVS21",
    "Apshai4", "Apshai3", "Paperboy", "RobinOfTheWood2", "Pyjamarama", "ThePawn", "KokotoniWilf", "Cauldron1",
    "Zeppelin2", "SP3", "AC2", "Hero30", "SVS30", "AirWolf", "AA41", "AA40", "SeaWolf", "GIJoe10",
    "Hobbit3", "Ghostbusters2", "Commando3", "EOB20", "Hobbit6", "Hobbit7", "Hobbit8", "Hobbit9", "AticAtac1", "Infiltrator1", "ManicMiner2",
    "ManicMiner3", "Infiltrator2", "1942_2", "Arnie1", "BTF1", "BlueThunder1", "BrianBloodaxe1", "BrideOfFrakenstein1",
    "BruceLee1", "Captive", "Fred3", "Fred4", "JSW4", "ManiacMansion2", "PQ1", "Pengo", "Pirates", "PolePosition", "Silkworm1", "SirFred1",
    "SirFred2", "SirFred3", "Unknown1", "BattleThroughTime", "BOF3", "Chopper2", "Cliffhanger", "F1", "IM10", "MoonPatrol", "SummerGames10",
    "FF5", "LaraCroft1", "LaraCroft2", "IM13", "FF101", "FF100", "AA100", "UW10", "KL10", "SVS100", "SVS101", "SP4", "JSW10", "Vixen3", "WOW10", "ESB", "Galaxians10", "BC10",
    "ActecChallenge2", "AlleyKat", "BeachHead100", "Blackwyche2", "Hero100", "Invaders2", "KL102", "Karn1", "LastNinja10", "MoonBuggy", "PQ3", "Pitfall2-100", "SVS103",
    "Amiga", "Apshai10", "BC103", "Barbarian3", "BattleChopper", "Belwothe", "BladeRunner", "BlueMax20", "BrideOfFrankenstein", "Goonies5", "Hero103", "LSL100", "LaraCroft21", "MoonZX",
    "OlympicSkier", "Pitfall23", "Prince4", "PurpleHeart", "AntAttack2", "BeachHeadReplace", "Cavelon13", "Cavelon4", "CongoBongo2", "FalconPatrol7", "Fred21", "Frogger2", "LSL31",
    "LaraCroft123", "RobinToTheRescue1", "Ski64", "SpaceQuest10", "AtariST", "BC11", "BladeRunner7", "BlueMax11", "C64_hard", "CastleHaunt", "Cavelon11",
    "CrawlMaster2", "DM100", "DigDug2", "DotHunter", "EricTheViking10", "FireAnt2", "HungryHorace11", "Invasion", "KQ100", "KQ101", "LSL_Eve2", "ManiacMansion11",
    "ORileysMine2", "PWE", "Pitfall100", "Scramble10", "SuperDogfight3", "Tutanham11", "Tutanham12", "Ultima11", "WinterGames10",
    "AntAttack4", "Cauldron10", "DM103", "DM104", "DonkeyKong100", "Elvira1", "Elvira2", "Elvira3", "FalconPatrol8", "FalconPatrol9", "FortApocalypse", "Fred101", "Fred102",
    "GatewayToApshai11", "Grog1", "Hero104", "HungryHorace12", "KQ102", "LSL101", "LSL102", "LSL103", "LadyTut10", "LodeRunner10", "LodeRunner11", "MissileCommand",
    "OlympicSkier6", "Pitfall27", "Popeye2", "PrinceMac", "SVS102", "SabreWulf11", "Scramble7", "Shamus4", "Ski23", "Skyrim3", "Tutankham102", "Unknown3", "Witcher47",
    "Wolf10", "Zaxxon3", "ZimSalaBim2", "ArticShipwreck2", "BoogaBoo11", "CastleOFTerror11", "Cauldron8", "DM105", "DM106", "DM107", "DefenderOfTheCrown", "EOB11",
    "FortApocalypse41", "Hobbit101", "LCP", "LadyTut102", "ManicMiner11", "ManicMiner12", "MatchPoint2", "Miner2049_1", "MrRobot11", "Paratroopers2", "PharaohCurse11",
    "Rambo3", "RobinOfTheWood4", "SP111", "ST2", "SammyLightfoot2", "SirFred4", "Skyrim9", "SkyrimElf", "Tutankham105", "UW27", "WOW104", "WinterGames11",
    "Arena2", "Barbarian13", "BoogaBoo4", "BrianBloodaxe11", "CastleOfTerror3", "CastleOfTerror4", "CrystalCastles2", "Daggerfall3", "Daggerfall4", "EnigmaForce2",
    "EveryoneIsAWally2", "GI_Joe2", "Gauntlet", "Gods2", "ImpossibleMission11", "JungleHunt2", "LaraCroft102", "ManicMiner14", "Miranda1", "Montezuma's revenge2",
    "Nebulus2", "Neptune's daughters", "RobinHood3", "SammyLightfoot4", "Scramble23", "Skullkeep", "Soccer3", "SpaceQuest103", "TheHobbit13", "TheHobbit14",
    "TheHobbit15", "Trashman2", "Triss", "Tutankham104", "Yennefer", "ZX Spectrum", "AirWolf31", "ArticShipwreck7", "AtariFalcon", "Bagitman11", "BattleThroughTime2",
    "BoogaBoo41", "CBM_VIC20", "CastleWolfenstein21", "CodenameIceman2", "CodenameIceman3", "F2", "FalconPatrol99", "GoldenAxe2", "HalfLife11", "HalfLife12", "HalfLife13",
    "HalfLife14", "HeadOverHeels3", "IK2", "Ishar11", "Ishar13", "Ishar14", "Ishar15", "Jetpac3", "Jumpman3", "JungleHunt12", "KnightLore31", "KokotoniWilf2",
    "LeisureSuitLarry201", "MassEffect1", "MassEffect2", "Maze", "Miner3", "Paperboy2", "Paratroopers3", "Pooyan3", "Prince41", "Pyjamarama11", "RedWarrior1",
    "ReturnToCastleWolfenstein11", "ReturnToCastleWolfenstein12", "ReturnToCastleWolfenstein13", "ReturnToCastleWolfenstein14", "RickDangerous11", "Sorcery31",
    "Spike'sPeak1", "SpyVsSpy41", "TheHobbit16", "Valhalla2", "WhoDaresWins1", "Wolfenstein31", "Yennefer21", "Zeppelin4",
    "AppleLisa", "BC90", "BackToNature1", "Bagitman90", "BeyondForbiddenForest2", "Biggles2", "BoogaBoo90", "CamelotWarriors", "CastleOfTerror91",
    "Choplifter11", "Choplifter12", "CrystalCastles90", "Cuthbert90", "DM90", "Drelbs2", "DungeonMaster91", "DungeonMaster92", "ElvenWarrior1",
    "EyeOfTheBeholder90", "FireAnt21", "ForbiddenForest90", "ForbiddenForest91", "Geos", "HalfLife91", "Imhotep2", "ImpossibleMission90", "JetSetWilly11",
    "LeisureSuitLarry90", "LeisureSuitLarry91", "MontezumasRevenge90", "Nebulus90", "Pitfall90", "Pitfall91", "Pitstop3", "Rambo11", "SexOlympics1", "SexOlympics2", "Shamus91", "Tornado1",
    "BrianBloodaxe20", "CodenameIceman98", "Cuthbert20", "DonkeyKong99", "Drelbs3", "DungeonMaster96", "DungeonMaster97", "F1-1", "ForbiddenForest99", "ForgottenForest1", "FranticFreddie3",
    "Gods99", "Goonies90", "Ishar98", "Ishar99", "JupiterLander99", "LeisureSuitLarry93", "LeisureSuitLarry94", "MontyMole99", "Pitfall96", "RadarRatRace10", "SabreWulf99",
    "Soccer99", "TheHobbit99", "Unknown30", "Wally99", "AMC2", "AMC3", "ArabianNights1", "CrystalsOfZong10", "HalfLife 89", "Hero80", "Hero81", "Hero82", "HeroesOfKarn80",
    "HunchBack10", "Ishar80", "JetSetWilly88", "JetSetWilly89", "JungleHunt89", "LeisureSuitLarry88", "LeisureSuitLarry89", "Pitfall88", "Pitfall89", "RobinToTheRescue89",
    "SabreWulf89", "TempleOfApshai89", "TheHobbit89", "Vixen89", "WhoDaresWins10", "WizardOfWor89", "ZX81-89", "ZakMcKraken89", "Zaxxon89", "Zeppelin89",
    "Goonies88", "HalfLife88", "Pipeline88", "Pssst", "RadarRatRace20", "RiverRaid2", "RobinOfTheWood88", "RobinsonsRequiem1", "SabreWulf87", "SeaWolf88", "Sentinel2",
    "SirFred88", "Sorcery88", "TheHobbit88", "Tornado88", "Tutankhamun88", "Ultima89", "Uridium2", "Valhalla88", "Vixen79", "Wally88", "WhoDaresWins88", "WinterGames79", "Zeppelin88",
    "BrianBloodaxe70", "BrianBloodaxe71", "ChuckieEgg1", "ChuckieEgg2", "Cuthbert70", "DungeonMaster70", "EveryoneIsAWally70", "EveryoneIsAWally71", "EyeOfTheBeholder70",
    "FalconPatrol70", "FalconPatrol71", "FalconPatrol72", "FireAnt70", "Friday70", "GIJoe70", "GIJoe71", "Galaga70", "Galaga71", "Gods70", "Goonies70", "HalfLife70",
    "HalfLife71", "HalfLife72", "Hero70", "Hero71", "Hero72", "HunchBack70", "HunchBack71", "Iceman70", "Infiltrator70", "Infiltrator71", "Ishar70", "Ishar71",
    "Ishar72", "Jawbreaker", "JetPac70", "Jumpman70", "JupiterLander70", "KokotoniWilf70", "LeisureSuitLarry70", "LeisureSuitLarry71", "LeisureSuitLarry72",
    "LeisureSuitLarry73", "LeisureSuitLarry74", "LeisureSuitLarry75", "LeisureSuitLarry76", "LeisureSuitLarry77", "Miner70", "MrRobot70", "Pitfall70", "Pitfall71",
    "Pitfall72", "Pitfall73", "Pyjamarama70", "RickDangerous70", "RiverRaid70", "SirFred70", "Sorcery70", "Spelunker70", "TempleOfApshai70", "TheHobbit70", "TheHobbit71",
    "TheHobbit72", "TheHobbit73", "TimeTunnel70", "Ultima70", "Vixen70", "WhoDaresWins70", "WhoDaresWins71", "Wolfenstein70", "Yeppelin70", "Zaxxon70"
];

/*const DECAL_PAINTINGS = [
    
];*/
console.log("DECAL_PAINTINGS", DECAL_PAINTINGS.length, DECAL_PAINTINGS.sort());

const LIGHT_COLORS = {
    standard: new Float32Array([0.95, 0.95, 0.85]),
};

const LIGHT_DECALS = [{ sprite: "WallLamp", color: LIGHT_COLORS.standard }];

const DECAL_CRESTS = ["LS", "Skull4", "Skull3", "Skull2", "Skull1", "Crack4", "Crack3", "Skeleton11", "Skeleton12", "Crack20", "Crack21", "DancingSkeletons2",
    "PrayingSkeleton10", "SittingSkeleton2", "Skeleton21", "Skull10", "Skull11"];
const TOP_CRESTS = ["Grate1_128"];
const BOTTOM_CRESTS = ["Drain2_96", "Drain64", "Grate1_128", "RoundGrille96"];
//const DECAL_CRESTS = [];
const DECAL_SOURCES = { picture: DECAL_PAINTINGS, crest: DECAL_CRESTS };
const TOP_BOTTOM_SOURCES = { TOP: TOP_CRESTS, BOTTOM: BOTTOM_CRESTS };
console.log("DECAL_CRESTS", DECAL_CRESTS.sort());

console.log("%cMAP for CrawlMaster2 loaded.", "color: #888");

const MAP = {
    1: {
        width: 40,
        height: 40,
        floor: "GreenDungeonWall",
        ceil: "GreyDungeonFloor",
        wall: "DungeonWall",
        minPad: 3,
    },
    2: {
        data: `
        {"width":"16","height":"16","map":"BB5ABB7AA2BABAA12BAA2BB4AA5BAA2BAA19BAA11BAA5BAA2BAA2BAA5BAA12BAA3BB6ABAA2BABB4AA11BB2AA2BAA3BB2AA3BB9AA6BB2ABAA2BAA2BABB2AA2BAA7BB3ABAA2BABABB2AA3BABB8ABB3AA4BAA2BB9ABB18A$"}
        `,
        //floor: "RockFloor",
        //floor: "StoneFloor3",
        //floor: "StoneFloor",
        //floor: "Pavement",
        //floor: "Pavement2",
        //floor: "TlakFloor3",
        //floor: "DungeonFloor",
        //floor: "ThatchFloor",
        //floor: "OldFloor",
        //floor: "GreyDungeonFloor", //good
        //floor: "BrokenRuin",
        //floor: "DirtFloor",
        //floor: "TiledFloor",
        //floor: "Tile",
        floor: "GreenDungeonWall", //keep - nice, but bright
        //floor: "Wall7",
        //floor: "MorgueFloor",

        //ceil: "GreenDungeonWall",
        //ceil: "RockCeiling",
        //ceil: "Rough",
        ceil: "GreyDungeonFloor",

        //wall: "CastleWall",
        wall: "DungeonWall", //256
        //wall: "GreenDungeonWall",
        //wall: "BlackBrickWall",
        //wall: "BrickWall",
        //wall: "BrickWall2",
        //wall: "BrickWall3",
        //wall: "RockWall", // not very good
        //wall: "StoneWall2",
        //wall: "DungeonWall4",
        entrance: { grid: new Grid(0, 4), face: 'RIGHT' },
        exit: { grid: new Grid(15, 4), face: 'LEFT' },
    },
    3: {
        data: `
        {"width":"16","height":"16","map":"BB3ABAA6BB45ABB4ABB43$BB150A"}
        `,
        floor: "GreyDungeonFloor",
        ceil: "ThatchFloor",
        wall: "CastleWall",
    },

};

const SPAWN = {
    spawn(level) {
        console.log("spawning ... level", level);
        this.lights(level);
        this.decals(level);
        this.shrines(level);
        this.stairs(level);
        this.gates(level);
        this.items(level);

        //this.debug(level);
    
        //this.monsters(level);
    },
    shrines(level) {
        const GA = MAP[level].map.GA;
        const shrines = [SHRINE_TYPE.AttackShrine, SHRINE_TYPE.DefenseShrine, SHRINE_TYPE.MagicShrine];
        const shrine_locations = MAP[level].map.shrines;
        for (let s = 0; s < shrines.length; s++) {
            GA.addShrine(shrine_locations[s].grid);
            const shrine = new Shrine(shrine_locations[s].grid, DirectionToFace(shrine_locations[s].vector), shrines[s]);
            INTERACTIVE_DECAL3D.add(shrine);
        }
    },
    decals(level) {
        const map = MAP[level].map;

        // room wall decals
        for (const room of map.rooms) {
            const lo = ((0.25 * room.squareSize) >>> 0) - 1;
            const hi = ((0.33 * room.squareSize) >>> 0) + 1;
            let N = RND(lo, hi);
            let wallGrids = map.roomWallGrids(room);
            while (N > 0 && wallGrids.length > 0) {
                const slot = wallGrids.removeRandom();
                map.GA.reserve(slot.grid);
                const picture = DECAL_PAINTINGS.chooseRandom();
                DECAL3D.add(new StaticDecal(slot.grid, DirectionToFace(slot.dir), SPRITE[picture], "picture", picture));
                N--;
            }

            //bottom
            const topGrid = map.findMiddleSpaceUnreserved(room.area);
            const topCrest = TOP_CRESTS.chooseRandom();
            DECAL3D.add(new StaticDecal(topGrid, 'TOP', SPRITE[topCrest], "crest", topCrest));

            //top
            const bottomGrid = map.findMiddleSpaceUnreserved(room.area);
            const bottomCrest = BOTTOM_CRESTS.chooseRandom();
            DECAL3D.add(new StaticDecal(bottomGrid, 'BOTTOM', SPRITE[bottomCrest], "crest", bottomCrest));
        }

        //corridor decals
        const N = (map.width * map.height * parseFloat(map.density) * 0.13) | 0;
        const corrDecalGrids = map.poolOfCorridorDecalGrids(N);
        for (let grid of corrDecalGrids) {
            const type = weightedRnd({ picture: 10, crest: 20 });
            const source = DECAL_SOURCES[type].chooseRandom();
            DECAL3D.add(new StaticDecal(grid.grid, DirectionToFace(grid.dir), SPRITE[source], type, source));
        }

        //top, bottom corridor decals
        const TB = (map.width * map.height * parseFloat(map.density) * 0.05) | 0;
        const corrGrids = map.poolOfUnreservedCorridorGrids(TB);
        for (let grid of corrGrids) {
            const type = weightedRnd({TOP: 10, BOTTOM:5});
            const source = TOP_BOTTOM_SOURCES[type].chooseRandom();
            DECAL3D.add(new StaticDecal(grid, type, SPRITE[source], "crest", source));
        }
    },
    stairs(level) {
        console.info("spawning stairs", level);
        const GA = MAP[level].map.GA;
        GAME.upperLimit = -1; //DEBUG; DESIGN
        const entranceLocation = MAP[level].map.entrance;
        const exitLocation = MAP[level].map.exit;

        //entrance gate
        let entranceSprite = null;
        if (level > GAME.upperLimit) {
            entranceSprite = "StairsUp";
            const entrance_destination_level = GAME.level; //DEBUG; DESIGN
            const destination = new Destination(exitLocation.grid, exitLocation.vector, entrance_destination_level);
            const entrance = new Portal(entranceLocation.grid, DirectionToFace(entranceLocation.vector), SPRITE[entranceSprite], 'portal', entranceSprite, destination);
            BUMP3D.add(entrance);
        } else {
            entranceSprite = "EntranceGate";
            DECAL3D.add(new StaticDecal(entranceLocation.grid, DirectionToFace(entranceLocation.vector), SPRITE[entranceSprite], "crest", entranceSprite));
        }
        GA.reserve(entranceLocation.grid);

        //exit gate
        let exitSprite = "StairsDown";
        let exit_destination_level = GAME.level; //DEBUG; DESIGN
        const destination = new Destination(entranceLocation.grid, entranceLocation.vector, exit_destination_level);
        const exit = new Portal(exitLocation.grid, DirectionToFace(exitLocation.vector), SPRITE[exitSprite], 'portal', exitSprite, destination);
        BUMP3D.add(exit);
        BUMP3D.update();
    },
    lights(level) {
        const map = MAP[level].map;
        console.log("spawning lights", level);

        // room wall lights
        for (const room of map.rooms) {
            const lo = Math.max(((room.squareSize / 16) >>> 0), 1);
            const hi = Math.max(((room.squareSize / 10) >>> 0), 2);
            let N = RND(lo, hi);
            let wallGrids = map.roomWallGrids(room);
            while (N > 0 && wallGrids.length > 0) {
                const slot = wallGrids.removeRandom();
                map.GA.reserve(slot.grid);
                const light = LIGHT_DECALS.chooseRandom();
                LIGHTS3D.add(new LightDecal(slot.grid, DirectionToFace(slot.dir), SPRITE[light.sprite], "light", light.sprite, light.color));
                N--;
            }
        }

        //corridor lights
        const N = (map.width * map.height * parseFloat(map.density) * 0.01) | 0;
        const corrDecalGrids = map.poolOfCorridorDecalGrids(N);
        for (let grid of corrDecalGrids){
            const light = LIGHT_DECALS.chooseRandom();
            LIGHTS3D.add(new LightDecal(grid.grid, DirectionToFace(grid.dir), SPRITE[light.sprite], "light", light.sprite, light.color));
        }
    },
    gates(level) {
        console.log("spawning gates and keys");
        const GA = MAP[level].map.GA;
        const map = MAP[level].map;

        //keys
        for (const color in map.keys) {
            const grid = Grid.toCenter(map.keys[color]);
            const key = COMMON_ITEM_TYPE[`${color}Key`];
            console.info(grid, key);
            ITEM3D.add(new FloorItem3D(grid, key));
        }
        console.log("ITEM3D", ITEM3D);

        //locked
        for (const color in map.lockedRooms) {
            const grid = map.lockedRooms[color].door[0];
            const gate = GATE_TYPE[color];
            GATE3D.add(new Gate(grid, gate));
            GA.closeDoor(grid);
        }

        //common
        const ignore = ["Silver", "Gold", "Red"];
        for (const R of map.rooms) {
            if (ignore.includes(R.type)) continue;
            for (const D of R.door) {
                GATE3D.add(new Gate(D, GATE_TYPE.Common));
                GA.closeDoor(D);
            }
        }
    },
    debug(level) {
        const map = MAP[level].map;
        const items = [COMMON_ITEM_TYPE.GoldCube, COMMON_ITEM_TYPE.GoldBar, COMMON_ITEM_TYPE.GoldKey, COMMON_ITEM_TYPE.RedPotion, COMMON_ITEM_TYPE.Scroll, COMMON_ITEM_TYPE.Sword,
        COMMON_ITEM_TYPE.Heart, COMMON_ITEM_TYPE.Shield, COMMON_ITEM_TYPE.Mana, COMMON_ITEM_TYPE.Magic, COMMON_ITEM_TYPE.Chest, COMMON_ITEM_TYPE.TreasureChest,
        COMMON_ITEM_TYPE.Coins, COMMON_ITEM_TYPE.Sting];

        const start = map.findRoom("start");
        for (const item of items) {
            const grid = map.findSpace(start.area);
            ITEM3D.add(new FloorItem3D(Grid.toCenter(grid), item));
        }
        const end = map.findRoom("Gold");
        for (const item of items) {
            const grid = map.findSpace(end.area);
            ITEM3D.add(new FloorItem3D(Grid.toCenter(grid), item));
        }
        console.log("ITEM3D", ITEM3D);

        //monsters
        const grid = map.findSpace(start.area);
        ENTITY3D.add(new $3D_Entity(Grid.toCenter(grid), MONSTER_TYPE.GhostFace, UP));
    },
    items(level) {
        console.log("spawning items");

        /*
        const itemLocations = [
            { grid: new FP_Grid(1.5, 8.5), type: COMMON_ITEM_TYPE.GoldCube },
            { grid: new FP_Grid(4.5, 2.5), type: COMMON_ITEM_TYPE.GoldBar },
            { grid: new FP_Grid(1.5, 9.5), type: COMMON_ITEM_TYPE.SilverBar },
            { grid: new FP_Grid(1.5, 2.5), type: COMMON_ITEM_TYPE.GoldBar },

    

            { grid: new FP_Grid(3.5, 2.5), type: COMMON_ITEM_TYPE.RedPotion },
            { grid: new FP_Grid(3.8, 2.0), type: COMMON_ITEM_TYPE.BluePotion },

            { grid: new FP_Grid(2.1, 3.5), type: COMMON_ITEM_TYPE.Scroll },
            { grid: new FP_Grid(1.1, 4.5), type: COMMON_ITEM_TYPE.Scroll },
            { grid: new FP_Grid(1.5, 5.5), type: COMMON_ITEM_TYPE.Scroll },

            { grid: new FP_Grid(5.5, 3.5), type: COMMON_ITEM_TYPE.Sword },
            { grid: new FP_Grid(6.5, 1.5), type: COMMON_ITEM_TYPE.Heart },
            { grid: new FP_Grid(6.5, 14.5), type: COMMON_ITEM_TYPE.Sword },
            { grid: new FP_Grid(1.5, 14.5), type: COMMON_ITEM_TYPE.Heart },
            { grid: new FP_Grid(11.5, 4.5), type: COMMON_ITEM_TYPE.Sword },

            { grid: new FP_Grid(6.5, 3.5), type: COMMON_ITEM_TYPE.Shield },
            { grid: new FP_Grid(3.5, 14.5), type: COMMON_ITEM_TYPE.Shield },

            { grid: new FP_Grid(1.5, 6.5), type: COMMON_ITEM_TYPE.Mana },
            { grid: new FP_Grid(1.5, 11.5), type: COMMON_ITEM_TYPE.Mana },

            { grid: new FP_Grid(6.5, 4.5), type: COMMON_ITEM_TYPE.Magic },
            { grid: new FP_Grid(1.5, 10.5), type: COMMON_ITEM_TYPE.Magic },

            { grid: new FP_Grid(1.5, 1.5), type: COMMON_ITEM_TYPE.Chest },
            { grid: new FP_Grid(4.5, 4.5), type: COMMON_ITEM_TYPE.TreasureChest },
            { grid: new FP_Grid(12.5, 3.5), type: COMMON_ITEM_TYPE.TreasureChest },
            { grid: new FP_Grid(2.8, 12.8), type: COMMON_ITEM_TYPE.Chest },

            { grid: new FP_Grid(5.5, 5.5), type: COMMON_ITEM_TYPE.Coins },


            { grid: new FP_Grid(4.5, 3.5), type: COMMON_ITEM_TYPE.Sting },

        ];

        for (let item of itemLocations) {
            ITEM3D.add(new FloorItem3D(item.grid, item.type));
        }
        */
    },
    monsters(level) {
        console.log("spawning monsters...");
        const monsterLocations = [
            //study
            //{ grid: new FP_Grid(5.5, 6.5), dir: UP, type: MONSTER_TYPE.GhostFace },
            //{ grid: new FP_Grid(5.5, 6.5), dir: UP, type: MONSTER_TYPE.Bat },
            //{grid: new FP_Grid(5.5, 6.5), dir: UP, type: MONSTER_TYPE.Lady },
            //{grid: new FP_Grid(5.5, 6.5), dir: UP, type: MONSTER_TYPE.Bunny },
            //{ grid: new FP_Grid(5.5, 6.5), dir: UP, type: MONSTER_TYPE.Hulk },
            //{ grid: new FP_Grid(5.5, 6.5), dir: UP, type: MONSTER_TYPE.Viking },
            //{ grid: new FP_Grid(5.5, 6.5), dir: UP, type: MONSTER_TYPE.MissWhite },
            { grid: new FP_Grid(5.5, 6.5), dir: UP, type: MONSTER_TYPE.BatCat },

            //zoo
            { grid: new FP_Grid(1.5, 12.5), dir: UP, type: MONSTER_TYPE.Bat },
            { grid: new FP_Grid(5.5, 12.5), dir: LEFT, type: MONSTER_TYPE.GhostFace },
            { grid: new FP_Grid(1.5, 8.5), dir: DOWN, type: MONSTER_TYPE.Hulk },
            { grid: new FP_Grid(8.5, 4.5), dir: UP, type: MONSTER_TYPE.Viking },
            { grid: new FP_Grid(11.5, 5.5), dir: UP, type: MONSTER_TYPE.Astro },
            { grid: new FP_Grid(14.5, 1.5), dir: UP, type: MONSTER_TYPE.MissWhite },
            { grid: new FP_Grid(12.5, 7.5), dir: UP, type: MONSTER_TYPE.BatCat },
        ];

        for (let monster of monsterLocations) {
            ENTITY3D.add(new $3D_Entity(monster.grid, monster.type, monster.dir));
        }
    }
};

const MONSTER_TYPE = {
    BatCat: {
        name: "BatCat",
        model: "BatCat",
        scale: 1.1 / 2 ** 1,
        shine: 128.0 * 0.9,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: "Coins",
        //attribs
        attack: 7,
        defense: 3,
        magic: 4,
        health: 10,
        xp: 50,
        gold: 100,
        //
        attackSound: "MonsterAttack2",
        hurtSound: "MonsterHurt3",
        behaviourArguments: [7, ["wanderer"], 4, ["advancer"]],
        //behaviourArguments: [7, ["wanderer"], 4, ["shoot"]],
        moveSpeed: 1.0,
        //casters
        mana: 3,
        caster: true,
        shootDistance: 4,
        stalkDistance: 5,
    },
    Hulk: {
        name: "Hulk",
        model: "Hulk",
        scale: 1.5 / 2 ** 6,
        shine: 128.0 * 0.99,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: "Coins",
        //attribs
        attack: 7,
        defense: 3,
        magic: 4,
        health: 10,
        xp: 50,
        gold: 100,
        //
        attackSound: "HumanAttack1",
        hurtSound: "MonsterHurt2",
        behaviourArguments: [7, ["wanderer"], 4, ["advancer"]],
        //behaviourArguments: [7, ["wanderer"], 4, ["shoot"]],
        moveSpeed: 1.0,
        //casters
        mana: 3,
        caster: true,
        shootDistance: 4,
        stalkDistance: 5,
    },
    Viking: {
        name: "Viking",
        model: "Viking",
        scale: 0.9 / 2 ** 8,
        shine: 128.0 * 0.99,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: "Coins",
        //attribs
        attack: 7,
        defense: 3,
        magic: 4,
        health: 10,
        xp: 50,
        gold: 100,
        //
        attackSound: "HumanAttack1",
        hurtSound: "MonsterHurt2",
        behaviourArguments: [7, ["wanderer"], 4, ["advancer"]],
        //behaviourArguments: [7, ["wanderer"], 4, ["shoot"]],
        moveSpeed: 1.0,
        //casters
        mana: 3,
        caster: true,
        shootDistance: 4,
        stalkDistance: 5,
    },
    Astro: {
        name: "Astro",
        model: "Astro",
        scale: 1.5 / 2 ** 4,
        shine: 128.0 * 0.99,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: "Coins",
        //attribs
        attack: 7,
        defense: 3,
        magic: 4,
        health: 10,
        xp: 50,
        gold: 100,
        //
        attackSound: "HumanAttack1",
        hurtSound: "MonsterHurt2",
        behaviourArguments: [7, ["wanderer"], 4, ["advancer"]],
        //behaviourArguments: [7, ["wanderer"], 4, ["shoot"]],
        moveSpeed: 1.0,
        //casters
        mana: 3,
        caster: true,
        shootDistance: 4,
        stalkDistance: 5,
    },
    MissWhite: {
        name: "MissWhite",
        model: "MissWhite",
        scale: 1.5 / 2 ** 2,
        shine: 128.0 * 0.9,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: "Coins",
        //attribs
        attack: 7,
        defense: 3,
        magic: 4,
        health: 10,
        xp: 50,
        gold: 100,
        //
        attackSound: "HumanAttack1",
        hurtSound: "MonsterHurt2",
        behaviourArguments: [7, ["wanderer"], 4, ["advancer"]],
        //behaviourArguments: [7, ["wanderer"], 4, ["shoot"]],
        moveSpeed: 1.0,
        //casters
        mana: 3,
        caster: true,
        shootDistance: 4,
        stalkDistance: 5,
    },
    GhostFace: {
        name: "GhostFace",
        model: "GhostFace",
        scale: 1.75 / 2 ** 2,
        shine: 128.0 * 0.5,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: "Coins",
        //attribs
        attack: 7,
        defense: 3,
        magic: 4,
        health: 10,
        xp: 50,
        gold: 100,
        //
        attackSound: "MonsterAttack1",
        hurtSound: "MonsterHurt",
        //behaviourArguments: [7, ["wanderer"], 4, ["advancer"]],
        behaviourArguments: [7, ["wanderer"], 4, ["shoot"]],
        moveSpeed: 1.0,
        //casters
        mana: 3,
        caster: true,
        shootDistance: 4,
        stalkDistance: 5,
    },
    Bat: {
        name: "Bat",
        model: "Bat",
        scale: 1 / 2 ** 3,
        shine: 128.0 * 0.5,
        rotateToNorth: Math.PI,
        midHeight: 0.0,
        fly: 0.5,
        deathType: "SmokeExplosion",
        inventory: null,
        //attribs
        attack: 1,
        defense: 0,
        magic: 0,
        health: 1,
        xp: 1,
        gold: 0,
        //
        attackSound: "BatAttack",
        hurtSound: "BatAttack",
        behaviourArguments: [Infinity, ["wanderer"], -1],
        moveSpeed: 1.0,
        //casters
        mana: 0
    }
};

const SHRINE_TYPE = {
    AttackShrine: {
        name: "AttackShrine",
        sprite: "AttackShrine",
        which: "attack",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "SwordSkill",
    },
    DefenseShrine: {
        name: "DefenseShrine",
        sprite: "DefenseShrine",
        which: "defense",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "ShieldSkill",
    },
    MagicShrine: {
        name: "MagicShrine",
        sprite: "MagicShrine",
        which: "magic",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "MagicSkill",
    },
};

const GATE_TYPE = {
    Common: {
        name: "Common",
        color: null,
        locked: false,
        texture: "WoodenGate1",
        element: "CUBE_SM",
    },
    Red: {
        name: "Red",
        color: "Red",
        locked: true,
        texture: "RedGate1",
        element: "CUBE_SM",
    },
    Silver: {
        name: "Silver",
        color: "Silver",
        locked: true,
        texture: "SilverGate1",
        element: "CUBE_SM",
    },
    Gold: {
        name: "Gold",
        color: "Gold",
        locked: true,
        texture: "GoldGate1",
        element: "CUBE_SM",
    },
};

const COMMON_ITEM_TYPE = {
    Chest: {
        name: "Chest",
        category: "chest",
        element: "CHEST",
        scale: 1 / 2 ** 3,
        glueToFloor: true,
        texture: "Wood1",
        shine: 128.0 * 0.1,
    },
    TreasureChest: {
        name: "TreasureChest",
        category: "treasure_chest",
        element: "TREASURE_CHEST",
        scale: 1.5 / 2 ** 3,
        glueToFloor: true,
        texture: "TreasureChest",
        shine: 128.0 * 0.1,
    },
    Sword: {
        name: "Sword",
        category: "skill",
        which: "attack",
        element: "SWORD",
        scale: 1 / 2 ** 4,
        glueToFloor: true,
        texture: "Sword",
        shine: 128.0 * 0.99,
        inventorySprite: "SwordSkill",
    },
    Shield: {
        name: "Shield",
        category: "skill",
        which: "defense",
        element: "SHIELD",
        scale: 1 / 2 ** 5,
        glueToFloor: true,
        texture: "ScrapedMetal",
        shine: 128.0 * 0.80,
        inventorySprite: "ShieldSkill",
    },
    Magic: {
        name: "Magic",
        category: "skill",
        which: "magic",
        element: "PENTAGRAM",
        scale: 1 / 2 ** 1,
        glueToFloor: true,
        texture: "Red2",
        shine: 128.0 * 0.80,
        inventorySprite: "MagicSkill",
    },
    Heart: {
        name: "Heart",
        category: "status",
        which: "health",
        element: "HEART",
        scale: 1 / 2 ** 5,
        glueToFloor: true,
        texture: "Red",
        shine: 128.0 * 0.99,
        inventorySprite: "Health",
    },
    Mana: {
        name: "ManaSkill",
        category: "status",
        which: "mana",
        element: "BALL",
        scale: 1 / 2 ** 4,
        glueToFloor: true,
        texture: "Magic",
        shine: 128.0 * 0.99,
        inventorySprite: "Mana",
    },
    Fireball: {
        name: "Fireball",
        category: 'missile',
        element: "BALL",
        scale: 1 / 2 ** 4,
        texture: "FireballTexture",
        moveSpeed: 6.0,
        shine: 128.0 * 0.90,
        lightColor: "#FF7700",
    },
    Scroll: {
        name: "Scroll",
        category: "scroll",
        element: "SCROLL",
        scale: 1.2 / 2 ** 4,
        glueToFloor: true,
        texture: "ScrollTexture",
        shine: 128.0 * 0.9,
    },
    RedPotion: {
        name: "RedPotion",
        category: "potion",
        color: "red",
        element: "FLASK",
        scale: 1 / 2 ** 5,
        glueToFloor: true,
        texture: "RedLiquid",
        shine: 128.0 * 0.25,
        inventorySprite: "RedPotion24"
    },
    BluePotion: {
        name: "BluePotion",
        category: "potion",
        color: "blue",
        element: "FLASK",
        scale: 1 / 2 ** 5,
        glueToFloor: true,
        texture: "BlueLiquid",
        shine: 128.0 * 0.25,
        inventorySprite: "BluePotion24"
    },
    GoldKey: {
        name: "GoldKey",
        inventorySprite: "GoldKeyBig",
        category: "key",
        color: "Gold",
        element: "KEY",
        scale: 1 / 2 ** 3,
        glueToFloor: true,
        texture: "Gold",
        shine: 128.0 * 0.99,
    },
    SilverKey: {
        name: "SilverKey",
        inventorySprite: "SilverKeyBig",
        category: "key",
        color: "Silver",
        element: "KEY",
        scale: 1 / 2 ** 3,
        glueToFloor: true,
        texture: "Silver",
        shine: 128.0 * 0.80,
    },
    RedKey: {
        name: "RedKey",
        inventorySprite: "RedKeyBig",
        category: "key",
        color: "Red",
        element: "KEY",
        scale: 1 / 2 ** 3,
        glueToFloor: true,
        texture: "RedMetal",
        shine: 128.0 * 0.50,
    },
    GoldBar: {
        name: "GoldBar",
        category: "gold",
        element: "BAR",
        scale: 1 / 2 ** 4,
        glueToFloor: true,
        texture: "Gold",
        minVal: 50,
        maxVal: 100,
        shine: 128.0 * 0.99,
    },
    SilverBar: {
        name: "SilverBar",
        category: "gold",
        element: "BAR",
        scale: 1 / 2 ** 4,
        glueToFloor: true,
        texture: "Silver",
        minVal: 25,
        maxVal: 50,
        shine: 128.0 * 0.80,
    },
    GoldCube: {
        name: "GoldCube",
        category: "gold",
        element: "CUBE_CENTERED",
        scale: 1 / 2 ** 5,
        glueToFloor: true,
        texture: "Gold",
        minVal: 10,
        maxVal: 25,
        shine: 128.0 * 0.99,
    },
    Coins: {
        name: "Coins",
        category: "gold",
        element: "COINS",
        scale: 1.5 / 2 ** 0,
        glueToFloor: true,
        texture: "Coins",
        minVal: 10,
        maxVal: 25,
        shine: 128.0 * 0.99,
    },
    Sting: {
        name: "Sting",
        category: "skill",
        which: "attack",
        element: "STING",
        scale: 1 / 2 ** 1,
        glueToFloor: true,
        texture: "Sting",
        shine: 128.0 * 0.99,
        inventorySprite: "SwordSkill",
    },
    POV: {
        name: "POV",
        element: "STING",
        scale: 1 / 2 ** 1,
        texture: "Sting",
        shine: 128.0 * 0.99,
    }
};

const SCROLL_TYPE = {
    Light: 130,
    Invisibility: 100,
    Map: 100,
    DrainMana: 90,
    Cripple: 90,
    BoostWeapon: 100,
    BoostArmor: 100,
    DestroyArmor: 80,
    DestroyWeapon: 80,
    Petrify: 20,
    MagicBoost: 100,
    TeleportTemple: 100,
    Luck: 100,
    HalfLife: 50
};