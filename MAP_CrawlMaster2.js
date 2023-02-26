/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */

"use strict";

const DECAL_PAINTINGS = ["AA1", "AA2", "AA3", "AA5", "AA7", "AA8", "AA9", "AMC", "Amberstar", "Apshai", "Arena",
    "BFF", "Bagitman", "Barbarian1", "Barbarian5", "BeachHead", "BlueMax", "BlueMax2", "BoogaBoo1", "BoogaBoo3",
    "C64", "CH1", "CSB1", "CW1", "CW3", "CW6", "Castle", "Commando2",
    "CrystalCastles", "CyberPunk1", "DDID2", "DK", "DK2", "DM1", "DM11", "DM12", "DM4", "DM5", "DM6",
    "Drelbs", "EOB1", "EOB2", "EOB3", "EOB4", "Eric", "FA3", "FF1", "FF2", "FF4",
    "Fred1", "Fred2", "Frogger", "Galaga1", "Galaxian3", "Ghostbusters", "Goonies", "GreenBeret", "HL1", "HL2", "HL3",
    "HL4", "HL5", "HOB11", "HOB2", "HOB5", "Hero1", "Hero10", "Hero2", "Hero3", "HoraceSki",
    "IM", "Iceman", "Imhotep", "Impossible_Mission4", "JSW", "JSW2", "JSW3", "Jumpman", "JumpmanJr", "KQ1",
    "Kangaroo", "Karateka", "Killerwat", "Knightlore", "LSL1", "LSL20", "LSL4", "LSL6", "LSL7", "LTUT", "LastNinja1", "Lode",
    "Maniac", "ManicMiner", "Miner", "MonkeyIsland", "Montezuma", "Moon", "Oblivion", "Oblivion2", "OperationWolf",
    "OperationWolf2", "PAC2", "Penta", "Phara", "Pipeline", "Pitfall", "Pitfall3", "Pitfall4", "Pitstop", "Pooyan",
    "Portal1", "Prince1", "Prince2", "RRR", "RickDangerous", "Robin", "SOF", "SQ1", "SVS1", "SVS10", "SVS2", "SVS3", "SVS4",
    "SW4", "Scramble3", "Scramble4", "Skyrim", "Soccer", "Sorcery2", "Sorcery3", "TR1", "TR1", "TR10", "TR2", "TR2", "TR3",
    "TheSentinel", "Tut2", "UU", "UU2", "Ultima1", "Ultima2", "Under", "VIC20", "Valhalla", "WOW1",
    "WOW2", "Walls", "Wally", "Winter", "Wolf1", "Zak", "Zaxxon", "ZimSalaBim", "Zong", "galaxian", "sabre2",
    "zx1", "BlueMax4", "Witcher5", "LSL9", "Shamus1", "PharaohCurse3", "Witcher4", "Witcher3", "TempleOfApshai", "Witcher2", "KnightLore2",
    "Witcher1", "Spelunker", "ShamusCase2", "Ishar2", "Pitfall5", "PharaohCurse2", "Frontier", "LSL8", "SP2", "SP1",
    "SVS24", "SVS23", "KQ10", "Shamus20", "Pitfall21", "Apshai6", "Apshai5", "MontyMole", "PacClose", "PacGhost", "Pitfall20", "SVS22", "SVS21",
    "Apshai4", "Apshai3", "Paperboy", "RobinOfTheWood2", "Pyjamarama", "ThePawn", "KokotoniWilf", "Cauldron1",
    "Zeppelin2", "TimeTunnel", "SP3", "AC2", "Hero30", "SVS30", "AirWolf", "AA41", "AA40", "SeaWolf", "GIJoe10",
    "Hobbit1", "Hobbit3", "Ghostbusters2", "Commando3", "EOB20", "Hobbit6", "Hobbit7", "Hobbit8", "Hobbit9", "AticAtac1", "Infiltrator1", "ManicMiner2",
    "ManicMiner3", "Prince3", "Infiltrator2", "1942_2", "Arnie1", "BTF1", "BlueThunder1", "BrianBloodaxe1", "BrideOfFrakenstein1",
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
    "Soccer99", "TheHobbit99", "Unknown30", "Wally99"
];

//const DECAL_PAINTINGS = [];
console.log("DECAL_PAINTINGS", DECAL_PAINTINGS.length, DECAL_PAINTINGS.sort());

const LIGHT_DECALS = ["WallLamp"];

const DECAL_CRESTS = ["LS", "Skull4", "Skull3", "Skull2", "Skull1", "Crack4", "Crack3", "Skeleton11", "Skeleton12"];
//const DECAL_CRESTS = [];
console.log("DECAL_CRESTS", DECAL_CRESTS.sort());



console.log("%cMAP for CrawlMaster2 loaded.", "color: #888");
//{"width":"16","height":"16","map":"BB9ABB10AA26BAA10BAA20BAA9BAA8BB2AA2BAA6BAA9BAA6BB3ABAA2BB6AA2BAA10BABAA2BB2AA8BB9ABB2ABAA2BAA2BB2AA2BAA7BB2AA5BABABB2AA4BB6ABB2ABAA2BB9ABB18A$"}
var MAP = {
    1: {
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
    2: {
        data: `
        {"width":"16","height":"16","map":"BB3ABAA6BB45ABB4ABB43$BB150A"}
        `,
        floor: "GreyDungeonFloor",
        ceil: "ThatchFloor",
        wall: "CastleWall",
    },

};

var SPAWN = {
    spawn(level) {
        console.log("spawning ... level", level);
        this.decals(level);
        this.stairs(level);
        this.shrines(level);
        this.lights(level);
        this.gates(level);
        this.items(level);
        //GATE3D.display();
        //ITEM3D.display();
        //INTERACTIVE_DECAL3D.display();
    },
    shrines(level) {
        const GA = MAP[level].map.GA;
        const shrines = [SHRINE_TYPE.AttackShrine, SHRINE_TYPE.DefenseShrine, SHRINE_TYPE.MagicShrine];
        const shrine_locations = [
            { grid: new Grid(1, 15), face: 'BACK' },
            { grid: new Grid(8, 15), face: 'BACK' },
            { grid: new Grid(15, 11), face: 'LEFT' },
        ];
        for (let s = 0; s < shrines.length; s++) {
            GA.addShrine(shrine_locations[s].grid);
            let shrine = new Shrine(shrine_locations[s].grid, shrine_locations[s].face, shrines[s]);
            //console.log("shrine", shrine);
            INTERACTIVE_DECAL3D.add(shrine);
        }
    },
    decals(level) {
        const decalsLocations = [
            { grid: new Grid(2, 2), face: 'FRONT' },
            { grid: new Grid(5, 2), face: 'FRONT' },
            { grid: new Grid(3, 5), face: 'BACK' },
            { grid: new Grid(0, 3), face: 'RIGHT' },
            { grid: new Grid(7, 3), face: 'LEFT' },
            { grid: new Grid(2, 7), face: 'BACK' },
            { grid: new Grid(3, 0), face: 'FRONT' },
            { grid: new Grid(3, 15), face: 'BACK' },
            { grid: new Grid(3, 7), face: 'FRONT' },
            { grid: new Grid(12, 0), face: 'FRONT' },
            { grid: new Grid(7, 4), face: 'LEFT' },
            { grid: new Grid(7, 4), face: 'RIGHT' },
        ];

        for (let D of decalsLocations) {
            const picture = DECAL_PAINTINGS.chooseRandom();
            console.log("picture", picture);
            DECAL3D.add(new StaticDecal(D.grid, D.face, SPRITE[picture], "picture", picture));
        }

        const crestLocations = [{ grid: new Grid(0, 5), face: 'RIGHT' }];
        for (let D of crestLocations) {
            const crest = DECAL_CRESTS.chooseRandom();
            console.log("crest", crest);
            DECAL3D.add(new StaticDecal(D.grid, D.face, SPRITE[crest], "crest", crest));
        }
    },
    stairs(level) {
        const GA = MAP[level].map.GA;
        GAME.upperLimit = -1; //DEBUG; DESIGN
        let entranceLocation = MAP[level].entrance;
        let exitLocation = MAP[level].exit;

        //entrance gate
        let entranceSprite = null;
        if (level > GAME.upperLimit) {
            entranceSprite = "StairsUp";
            let entrance_destination_level = GAME.level; //DEBUG; DESIGN
            const destination = new Destination(exitLocation.grid, exitLocation.face, entrance_destination_level);
            const entrance = new Portal(entranceLocation.grid, entranceLocation.face, SPRITE[entranceSprite], 'portal', entranceSprite, destination);
            BUMP3D.add(entrance);
            GA.addStair(entranceLocation.grid);
        } else {
            entranceSprite = "EntranceGate";
            DECAL3D.add(new StaticDecal(entranceLocation.grid, entranceLocation.face, SPRITE[entranceSprite], "crest", entranceSprite));
        }
        GA.reserve(entranceLocation.grid);

        //exit gate
        let exitSprite = "StairsDown";
        let exit_destination_level = GAME.level; //DEBUG; DESIGN
        const destination = new Destination(entranceLocation.grid, entranceLocation.face, exit_destination_level);
        const exit = new Portal(exitLocation.grid, exitLocation.face, SPRITE[exitSprite], 'portal', exitSprite, destination);
        BUMP3D.add(exit);
        GA.reserve(exitLocation.grid);
        GA.addStair(exitLocation.grid);

        BUMP3D.update();
    },
    lights(level) {
        const standardLightColor = new Float32Array([0.95, 0.95, 0.85]);
        const redColor = new Float32Array([0.95, 0.0, 0.0]);
        const greenColor = new Float32Array([0.15, 0.9, 0.15]);
        const lightLocations = [
            { grid: new Grid(1, 0), face: 'FRONT', color: standardLightColor },
            { grid: new Grid(6, 0), face: 'FRONT', color: standardLightColor },
            { grid: new Grid(11, 15), face: 'BACK', color: standardLightColor },
            { grid: new Grid(15, 9), face: 'LEFT', color: redColor },
            { grid: new Grid(15, 1), face: 'LEFT', color: standardLightColor },
        ];
        for (let L of lightLocations) {
            const light = LIGHT_DECALS.chooseRandom();
            LIGHTS3D.add(new LightDecal(L.grid, L.face, SPRITE[light], "light", light, L.color));
        }
    },
    gates(level) {
        const GA = MAP[level].map.GA;
        const gateLocations = [
            { grid: new Grid(6, 7), type: GATE_TYPE.Common },
            { grid: new Grid(7, 8), type: GATE_TYPE.Common },

            { grid: new Grid(10, 1), type: GATE_TYPE.Red },
            { grid: new Grid(10, 6), type: GATE_TYPE.Silver },
            { grid: new Grid(13, 6), type: GATE_TYPE.Gold },
        ];

        for (let G of gateLocations) {
            GA.addDoor(G.grid); //needs to be removed if door set properly in the map!!
            GATE3D.add(new Gate(G.grid, G.type));
            GA.closeDoor(G.grid);
        }
    },
    items(level) {
        console.log("spawning items");
        const itemLocations = [
            { grid: new FP_Grid(1.5, 8.5), type: COMMON_ITEM_TYPE.GoldCube },
            { grid: new FP_Grid(4.5, 2.5), type: COMMON_ITEM_TYPE.GoldBar },
            { grid: new FP_Grid(1.5, 9.5), type: COMMON_ITEM_TYPE.SilverBar },
            { grid: new FP_Grid(1.5, 2.5), type: COMMON_ITEM_TYPE.GoldBar },

            { grid: new FP_Grid(12.5, 2.5), type: COMMON_ITEM_TYPE.GoldKey },
            { grid: new FP_Grid(13.5, 2.5), type: COMMON_ITEM_TYPE.SilverKey },
            { grid: new FP_Grid(14.5, 2.5), type: COMMON_ITEM_TYPE.RedKey },

            { grid: new FP_Grid(3.5, 2.5), type: COMMON_ITEM_TYPE.RedPotion },
            { grid: new FP_Grid(3.8, 2.0), type: COMMON_ITEM_TYPE.BluePotion },

            { grid: new FP_Grid(2.1, 3.5), type: COMMON_ITEM_TYPE.Scroll },
            { grid: new FP_Grid(1.1, 4.5), type: COMMON_ITEM_TYPE.Scroll },
            { grid: new FP_Grid(1.5, 5.5), type: COMMON_ITEM_TYPE.Scroll },

            { grid: new FP_Grid(5.5, 3.5), type: COMMON_ITEM_TYPE.Sword },
            { grid: new FP_Grid(6.5, 1.5), type: COMMON_ITEM_TYPE.Heart },
            { grid: new FP_Grid(6.5, 14.5), type: COMMON_ITEM_TYPE.Sword },
            { grid: new FP_Grid(1.5, 14.5), type: COMMON_ITEM_TYPE.Heart },

            { grid: new FP_Grid(6.5, 3.5), type: COMMON_ITEM_TYPE.Shield },
            { grid: new FP_Grid(3.5, 14.5), type: COMMON_ITEM_TYPE.Shield },

            { grid: new FP_Grid(1.5, 6.5), type: COMMON_ITEM_TYPE.Mana },
            { grid: new FP_Grid(1.5, 11.5), type: COMMON_ITEM_TYPE.Mana },

            { grid: new FP_Grid(6.5, 4.5), type: COMMON_ITEM_TYPE.Magic },
            { grid: new FP_Grid(1.5, 10.5), type: COMMON_ITEM_TYPE.Magic },

            { grid: new FP_Grid(1.5, 1.5), type: COMMON_ITEM_TYPE.Chest },
            { grid: new FP_Grid(4.5, 4.5), type: COMMON_ITEM_TYPE.Chest },
            { grid: new FP_Grid(2.8, 12.8), type: COMMON_ITEM_TYPE.Chest },

        ];

        for (let item of itemLocations) {
            ITEM3D.add(new FloorItem3D(item.grid, item.type));
        }
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
        scale: 1 / 2 ** 4,
        glueToFloor: true,
        texture: "ScrollTexture",
        shine: 128.0 * 0.15,
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