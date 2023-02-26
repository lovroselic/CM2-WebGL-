/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */
//Assets for RUN
"use strict";
console.log("%cAssets for CrawlMaster2 ready.", "color: orange");

LoadTextures = [
    { srcName: "BrickWall128.jpg", name: "BrickWall" },
    { srcName: "BrickWall2_128.jpg", name: "BrickWall2" },
    { srcName: "BlackBrickWall128.jpg", name: "BlackBrickWall" },
    { srcName: "CastleWall.jpg", name: "CastleWall" },
    { srcName: "RockFloor.jpg", name: "RockFloor" },
    { srcName: "MorgueFloor256.jpg", name: "MorgueFloor" },
    { srcName: "BrownWall256.jpg", name: "DungeonWall" },
    { srcName: "GreenDungeonWall256.jpg", name: "GreenDungeonWall" },
    { srcName: "StoneFloor3_128.jpg", name: "StoneFloor3" },
    { srcName: "StoneFloor128.jpg", name: "StoneFloor" },
    { srcName: "Pavement1_128.jpg", name: "Pavement" },
    { srcName: "Pavement128.jpg", name: "Pavement2" },
    { srcName: "TlakFloor3_128.jpg", name: "TlakFloor3" },
    { srcName: "DungeonFloor128.jpg", name: "DungeonFloor" },
    { srcName: "BrickWall3_128.jpg", name: "BrickWall3" },
    { srcName: "ThatchFloor128.jpg", name: "ThatchFloor" },
    { srcName: "OldWall128.jpg", name: "OldFloor" },
    { srcName: "RockWall128.jpg", name: "RockWall" },
    { srcName: "GreyDungeonFloor128.jpg", name: "GreyDungeonFloor" },
    { srcName: "StoneWall2_128.jpg", name: "StoneWall2" },
    { srcName: "BrokenRuin128.jpg", name: "BrokenRuin" },
    { srcName: "DirtFloor.jpg", name: "DirtFloor" },
    { srcName: "RockCeiling.jpg", name: "RockCeiling" },
    { srcName: "TiledFloor5.jpg", name: "TiledFloor" },
    { srcName: "Rough1.jpg", name: "Rough" },
    { srcName: "Wall6.jpg", name: "DungeonWall4" },
    { srcName: "Tile1.jpg", name: "Tile" },
    { srcName: "Wall7.jpg", name: "Wall7" },
    { srcName: "Wall13.jpg", name: "Wall13" },
    { srcName: "Wall12.jpg", name: "Wall12" },
    { srcName: "Wall11.jpg", name: "Wall11" },
    { srcName: "Wall10.jpg", name: "Wall10" },
    { srcName: "Wall9.jpg", name: "Wall9" },
    { srcName: "Wall8.jpg", name: "Wall8" },
    { srcName: "GreyWall.jpg", name: "GreyWall" },
    { srcName: "Gold1.jpg", name: "Gold" },
    { srcName: "Silver1.jpg", name: "Silver" },
    { srcName: "RedMetal1.jpg", name: "RedMetal" },
    { srcName: "RedLiquid1.jpg", name: "RedLiquid" },
    { srcName: "BlueLiquid1.jpg", name: "BlueLiquid" },
    { srcName: "ScrollTexture1.jpg", name: "ScrollTexture" },
    { srcName: "Fireball2.jpg", name: "FireballTexture" },
    { srcName: "BloodFireSilver.png", name: "BloodFireSilver" },
    { srcName: "Sword1.png", name: "Sword" },
    { srcName: "Red3.jpg", name: "Red" },
    { srcName: "Red2.jpg", name: "Red2" },
    { srcName: "ScrapedMetal1.jpg", name: "ScrapedMetal" },
    { srcName: "Magic4.jpg", name: "Magic" },
    { srcName: "Wood2.jpg", name: "Wood1" },
    { srcName: "Explosion1.jpg", name: "Explosion" },

    //decal-gates
    { srcName: "GoldGate1_256.png", name: "GoldGate1" },
    { srcName: "RedGate1_256.png", name: "RedGate1" },
    { srcName: "SilverGate1_256.png", name: "SilverGate1" },
    { srcName: "WoodeGate1_256.png", name: "WoodenGate1" },


];
LoadAudio = [
    { srcName: "UseScroll.mp3", name: "PickBox" },
    { srcName: "Scream.mp3", name: "Scream" },
    { srcName: "OpenGate.mp3", name: "OpenGate" },
    { srcName: "ClosedDoor.mp3", name: "ClosedDoor" },
    { srcName: "Keys.mp3", name: "Keys" },
    { srcName: "Swallow.mp3", name: "Swallow" },
    { srcName: "death.mp3", name: "Death" },
    { srcName: "UseScroll.mp3", name: "UseScroll" },
    { srcName: "Scroll.mp3", name: "Scroll" },
    { srcName: "Potion.mp3", name: "Potion" },
    { srcName: "Chirp.mp3", name: "Chirp" },
    { srcName: "Failed magic.mp3", name: "MagicFail" },
    { srcName: "Cast.mp3", name: "MagicCast" },
    { srcName: "Power up.mp3", name: "PowerUp" },
    { srcName: "Level up.mp3", name: "LevelUp" },
    { srcName: "Pick up gold.mp3", name: "Pick" },
    { srcName: "Evil laughter.mp3", name: "EvilLaughter" },
    { srcName: "Explosion1.mp3", name: "Explosion" },
    { srcName: "OpenChest.mp3", name: "OpenChest" },

];
LoadFonts = [{ srcName: "DeepDown.ttf", name: "DeepDown" }];
LoadShaders = [
    'vShader.glsl', 'fShader.glsl', 'pick_vShader.glsl', 'pick_fShader.glsl',
    'particle_render_fShader.glsl', 'particle_render_vShader.glsl', 'particle_transform_fShader.glsl', 'particle_transform_vShader.glsl'
];
LoadObjects = ["key.obj", "flask.obj", "scroll.obj", "ball.obj", "sword.obj", "heart.obj", "shield.obj", "pentagram.obj", "chest.obj"];

LoadSprites = [
    { srcName: "WallLamp256.png", name: "WallLamp" },
    { srcName: "CompassRose.png", name: "CompassRose" },

    //shrine
    { srcName: "AttackShrine256.png", name: "AttackShrine" },
    { srcName: "DefenseShrine256.png", name: "DefenseShrine" },
    { srcName: "MagicShrine256.png", name: "MagicShrine" },

    //stairs
    { srcName: "StairsUp.jpg", name: "StairsUp" },
    { srcName: "StairsDown.jpg", name: "StairsDown" },

    //entrance_gate
    { srcName: "DungeonDoor.png", name: "EntranceGate" },
    //scrolls
    { srcName: "Invisibility.png", name: "SCR_Invisibility" },
    { srcName: "DestroyArmor.png", name: "SCR_DestroyArmor" },
    { srcName: "DestroyWeapon.png", name: "SCR_DestroyWeapon" },
    { srcName: "BoostArmor.png", name: "SCR_BoostArmor" },
    { srcName: "BoostWeapon.png", name: "SCR_BoostWeapon" },
    { srcName: "Map.png", name: "SCR_Map" },
    { srcName: "TeleportTemple.png", name: "SCR_TeleportTemple" },
    { srcName: "HalfLife.png", name: "SCR_HalfLife" },
    { srcName: "Cripple.png", name: "SCR_Cripple" },
    { srcName: "Light.png", name: "SCR_Light" },
    { srcName: "MagicBoost.png", name: "SCR_MagicBoost" },
    { srcName: "Luck.png", name: "SCR_Luck" },
    { srcName: "DrainMana.png", name: "SCR_DrainMana" },
    { srcName: "Petrify.png", name: "SCR_Petrify" },

    //status
    { srcName: "Invisible24.png", name: "Invisible" },
    { srcName: "Clover24.png", name: "Clover" },
    { srcName: "Lantern24.png", name: "Lantern" },

    //skills
    { srcName: "Magic24.png", name: "MagicSkill" },
    { srcName: "shield24.png", name: "ShieldSkill" },
    { srcName: "sword4.png", name: "SwordSkill" },
    { srcName: "Heart24.png", name: "Health" },
    { srcName: "MagicOrb24.png", name: "Mana" },


    //title sprites
    { srcName: "divLineB_200.png", name: "LineBottom" },
    { srcName: "divLineT_200.png", name: "LineTop" },
    { srcName: "RedKey.png", name: "RedKeyBig" },
    { srcName: "GoldKey.png", name: "GoldKeyBig" },
    { srcName: "SilverKey.png", name: "SilverKeyBig" },
    { srcName: "bluePotion24.png", name: "BluePotion24" },
    { srcName: "RedPotion24.png", name: "RedPotion24" },

    //decal-other
    { srcName: "LS.png", name: "LS" },
    { srcName: "Skull4.png", name: "Skull4" },
    { srcName: "Skull3.png", name: "Skull3" },
    { srcName: "Skull2.png", name: "Skull2" },
    { srcName: "Skull1.png", name: "Skull1" },
    { srcName: "Crack4.png", name: "Crack4" },
    { srcName: "Crack3.png", name: "Crack3" },
    { srcName: "Skeleton11.png", name: "Skeleton11" },
    { srcName: "Skeleton12.png", name: "Skeleton12" },

    //decal-pics
    { srcName: "SVS7.png", name: "SVS1" },
    { srcName: "SVS6.png", name: "SVS2" },
    { srcName: "SVS4.png", name: "SVS3" },
    { srcName: "SpyVsSpyPicture.png", name: "SVS4" },
    { srcName: "DM8.png", name: "DM1" },
    { srcName: "DM3.png", name: "DM4" },
    { srcName: "DungeonMasterPicture3.png", name: "DM5" },
    { srcName: "DungeonMasterPicture2.png", name: "DM6" },
    { srcName: "DungeonMasterPicture.png", name: "DM7" },
    { srcName: "TR8.png", name: "TR1" },
    { srcName: "TR4.png", name: "TR2" },
    { srcName: "TR3.png", name: "TR3" },
    { srcName: "TR2.png", name: "TR2" },
    { srcName: "TR1.png", name: "TR1" },
    { srcName: "CH1.png", name: "CH1" },
    { srcName: "UU.png", name: "UU" },
    { srcName: "WizardOfWor.png", name: "WOW1" },
    { srcName: "AA9.png", name: "AA9" },
    { srcName: "AA8.png", name: "AA8" },
    { srcName: "AA7.png", name: "AA7" },
    { srcName: "AA5.png", name: "AA5" },
    { srcName: "AA3.png", name: "AA3" },
    { srcName: "AA2.png", name: "AA2" },
    { srcName: "AticAtacPicture.png", name: "AA1" },
    { srcName: "Hero2.png", name: "Hero2" },
    { srcName: "HERO3.png", name: "Hero3" },
    { srcName: "HeroPicture.png", name: "Hero1" },
    { srcName: "Bagitman.png", name: "Bagitman" },
    { srcName: "AMC.png", name: "AMC" },
    { srcName: "Walls.png", name: "Walls" },
    //{ srcName: "Hunch.png", name: "Hunchback" },
    { srcName: "Amber.png", name: "Amberstar" },
    { srcName: "Soc.png", name: "Soccer" },
    { srcName: "LSL7.png", name: "LSL7" },
    { srcName: "LSL6.png", name: "LSL6" },
    { srcName: "LSL4.png", name: "LSL4" },
    { srcName: "LSL1.png", name: "LSL1" },
    { srcName: "Prince2.png", name: "Prince2" },
    { srcName: "Prince.png", name: "Prince1" },
    { srcName: "Ultima2.png", name: "Ultima2" },
    { srcName: "Ultima1.png", name: "Ultima1" },
    { srcName: "Arena.png", name: "Arena" },
    { srcName: "Robin.png", name: "Robin" },
    { srcName: "EOB4.png", name: "EOB4" },
    { srcName: "EOB3.png", name: "EOB3" },
    { srcName: "EOB2.png", name: "EOB2" },
    { srcName: "EOB1.png", name: "EOB1" },
    { srcName: "HOB5.png", name: "HOB5" },
    { srcName: "HOB2.png", name: "HOB2" },
    { srcName: "Maniac.png", name: "Maniac" },
    { srcName: "Kara.png", name: "Karateka" },
    { srcName: "Eric.png", name: "Eric" },
    { srcName: "C64b.png", name: "C64" },
    { srcName: "JSW2.png", name: "JSW2" },
    { srcName: "IM.png", name: "IM" },
    { srcName: "moon.png", name: "Moon" },
    { srcName: "monkey.png", name: "MonkeyIsland" },
    { srcName: "winter.png", name: "Winter" },
    { srcName: "manic.png", name: "ManicMiner" },
    { srcName: "Castle.png", name: "Castle" },
    { srcName: "Valhalla.png", name: "Valhalla" },
    { srcName: "Fred2.png", name: "Fred2" },
    { srcName: "fred.png", name: "Fred1" },
    { srcName: "Miner.png", name: "Miner" },
    { srcName: "Sorcery3.png", name: "Sorcery3" },
    { srcName: "penta.png", name: "Penta" },
    { srcName: "blue.png", name: "BlueMax" },
    { srcName: "sabre2.png", name: "sabre2" },
    { srcName: "zx1.png", name: "zx1" },
    { srcName: "Tut2.png", name: "Tut2" },
    { srcName: "LTUT.png", name: "LTUT" },
    { srcName: "RRR.png", name: "RRR" },
    { srcName: "FF4.png", name: "FF4" },
    { srcName: "FF2b.png", name: "FF2" },
    { srcName: "FF5.png", name: "FF5" },
    { srcName: "ForbiddenForest.png", name: "FF1" },
    { srcName: "Phara.png", name: "Phara" },
    { srcName: "Pitfall.png", name: "Pitfall" },
    //{ srcName: "Aztec.png", name: "Aztec" },
    { srcName: "Pitfall3.png", name: "Pitfall3" },
    { srcName: "DK.png", name: "DK" },
    { srcName: "PAC2.png", name: "PAC2" },
    { srcName: "galaxian.png", name: "galaxian" },
    { srcName: "Apshai.png", name: "Apshai" },
    { srcName: "Under.png", name: "Under" },
    { srcName: "Lode.png", name: "Lode" },
    { srcName: "JSW.png", name: "JSW" },
    { srcName: "Frogger.png", name: "Frogger" },
    { srcName: "Knightlore.png", name: "Knightlore" },
    { srcName: "Galaga1.png", name: "Galaga1" },
    { srcName: "BoogaBoo3.png", name: "BoogaBoo3" },
    { srcName: "BoogaBoo1.png", name: "BoogaBoo1" },
    { srcName: "CrystalCastles.png", name: "CrystalCastles" },
    { srcName: "SVS10.png", name: "SVS10" },
    { srcName: "ZimSalaBim.png", name: "ZimSalaBim" },
    { srcName: "Barbarian1.png", name: "Barbarian1" },
    { srcName: "BeachHead.png", name: "BeachHead" },
    { srcName: "BFF.png", name: "BFF" },
    { srcName: "Impossible_Mission4.png", name: "Impossible_Mission4" },
    { srcName: "Drelbs.png", name: "Drelbs" },
    { srcName: "Wolf1.png", name: "Wolf1" },
    { srcName: "Zaxxon.png", name: "Zaxxon" },
    { srcName: "HL1.png", name: "HL1" },
    { srcName: "HL2.png", name: "HL2" },
    { srcName: "DK2.png", name: "DK2" },
    { srcName: "Pitfall4.png", name: "Pitfall4" },
    { srcName: "Jumpman.png", name: "Jumpman" },
    { srcName: "Pitstop.png", name: "Pitstop" },
    { srcName: "Montezuma.png", name: "Montezuma" },
    { srcName: "Pipeline.png", name: "Pipeline" },
    { srcName: "Goonies.png", name: "Goonies" },
    { srcName: "HOB11.png", name: "HOB11" },
    { srcName: "Sorcery2.png", name: "Sorcery2" },
    { srcName: "Commando2.png", name: "Commando2" },
    { srcName: "SOF.png", name: "SOF" },
    { srcName: "Zak.png", name: "Zak" },
    { srcName: "TheSentinel.png", name: "TheSentinel" },
    { srcName: "DM12.png", name: "DM12" },
    { srcName: "RickDangerous.png", name: "RickDangerous" },
    { srcName: "Killerwat.png", name: "Killerwat" },
    { srcName: "DM11.png", name: "DM11" },
    { srcName: "DDID2.png", name: "DDID2" },
    { srcName: "JumpmanJr.png", name: "JumpmanJr" },
    { srcName: "CyberPunk1.png", name: "CyberPunk1" },
    { srcName: "KQ1.png", name: "KQ1" },
    { srcName: "Wally.png", name: "Wally" },
    { srcName: "JSW3.png", name: "JSW3" },
    { srcName: "Barbarian5.png", name: "Barbarian5" },
    { srcName: "HoraceSki2.png", name: "HoraceSki" },
    { srcName: "Iceman.png", name: "Iceman" },
    { srcName: "CSB1.png", name: "CSB1" },
    { srcName: "WOW2.png", name: "WOW2" },
    { srcName: "SQ1.png", name: "SQ1" },
    { srcName: "Galaxian3.png", name: "Galaxian3" },
    { srcName: "CW3.png", name: "CW3" },
    { srcName: "CW1.png", name: "CW1" },
    { srcName: "CW6.png", name: "CW6" },
    { srcName: "HL4.png", name: "HL4" },
    { srcName: "SW4.png", name: "SW4" },
    { srcName: "LastNinja1.png", name: "LastNinja1" },
    { srcName: "FA3.png", name: "FA3" },
    { srcName: "TR10.png", name: "TR10" },
    { srcName: "Portal1.png", name: "Portal1" },
    { srcName: "LSL20.png", name: "LSL20" },
    { srcName: "HL3.png", name: "HL3" },
    { srcName: "Pooyan.png", name: "Pooyan" },
    { srcName: "Kangaroo.png", name: "Kangaroo" },
    { srcName: "Zong.png", name: "Zong" },
    { srcName: "GreenBeret.png", name: "GreenBeret" },
    { srcName: "HL5.png", name: "HL5" },
    { srcName: "VIC20-2.png", name: "VIC20" },
    { srcName: "Hero10.png", name: "Hero10" },
    { srcName: "Scramble4.png", name: "Scramble4" },
    { srcName: "Ghostbusters.png", name: "Ghostbusters" },
    { srcName: "Oblivion2.png", name: "Oblivion2" },
    { srcName: "Scramble3.png", name: "Scramble3" },
    { srcName: "OperationWolf2.png", name: "OperationWolf2" },
    { srcName: "OperationWolf.png", name: "OperationWolf" },
    { srcName: "Imhotep.png", name: "Imhotep" },
    { srcName: "UU2.png", name: "UU2" },
    { srcName: "BlueMax2.png", name: "BlueMax2" },
    { srcName: "Oblivion.png", name: "Oblivion" },
    { srcName: "Skyrim.png", name: "Skyrim" },
    { srcName: "BlueMax4.png", name: "BlueMax4" },
    { srcName: "Witcher5.png", name: "Witcher5" },
    { srcName: "LSL9.png", name: "LSL9" },
    { srcName: "Shamus1.png", name: "Shamus1" },
    { srcName: "PharaohCurse3.png", name: "PharaohCurse3" },
    { srcName: "Witcher4.png", name: "Witcher4" },
    { srcName: "Witcher3.png", name: "Witcher3" },
    { srcName: "TempleOfApshai.png", name: "TempleOfApshai" },
    { srcName: "Witcher2.png", name: "Witcher2" },
    { srcName: "KnightLore2.png", name: "KnightLore2" },
    { srcName: "Witcher1.png", name: "Witcher1" },
    { srcName: "Spelunker.png", name: "Spelunker" },
    { srcName: "ShamusCase2.png", name: "ShamusCase2" },
    { srcName: "Ishar2.png", name: "Ishar2" },
    { srcName: "Pitfall5.png", name: "Pitfall5" },
    { srcName: "PharaohCurse2.png", name: "PharaohCurse2" },
    { srcName: "Frontier.png", name: "Frontier" },
    { srcName: "LSL8.png", name: "LSL8" },
    { srcName: "SP2.png", name: "SP2" },
    { srcName: "SP1.png", name: "SP1" },
    { srcName: "SVS24.png", name: "SVS24" },
    { srcName: "SVS23.png", name: "SVS23" },
    { srcName: "KQ10.png", name: "KQ10" },
    { srcName: "Shamus20.png", name: "Shamus20" },
    { srcName: "Pitfall21.png", name: "Pitfall21" },
    { srcName: "Apshai6.png", name: "Apshai6" },
    { srcName: "Apshai5.png", name: "Apshai5" },
    { srcName: "MontyMole.png", name: "MontyMole" },
    { srcName: "PacClose.png", name: "PacClose" },
    { srcName: "PacGhost.png", name: "PacGhost" },
    { srcName: "Pitfall20.png", name: "Pitfall20" },
    { srcName: "SVS22.png", name: "SVS22" },
    { srcName: "SVS21.png", name: "SVS21" },
    { srcName: "Apshai4.png", name: "Apshai4" },
    { srcName: "Apshai3.png", name: "Apshai3" },
    { srcName: "Paperboy.png", name: "Paperboy" },
    { srcName: "RobinOfTheWood2.png", name: "RobinOfTheWood2" },
    { srcName: "Pyjamarama.png", name: "Pyjamarama" },
    { srcName: "ThePawn.png", name: "ThePawn" },
    { srcName: "KokotoniWilf.png", name: "KokotoniWilf" },
    { srcName: "Cauldron1.png", name: "Cauldron1" },
    { srcName: "Zeppelin2.png", name: "Zeppelin2" },
    { srcName: "TimeTunnel.png", name: "TimeTunnel" },
    { srcName: "SP3.png", name: "SP3" },
    { srcName: "AC2.png", name: "AC2" },
    { srcName: "Hero30.png", name: "Hero30" },
    { srcName: "SVS30.png", name: "SVS30" },
    { srcName: "AirWolf.png", name: "AirWolf" },
    { srcName: "AA41.png", name: "AA41" },
    { srcName: "AA40.png", name: "AA40" },
    { srcName: "SeaWolf.png", name: "SeaWolf" },
    { srcName: "GIJoe10.png", name: "GIJoe10" },
    { srcName: "Hobbit1.png", name: "Hobbit1" },
    { srcName: "Hobbit3.png", name: "Hobbit3" },
    { srcName: "Ghostbusters2.png", name: "Ghostbusters2" },
    { srcName: "Commando3.png", name: "Commando3" },
    { srcName: "EOB20.png", name: "EOB20" },
    { srcName: "Hobbit6.png", name: "Hobbit6" },
    { srcName: "Hobbit7.png", name: "Hobbit7" },
    { srcName: "Hobbit8.png", name: "Hobbit8" },
    { srcName: "Hobbit9.png", name: "Hobbit9" },
    { srcName: "AticAtac1.png", name: "AticAtac1" },
    { srcName: "Infiltrator1.png", name: "Infiltrator1" },
    { srcName: "ManicMiner2.png", name: "ManicMiner2" },
    { srcName: "ManicMiner3.png", name: "ManicMiner3" },
    { srcName: "Prince3.png", name: "Prince3" },
    { srcName: "Infiltrator2.png", name: "Infiltrator2" },
    { srcName: "1942_2.png", name: "1942_2" },
    { srcName: "Arnie1.png", name: "Arnie1" },
    { srcName: "BTF1.png", name: "BTF1" },
    //{ srcName: "Biggles1.png", name: "Biggles1" },
    { srcName: "BlueThunder1.png", name: "BlueThunder1" },
    { srcName: "BrianBloodaxe1.png", name: "BrianBloodaxe1" },
    { srcName: "BrideOfFrakenstein1.png", name: "BrideOfFrakenstein1" },
    { srcName: "BruceLee1.png", name: "BruceLee1" },
    { srcName: "Captive.png", name: "Captive" },
    { srcName: "Fred3.png", name: "Fred3" },
    { srcName: "Fred4.png", name: "Fred4" },
    { srcName: "JSW4.png", name: "JSW4" },
    { srcName: "ManiacMansion2.png", name: "ManiacMansion2" },
    { srcName: "PQ1.png", name: "PQ1" },
    { srcName: "Pengo.png", name: "Pengo" },
    { srcName: "Pirates.png", name: "Pirates" },
    { srcName: "PolePosition.png", name: "PolePosition" },
    { srcName: "Silkworm1.png", name: "Silkworm1" },
    { srcName: "SirFred1.png", name: "SirFred1" },
    { srcName: "SirFred2.png", name: "SirFred2" },
    { srcName: "SirFred3.png", name: "SirFred3" },
    { srcName: "Unknown1.png", name: "Unknown1" },
    { srcName: "BattleThroughTime.png", name: "BattleThroughTime" },
    { srcName: "BOF3.png", name: "BOF3" },
    { srcName: "Chopper2.png", name: "Chopper2" },
    { srcName: "Cliffhanger.png", name: "Cliffhanger" },
    { srcName: "F1.png", name: "F1" },
    { srcName: "IM10.png", name: "IM10" },
    { srcName: "MoonPatrol.png", name: "MoonPatrol" },
    { srcName: "SummerGames10.png", name: "SummerGames10" },
    { srcName: "LaraCroft1.png", name: "LaraCroft1" },
    { srcName: "LaraCroft2.png", name: "LaraCroft2" },
    { srcName: "IM13.png", name: "IM13" },
    { srcName: "FF101.png", name: "FF101" },
    { srcName: "FF100.png", name: "FF100" },
    { srcName: "AA100.png", name: "AA100" },
    { srcName: "UW10.png", name: "UW10" },
    { srcName: "KL10.png", name: "KL10" },
    { srcName: "SVS100.png", name: "SVS100" },
    { srcName: "SVS101.png", name: "SVS101" },
    { srcName: "SP4.png", name: "SP4" },
    { srcName: "JSW10.png", name: "JSW10" },
    { srcName: "Vixen3.png", name: "Vixen3" },
    { srcName: "WOW10.png", name: "WOW10" },
    { srcName: "ESB.png", name: "ESB" },
    { srcName: "Galaxians10.png", name: "Galaxians10" },
    { srcName: "BC10.png", name: "BC10" },
    { srcName: "ActecChallenge2.png", name: "ActecChallenge2" },
    { srcName: "AlleyKat.png", name: "AlleyKat" },
    { srcName: "BeachHead100.png", name: "BeachHead100" },
    { srcName: "Blackwyche2.png", name: "Blackwyche2" },
    { srcName: "Hero100.png", name: "Hero100" },
    { srcName: "Invaders2.png", name: "Invaders2" },
    { srcName: "KL102.png", name: "KL102" },
    { srcName: "Karn1.png", name: "Karn1" },
    { srcName: "LastNinja10.png", name: "LastNinja10" },
    { srcName: "MoonBuggy.png", name: "MoonBuggy" },
    { srcName: "PQ3.png", name: "PQ3" },
    { srcName: "Pitfall2-100.png", name: "Pitfall2-100" },
    { srcName: "SVS103.png", name: "SVS103" },
    { srcName: "Amiga.png", name: "Amiga" },
    { srcName: "Apshai10.png", name: "Apshai10" },
    { srcName: "BC103.png", name: "BC103" },
    { srcName: "Barbarian3.png", name: "Barbarian3" },
    { srcName: "BattleChopper.png", name: "BattleChopper" },
    { srcName: "Belwothe.png", name: "Belwothe" },
    { srcName: "BladeRunner.png", name: "BladeRunner" },
    { srcName: "BlueMax20.png", name: "BlueMax20" },
    { srcName: "BrideOfFrankenstein.png", name: "BrideOfFrankenstein" },
    { srcName: "Goonies5.png", name: "Goonies5" },
    { srcName: "Hero103.png", name: "Hero103" },
    { srcName: "LSL100.png", name: "LSL100" },
    { srcName: "LaraCroft21.png", name: "LaraCroft21" },
    { srcName: "MoonZX.png", name: "MoonZX" },
    { srcName: "OlympicSkier.png", name: "OlympicSkier" },
    { srcName: "Pitfall23.png", name: "Pitfall23" },
    { srcName: "Prince4.png", name: "Prince4" },
    { srcName: "PurpleHeart.png", name: "PurpleHeart" },
    { srcName: "AntAttack2.png", name: "AntAttack2" },
    { srcName: "BeachHeadReplace.png", name: "BeachHeadReplace" },
    { srcName: "Cavelon13.png", name: "Cavelon13" },
    { srcName: "Cavelon4.png", name: "Cavelon4" },
    { srcName: "CongoBongo2.png", name: "CongoBongo2" },
    { srcName: "FalconPatrol7.png", name: "FalconPatrol7" },
    { srcName: "Fred21.png", name: "Fred21" },
    { srcName: "Frogger2.png", name: "Frogger2" },
    { srcName: "LSL31.png", name: "LSL31" },
    { srcName: "LaraCroft123.png", name: "LaraCroft123" },
    { srcName: "RobinToTheRescue1.png", name: "RobinToTheRescue1" },
    { srcName: "Ski64.png", name: "Ski64" },
    { srcName: "SpaceQuest10.png", name: "SpaceQuest10" },
    { srcName: "AtariST.png", name: "AtariST" },
    { srcName: "BC11.png", name: "BC11" },
    { srcName: "BladeRunner7.png", name: "BladeRunner7" },
    { srcName: "BlueMax11.png", name: "BlueMax11" },
    { srcName: "C64_hard.png", name: "C64_hard" },
    { srcName: "CastleHaunt.png", name: "CastleHaunt" },
    { srcName: "Cavelon11.png", name: "Cavelon11" },
    { srcName: "CrawlMaster2.png", name: "CrawlMaster2" },
    { srcName: "DM100.png", name: "DM100" },
    { srcName: "DigDug2.png", name: "DigDug2" },
    { srcName: "DotHunter.png", name: "DotHunter" },
    { srcName: "EricTheViking10.png", name: "EricTheViking10" },
    { srcName: "FireAnt2.png", name: "FireAnt2" },
    { srcName: "HungryHorace11.png", name: "HungryHorace11" },
    { srcName: "Invasion.png", name: "Invasion" },
    { srcName: "KQ100.png", name: "KQ100" },
    { srcName: "KQ101.png", name: "KQ101" },
    { srcName: "LSL_Eve2.png", name: "LSL_Eve2" },
    { srcName: "ManiacMansion11.png", name: "ManiacMansion11" },
    { srcName: "ORileysMine2.png", name: "ORileysMine2" },
    { srcName: "PWE.png", name: "PWE" },
    { srcName: "Pitfall100.png", name: "Pitfall100" },
    { srcName: "Scramble10.png", name: "Scramble10" },
    { srcName: "SuperDogfight3.png", name: "SuperDogfight3" },
    { srcName: "Tutanham11.png", name: "Tutanham11" },
    { srcName: "Tutanham12.png", name: "Tutanham12" },
    { srcName: "Ultima11.png", name: "Ultima11" },
    { srcName: "WinterGames10.png", name: "WinterGames10" },
    { srcName: "AntAttack4.png", name: "AntAttack4" },
    { srcName: "Cauldron10.png", name: "Cauldron10" },
    { srcName: "DM103.png", name: "DM103" },
    { srcName: "DM104.png", name: "DM104" },
    { srcName: "DonkeyKong100.png", name: "DonkeyKong100" },
    { srcName: "Elvira1.png", name: "Elvira1" },
    { srcName: "Elvira2.png", name: "Elvira2" },
    { srcName: "Elvira3.png", name: "Elvira3" },
    { srcName: "FalconPatrol8.png", name: "FalconPatrol8" },
    { srcName: "FalconPatrol9.png", name: "FalconPatrol9" },
    { srcName: "FortApocalypse.png", name: "FortApocalypse" },
    { srcName: "Fred101.png", name: "Fred101" },
    { srcName: "Fred102.png", name: "Fred102" },
    { srcName: "GatewayToApshai11.png", name: "GatewayToApshai11" },
    { srcName: "Grog1.png", name: "Grog1" },
    { srcName: "Hero104.png", name: "Hero104" },
    { srcName: "HungryHorace12.png", name: "HungryHorace12" },
    { srcName: "KQ102.png", name: "KQ102" },
    { srcName: "LSL101.png", name: "LSL101" },
    { srcName: "LSL102.png", name: "LSL102" },
    { srcName: "LSL103.png", name: "LSL103" },
    { srcName: "LadyTut10.png", name: "LadyTut10" },
    { srcName: "LodeRunner10.png", name: "LodeRunner10" },
    { srcName: "LodeRunner11.png", name: "LodeRunner11" },
    { srcName: "MissileCommand.png", name: "MissileCommand" },
    { srcName: "OlympicSkier6.png", name: "OlympicSkier6" },
    { srcName: "Pitfall27.png", name: "Pitfall27" },
    { srcName: "Popeye2.png", name: "Popeye2" },
    { srcName: "PrinceMac.png", name: "PrinceMac" },
    { srcName: "SVS102.png", name: "SVS102" },
    { srcName: "SabreWulf11.png", name: "SabreWulf11" },
    { srcName: "Scramble7.png", name: "Scramble7" },
    { srcName: "Shamus4.png", name: "Shamus4" },
    { srcName: "Ski23.png", name: "Ski23" },
    { srcName: "Skyrim3.png", name: "Skyrim3" },
    { srcName: "Tutankham102.png", name: "Tutankham102" },
    { srcName: "Unknown3.png", name: "Unknown3" },
    { srcName: "Witcher47.png", name: "Witcher47" },
    { srcName: "Wolf10.png", name: "Wolf10" },
    { srcName: "Zaxxon3.png", name: "Zaxxon3" },
    { srcName: "ZimSalaBim2.png", name: "ZimSalaBim2" },
    { srcName: "ArticShipwreck2.png", name: "ArticShipwreck2" },
    { srcName: "BoogaBoo11.png", name: "BoogaBoo11" },
    { srcName: "CastleOFTerror11.png", name: "CastleOFTerror11" },
    { srcName: "Cauldron8.png", name: "Cauldron8" },
    { srcName: "DM105.png", name: "DM105" },
    { srcName: "DM106.png", name: "DM106" },
    { srcName: "DM107.png", name: "DM107" },
    { srcName: "DefenderOfTheCrown.png", name: "DefenderOfTheCrown" },
    { srcName: "EOB11.png", name: "EOB11" },
    { srcName: "FortApocalypse41.png", name: "FortApocalypse41" },
    { srcName: "Hobbit101.png", name: "Hobbit101" },
    { srcName: "LCP.png", name: "LCP" },
    { srcName: "LadyTut102.png", name: "LadyTut102" },
    { srcName: "ManicMiner11.png", name: "ManicMiner11" },
    { srcName: "ManicMiner12.png", name: "ManicMiner12" },
    { srcName: "MatchPoint2.png", name: "MatchPoint2" },
    { srcName: "Miner2049_1.png", name: "Miner2049_1" },
    { srcName: "MrRobot11.png", name: "MrRobot11" },
    { srcName: "Paratroopers2.png", name: "Paratroopers2" },
    { srcName: "PharaohCurse11.png", name: "PharaohCurse11" },
    { srcName: "Rambo3.png", name: "Rambo3" },
    { srcName: "RobinOfTheWood4.png", name: "RobinOfTheWood4" },
    { srcName: "SP111.png", name: "SP111" },
    { srcName: "ST2.png", name: "ST2" },
    { srcName: "SammyLightfoot2.png", name: "SammyLightfoot2" },
    { srcName: "SirFred4.png", name: "SirFred4" },
    { srcName: "Skyrim9.png", name: "Skyrim9" },
    { srcName: "SkyrimElf.png", name: "SkyrimElf" },
    { srcName: "Tutankham105.png", name: "Tutankham105" },
    { srcName: "UW27.png", name: "UW27" },
    { srcName: "WOW104.png", name: "WOW104" },
    { srcName: "WinterGames11.png", name: "WinterGames11" },
    { srcName: "Arena2.png", name: "Arena2" },
    { srcName: "Barbarian13.png", name: "Barbarian13" },
    { srcName: "BoogaBoo4.png", name: "BoogaBoo4" },
    { srcName: "BrianBloodaxe11.png", name: "BrianBloodaxe11" },
    { srcName: "CastleOfTerror3.png", name: "CastleOfTerror3" },
    { srcName: "CastleOfTerror4.png", name: "CastleOfTerror4" },
    { srcName: "CrystalCastles2.png", name: "CrystalCastles2" },
    { srcName: "Daggerfall3.png", name: "Daggerfall3" },
    { srcName: "Daggerfall4.png", name: "Daggerfall4" },
    { srcName: "EnigmaForce2.png", name: "EnigmaForce2" },
    { srcName: "EveryoneIsAWally2.png", name: "EveryoneIsAWally2" },
    { srcName: "GI_Joe2.png", name: "GI_Joe2" },
    { srcName: "Gauntlet.png", name: "Gauntlet" },
    { srcName: "Gods2.png", name: "Gods2" },
    { srcName: "ImpossibleMission11.png", name: "ImpossibleMission11" },
    { srcName: "JungleHunt2.png", name: "JungleHunt2" },
    { srcName: "LaraCroft102.png", name: "LaraCroft102" },
    { srcName: "ManicMiner14.png", name: "ManicMiner14" },
    { srcName: "Miranda1.png", name: "Miranda1" },
    { srcName: "Montezuma's revenge2.png", name: "Montezuma's revenge2" },
    { srcName: "Nebulus2.png", name: "Nebulus2" },
    { srcName: "Neptune's daughters.png", name: "Neptune's daughters" },
    { srcName: "RobinHood3.png", name: "RobinHood3" },
    { srcName: "SammyLightfoot4.png", name: "SammyLightfoot4" },
    { srcName: "Scramble23.png", name: "Scramble23" },
    { srcName: "Skullkeep.png", name: "Skullkeep" },
    { srcName: "Soccer3.png", name: "Soccer3" },
    { srcName: "SpaceQuest103.png", name: "SpaceQuest103" },
    { srcName: "TheHobbit13.png", name: "TheHobbit13" },
    { srcName: "TheHobbit14.png", name: "TheHobbit14" },
    { srcName: "TheHobbit15.png", name: "TheHobbit15" },
    { srcName: "Trashman2.png", name: "Trashman2" },
    { srcName: "Triss.png", name: "Triss" },
    { srcName: "Tutankham104.png", name: "Tutankham104" },
    { srcName: "Yennefer.png", name: "Yennefer" },
    { srcName: "ZX Spectrum.png", name: "ZX Spectrum" },
    { srcName: "AirWolf31.png", name: "AirWolf31" },
    { srcName: "ArticShipwreck7.png", name: "ArticShipwreck7" },
    { srcName: "AtariFalcon.png", name: "AtariFalcon" },
    { srcName: "Bagitman11.png", name: "Bagitman11" },
    { srcName: "BattleThroughTime2.png", name: "BattleThroughTime2" },
    { srcName: "BoogaBoo41.png", name: "BoogaBoo41" },
    { srcName: "CBM_VIC20.png", name: "CBM_VIC20" },
    { srcName: "CastleWolfenstein21.png", name: "CastleWolfenstein21" },
    { srcName: "CodenameIceman2.png", name: "CodenameIceman2" },
    { srcName: "CodenameIceman3.png", name: "CodenameIceman3" },
    { srcName: "F2.png", name: "F2" },
    { srcName: "FalconPatrol99.png", name: "FalconPatrol99" },
    { srcName: "GoldenAxe2.png", name: "GoldenAxe2" },
    { srcName: "HalfLife11.png", name: "HalfLife11" },
    { srcName: "HalfLife12.png", name: "HalfLife12" },
    { srcName: "HalfLife13.png", name: "HalfLife13" },
    { srcName: "HalfLife14.png", name: "HalfLife14" },
    { srcName: "HeadOverHeels3.png", name: "HeadOverHeels3" },
    { srcName: "IK2.png", name: "IK2" },
    { srcName: "Ishar11.png", name: "Ishar11" },
    { srcName: "Ishar13.png", name: "Ishar13" },
    { srcName: "Ishar14.png", name: "Ishar14" },
    { srcName: "Ishar15.png", name: "Ishar15" },
    { srcName: "Jetpac3.png", name: "Jetpac3" },
    { srcName: "Jumpman3.png", name: "Jumpman3" },
    { srcName: "JungleHunt12.png", name: "JungleHunt12" },
    { srcName: "KnightLore31.png", name: "KnightLore31" },
    { srcName: "KokotoniWilf2.png", name: "KokotoniWilf2" },
    { srcName: "LeisureSuitLarry201.png", name: "LeisureSuitLarry201" },
    { srcName: "MassEffect1.png", name: "MassEffect1" },
    { srcName: "MassEffect2.png", name: "MassEffect2" },
    { srcName: "Maze.png", name: "Maze" },
    { srcName: "Miner3.png", name: "Miner3" },
    { srcName: "Paperboy2.png", name: "Paperboy2" },
    { srcName: "Paratroopers3.png", name: "Paratroopers3" },
    { srcName: "Pooyan3.png", name: "Pooyan3" },
    { srcName: "Prince41.png", name: "Prince41" },
    { srcName: "Pyjamarama11.png", name: "Pyjamarama11" },
    { srcName: "RedWarrior1.png", name: "RedWarrior1" },
    { srcName: "ReturnToCastleWolfenstein11.png", name: "ReturnToCastleWolfenstein11" },
    { srcName: "ReturnToCastleWolfenstein12.png", name: "ReturnToCastleWolfenstein12" },
    { srcName: "ReturnToCastleWolfenstein13.png", name: "ReturnToCastleWolfenstein13" },
    { srcName: "ReturnToCastleWolfenstein14.png", name: "ReturnToCastleWolfenstein14" },
    { srcName: "RickDangerous11.png", name: "RickDangerous11" },
    { srcName: "Sorcery31.png", name: "Sorcery31" },
    { srcName: "Spike'sPeak1.png", name: "Spike'sPeak1" },
    { srcName: "SpyVsSpy41.png", name: "SpyVsSpy41" },
    { srcName: "TheHobbit16.png", name: "TheHobbit16" },
    { srcName: "Valhalla2.png", name: "Valhalla2" },
    { srcName: "WhoDaresWins1.png", name: "WhoDaresWins1" },
    { srcName: "Wolfenstein31.png", name: "Wolfenstein31" },
    { srcName: "Yennefer21.png", name: "Yennefer21" },
    { srcName: "Zeppelin4.png", name: "Zeppelin4" },
    { srcName: "AppleLisa.png", name: "AppleLisa" },
    { srcName: "BC90.png", name: "BC90" },
    { srcName: "BackToNature1.png", name: "BackToNature1" },
    { srcName: "Bagitman90.png", name: "Bagitman90" },
    { srcName: "BeyondForbiddenForest2.png", name: "BeyondForbiddenForest2" },
    { srcName: "Biggles2.png", name: "Biggles2" },
    { srcName: "BoogaBoo90.png", name: "BoogaBoo90" },
    { srcName: "CamelotWarriors.png", name: "CamelotWarriors" },
    { srcName: "CastleOfTerror91.png", name: "CastleOfTerror91" },
    { srcName: "Choplifter11.png", name: "Choplifter11" },
    { srcName: "Choplifter12.png", name: "Choplifter12" },
    { srcName: "CrystalCastles90.png", name: "CrystalCastles90" },
    { srcName: "Cuthbert90.png", name: "Cuthbert90" },
    { srcName: "DM90.png", name: "DM90" },
    { srcName: "Drelbs2.png", name: "Drelbs2" },
    { srcName: "DungeonMaster91.png", name: "DungeonMaster91" },
    { srcName: "DungeonMaster92.png", name: "DungeonMaster92" },
    { srcName: "ElvenWarrior1.png", name: "ElvenWarrior1" },
    { srcName: "EyeOfTheBeholder90.png", name: "EyeOfTheBeholder90" },
    { srcName: "FireAnt21.png", name: "FireAnt21" },
    { srcName: "ForbiddenForest90.png", name: "ForbiddenForest90" },
    { srcName: "ForbiddenForest91.png", name: "ForbiddenForest91" },
    { srcName: "Geos.png", name: "Geos" },
    { srcName: "HalfLife91.png", name: "HalfLife91" },
    { srcName: "Imhotep2.png", name: "Imhotep2" },
    { srcName: "ImpossibleMission90.png", name: "ImpossibleMission90" },
    { srcName: "JetSetWilly11.png", name: "JetSetWilly11" },
    { srcName: "LeisureSuitLarry90.png", name: "LeisureSuitLarry90" },
    { srcName: "LeisureSuitLarry91.png", name: "LeisureSuitLarry91" },
    { srcName: "MontezumasRevenge90.png", name: "MontezumasRevenge90" },
    { srcName: "Nebulus90.png", name: "Nebulus90" },
    { srcName: "Pitfall90.png", name: "Pitfall90" },
    { srcName: "Pitfall91.png", name: "Pitfall91" },
    { srcName: "Pitstop3.png", name: "Pitstop3" },
    { srcName: "Rambo11.png", name: "Rambo11" },
    { srcName: "SexOlympics1.png", name: "SexOlympics1" },
    { srcName: "SexOlympics2.png", name: "SexOlympics2" },
    { srcName: "Shamus91.png", name: "Shamus91" },
    { srcName: "Tornado1.png", name: "Tornado1" },

    { srcName: "BrianBloodaxe20.png", name: "BrianBloodaxe20" },
    { srcName: "CodenameIceman98.png", name: "CodenameIceman98" },
    { srcName: "Cuthbert20.png", name: "Cuthbert20" },
    { srcName: "DonkeyKong99.png", name: "DonkeyKong99" },
    { srcName: "Drelbs3.png", name: "Drelbs3" },
    { srcName: "DungeonMaster96.png", name: "DungeonMaster96" },
    { srcName: "DungeonMaster97.png", name: "DungeonMaster97" },
    { srcName: "F1-1.png", name: "F1-1" },
    { srcName: "ForbiddenForest99.png", name: "ForbiddenForest99" },
    { srcName: "ForgottenForest1.png", name: "ForgottenForest1" },
    { srcName: "FranticFreddie3.png", name: "FranticFreddie3" },
    { srcName: "Gods99.png", name: "Gods99" },
    { srcName: "Goonies90.png", name: "Goonies90" },
    { srcName: "Ishar98.png", name: "Ishar98" },
    { srcName: "Ishar99.png", name: "Ishar99" },
    { srcName: "JupiterLander99.png", name: "JupiterLander99" },
    { srcName: "LeisureSuitLarry93.png", name: "LeisureSuitLarry93" },
    { srcName: "LeisureSuitLarry94.png", name: "LeisureSuitLarry94" },
    { srcName: "MontyMole99.png", name: "MontyMole99" },
    { srcName: "Pitfall96.png", name: "Pitfall96" },
    { srcName: "RadarRatRace10.png", name: "RadarRatRace10" },
    { srcName: "SabreWulf99.png", name: "SabreWulf99" },
    { srcName: "Soccer99.png", name: "Soccer99" },
    { srcName: "TheHobbit99.png", name: "TheHobbit99" },
    { srcName: "Unknown30.png", name: "Unknown30" },
    { srcName: "Wally99.png", name: "Wally99" },
];
