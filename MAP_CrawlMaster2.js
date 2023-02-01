/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */

"use strict";

const DECAL_PAINTINGS = ["AA1", "AA2", "AA3", "AA4", "AA5", "AA7", "AA8", "AA9", "AMC", "Amberstar", "Apshai", "ArcticShipwreck", "Arena",
    "Aztec", "BFF", "Bagitman", "Barbarian1", "Barbarian5", "BeachHead", "Blackwyche", "BlueMax", "BlueMax2", "BlueMax3", "BoogaBoo1", "BoogaBoo3",
    "C64", "CH1", "CSB1", "CW1", "CW10", "CW2", "CW3", "CW5", "CW6", "Castle", "Choplifter", "Commando2",
    "CrystalCastles", "Cuthbert1", "CyberPunk1", "DDID2", "DK", "DK2", "DM1", "DM11", "DM12", "DM2", "DM3", "DM4", "DM5", "DM6",
    "Drelbs", "EOB1", "EOB2", "EOB3", "EOB4", "Eric", "FA2", "FA3", "FF1", "FF2", "FF4",
    "FranticFreddie", "Fred1", "Fred2", "Frogger", "Galaga1", "Galaxian3", "Ghostbusters", "Gods", "Goonies", "GreenBeret", "HL1", "HL2", "HL3",
    "HL4", "HL5", "HOB1", "HOB11", "HOB2", "HOB4", "HOB5", "Hero1", "Hero10", "Hero2", "Hero3", "HoraceSki", "Hunchback",
    "IK1", "IM", "Iceman", "Imhotep", "Impossible_Mission4", "Invaders", "JSW", "JSW2", "JSW3", "JetPac", "Jumpman", "JumpmanJr", "Jupiter_Lander", "KQ1",
    "Kangaroo", "Karateka", "Killerwat", "Knightlore", "LSL1", "LSL20", "LSL3", "LSL4", "LSL6", "LSL7", "LTUT", "LastNinja1", "Lode",
    "Maniac", "ManicMiner", "Miner", "MonkeyIsland", "Montezuma", "Moon", "MrRobot", "Nebulus", "Oblivion", "Oblivion2", "OperationWolf",
    "OperationWolf2", "PAC2", "Penta", "Phara", "Pipeline", "Pitfall", "Pitfall3", "Pitfall4", "Pitstop", "Pooyan",
    "Portal1", "Prince1", "Prince2", "RRR", "RickDangerous", "Robin", "SOF", "SQ1", "ST", "SVS1", "SVS10", "SVS2", "SVS3", "SVS4",
    "SW2", "SW4", "Scramble2", "Scramble3", "Scramble4", "Skyrim", "Soccer", "Sorcery2", "Sorcery3", "TR1", "TR1", "TR10", "TR2", "TR2", "TR3",
    "TheSentinel", "Tut2", "UU", "UU2", "Ultima1", "Ultima2", "Under", "VIC20", "Valhalla", "Vixen1", "Vixen2", "WDW", "WOW1",
    "WOW2", "Walls", "Wally", "Winter", "Wolf1", "Wolf2", "Zak", "Zaxxon", "ZimSalaBim", "Zong", "galaxian", "sabre2", "trash",
    "zx1", "BlueMax4", "Witcher5", "LSL9", "Shamus1", "PharaohCurse3", "Witcher4", "Witcher3", "TempleOfApshai", "Witcher2", "KnightLore2",
    "Witcher1", "Spelunker", "ShamusCase2", "Ishar2", "Ishar1", "Jungle1", "Pitfall5", "PharaohCurse2", "Frontier", "LSL8", "SP2", "SP1",
    "SVS24", "SVS23", "KQ10", "Shamus20", "Pitfall21", "Apshai6", "Apshai5", "MontyMole", "PacClose", "PacGhost", "Pitfall20", "SVS22", "SVS21",
    "Apshai4", "Apshai3", "Paperboy", "JungleStory", "RobinOfTheWood2", "Pyjamarama", "SammyLightfoot", "ThePawn", "KokotoniWilf", "Cauldron1",
    "Zeppelin2", "TimeTunnel", "SP3", "AC2", "Hero30", "SVS30", "AirWolf", "AA41", "AA40", "SeaWolf", "GIJoe10",
    "Hobbit1", "Hobbit3", "Ghostbusters2", "Commando3", "EOB20", "Hobbit6", "Hobbit7", "Hobbit8", "Hobbit9", "AticAtac1", "Infiltrator1", "ManicMiner2",
    "ManicMiner3", "Prince3", "Infiltrator2", "1942_2", "Arnie1", "BTF1", "BeachHead5", "Biggles1", "BlueThunder1", "BrianBloodaxe1", "BrideOfFrakenstein1",
    "BruceLee1", "Captive", "EnigmaForce", "Fred3", "Fred4", "JSW4", "ManiacMansion2", "PQ1", "Pengo", "Pirates", "PolePosition", "Silkworm1", "SirFred1",
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
    "Rambo3", "RobinOfTheWood4", "SP111", "ST2", "SammyLightfoot2", "SirFred4", "Skyrim9", "SkyrimElf", "Tutankham105", "UW27", "WOW104", "WinterGames11"
];

//const DECAL_PAINTINGS = [];
console.log("DECAL_PAINTINGS", DECAL_PAINTINGS.length, DECAL_PAINTINGS.sort());

const LIGHT_DECALS = ["WallLamp"];

const DECAL_CRESTS = ["LS", "Skull4", "Skull3", "Skull2", "Skull1", "Crack4", "Crack3", "Skeleton11", "Skeleton12"];
//const DECAL_CRESTS = [];
console.log("DECAL_CRESTS", DECAL_CRESTS.sort());

const COMMON_GATES = ["WoodenGate1"];
const RED_GATES = ["RedGate1"];
const SILVER_GATES = ["SilverGate1"];
const GOLD_GATES = ["GoldGate1"];

console.log("%cMAP for CrawlMaster2 loaded.", "color: #888");
var MAP = {
    1: {
        data: `
        {"width":"16","height":"16","map":"BB9ABB10AA26BAA10BAA20BAA9BAA8BB2AA2BAA6BAA9BAA6BB3ABAA2BB6AA2BAA10BABAA2BB2AA8BB9ABB2ABAA2BAA2BB2AA2BAA7BB2AA5BABABB2AA4BB6ABB2ABAA2BB9ABB18A$"}
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
    },

};

var SPAWN = {
    spawn(level) {
        console.log("spawning ... level", level);
        this.decals(level);
        this.lights(level);
        this.gates(level);
        this.items(level);
    },
    decals(level) {
        const decalsLocations = [{ x: 2, y: 2, f: 'FRONT' }, { x: 5, y: 2, f: 'FRONT' }, { x: 3, y: 5, f: 'BACK' }, { x: 0, y: 3, f: 'RIGHT' }, { x: 7, y: 3, f: 'LEFT' },
        { x: 2, y: 7, f: 'BACK' }, { x: 3, y: 0, f: 'FRONT' }];

        for (let D of decalsLocations) {
            const picture = DECAL_PAINTINGS.chooseRandom();
            console.log("picture", picture);
            DECAL3D.add(new StaticDecal(new Grid(D.x, D.y), D.f, SPRITE[picture], "picture", picture));
        }

        const crestLocations = [{ x: 0, y: 5, f: 'RIGHT' }];
        for (let D of crestLocations) {
            const crest = DECAL_CRESTS.chooseRandom();
            console.log("crest", crest);
            DECAL3D.add(new StaticDecal(new Grid(D.x, D.y), D.f, SPRITE[crest], "crest", crest));
        }
    },
    lights(level) {
        const lightLocations = [{ x: 1, y: 0, f: 'FRONT' }, { x: 6, y: 0, f: 'FRONT' }, { x: 11, y: 15, f: 'BACK' }, { x: 15, y: 9, f: 'LEFT' }];
        for (let L of lightLocations) {
            const light = LIGHT_DECALS.chooseRandom();
            LIGHTS3D.add(new LightDecal(new Grid(L.x, L.y), L.f, SPRITE[light], "light", light));
        }
    },
    gates(level) {
        let GA = MAP[level].map.GA;
        const gateLocations = [{ x: 6, y: 7, type: 'common' }, { x: 7, y: 8, type: 'common' }, { x: 10, y: 1, type: 'red' }, { x: 10, y: 6, type: 'silver' },
        { x: 13, y: 6, type: 'gold' }];


        for (let L of gateLocations) {
            let gatePic = null;
            let grid = new Grid(L.x, L.y);
            GA.addDoor(grid); //needs to be removed if door set properly in the map!!
            switch (L.type) {
                case "common":
                    gatePic = COMMON_GATES.chooseRandom();
                    break;
                case "red":
                    gatePic = RED_GATES.chooseRandom();
                    break;
                case "silver":
                    gatePic = SILVER_GATES.chooseRandom();
                    break;
                case "gold":
                    gatePic = GOLD_GATES.chooseRandom();
                    break;
                default:
                    console.error("spawning gate, gate type error", type);
                    break;
            }
            GATE3D.add(new Gate(grid, SPRITE[gatePic], gatePic, L.type, GATE3D));
            GA.closeDoor(grid);
        }
    },
    items(level) {
        console.log("spawning items");
        const itemLocations = [
            { grid: new FP_Grid(1.5, 8.5), type: COMMON_ITEM_TYPE.GoldCube },
            { grid: new FP_Grid(4.5, 2.5), type: COMMON_ITEM_TYPE.GoldBar },
            { grid: new FP_Grid(3.5, 2.5), type: COMMON_ITEM_TYPE.GoldKey },
            { grid: new FP_Grid(2.5, 3.5), type: COMMON_ITEM_TYPE.SilverKey },
            { grid: new FP_Grid(5.5, 3.5), type: COMMON_ITEM_TYPE.RedKey },
        ];

        for (let item of itemLocations) {
            //console.log("Item", item);
            let Item3D = new FloorItem3D(item.grid, item.type);
            //console.log("Item3D", Item3D);
            ITEM3D.add(Item3D);
        }
    }

};

const COMMON_ITEM_TYPE = {
    GoldKey: {
        name: "GoldKey",
        inventorySprite: "GoldKeyBig",
        category: "key",
        color: "Gold",
        element: "KEY",
        scale: 1 / 2 ** 3,
        glueToFloor: true,
        texture: "Gold",
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
    },
    GoldCube: {
        name: "GoldCube",
        category: "gold",
        element: "CUBE_CENTERED",
        scale: 1 / 2 ** 5,
        glueToFloor: true,
        texture: "Gold",
        minVal: 10,
        maxVal: 50
    }
};
