/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */

"use strict";

const DECAL_PAINTINGS = ["AA1", "AA2", "AA3", "AA4", "AA5", "AA7", "AA8", "AA9", "AMC", "Amberstar", "Apshai", "ArcticShipwreck", "Arena",
    "Aztec", "BC1", "BFF", "Bagitman", "Barbarian1", "Barbarian5", "BeachHead", "Blackwyche", "BlueMax", "BlueMax2", "BlueMax3", "BoogaBoo1", "BoogaBoo3",
    "C64", "CH1", "CSB1", "CW1", "CW10", "CW2", "CW3", "CW5", "CW6", "Castle", "CastleTerror", "Cavelon", "Cavelon3", "Choplifter", "Commando2",
    "CrystalCastles", "Cuthbert1", "CyberPunk1", "DDID2", "DK", "DK2", "DM1", "DM11", "DM12", "DM13", "DM2", "DM3", "DM4", "DM5", "DM6", "DM7",
    "DigDug", "Drelbs", "EOB1", "EOB2", "EOB3", "EOB4", "Eric", "FA2", "FA3", "FF1", "FF2", "FF4", "Falcon", "FalconPatrol2", "FireAnt",
    "FranticFreddie", "Fred1", "Fred2", "Frogger", "Galaga1", "Galaxian3", "Ghostbusters", "Gods", "Goonies", "GreenBeret", "HL1", "HL2", "HL3",
    "HL4", "HL5", "HOB1", "HOB11", "HOB2", "HOB4", "HOB5", "Hero1", "Hero10", "Hero2", "Hero3", "Horace", "Horace2", "HoraceSki", "Hunchback",
    "IK1", "IM", "Iceman", "Imhotep", "Impossible_Mission4", "Invaders", "JSW", "JSW2", "JSW3", "JetPac", "Jumpman", "JumpmanJr", "Jupiter_Lander", "KQ1",
    "Kangaroo", "Karateka", "Killerwat", "Knightlore", "LSL1", "LSL2", "LSL20", "LSL3", "LSL4", "LSL6", "LSL7", "LTUT", "LastNinja1", "Lode",
    "Maniac", "ManicMiner", "Miner", "MonkeyIsland", "Montezuma", "Moon", "MrRobot", "Nebulus", "OMine", "Oblivion", "Oblivion2", "OperationWolf",
    "OperationWolf2", "PAC2", "Paratroopers", "Penta", "Phara", "Pipeline", "Pitfall", "Pitfall2", "Pitfall3", "Pitfall4", "Pitstop", "Pooyan",
    "Portal1", "Prince1", "Prince2", "RRR", "RickDangerous", "Robin", "SOF", "SQ1", "ST", "SVS1", "SVS10", "SVS11", "SVS2", "SVS3", "SVS4",
    "SW2", "SW4", "Scramble2", "Scramble3", "Scramble4", "Skyrim", "Soccer", "Sorcery2", "Sorcery3", "TR1", "TR1", "TR10", "TR2", "TR2", "TR3",
    "TheSentinel", "Tut", "Tut2", "UU", "UU2", "Ultima1", "Ultima2", "Under", "VIC20", "Valhalla", "Vixen1", "Vixen2", "WDW", "WG2", "WG3", "WOW1",
    "WOW2", "WOW3", "Walls", "Wally", "Winter", "Wolf1", "Wolf2", "Zak", "Zaxxon", "ZimSalaBim", "Zong", "galaxian", "sabre2", "ski", "trash",
    "zx1", "WG4", "BlueMax4", "Witcher5", "LSL9", "Shamus1", "PharaohCurse3", "Witcher4", "Witcher3", "TempleOfApshai", "Witcher2", "KnightLore2",
    "Witcher1", "Spelunker", "ShamusCase2", "Ishar2", "Ishar1", "Jungle1", "Pitfall5", "PharaohCurse2", "Frontier", "LSL8", "SP2", "SP1", "EveLSL",
    "SVS24", "SVS23", "KQ10", "Shamus20", "Pitfall21", "Apshai6", "Apshai5", "MontyMole", "PacClose", "PacGhost", "Pitfall20", "SVS22", "SVS21",
    "Apshai4", "Apshai3", "Paperboy", "JungleStory", "RobinOfTheWood2", "Pyjamarama", "SammyLightfoot", "ThePawn", "KokotoniWilf", "Cauldron1",
    "Zeppelin2", "TimeTunnel", "SP3", "AC2", "Hero30", "SVS30", "AirWolf", "AA41", "AA40", "SeaWolf", "GIJoe10",
    "Hobbit1", "Hobbit3", "Ghostbusters2", "Commando3", "EOB20", "Hobbit6", "Hobbit7", "Hobbit8", "Hobbit9", "AticAtac1", "Infiltrator1", "ManicMiner2",
    "ManicMiner3", "Prince3", "Infiltrator2", "1942_2", "Arnie1", "BTF1", "BeachHead5", "Biggles1", "BlueThunder1", "BrianBloodaxe1", "BrideOfFrakenstein1",
    "BruceLee1", "Captive", "EnigmaForce", "Fred3", "Fred4", "JSW4", "ManiacMansion2", "PQ1", "Pengo", "Pirates", "PolePosition", "Silkworm1", "SirFred1",
    "SirFred2", "SirFred3", "SuperDogfight", "SuperDogfight2", "Unknown1", "BattleThroughTime", "BOF3", "Chopper2", "Cliffhanger", "F1", "IM10", "MoonPatrol", "SummerGames10",
    "FF5", "LaraCroft1", "LaraCroft2", "IM13", "FF101","FF100","AA100"
];

//const DECAL_PAINTINGS =["IM13", "FF101","FF100","AA100"];
//const DECAL_PAINTINGS =["WallLamp"];
console.log("DECAL_PAINTINGS", DECAL_PAINTINGS.length, DECAL_PAINTINGS.sort());

const LIGHT_DECALS = ["WallLamp"];

console.log("%cMAP for CrawlMaster2 loaded.", "color: #888");
var MAP = {
    1: {
        data: `
        {"width":"8","height":"8","map":"BB5AA12BABB2AA3BABAA6BB5ABB3ABAA2BAA4BB12A$"}
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
        //floor: "GreenDungeonWall", //keep
        //floor: "Wall7",
        floor: "MorgueFloor",

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
        console.log("spawning ...");
        this.decals(level);
        this.lights(level);
    },
    decals(level) {
        console.log("spawning decals ... ", level);
        const decalsLocations = [{ x: 2, y: 2, f: 'FRONT' }, { x: 5, y: 2, f: 'FRONT' }, { x: 3, y: 5, f: 'BACK' }, { x: 0, y: 3, f: 'RIGHT' }, { x: 7, y: 3, f: 'LEFT' }];

        for (let D of decalsLocations) {
            const picture = DECAL_PAINTINGS.chooseRandom();
            console.log("picture", picture);
            DECAL3D.add(new StaticDecal(new Grid(D.x, D.y), D.f, SPRITE[picture], "picture"));
        }

        console.log("DECAL3D", DECAL3D);
    },
    lights(level){
        console.log("spawning lights ... ", level);
        const lightLocations = [{ x: 1, y: 0, f: 'FRONT' }, { x: 4, y: 0, f: 'FRONT' }];
        for (let L of lightLocations){
            const light = LIGHT_DECALS.chooseRandom();
            LIGHTS3D.add(new StaticDecal(new Grid(L.x, L.y), L.f, SPRITE[light], "light"));
        }
    },

};
