/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */

"use strict";

/** Decals */
const DECAL_PAINTINGS = [
    "1942_200", "1942_201", "1943_200", "AA100", "AMC2", "AMC3", "ActecChallenge2", "AirWolf200", "AirWolf201", "AirWolf31", "AlienKong", "AlleyKat", "AmberMoon200", "AmberStar200", "AmberStar201", "AmberStar202",
    "AmberStar203", "Amiga", "AntAttack2", "AntAttack200", "AntAttack4", "AppleLisa", "Apshai10", "ArabianNights1", "Arena2", "Arena200", "Arena201", "Arnie200", "Arnie201", "Arnie202", "ArticShipwreck2", "ArticShipwreck7",
    "AtariFalcon", "AtariST", "Athanor200", "Athanor201", "AticAtac110", "AticAtac111", "AticAtac112", "AticAtac113", "AticAtac114", "AticAtac115", "AticAtac116", "AticAtac117", "AticAtac130", "AticAtac131", "AticAtac140",
    "AticAtac200", "AticAtac201", "AticAtac202", "AticAtac203", "AticAtac204", "AticAtac205", "AticAtac206", "AztecChallenge100", "AztecChallenge101", "AztecChallenge110", "AztecChallenge111", "AztecChallenge112", "AztecChallenge130",
    "BC10", "BC103", "BC11", "BC90", "BackToFuture200", "BackToFuture201", "BackToNature1", "Bagitman11", "Bagitman90", "Barbarian100", "Barbarian110", "Barbarian111", "Barbarian112", "Barbarian13", "Barbarian130",
    "Barbarian131", "Barbarian3", "BattleChopper", "BattleThroughTime2", "BeachHead100", "BeachHeadReplace", "Belwothe", "BetrayedAlliance", "BeyondForbiddenForest110", "BeyondForbiddenForest111", "BeyondForbiddenForest2",
    "Biggles2", "Blackwyche110", "Blackwyche2", "BladeRunner", "BladeRunner7", "BlueMax11", "BlueMax20", "BoogaBoo11", "BoogaBoo4", "BoogaBoo41", "BoogaBoo90", "Breakout200", "BrianBloodaxe11", "BrianBloodaxe20",
    "BrianBloodaxe70", "BrianBloodaxe71", "BrideOfFrankenstein", "BrideOfFrankenstein200", "BruceLee200", "C64", "C64_hard", "CBM_VIC20", "CCC1", "CamelotWarriors", "Captive199", "Captive200", "Captive201", "CastleHaunt",
    "CastleHaunt200", "CastleOFTerror11", "CastleOfTerror3", "CastleOfTerror4", "CastleOfTerror91", "CastleWolfenstein21", "Cauldron10", "Cauldron8", "Cavelon11", "Cavelon13", "Cavelon4", "Choplifter11",
    "Choplifter12", "ChuckieEgg1", "ChuckieEgg2", "CodenameIceman2", "CodenameIceman3", "CodenameIceman98", "Commando100", "Commando200", "Commando201", "CongoBongo2", "CrawlMaster110", "CrawlMaster111", "CrawlMaster112",
    "CrawlMaster113", "CrawlMaster114", "CrawlMaster115", "CrawlMaster130", "CrawlMaster131", "CrawlMaster132", "CrawlMaster133", "CrawlMaster2", "CrystalCastles2", "CrystalCastles200", "CrystalCastles90",
    "CrystalsOfZong10", "Cuthbert20", "Cuthbert70", "Cuthbert90", "CyberPunk200", "CyberPunk201", "DM100", "DM103", "DM104", "DM105", "DM106", "DM107", "DM90", "Daggerfall3", "Daggerfall4", "Decathlon200", "Defender110",
    "DefenderOfTheCrown", "DefenderOfTheCrown100", "DefenderOfTheCrown110", "DigDug2", "DonkeyKong100", "DonkeyKong200", "DonkeyKong99", "DotHunter", "DragonSkulle110", "Drelbs2", "Drelbs3", "DungeonMaster100",
    "DungeonMaster200", "DungeonMaster201", "DungeonMaster202", "DungeonMaster203", "DungeonMaster204", "DungeonMaster205", "DungeonMaster206", "DungeonMaster70", "DungeonMaster91", "DungeonMaster92",
    "DungeonMaster96", "DungeonMaster97", "DynaBlaster60", "EOB11", "ESB", "Elite", "Elite100", "Elite201", "ElvenWarrior1", "Elvira1", "Elvira2", "Elvira3", "EnigmaForce2", "EricTheViking10", "EveryoneIsAWally2",
    "EveryoneIsAWally70", "EveryoneIsAWally71", "EyeOfTheBeholder100", "EyeOfTheBeholder101", "EyeOfTheBeholder110", "EyeOfTheBeholder111", "EyeOfTheBeholder112", "EyeOfTheBeholder130", "EyeOfTheBeholder140",
    "EyeOfTheBeholder70", "EyeOfTheBeholder90", "F1-1", "F2", "F4", "F50", "FF100", "FF101", "FF5", "FalconPatrol7", "FalconPatrol70", "FalconPatrol71", "FalconPatrol72", "FalconPatrol8", "FalconPatrol9",
    "FalconPatrol99", "FireAnt2", "FireAnt21", "FireAnt60", "FireAnt70", "ForbiddenForest110", "ForbiddenForest90", "ForbiddenForest91", "ForbiddenForest99", "ForgottenForest1", "FortApocalypse", "FortApocalypse41",
    "FranticFreddie3", "Fred100", "Fred101", "Fred102", "Fred110", "Fred111", "Fred112", "Fred113", "Fred130", "Fred21", "Friday70", "Frogger110", "Frogger111", "Frogger112", "Frogger2", "GIJoe70",
    "GIJoe71", "GI_Joe2", "Galaga70", "Galaga71", "Galaxians10", "GatewayToApshai11", "GatewayToApshai110", "GatewayToApshai130", "GatewayToApshai140", "Gauntlet", "Geos", "GhostFace1", "GhostFace2",
    "GhostFace3", "GhostFace4", "Ghostbusters200", "Ghostbusters201", "Gods2", "Gods60", "Gods70", "Gods99", "GoldenAxe2", "Goonies5", "Goonies70", "Goonies88", "Goonies90", "Grog1", "HalfLife 89",
    "HalfLife11", "HalfLife12", "HalfLife13", "HalfLife14", "HalfLife50", "HalfLife60", "HalfLife70", "HalfLife71", "HalfLife72", "HalfLife88", "HalfLife91", "HeadOverHeels3", "HeavyOnTheMagick60",
    "Hero100", "Hero103", "Hero104", "Hero50", "Hero51", "Hero52", "Hero60", "Hero70", "Hero71", "Hero72", "Hero80", "Hero81", "Hero82", "HeroQuest50", "HeroesOfKarn80", "Hobbit101", "HoraceSki2",
    "HunchBack10", "HunchBack70", "HunchBack71", "HungryHorace11", "HungryHorace12", "IK2", "IK200", "IM13", "Iceman70", "Imhotep2", "Imhotep60", "ImpossibleMission11", "ImpossibleMission130",
    "ImpossibleMission140", "ImpossibleMission90", "ImpossibleMsission110", "ImpossibleMsission111", "ImpossibleMsission112", "ImpossibleMsission113", "Infiltrator60", "Infiltrator70", "Infiltrator71",
    "Invaders2", "Invasion", "Ishar11", "Ishar13", "Ishar14", "Ishar15", "Ishar70", "Ishar71", "Ishar72", "Ishar80", "Ishar98", "Ishar99", "JSW10", "JSW110", "JSW111", "JSW112", "JSW113", "Jawbreaker",
    "JetPac50", "JetPac70", "JetSetWilly11", "JetSetWilly60", "JetSetWilly88", "JetSetWilly89", "Jetpac3", "Jumpman3", "Jumpman70", "JungleHunt12", "JungleHunt2", "JungleHunt50", "JungleHunt89",
    "JungleStory60", "JupiterLander70", "JupiterLander99", "KL10", "KL102", "KQ100", "KQ101", "KQ102", "Kangaroo50", "Kangaroo60", "Karateka200", "Karn1", "Killerwat50", "Killerwat51", "Killerwat60",
    "KingsQuest50", "KingsQuest51", "KingsQuest52", "KingsQuest53", "KingsQuest60", "KnightLore110", "KnightLore111", "KnightLore31", "KokotoniWilf2", "KokotoniWilf60", "KokotoniWilf70", "LCP", "LSL100",
    "LSL101", "LSL102", "LSL103", "LSL31", "LSL_Eve2", "LadyTut10", "LadyTut102", "LadyTut60", "LaraCroft1", "LaraCroft102", "LaraCroft123", "LaraCroft2", "LaraCroft21", "LastNinja10", "LastNinja110",
    "LastNinja111", "LastNinja130", "LastNinja131", "LastNinja140", "LeisureSuitLarry200", "LeisureSuitLarry201", "LeisureSuitLarry300", "LeisureSuitLarry50", "LeisureSuitLarry60", "LeisureSuitLarry61",
    "LeisureSuitLarry70", "LeisureSuitLarry71", "LeisureSuitLarry72", "LeisureSuitLarry73", "LeisureSuitLarry74", "LeisureSuitLarry75", "LeisureSuitLarry76", "LeisureSuitLarry77", "LeisureSuitLarry88",
    "LeisureSuitLarry89", "LeisureSuitLarry90", "LeisureSuitLarry91", "LeisureSuitLarry93", "LeisureSuitLarry94", "LodeRunner10", "LodeRunner11", "ManiacMansion11", "ManicMiner11", "ManicMiner12",
    "ManicMiner14", "ManicMiner50", "ManicMiner51", "ManicMiner52", "ManicMiner60", "ManicMiner61", "ManicMiner62", "ManicMiner63", "ManicMiner64", "MassEffect1", "MassEffect2", "MatchPoint2", "Maze",
    "Miner2049_1", "Miner3", "Miner70", "Miranda1", "MissileCommand", "MonkeyIsland100", "MonkeyIsland101", "MonkeyIsland102", "MonkeyIsland110", "MonkeyIsland111", "MonkeyIsland112", "MonkeyIsland140",
    "MonkeyIsland141", "MonkeyIsland142", "MonkeyIsland143", "Montezuma200", "Montezumas revenge2", "MontezumasRevenge90", "MontyMole100", "MontyMole110", "MontyMole111", "MontyMole112", "MontyMole50",
    "MontyMole51", "MontyMole52", "MontyMole99", "MoonBuggy", "MoonZX", "Morrowind100", "Morrowind130", "Morrowind140", "Movie", "MrRobot11", "MrRobot60", "MrRobot70", "Nebulus2", "Nebulus50", "Nebulus90",
    "Neptunes daughters", "OReillyMine50", "ORileysMine2", "ORileysMine60", "Oblivion100", "Oblivion110", "Oblivion140", "Oblivion141", "OilWell50", "OilWell51", "OlympicSkier", "OlympicSkier6",
    "OperationWolf50", "PQ3", "PWE", "Pacman200", "Pacman201", "Paperboy2", "Paperboy50", "Paratroopers2", "Paratroopers3", "PharaohCurse11", "PharaohCurse110", "PharaohCurse111", "PharaohCurse112",
    "PharaohCurse130", "PharaohCurse140", "Pipeline50", "Pipeline51", "Pipeline88", "Pirates200", "Pitfall100", "Pitfall2-100", "Pitfall23", "Pitfall27", "Pitfall50", "Pitfall60", "Pitfall70",
    "Pitfall71", "Pitfall72", "Pitfall73", "Pitfall88", "Pitfall89", "Pitfall90", "Pitfall91", "Pitfall96", "Pitstop200", "Pitstop3", "Platoon50", "Pooyan3", "Popeye2", "Portal130", "Portal131",
    "Portal132", "Portal140", "Predator50", "Prince4", "Prince41", "Prince50", "Prince51", "PrinceMac", "Pssst", "PurpleHeart", "Pyjamarama11", "Pyjamarama50", "Pyjamarama70", "RMC50", "RadarRatRace10",
    "RadarRatRace20", "Rambo11", "Rambo3", "RedWarrior1", "ReturnToCastleWolfenstein11", "ReturnToCastleWolfenstein12", "ReturnToCastleWolfenstein13", "ReturnToCastleWolfenstein14", "RickDangerous11",
    "RickDangerous50", "RickDangerous51", "RickDangerous60", "RickDangerous70", "RiverRaid2", "RiverRaid70", "RobinHood3", "RobinOfTheWood4", "RobinOfTheWood50", "RobinOfTheWood88", "RobinToTheRescue1",
    "RobinToTheRescue89", "RobinsonsRequiem1", "SP111", "SP4", "SP60", "SP62", "SP63", "SP64", "SP65", "SP66", "SP67", "SP68", "SP69", "SP70", "SP71", "ST2", "SVS100", "SVS1001", "SVS101", "SVS1011",
    "SVS102", "SVS103", "SVS110", "SVS111", "SVS112", "SVS130", "SVS131", "SVS132", "SabreWulf11", "SabreWulf50", "SabreWulf87", "SabreWulf89", "SabreWulf99", "SammyLightfoot2", "SammyLightfoot4",
    "SasbreWulf60", "Scarab200", "Scramble10", "Scramble23", "Scramble60", "Scramble7", "ScubaDive60", "SeaWolf60", "SeaWolf88", "Sentinel2", "Sentinel50", "Serpentine50", "SexOlympics1", "SexOlympics2",
    "Shamus4", "Shamus60", "Shamus91", "Silkworm200", "SirFred4", "SirFred60", "SirFred61", "SirFred62", "SirFred70", "SirFred88", "Ski23", "Ski64", "SkoolDaze50", "SkoolDaze60", "SkoolDaze61",
    "Skullkeep", "Skyrim3", "Skyrim9", "SkyrimElf", "Soccer3", "Soccer99", "Sorcery31", "Sorcery70", "Sorcery88", "Sp61", "SpaceQuest10", "SpaceQuest103", "SpaceQuest200", "SpectrumGame1", "Spelunker70",
    "SpikesPeak1", "SpyHunter200", "SpyVsSpy41", "SumerGames60", "SuperDogfight3", "SwordOfFargoal200", "SwordOfFargoal201", "TempleOfApshai70", "TempleOfApshai89", "TheHobbit13", "TheHobbit14", "TheHobbit15",
    "TheHobbit16", "TheHobbit70", "TheHobbit71", "TheHobbit72", "TheHobbit73", "TheHobbit88", "TheHobbit89", "TheHobbit99", "TimeTunnel50", "TimeTunnel60", "TimeTunnel70", "TombRaider100", "TombRaider101",
    "TombRaider102", "TombRaider103", "TombRaider104", "TombRaider105", "TombRaider106", "TombRaider107", "TombRaider108", "TombRaider109", "TombRaider110", "TombRaider111", "TombRaider112", "TombRaider113",
    "TombRaider130", "TombRaider95", "TombRaider96", "TombRaider97", "TombRaider98", "TombRaider99", "Tombraider140", "Tombraider141", "Tornado1", "Tornado88", "Trashman2", "Triss", "TurboEsprit200",
    "Tutamkham50", "Tutanham11", "Tutanham12", "Tutankham102", "Tutankham104", "Tutankham105", "Tutankhamun88", "UW10", "UW27", "Ultima11", "Ultima50", "Ultima70", "Ultima89", "Underwurlde100",
    "Underwurlde110", "Underwurlde111", "Underwurlde130", "Underwurlde131", "Underwurlde140", "Underwurlde141", "Unknown3", "Unknown30", "Uridium2", "VIC20-2", "Valhalla2", "Valhalla88", "Vixen3",
    "Vixen50", "Vixen51", "Vixen70", "Vixen79", "Vixen89", "WOW10", "WOW104", "Wadca", "Wally88", "Wally99", "WhoDaresWins1", "WhoDaresWins10", "WhoDaresWins50", "WhoDaresWins70", "WhoDaresWins71",
    "WhoDaresWins88", "WinterGames10", "WinterGames11", "WinterGames79", "Witcher100", "Witcher101", "Witcher102", "Witcher103", "Witcher110", "Witcher111", "Witcher112", "Witcher113", "Witcher130",
    "Witcher47", "WizardOfWor89", "Wolf10", "Wolfenstein31", "Wolfenstein50", "Wolfenstein70", "Yennefer", "Yennefer21", "Yeppelin70", "ZX Spectrum", "ZX81-89", "Zak50", "Zak51", "ZakMcKraken89",
    "Zaxxon3", "Zaxxon70", "Zaxxon89", "Zeppelin4", "Zeppelin50", "Zeppelin88", "Zeppelin89", "ZimSalaBim2", "ZimSalaBim200", "ZimSalaBim201"
];
if (ENGINE.verbose) console.log("DECAL_PAINTINGS", DECAL_PAINTINGS.length, DECAL_PAINTINGS.sort());

/** Light decals */

const LIGHT_DECALS = [
    { sprite: "WallLamp", color: LIGHT_COLORS.standard },
    { sprite: "WallLamp2", color: LIGHT_COLORS.standard },
    { sprite: "WallLamp", color: LIGHT_COLORS.standard },
    { sprite: "WallLamp2", color: LIGHT_COLORS.standard },
    { sprite: "WallLamp3", color: LIGHT_COLORS.red },
    { sprite: "WallTorch", color: LIGHT_COLORS.fire },
    { sprite: "Lamp4", color: LIGHT_COLORS.yellowgreen }
];

const LIGHT_DECAL_SPRITES = ["WallLamp10", "WallLamp11", "WallLamp12", "WallLamp13", "WallLamp14", "WallLamp15",
    "WallLamp16", "WallLamp17", "WallLamp18", "WallLamp19", "WallLamp20", "WallLamp9",
    "WallLamp31", "WallLamp32", "WallLamp33", "WallLamp34", "WallLamp35",
    "Lamp40", "Lamp41", "Lamp42", "Lamp43", "Lamp44", "Lamp45", "Lamp46", "Lamp47", "Lamp48", "Lamp49", "Lamp50", "Lamp51", "Lamp52", "Lamp53",
];

const LIGHT_COLOR_TYPES = ["standard", "standardDimmed", "standardRedish", "fire", "dim", "dimRed"];

for (const LS of LIGHT_DECAL_SPRITES) {
    LIGHT_DECALS.push({ sprite: LS, color: LIGHT_COLORS[LIGHT_COLOR_TYPES.chooseRandom()] });
}

/** Crests */
const DECAL_CRESTS = ["LS", "Skull4", "Skull3", "Skull2", "Skull1", "Crack4", "Crack3", "Skeleton11", "Skeleton12", "Crack20", "Crack21", "DancingSkeletons2",
    "PrayingSkeleton10", "SittingSkeleton2", "Skeleton21", "Skull10", "Skull11", "WOWc1", "WOWc2", "Reaper", "AticAtacCrest1",
    "Skeleton20", "Skeleton121", "Skeleton23", "Skull20", "Skull21"];
const BOTTOM_CRESTS = ["Grate1_128"];
const TOP_CRESTS = ["Drain2_96", "Drain64", "Grate1_128", "RoundGrille96", "FlatPond", "FlatPond2", "FlatPond3", "FlatPond4", "FlatPond5", "FlatPond6", "FlatPond7"];


const DECAL_SOURCES = { picture: DECAL_PAINTINGS, crest: DECAL_CRESTS };
const TOP_BOTTOM_SOURCES = { TOP: TOP_CRESTS, BOTTOM: BOTTOM_CRESTS };
if (ENGINE.verbose) console.log("DECAL_CRESTS", DECAL_CRESTS.sort());

console.log("%cMAP for CrawlMaster2 loaded.", "color: #888");

/** Map definitions */
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
        width: 40,
        height: 40,
        floor: "DarkMarble1",
        ceil: "Sand6",
        wall: "ColorfullWall1",
        minPad: 3,
    },
    3: {
        width: 37,
        height: 37,
        floor: "RedMArbleFloor5",
        ceil: "Wood1",
        wall: "GreyWall31",
        minPad: 2,
    },
    4: {
        width: 37,
        height: 37,
        floor: "MC_Floor12",
        ceil: "RedBricks45",
        wall: "BrownWall39",
        minPad: 2,
    },
    5: {
        width: 37,
        height: 37,
        floor: "Tile",
        ceil: "OldFloor",
        wall: "Wall7",
        minPad: 3,
    },
    999: {
        data: `
        {"width":"16","height":"16","map":"BB5ABB7AA2BABAA12BAA2BB4AA5BAA2BAA19BAA11BAA5BAA2BAA2BAA5BAA12BAA3BB6ABAA2BABB4AA11BB2AA2BAA3BB2AA3BB9AA6BB2ABAA2BAA2BABB2AA2BAA7BB3ABAA2BABABB2AA3BABB8ABB3AA4BAA2BB9ABB18A$"}
        `,
        floor: "GreenDungeonWall",
        ceil: "GreyDungeonFloor",
        wall: "DungeonWall",
        minPad: 3,
        entrance: new Pointer(new Grid(0, 4), RIGHT),
        exit: new Pointer(new Grid(15, 4), LEFT),
    },
};

const MONSTER_LAYOUT = {
    1: {
        start: {
            N: 1,
            monster: { Bat: 1 },
        },
        corridor: {
            N: 25,
            monster: { Bat: 1, MissGalaxyGreen: 2, RedGoldBat: 1, MissGalaxy: 1, Spider: 1, GhostFace: 1, SpiderGreen: 0.5 }
        },
        common: {
            N: 2,
            monster: { Bat: 1, MissGalaxyGreen: 3, RedGoldBat: 1, MissGalaxy: 2, Spider: 1, GhostFace: 1, SpiderGreen: 0.5 }
        },
        Gold: {
            N: 2,
            monster: { Spider: 1, GhostFace: 2, GhostFaceGreen: 1.5, SpiderGreen: 2, MissGalaxyGold: 0.5 },
            boss: { MissWhite_BossL1: 1 }
        },
        Silver: {
            N: 2,
            monster: { Spider: 1, GhostFace: 2, GhostFaceGreen: 1, SpiderGreen: 1.2 },
            boss: { GhostFaceGreen: 1 },
        },
        firstKey: {
            N: 2,
            monster: { Bat: 1, MissGalaxyGreen: 2, MissGalaxy: 3, Spider: 2, GhostFace: 1, GhostFaceGreen: 0.25, SpiderGreen: 0.5 },
            boss: { SpiderGreen: 1 },
        },
        Red: {
            N: 2,
            monster: { Spider: 1, MissGalaxy: 1, GhostFace: 2, GhostFaceGreen: 1, SpiderGreen: 1.1 },
            boss: { GhostFace: 1 },
        },
        temple: {
            N: 1,
            monster: { Bat: 1, MissGalaxyGreen: 1, RedGoldBat: 1 },
        }
    },
    2: {
        start: {
            N: 1,
            monster: { RedGoldBat: 1 },
        },
        corridor: {
            N: 25,
            monster: { MissGalaxyGreen: 1, RedGoldBat: 1, Bat: 1, MissGalaxy: 3, Spider: 3, GhostFace: 3, SpiderGreen: 5, Astro: 3, MissWhite: 2, Viking: 1, MissGalaxyGold: 2 }
        },
        common: {
            N: 2,
            monster: { MissGalaxy: 3, Spider: 3, GhostFace: 3, SpiderGreen: 5, MissWhite: 2, Astro: 2, Viking: 1, MissGalaxyGold: 2 }
        },
        Gold: {
            N: 2,
            monster: { SpiderGreen: 1, GhostFace: 1, GhostFaceGreen: 2, MissWhite: 4, Astro: 5, Viking: 4, MissGalaxyGold: 5 },
            boss: { Hulk_BossL2: 1 }
        },
        Silver: {
            N: 2,
            monster: { SpiderGreen: 1, GhostFace: 1, GhostFaceGreen: 2, MissWhite: 3, Astro: 4, Viking: 3, MissGalaxyGold: 3 },
            boss: { Viking: 1 },
        },
        Red: {
            N: 2,
            monster: { SpiderGreen: 1, GhostFace: 1, GhostFaceGreen: 2, MissWhite: 2, Astro: 3, Viking: 2, MissGalaxyGold: 2 },
            boss: { Viking: 1 },
        },
        firstKey: {
            N: 2,
            monster: { SpiderGreen: 1, GhostFace: 1, GhostFaceGreen: 2, MissWhite: 2, Astro: 3, Viking: 1, MissGalaxyGold: 2 },
            boss: { Astro: 1 },
        },
        temple: {
            N: 1,
            monster: { SpiderGreen: 1 },
        }
    },
    3: {
        start: {
            N: 1,
            monster: { SpiderGreen: 1 },
        },
        corridor: {
            N: 25,
            monster: { GhostFaceGreen: 1, SpiderGreen: 1, Astro: 1, MissWhite: 1, Viking: 2, AstroRed: 2, MissGreen: 3, Wolf: 0.1, MissGalaxyGold: 2 }
        },
        common: {
            N: 2,
            monster: { GhostFaceGreen: 1, SpiderGreen: 1, Astro: 1, MissWhite: 1, Viking: 2, AstroRed: 2, MissGreen: 3, Wolf: 0.2, MissGalaxyGold: 2 }
        },
        Gold: {
            N: 2,
            monster: { Viking: 2, AstroRed: 2, MissGreen: 2, Hulk: 3, Wolf: 3 },
            boss: { Goblin_BossL3: 1 }
        },
        Silver: {
            N: 2,
            monster: { Viking: 2, AstroRed: 2, MissGreen: 2, Hulk: 2, Wolf: 2 },
            boss: { Wolf: 1, Hulk: 1 },
        },
        Red: {
            N: 2,
            monster: { Viking: 2, AstroRed: 2, MissGreen: 3, Hulk: 1, Wolf: 1 },
            boss: { Viking: 1 },
        },
        firstKey: {
            N: 2,
            monster: { GhostFaceGreen: 1, Astro: 1, Viking: 2, AstroRed: 2, MissGreen: 3, Wolf: 0.5, MissGalaxyGold: 2 },
            boss: { Astro: 1 },
        },
        temple: {
            N: 1,
            monster: { Viking: 1 },
        }
    },
    4: {
        start: {
            N: 1,
            monster: { Viking: 1 },
        },
        corridor: {
            N: 25,
            monster: { Viking: 1, AstroRed: 1, MissGreen: 1, Wolf: 2, Skeleton: 1, Hulk: 1, MissGalaxyGold: 1 }
        },
        common: {
            N: 2,
            monster: { Viking: 0.5, AstroRed: 0.5, MissGreen: 0.75, Wolf: 2, Skeleton: 1, Hulk: 1, Goblin: 0.5, RedSkeleton: 1 }
        },
        Gold: {
            N: 2,
            monster: { Skeleton: 1, Hulk: 1, Goblin: 2, RedSkeleton: 3, SilverSkeleton: 1 },
            boss: { GoldSkeleton_BossL4: 1 }
        },
        Silver: {
            N: 2,
            monster: { Skeleton: 1, Hulk: 1, Goblin: 1.5, RedSkeleton: 2, SilverSkeleton: 1 },
            boss: { RedSkeleton: 1, SilverSkeleton: 1 },
        },
        Red: {
            N: 2,
            monster: { Skeleton: 1, Hulk: 1, Goblin: 1, RedSkeleton: 1.2 },
            boss: { Goblin: 1 },
        },
        firstKey: {
            N: 2,
            monster: { Skeleton: 1, Hulk: 1, Goblin: 0.8, RedSkeleton: 1 },
            boss: { Skeleton: 1 },
        },
        temple: {
            N: 1,
            monster: { Viking: 1 },
        }
    },
    5: {
        //ARENA
        corridor: {
            N: 20,
            monster: { Skeleton: 1, Hulk: 1, Goblin: 3, RedSkeleton: 3, SilverSkeleton: 4, GoldSkeleton: 3, MissGalaxyGold: 0.1, MissGreen: 0.5 }
        },
        boss: { Drax_BossL5: 1 },
    }
};

const SPAWN = {
    INI: {
        health_potions_per_level: 6,
        mana_potions_per_level: 6,
        scrolls_per_level: 6,
        monster_on_corridors: 25,
        gold_per_level: 6,
        chest_per_arena: 6
    },
    spawn(level) {
        const map = MAP[level].map;
        this.lights(map);
        this.decals(map);
        this.shrines(map);
        this.stairs(map, level);
        this.gates(map);
        this.items(map);
        this.monsters(map, level);
        this.mapPointers(map);
    },
    shrines(map) {
        const GA = map.GA;
        const shrines = [SHRINE_TYPE.AttackShrine, SHRINE_TYPE.DefenseShrine, SHRINE_TYPE.MagicShrine];
        const shrine_locations = map.shrines;
        for (let s = 0; s < shrines.length; s++) {
            GA.addShrine(shrine_locations[s].grid);
            const shrine = new Shrine(shrine_locations[s].grid, DirectionToFace(shrine_locations[s].vector), shrines[s]);
            INTERACTIVE_DECAL3D.add(shrine);
        }
    },
    decals(map) {
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
            const type = weightedRnd({ TOP: 10, BOTTOM: 5 });
            const source = TOP_BOTTOM_SOURCES[type].chooseRandom();
            DECAL3D.add(new StaticDecal(grid, type, SPRITE[source], "crest", source));
        }
    },
    stairs(map, level) {
        const GA = map.GA;
        const entranceLocation = map.entrance;
        const exitLocation = map.exit;

        //entrance gate
        let entranceSprite = null;
        if (level > GAME.upperLimit) {
            entranceSprite = "StairsUp";
            const entrance_destination_level = GAME.level - 1;
            const destination = new Destination("exit", entrance_destination_level);
            const entrance = new Portal(entranceLocation.grid, DirectionToFace(entranceLocation.vector), SPRITE[entranceSprite], 'portal', entranceSprite, destination, GAME.useStaircase);
            BUMP3D.add(entrance);
        } else {
            entranceSprite = "EntranceGate";
            DECAL3D.add(new StaticDecal(entranceLocation.grid, DirectionToFace(entranceLocation.vector), SPRITE[entranceSprite], "crest", entranceSprite));
        }
        GA.reserve(entranceLocation.grid);

        //exit gate
        const exitSprite = "StairsDown";
        const exit_destination_level = GAME.level + 1;
        const destination = new Destination("entrance", exit_destination_level);
        const exit = new Portal(exitLocation.grid, DirectionToFace(exitLocation.vector), SPRITE[exitSprite], 'portal', exitSprite, destination, GAME.useStaircase);
        BUMP3D.add(exit);
        GA.reserve(exitLocation.grid);
        BUMP3D.update();
    },
    lights(map) {
        // room wall lights
        for (const room of map.rooms) {
            const lo = Math.max(((room.squareSize / 16) >>> 0), 1);
            const hi = Math.max(((room.squareSize / 10) >>> 0), 2);
            let N = RND(lo, hi);
            let wallGrids = map.roomWallGrids(room);
            while (N > 0 && wallGrids.length > 0) {
                const slot = wallGrids.removeRandom();
                wallGrids = map.filterPoolByDistance(slot, wallGrids);
                map.GA.reserve(slot.grid);
                const light = LIGHT_DECALS.chooseRandom();
                LIGHTS3D.add(new LightDecal(slot.grid, DirectionToFace(slot.dir), SPRITE[light.sprite], "light", light.sprite, light.color));
                N--;
            }
        }

        //corridor lights
        const N = (map.width * map.height * parseFloat(map.density) * 0.01) | 0;
        const corrDecalGrids = map.poolOfCorridorDecalGrids(N);
        for (let grid of corrDecalGrids) {
            const light = LIGHT_DECALS.chooseRandom();
            LIGHTS3D.add(new LightDecal(grid.grid, DirectionToFace(grid.dir), SPRITE[light.sprite], "light", light.sprite, light.color));
        }
    },
    gates(map) {
        const GA = map.GA;

        //keys
        for (const color in map.keys) {
            const grid = Grid.toCenter(map.keys[color]);
            const key = COMMON_ITEM_TYPE[`${color}Key`];
            ITEM3D.add(new FloorItem3D(grid, key));
        }

        //locked
        for (const color in map.lockedRooms) {
            const grid = map.lockedRooms[color].door[0];
            const gate = GATE_TYPE[color];
            GATE3D.add(new Gate(grid, gate, GA));
            GA.closeDoor(grid);
        }

        //common
        const ignore = ["Silver", "Gold", "Red"];
        for (const R of map.rooms) {
            if (ignore.includes(R.type)) continue;
            for (const D of R.door) {
                GATE3D.add(new Gate(D, GATE_TYPE.Common, GA));
                GA.closeDoor(D);
            }
        }
    },
    mapPointers(map) {
        map.map_pointers = [
            map.shrines.chooseRandom().grid,
            map.keys.Red,
            map.keys.Silver,
            map.keys.Gold
        ];
    },
    debug(map) {
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
    containers(map) {
        for (const room of map.rooms) {
            const corner = map.roomCornerGrids(room);
            const type = weightedRnd({ Chest: 10, TreasureChest: 1 });
            ITEM3D.add(new FloorItem3D(Grid.toCenter(corner.grid), COMMON_ITEM_TYPE[type]));
        }
    },
    items(map) {
        this.containers(map);

        //health potions
        const roomPool = map.poolOfRoomGrids(SPAWN.INI.health_potions_per_level);
        for (const grid of roomPool) {
            ITEM3D.add(new FloorItem3D(Grid.toCenter(grid), COMMON_ITEM_TYPE.RedPotion));
        }

        //mana potions
        const corridorPool = map.poolOfCorridorGrids(SPAWN.INI.mana_potions_per_level);
        for (const grid of corridorPool) {
            ITEM3D.add(new FloorItem3D(Grid.toCenter(grid), COMMON_ITEM_TYPE.BluePotion));
        }

        //scrolls
        let anyPool = map.poolOfGrids(SPAWN.INI.scrolls_per_level);
        for (const grid of anyPool) {
            ITEM3D.add(new FloorItem3D(Grid.toCenter(grid), COMMON_ITEM_TYPE.Scroll));
        }

        //gold
        anyPool = map.poolOfGrids(SPAWN.INI.gold_per_level);
        for (const grid of anyPool) {
            ITEM3D.add(new FloorItem3D(Grid.toCenter(grid), COMMON_ITEM_TYPE.GoldCube));
        }
        anyPool = map.poolOfGrids(SPAWN.INI.gold_per_level);
        for (const grid of anyPool) {
            ITEM3D.add(new FloorItem3D(Grid.toCenter(grid), COMMON_ITEM_TYPE.GoldBar));
        }
        anyPool = map.poolOfGrids(SPAWN.INI.gold_per_level);
        for (const grid of anyPool) {
            ITEM3D.add(new FloorItem3D(Grid.toCenter(grid), COMMON_ITEM_TYPE.SilverBar));
        }
        anyPool = map.poolOfGrids(SPAWN.INI.gold_per_level);
        for (const grid of anyPool) {
            ITEM3D.add(new FloorItem3D(Grid.toCenter(grid), COMMON_ITEM_TYPE.GoldBar));
        }

        //skills, upgrades
        const skills = [
            [COMMON_ITEM_TYPE.Sword, COMMON_ITEM_TYPE.Sting],
            [COMMON_ITEM_TYPE.Shield],
            [COMMON_ITEM_TYPE.Heart],
            [COMMON_ITEM_TYPE.Mana],
            [COMMON_ITEM_TYPE.Magic]
        ];
        const total = skills.length;
        let DE = map.freeDeadEnds(total);
        const remain = total - DE.length;
        if (remain > 0) {
            let addFromRoom = map.poolOfRoomGrids(remain);
            DE = DE.concat(addFromRoom);
        }
        for (let [index, grid] of DE.entries()) {
            ITEM3D.add(new FloorItem3D(Grid.toCenter(grid), skills[index].chooseRandom()));
        }
    },
    monsters(map, level) {
        const corrGrids = map.poolOfCorridorGrids(MONSTER_LAYOUT[level].corridor.N);
        for (const grid of corrGrids) {
            const type = weightedRnd(MONSTER_LAYOUT[level].corridor.monster);
            ENTITY3D.add(new $3D_Entity(Grid.toCenter(grid), MONSTER_TYPE[type], UP));
        }
        for (const room of map.rooms) {
            const N = MONSTER_LAYOUT[level][room.type].N;
            for (let i = 0; i < N; i++) {
                const grid = map.findSpace(room.area);
                const type = weightedRnd(MONSTER_LAYOUT[level][room.type].monster);
                const enemy = new $3D_Entity(Grid.toCenter(grid), MONSTER_TYPE[type], UP);
                const guardPosition = map.findMiddleSpaceUnreserved(room.area);
                enemy.setGuardPosition(guardPosition);
                ENTITY3D.add(enemy);
            }
            const boss = MONSTER_LAYOUT[level][room.type].boss;
            if (boss) {
                const grid = map.findSpace(room.area);
                const type = weightedRnd(MONSTER_LAYOUT[level][room.type].boss);
                const enemy = new $3D_Entity(Grid.toCenter(grid), MONSTER_TYPE[type], UP);
                const guardPosition = map.findMiddleSpaceUnreserved(room.area);
                enemy.setGuardPosition(guardPosition);
                ENTITY3D.add(enemy);
            }
        }
        //analysis
        if (DEBUG.VERBOSE) ENTITY3D.analyze();
    },
    arena(level) {
        const map = MAP[level].map;
        this.stairs(map, level);
        this.gates(map);
        this.shrines(map);
        this.arenaLights(map);
        this.arenaDecals(map);
        this.arenaItems(map);
        this.arenaMonsters(map, level);
        map.map_pointers = [];
    },
    arenaMonsters(map, level) {
        const corrGrids = map.poolOfCorridorGrids(MONSTER_LAYOUT[level].corridor.N);
        for (const grid of corrGrids) {
            const type = weightedRnd(MONSTER_LAYOUT[level].corridor.monster);
            ENTITY3D.add(new $3D_Entity(Grid.toCenter(grid), MONSTER_TYPE[type], UP));
        }

        const boss = MONSTER_LAYOUT[level].boss;
        const N = Object.keys(boss).length;
        const bossGrids = map.poolOfCorridorGrids(N);
        for (let [index, type] of Object.keys(boss).entries()) {
            const grid = bossGrids[index];
            ENTITY3D.add(new $3D_Entity(Grid.toCenter(grid), MONSTER_TYPE[type], UP));
        }

        //analysis
        if (DEBUG.VERBOSE) ENTITY3D.analyze();
    },
    arenaDecals(map) {
        //corridor decals
        const N = (map.width * map.height * parseFloat(map.density) * 0.11) | 0;
        const corrDecalGrids = map.poolOfCorridorDecalGrids(N);
        for (let grid of corrDecalGrids) {
            const type = weightedRnd({ picture: 10, crest: 20 });
            const source = DECAL_SOURCES[type].chooseRandom();
            DECAL3D.add(new StaticDecal(grid.grid, DirectionToFace(grid.dir), SPRITE[source], type, source));
        }

        //top, bottom corridor decals
        const TB = (map.width * map.height * parseFloat(map.density) * 0.03) | 0;
        const corrGrids = map.poolOfUnreservedCorridorGrids(TB);
        for (let grid of corrGrids) {
            const type = weightedRnd({ TOP: 10, BOTTOM: 5 });
            const source = TOP_BOTTOM_SOURCES[type].chooseRandom();
            DECAL3D.add(new StaticDecal(grid, type, SPRITE[source], "crest", source));
        }
    },
    arenaLights(map) {
        const N = (map.width * map.height * parseFloat(map.density) * 0.015) | 0;
        const corrDecalGrids = map.poolOfDistancedCorridorDecalGrids(N);
        for (let grid of corrDecalGrids) {
            const light = LIGHT_DECALS.chooseRandom();
            LIGHTS3D.add(new LightDecal(grid.grid, DirectionToFace(grid.dir), SPRITE[light.sprite], "light", light.sprite, light.color));
        }
    },
    arenaItems(map) {
        //health potions
        const roomPool = map.poolOfCorridorGrids(SPAWN.INI.health_potions_per_level);
        for (const grid of roomPool) {
            ITEM3D.add(new FloorItem3D(Grid.toCenter(grid), COMMON_ITEM_TYPE.RedPotion));
        }
        //mana potions
        const corridorPool = map.poolOfCorridorGrids(SPAWN.INI.mana_potions_per_level);
        for (const grid of corridorPool) {
            ITEM3D.add(new FloorItem3D(Grid.toCenter(grid), COMMON_ITEM_TYPE.BluePotion));
        }
        //scrolls
        let anyPool = map.poolOfCorridorGrids(SPAWN.INI.scrolls_per_level);
        for (const grid of anyPool) {
            ITEM3D.add(new FloorItem3D(Grid.toCenter(grid), COMMON_ITEM_TYPE.Scroll));
        }

        //gold
        anyPool = map.poolOfCorridorGrids(SPAWN.INI.gold_per_level);
        for (const grid of anyPool) {
            ITEM3D.add(new FloorItem3D(Grid.toCenter(grid), COMMON_ITEM_TYPE.GoldCube));
        }
        anyPool = map.poolOfCorridorGrids(SPAWN.INI.gold_per_level);
        for (const grid of anyPool) {
            ITEM3D.add(new FloorItem3D(Grid.toCenter(grid), COMMON_ITEM_TYPE.GoldBar));
        }
        anyPool = map.poolOfCorridorGrids(SPAWN.INI.gold_per_level);
        for (const grid of anyPool) {
            ITEM3D.add(new FloorItem3D(Grid.toCenter(grid), COMMON_ITEM_TYPE.SilverBar));
        }
        anyPool = map.poolOfCorridorGrids(SPAWN.INI.gold_per_level);
        for (const grid of anyPool) {
            ITEM3D.add(new FloorItem3D(Grid.toCenter(grid), COMMON_ITEM_TYPE.GoldBar));
        }

        //skills, upgrades
        const skills = [
            [COMMON_ITEM_TYPE.Sword, COMMON_ITEM_TYPE.Sting],
            [COMMON_ITEM_TYPE.Shield],
            [COMMON_ITEM_TYPE.Heart],
            [COMMON_ITEM_TYPE.Mana],
            [COMMON_ITEM_TYPE.Magic]
        ];
        const total = skills.length;
        const pool = map.poolOfCorridorGrids(total);
        for (let [index, grid] of pool.entries()) {
            ITEM3D.add(new FloorItem3D(Grid.toCenter(grid), skills[index].chooseRandom()));
        }

        //chests
        const chestPool = map.poolOfCorridorGrids(SPAWN.INI.chest_per_arena);
        for (const grid of chestPool) {
            const type = weightedRnd({ Chest: 10, TreasureChest: 1 });
            ITEM3D.add(new FloorItem3D(Grid.toCenter(grid), COMMON_ITEM_TYPE[type]));
        }
    },
    study(level) {
        const map = MAP[level].map;
        this.stairs(map, level);
        this.studyLights();
        this.studyDecals();
        this.studyItems();
        this.studyMonsters();
    },
    studyDecals() {
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
            { grid: new Grid(13, 3), face: 'LEFT' },
            { grid: new Grid(13, 5), face: 'LEFT' },
        ];

        for (let D of decalsLocations) {
            const picture = DECAL_PAINTINGS.chooseRandom();
            console.log("picture", picture);
            DECAL3D.add(new StaticDecal(D.grid, D.face, SPRITE[picture], "picture", picture));
        }

        const crestLocations = [
            { grid: new Grid(0, 5), face: 'RIGHT' },
            { grid: new Grid(10, 2), face: 'FRONT' },
            { grid: new Grid(13, 3), face: 'FRONT' },
            { grid: new Grid(7, 10), face: 'LEFT' },
            { grid: new Grid(0, 11), face: 'RIGHT' },

        ];
        for (let D of crestLocations) {
            const crest = DECAL_CRESTS.chooseRandom();
            console.log("crest", crest);
            DECAL3D.add(new StaticDecal(D.grid, D.face, SPRITE[crest], "crest", crest));
        }

        const bottomCrestLocations = [
            //TOP
            { grid: new Grid(2, 5), face: 'TOP' },
            { grid: new Grid(12, 4), face: 'TOP' }
        ];
        for (let D of bottomCrestLocations) {
            const crest = TOP_CRESTS.chooseRandom();
            console.log("crest", crest);
            DECAL3D.add(new StaticDecal(D.grid, D.face, SPRITE[crest], "crest", crest));
        }

        const topCrestLocations = [
            //BOTTOM
            { grid: new Grid(2, 5), face: 'BOTTOM' },
        ];
        for (let D of topCrestLocations) {
            const crest = BOTTOM_CRESTS.chooseRandom();
            console.log("crest", crest);
            DECAL3D.add(new StaticDecal(D.grid, D.face, SPRITE[crest], "crest", crest));
        }
    },
    studyLights() {
        const lightLocations = [
            { grid: new Grid(1, 0), face: 'FRONT', light: LIGHT_DECALS[0] },
            { grid: new Grid(6, 0), face: 'FRONT', light: LIGHT_DECALS[0] },
            { grid: new Grid(11, 15), face: 'BACK', light: LIGHT_DECALS[0] },
            { grid: new Grid(15, 9), face: 'LEFT', light: LIGHT_DECALS[4] },
            { grid: new Grid(15, 1), face: 'LEFT', light: LIGHT_DECALS[0] },
            { grid: new Grid(1, 15), face: 'BACK', light: LIGHT_DECALS[0] },
            { grid: new Grid(6, 15), face: 'BACK', light: LIGHT_DECALS[0] },
            { grid: new Grid(10, 2), face: 'RIGHT', light: LIGHT_DECALS[0] },
        ];
        for (let L of lightLocations) {
            const light = L.light;
            LIGHTS3D.add(new LightDecal(L.grid, L.face, SPRITE[light.sprite], "light", light.sprite, light.color));
        }
    },
    studyItems() {
        const itemLocations = [
            { grid: new FP_Grid(1.5, 1.5), type: COMMON_ITEM_TYPE.Chest },
            { grid: new FP_Grid(1.5, 2.5), type: COMMON_ITEM_TYPE.Chest },
            { grid: new FP_Grid(2.5, 1.5), type: COMMON_ITEM_TYPE.GoldCube },
            { grid: new FP_Grid(6.5, 2.5), type: COMMON_ITEM_TYPE.TreasureChest },
            { grid: new FP_Grid(1.5, 13.5), type: COMMON_ITEM_TYPE.Sting },
            { grid: new FP_Grid(6.5, 13.5), type: COMMON_ITEM_TYPE.Shield },
            { grid: new FP_Grid(12.5, 9.5), type: COMMON_ITEM_TYPE.Sword },
            { grid: new FP_Grid(11.5, 9.5), type: COMMON_ITEM_TYPE.Scroll },
            { grid: new FP_Grid(10.5, 13.5), type: COMMON_ITEM_TYPE.GoldCube },
            { grid: new FP_Grid(11.5, 13.5), type: COMMON_ITEM_TYPE.GoldBar },
            { grid: new FP_Grid(12.5, 13.5), type: COMMON_ITEM_TYPE.SilverBar },
            { grid: new FP_Grid(12.5, 5.5), type: COMMON_ITEM_TYPE.TreasureChest },
            { grid: new FP_Grid(12.0, 5.0), type: COMMON_ITEM_TYPE.Sting },
            { grid: new FP_Grid(12.0, 3.5), type: COMMON_ITEM_TYPE.Shield },
            { grid: new FP_Grid(11.0, 5.0), type: COMMON_ITEM_TYPE.Scroll },
        ];

        for (let item of itemLocations) {
            ITEM3D.add(new FloorItem3D(item.grid, item.type));
        }
    },
    studyMonsters() {
        const monsterLocations = [
            { grid: new FP_Grid(5.5, 6.5), dir: UP, type: MONSTER_TYPE.MissGalaxyDemo },
            { grid: new FP_Grid(12.5, 4.5), dir: UP, type: MONSTER_TYPE.MissGalaxyDemo },
            { grid: new FP_Grid(11.5, 4.5), dir: UP, type: MONSTER_TYPE.SkeletonDemo },
        ];
        for (let monster of monsterLocations) {
            ENTITY3D.add(new $3D_Entity(monster.grid, monster.type, monster.dir));
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
        material: MATERIAL.standardShine,
    },
    Red: {
        name: "Red",
        color: "Red",
        locked: true,
        texture: "RedGate1",
        element: "CUBE_SM",
        material: MATERIAL.standardShine,
    },
    Silver: {
        name: "Silver",
        color: "Silver",
        locked: true,
        texture: "SilverGate1",
        element: "CUBE_SM",
        material: MATERIAL.standardShine,
    },
    Gold: {
        name: "Gold",
        color: "Gold",
        locked: true,
        texture: "GoldGate1",
        element: "CUBE_SM",
        material: MATERIAL.standardShine,
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
        material: MATERIAL.standard,
    },
    TreasureChest: {
        name: "TreasureChest",
        category: "treasure_chest",
        element: "TREASURE_CHEST",
        scale: 1.5 / 2 ** 3,
        glueToFloor: true,
        texture: "TreasureChest",
        material: MATERIAL.standard,
    },
    Sword: {
        name: "Sword",
        category: "skill",
        which: "attack",
        element: "SWORD",
        scale: 1 / 2 ** 4,
        glueToFloor: true,
        texture: "Sword",
        inventorySprite: "SwordSkill",
        material: MATERIAL.silver,
    },
    Shield: {
        name: "Shield",
        category: "skill",
        which: "defense",
        element: "SHIELD",
        scale: 1 / 2 ** 5,
        glueToFloor: true,
        texture: "ScrapedMetal",
        inventorySprite: "ShieldSkill",
        material: MATERIAL.silver,
    },
    Magic: {
        name: "Magic",
        category: "skill",
        which: "magic",
        element: "PENTAGRAM",
        scale: 1 / 2 ** 1,
        glueToFloor: true,
        texture: "Red2",
        inventorySprite: "MagicSkill",
        material: MATERIAL.redShine,
    },
    Heart: {
        name: "Heart",
        category: "status",
        which: "health",
        element: "HEART",
        scale: 1 / 2 ** 5,
        glueToFloor: true,
        texture: "Red",
        inventorySprite: "Health",
        material: MATERIAL.redShine,
    },
    Mana: {
        name: "ManaSkill",
        category: "status",
        which: "mana",
        element: "BALL",
        scale: 1 / 2 ** 4,
        glueToFloor: true,
        texture: "Magic",
        inventorySprite: "Mana",
        material: MATERIAL.standard,
    },
    Fireball: {
        name: "Fireball",
        category: 'missile',
        element: "BALL",
        scale: 1 / 2 ** 4,
        texture: "FireballTexture",
        moveSpeed: 8.0,
        lightColor: "#FF7700",
        material: MATERIAL.fire,
    },
    Scroll: {
        name: "Scroll",
        category: "scroll",
        element: "SCROLL",
        scale: 1.5 / 2 ** 4,
        glueToFloor: true,
        texture: "ScrollTexture",
        material: MATERIAL.paper,
    },
    RedPotion: {
        name: "RedPotion",
        category: "potion",
        color: "red",
        element: "FLASK",
        scale: 1.1 / 2 ** 5,
        glueToFloor: true,
        texture: "RedLiquid",
        inventorySprite: "RedPotion24",
        material: MATERIAL.redShine,
    },
    BluePotion: {
        name: "BluePotion",
        category: "potion",
        color: "blue",
        element: "FLASK",
        scale: 1.1 / 2 ** 5,
        glueToFloor: true,
        texture: "BlueLiquid",
        inventorySprite: "BluePotion24",
        material: MATERIAL.blueShine,
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
        material: MATERIAL.gold,
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
        material: MATERIAL.silver,
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
        material: MATERIAL.redShine,
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
        material: MATERIAL.gold,
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
        material: MATERIAL.silver,
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
        material: MATERIAL.gold,
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
        material: MATERIAL.gold,
    },
    Sting: {
        name: "Sting",
        category: "skill",
        which: "attack",
        element: "STING",
        scale: 1 / 2 ** 1,
        glueToFloor: true,
        texture: "Sting",
        inventorySprite: "SwordSkill",
        material: MATERIAL.silver,
    },
    POV: {
        name: "POV",
        element: "STING",
        scale: 1 / 2 ** 1,
        texture: "Sting",
        material: MATERIAL.silver,
    }
};

const SCROLL_TYPE = {
    Light: 130,
    Invisibility: 100,
    Map: 100,
    DrainMana: 90,
    Cripple: 60,
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

const MONSTER_TYPE = {
    Spider: {
        name: "Spider",
        model: "Spider",
        scale: 1.4 / 2 ** 6,
        rotateToNorth: Math.PI,
        midHeight: 0.3,
        deathType: "BloodExplosion",
        inventory: COMMON_ITEM_TYPE.Coins,
        attack: 7,
        defense: 3,
        magic: 0,
        health: 8,
        xp: 10,
        gold: 15,
        attackSound: "MonsterAttack1",
        hurtSound: "MonsterHurt",
        behaviourArguments: [5, ["wanderer"], 3, ["follower"]],
        moveSpeed: 1.0,
        material: MATERIAL.standard,
    },
    SpiderGreen: {
        name: "SpiderGreen",
        texture: "SpiderGreen",
        model: "Spider",
        scale: 1.4 / 2 ** 6,
        rotateToNorth: Math.PI,
        midHeight: 0.3,
        deathType: "BloodExplosion",
        inventory: COMMON_ITEM_TYPE.Coins,
        attack: 9,
        defense: 5,
        magic: 2,
        health: 12,
        xp: 15,
        gold: 20,
        attackSound: "MonsterAttack1",
        hurtSound: "MonsterHurt",
        behaviourArguments: [7, ["wanderer"], 3, ["follower"]],
        moveSpeed: 1.1,
        material: MATERIAL.standard,
    },
    MissGalaxyGold: {
        name: "MissGalaxyGold",
        texture: "MissGalaxyGold",
        model: "MissGalaxy",
        scale: 1.0 / 2 ** 2,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: COMMON_ITEM_TYPE.Coins,
        attack: 11,
        defense: 6,
        magic: 4,
        health: 20,
        xp: 20,
        gold: 20,
        attackSound: "HumanAttack1",
        hurtSound: "Ow",
        behaviourArguments: [7, ["wanderer"], 4, ["advancer"]],
        moveSpeed: 1.0,
        material: MATERIAL.gold,
    },
    MissGalaxy: {
        name: "MissGalaxy",
        model: "MissGalaxy",
        scale: 0.9 / 2 ** 2,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: COMMON_ITEM_TYPE.Coins,
        attack: 8,
        defense: 4,
        magic: 2,
        health: 10,
        xp: 10,
        gold: 15,
        attackSound: "HumanAttack1",
        hurtSound: "Ow",
        behaviourArguments: [7, ["wanderer"], 4, ["advancer"]],
        moveSpeed: 1.0,
        material: MATERIAL.standard,
    },
    MissGalaxyGreen: {
        name: "MissGalaxyGreen",
        texture: "MissGalaxyGreen",
        model: "MissGalaxy",
        scale: 0.8 / 2 ** 2,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: COMMON_ITEM_TYPE.Coins,
        attack: 5,
        defense: 3,
        magic: 2,
        health: 8,
        xp: 6,
        gold: 10,
        attackSound: "HumanAttack1",
        hurtSound: "Ow",
        behaviourArguments: [5, ["wanderer"], 3, ["advancer"]],
        moveSpeed: 1.0,
        material: MATERIAL.standard,
    },
    Hulk: {
        name: "Hulk",
        model: "Hulk",
        scale: 1.5 / 2 ** 6,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: COMMON_ITEM_TYPE.Coins,
        attack: 20,
        defense: 12,
        magic: 5,
        health: 40,
        xp: 50,
        gold: 50,
        attackSound: "HumanAttack1",
        hurtSound: "MonsterHurt2",
        behaviourArguments: [10, ["wanderer"], 4, ["advancer"]],
        moveSpeed: 1.0,
        material: MATERIAL.greenShine,
    },
    Hulk_BossL2: {
        name: "Hulk_BossL2",
        model: "Hulk",
        scale: 1.5 / 2 ** 6,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: "Shield",
        attack: 20,
        defense: 12,
        magic: 5,
        health: 50,
        xp: 120,
        gold: 0,
        attackSound: "HumanAttack1",
        hurtSound: "MonsterHurt2",
        behaviourArguments: [Infinity, ["wanderer"], 4, ["advancer"]],
        moveSpeed: 1.0,
        material: MATERIAL.greenShine,
    },
    Viking: {
        name: "Viking",
        model: "Viking",
        scale: 0.9 / 2 ** 8,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: COMMON_ITEM_TYPE.Coins,
        attack: 15,
        defense: 7,
        magic: 5,
        health: 30,
        xp: 30,
        gold: 30,
        attackSound: "HumanAttack1",
        hurtSound: "MonsterHurt2",
        behaviourArguments: [7, ["wanderer"], 4, ["advancer"]],
        moveSpeed: 1.0,
        material: MATERIAL.standard,
    },
    Astro: {
        name: "Astro",
        model: "Astro",
        scale: 1.5 / 2 ** 4,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: COMMON_ITEM_TYPE.Coins,
        attack: 12,
        defense: 8,
        magic: 7,
        health: 23,
        xp: 30,
        gold: 30,
        attackSound: "HumanAttack1",
        hurtSound: "MonsterHurt2",
        behaviourArguments: [7, ["wanderer"], 5, ["shoot"]],
        moveSpeed: 1.0,
        mana: 2,
        caster: true,
        shootDistance: 5,
        stalkDistance: 6,
        material: MATERIAL.standard,
        missile: Missile,
        missileType: COMMON_ITEM_TYPE.Fireball,
    },
    AstroRed: {
        name: "AstroRed",
        texture: "AstroRed",
        model: "Astro",
        scale: 1.7 / 2 ** 4,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: COMMON_ITEM_TYPE.Coins,
        attack: 18,
        defense: 10,
        magic: 10,
        health: 30,
        xp: 60,
        gold: 50,
        attackSound: "HumanAttack1",
        hurtSound: "MonsterHurt2",
        behaviourArguments: [7, ["wanderer"], 5, ["shoot"]],
        moveSpeed: 1.0,
        mana: 3,
        caster: true,
        shootDistance: 5,
        stalkDistance: 6,
        material: MATERIAL.redShine,
        missile: Missile,
        missileType: COMMON_ITEM_TYPE.Fireball,
    },
    MissWhite: {
        name: "MissWhite",
        model: "MissWhite",
        scale: 1.5 / 2 ** 2,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: COMMON_ITEM_TYPE.Coins,
        attack: 10,
        defense: 7,
        magic: 10,
        health: 25,
        xp: 40,
        gold: 50,
        attackSound: "HumanAttack1",
        hurtSound: "Ow",
        behaviourArguments: [8, ["wanderer"], 6, ["shoot"]],
        moveSpeed: 1.0,
        mana: 3,
        caster: true,
        shootDistance: 6,
        stalkDistance: 3,
        material: MATERIAL.standard,
        missile: Missile,
        missileType: COMMON_ITEM_TYPE.Fireball,
    },
    MissGreen: {
        name: "MissGreen",
        texture: "GhostFaceGreen",
        model: "MissWhite",
        scale: 1.6 / 2 ** 2,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: COMMON_ITEM_TYPE.Coins,
        attack: 15,
        defense: 10,
        magic: 12,
        health: 30,
        xp: 50,
        gold: 50,
        attackSound: "HumanAttack1",
        hurtSound: "Ow",
        behaviourArguments: [8, ["wanderer"], 6, ["shoot"]],
        moveSpeed: 1.0,
        mana: 3,
        caster: true,
        shootDistance: 6,
        stalkDistance: 3,
        material: MATERIAL.standard,
        missile: Missile,
        missileType: COMMON_ITEM_TYPE.Fireball,
    },
    MissWhite_BossL1: {
        name: "MissWhite_BossL1",
        model: "MissWhite",
        scale: 1.5 / 2 ** 2,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: "Mana",
        attack: 10,
        defense: 5,
        magic: 10,
        health: 30,
        xp: 100,
        gold: 0,
        attackSound: "HumanAttack1",
        hurtSound: "Ow",
        behaviourArguments: [Infinity, ["wanderer"], 6, ["shoot"]],
        moveSpeed: 1.0,
        mana: 5,
        caster: true,
        shootDistance: 6,
        stalkDistance: 3,
        material: MATERIAL.standard,
        missile: Missile,
        missileType: COMMON_ITEM_TYPE.Fireball,
    },
    GhostFace: {
        name: "GhostFace",
        model: "GhostFace",
        scale: 1.82 / 2 ** 2,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: COMMON_ITEM_TYPE.Coins,
        attack: 6,
        defense: 4,
        magic: 5,
        health: 10,
        xp: 25,
        gold: 25,
        attackSound: "MonsterAttack1",
        hurtSound: "MonsterHurt",
        behaviourArguments: [7, ["wanderer"], 4, ["shoot"]],
        moveSpeed: 1.0,
        mana: 3,
        caster: true,
        shootDistance: 4,
        stalkDistance: 5,
        material: MATERIAL.standard,
        missile: Missile,
        missileType: COMMON_ITEM_TYPE.Fireball,
    },
    GhostFaceGreen: {
        name: "GhostFaceGreen",
        texture: "GhostFaceGreen",
        model: "GhostFace",
        scale: 1.82 / 2 ** 2,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: COMMON_ITEM_TYPE.Coins,
        attack: 8,
        defense: 6,
        magic: 7,
        health: 15,
        xp: 30,
        gold: 30,
        attackSound: "MonsterAttack1",
        hurtSound: "MonsterHurt",
        behaviourArguments: [7, ["wanderer"], 4, ["shoot"]],
        moveSpeed: 1.05,
        mana: 3,
        caster: true,
        shootDistance: 4,
        stalkDistance: 5,
        material: MATERIAL.standard,
        missile: Missile,
        missileType: COMMON_ITEM_TYPE.Fireball,
    },
    Bat: {
        name: "Bat",
        model: "Bat",
        scale: 1.2 / 2 ** 3,
        rotateToNorth: Math.PI,
        midHeight: 0.0,
        fly: 0.5,
        deathType: "SmokeExplosion",
        inventory: null,
        attack: 1,
        defense: 0,
        magic: 0,
        health: 1,
        xp: 1,
        gold: 0,
        attackSound: "BatAttack",
        hurtSound: "BatAttack",
        behaviourArguments: [Infinity, ["wanderer"], -1],
        moveSpeed: 1.0,
        material: MATERIAL.standard,
    },
    RedGoldBat: {
        name: "RedGoldBat",
        texture: "RedGoldBat",
        model: "Bat",
        scale: 1.2 / 2 ** 3,
        rotateToNorth: Math.PI,
        midHeight: 0.0,
        fly: 0.5,
        deathType: "SmokeExplosion",
        inventory: null,
        attack: 2,
        defense: 1,
        magic: 0,
        health: 2,
        xp: 3,
        gold: 0,
        attackSound: "BatAttack",
        hurtSound: "BatAttack",
        behaviourArguments: [Infinity, ["wanderer"], -1],
        moveSpeed: 1.0,
        material: MATERIAL.redShine,
    },
    Wolf: {
        name: "Wolf",
        model: "Wolf",
        scale: 1.7 / 2 ** 2,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: COMMON_ITEM_TYPE.Coins,
        attack: 18,
        defense: 12,
        magic: 10,
        health: 30,
        xp: 50,
        gold: 50,
        attackSound: "MonsterAttack1",
        hurtSound: "MonsterHurt3",
        behaviourArguments: [10, ["wanderer"], 5, ["advancer"]],
        moveSpeed: 1.1,
        material: MATERIAL.standard,
    },
    Skeleton: {
        name: "WhiteSkeleton",
        model: "Skeleton",
        scale: 1.8 / 2 ** 3,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "SmokeExplosion",
        inventory: COMMON_ITEM_TYPE.Coins,
        attack: 20,
        defense: 13,
        magic: 12,
        health: 35,
        xp: 50,
        gold: 50,
        attackSound: "MonsterAttack2",
        hurtSound: "MonsterHurt2",
        behaviourArguments: [8, ["wanderer"], 6, ["advancer"]],
        moveSpeed: 1.1,
        material: MATERIAL.standardShine,
    },
    RedSkeleton: {
        name: "RedSkeleton",
        texture: "Red2",
        model: "Skeleton",
        scale: 1.8 / 2 ** 3,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "SmokeExplosion",
        inventory: COMMON_ITEM_TYPE.Coins,
        attack: 23,
        defense: 16,
        magic: 15,
        health: 42,
        xp: 60,
        gold: 50,
        attackSound: "MonsterAttack2",
        hurtSound: "MonsterHurt2",
        behaviourArguments: [8, ["wanderer"], 6, ["advancer"]],
        moveSpeed: 1.1,
        material: MATERIAL.redShine,
    },
    GoldSkeleton: {
        name: "GoldSkeleton",
        texture: "Gold",
        model: "Skeleton",
        scale: 1.8 / 2 ** 3,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "SmokeExplosion",
        inventory: COMMON_ITEM_TYPE.Coins,
        attack: 30,
        defense: 20,
        magic: 20,
        health: 60,
        xp: 70,
        gold: 50,
        attackSound: "MonsterAttack2",
        hurtSound: "MonsterHurt2",
        behaviourArguments: [8, ["wanderer"], 6, ["advancer"]],
        moveSpeed: 1.1,
        material: MATERIAL.gold,
    },
    GoldSkeleton_BossL4: {
        name: "GoldSkeleton_BossL4",
        texture: "Gold",
        model: "Skeleton",
        scale: 1.8 / 2 ** 3,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "SmokeExplosion",
        inventory: "Shield",
        attack: 30,
        defense: 20,
        magic: 20,
        health: 150,
        xp: 250,
        gold: 0,
        attackSound: "MonsterAttack2",
        hurtSound: "MonsterHurt2",
        behaviourArguments: [Infinity, ["wanderer"], 6, ["advancer"]],
        moveSpeed: 1.1,
        material: MATERIAL.gold,
    },
    SilverSkeleton: {
        name: "SilverSkeleton",
        texture: "Silver",
        model: "Skeleton",
        scale: 1.8 / 2 ** 3,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "SmokeExplosion",
        inventory: COMMON_ITEM_TYPE.Coins,
        attack: 26,
        defense: 16,
        magic: 17,
        health: 50,
        xp: 65,
        gold: 50,
        attackSound: "MonsterAttack2",
        hurtSound: "MonsterHurt2",
        behaviourArguments: [8, ["wanderer"], 6, ["advancer"]],
        moveSpeed: 1.1,
        material: MATERIAL.silver,
    },
    Goblin: {
        name: "Goblin",
        model: "Goblin",
        scale: 1.01 / 2 ** 1,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: COMMON_ITEM_TYPE.Coins,
        attack: 25,
        defense: 15,
        magic: 25,
        health: 50,
        xp: 80,
        gold: 50,
        attackSound: "MonsterAttack1",
        hurtSound: "MonsterHurt",
        behaviourArguments: [7, ["wanderer"], 4, ["shoot"]],
        moveSpeed: 1.0,
        mana: 3,
        caster: true,
        shootDistance: 4,
        stalkDistance: 5,
        material: MATERIAL.standard,
        missile: Missile,
        missileType: COMMON_ITEM_TYPE.Fireball,
    },
    Goblin_BossL3: {
        name: "Goblin_BossL3",
        model: "Goblin",
        scale: 1.1 / 2 ** 1,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: "Heart",
        attack: 25,
        defense: 15,
        magic: 25,
        health: 75,
        xp: 200,
        gold: 0,
        attackSound: "MonsterAttack1",
        hurtSound: "MonsterHurt",
        behaviourArguments: [Infinity, ["wanderer"], 4, ["shoot"]],
        moveSpeed: 1.0,
        mana: 5,
        caster: true,
        shootDistance: 4,
        stalkDistance: 5,
        material: MATERIAL.standard,
        missile: Missile,
        missileType: COMMON_ITEM_TYPE.Fireball,
    },
    Drax: {
        name: "Drax",
        model: "Drax",
        scale: 1.5 / 2 ** 1,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: COMMON_ITEM_TYPE.Coins,
        attack: 50,
        defense: 25,
        magic: 25,
        health: 100,
        xp: 125,
        gold: 100,
        attackSound: "HumanAttack1",
        hurtSound: "Ow",
        behaviourArguments: [Infinity, ["wanderer"], 10, ["shoot"]],
        moveSpeed: 1.0,
        mana: 3,
        caster: true,
        shootDistance: 10,
        stalkDistance: 12,
        material: MATERIAL.standard,
        missile: Missile,
        missileType: COMMON_ITEM_TYPE.Fireball,
    },
    Drax_BossL5: {
        name: "Drax",
        model: "Drax",
        scale: 1.5 / 2 ** 1,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: COMMON_ITEM_TYPE.GoldKey,
        attack: 50,
        defense: 25,
        magic: 25,
        health: 200,
        xp: 250,
        gold: 0,
        attackSound: "HumanAttack1",
        hurtSound: "Ow",
        behaviourArguments: [Infinity, ["wanderer"], 10, ["shoot"]],
        moveSpeed: 1.0,
        mana: 5,
        caster: true,
        shootDistance: 10,
        stalkDistance: 12,
        material: MATERIAL.standard,
        final_boss: true,
        missile: Missile,
        missileType: COMMON_ITEM_TYPE.Fireball,
    },
    MissGalaxyDemo: {
        name: "MissGalaxyDemo",
        texture: "MissGalaxyGreen",
        model: "MissGalaxy",
        scale: 0.8 / 2 ** 2,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: COMMON_ITEM_TYPE.Coins,
        attack: 1,
        defense: 0,
        magic: 0,
        health: 1,
        xp: 6,
        gold: 10,
        attackSound: "HumanAttack1",
        hurtSound: "Ow",
        behaviourArguments: [5, ["wanderer"], 3, ["advancer"]],
        moveSpeed: 0.001,
        material: MATERIAL.standard,
    },
    SkeletonDemo: {
        name: "WhiteSkeletonDemo",
        model: "Skeleton",
        scale: 1.8 / 2 ** 3,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "SmokeExplosion",
        inventory: COMMON_ITEM_TYPE.Coins,
        attack: 1,
        defense: 0,
        magic: 0,
        health: 1,
        xp: 1,
        gold: 50,
        attackSound: "MonsterAttack2",
        hurtSound: "MonsterHurt2",
        behaviourArguments: [8, ["wanderer"], 6, ["advancer"]],
        moveSpeed: 0.001,
        material: MATERIAL.standardShine,
    },
};