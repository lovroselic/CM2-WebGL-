/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */
"use strict";

/////////////////////////////////////////////////
/*
      
TODO:

known bugs: 
    * reserved stopped working
    * fog not set

 */
////////////////////////////////////////////////////

const DEBUG = {
    FPS: false,
    BUTTONS: false,
    SETTING: true,
    VERBOSE: false,
    _2D_display: false,
    INVINCIBLE: false,
    FREE_MAGIC: false,
    LOAD: false,
    STUDY: false,
    keys: false,
    study() {
        console.info("######## FIXED DUNGEON - STUDY MODE ########");
        GAME.level = 999;
        GAME.upperLimit = GAME.level;
    },
    goto(grid) {
        HERO.player.pos = Vector3.from_Grid(Grid.toCenter(grid), 0.5);
    },
    kill() {
        console.log("KILL all");
        ENTITY3D.POOL.clear();
    },
    depth2() {
        GAME.level = 2;
        GAME.upperLimit = GAME.level;
        GAME.gold = 270;
        HERO.maxHealth = 31;
        HERO.maxMana = 52;
        HERO.health = 19;
        HERO.mana = 28;
        HERO.defense = 8;
        HERO.reference_defense = HERO.defense;
        HERO.attack = 10;
        HERO.reference_attack = HERO.attack;
        HERO.magic = 10;
        HERO.reference_magic = HERO.magic;
        HERO.attackExp = 56;
        HERO.defenseExp = 32;
        HERO.magicExp = 88;
        HERO.attackExpGoal = 225;
        HERO.defenseExpGoal = 100;
        HERO.magicExpGoal = 338;
        HERO.inventory.potion.red = 1;
        HERO.inventory.potion.blue = 4;
        let scrolls = ["Map", "BoostWeapon", "BoostArmor"];
        for (let scr of scrolls) {
            let scroll = new Scroll(scr);
            HERO.inventory.scroll.add(scroll);
        }
        TITLE.stack.scrollIndex = Math.max(TITLE.stack.scrollIndex, 0);
        TITLE.scrolls();
    },
    depth3() {
        GAME.level = 3;
        GAME.upperLimit = GAME.level;
        GAME.gold = 892;
        HERO.maxHealth = 55;
        HERO.maxMana = 62;
        HERO.health = 50;
        HERO.mana = 4;
        HERO.defense = 12;
        HERO.reference_defense = HERO.defense;
        HERO.attack = 14;
        HERO.reference_attack = HERO.attack;
        HERO.magic = 13;
        HERO.reference_magic = HERO.magic;
        HERO.attackExp = 231;
        HERO.defenseExp = 16;
        HERO.magicExp = 380;
        HERO.attackExpGoal = 507;
        HERO.defenseExpGoal = 150;
        HERO.magicExpGoal = 507;
        HERO.inventory.potion.red = 2;
        HERO.inventory.potion.blue = 1;
        let scrolls = ["MagicBoost", "Cripple", "DrainMana"];
        for (let scr of scrolls) {
            let scroll = new Scroll(scr);
            HERO.inventory.scroll.add(scroll);
        }
        TITLE.stack.scrollIndex = Math.max(TITLE.stack.scrollIndex, 0);
        TITLE.scrolls();
    },
    depth4() {
        GAME.level = 4;
        GAME.upperLimit = GAME.level;
        GAME.gold = 429;
        HERO.maxHealth = 71;
        HERO.maxMana = 81;
        HERO.health = 71;
        HERO.mana = 9;
        HERO.defense = 14;
        HERO.reference_defense = HERO.defense;
        HERO.attack = 21;
        HERO.reference_attack = HERO.attack;
        HERO.magic = 16;
        HERO.reference_magic = HERO.magic;
        HERO.attackExp = 297;
        HERO.defenseExp = 111;
        HERO.magicExp = 521;
        HERO.attackExpGoal = 1713;
        HERO.defenseExpGoal = 225;
        HERO.magicExpGoal = 761;
        HERO.inventory.potion.red = 2;
        HERO.inventory.potion.blue = 0;
        let scrolls = ["Petrify", "Petrify", "Petrify", "Petrify", "Petrify", "Petrify", "Petrify", "Petrify", "Petrify", "Petrify", "Petrify"];
        for (let scr of scrolls) {
            let scroll = new Scroll(scr);
            HERO.inventory.scroll.add(scroll);
        }
        TITLE.stack.scrollIndex = Math.max(TITLE.stack.scrollIndex, 0);
        TITLE.scrolls();
    },
    depth5() {
        GAME.level = 5;
        GAME.upperLimit = GAME.level;
        GAME.gold = 2238;
        HERO.maxHealth = 1000;
        HERO.maxMana = 1000;
        HERO.health = 1000;
        HERO.mana = 1000;
        HERO.defense = 99;
        HERO.reference_defense = HERO.defense;
        HERO.attack = 99;
        HERO.reference_attack = HERO.attack;
        HERO.magic = 99;
        HERO.reference_magic = HERO.magic;
        HERO.attackExp = 2184;
        HERO.defenseExp = 228;
        HERO.magicExp = 281;
        HERO.attackExpGoal = 2570;
        HERO.defenseExpGoal = 338;
        HERO.magicExpGoal = 1142;
        HERO.inventory.potion.red = 20;
        HERO.inventory.potion.blue = 20;
        let scrolls = ["MagicBoost", "MagicBoost", "DestroyWeapon", "BoostArmor", "Petrify", "Petrify", "Petrify", "Petrify", "Petrify"];
        for (let scr of scrolls) {
            let scroll = new Scroll(scr);
            HERO.inventory.scroll.add(scroll);
        }
        TITLE.stack.scrollIndex = Math.max(TITLE.stack.scrollIndex, 0);
        TITLE.scrolls();
    }
};
const INI = {
    MIMIMAP_HEIGHT: 200,
    MIMIMAP_WIDTH: 200,
    INFO_TIMER_ID: "info",
    INFO_TIMER: 3,
    LAMP_PERSISTENCE: 99,
    INVISIBILITY_TIME: 60,
    LUCKY_TIME: 60,
    INI_BASE_EXP_FONT: 100,
    LEVEL_FACTOR: 1.5,
    POTION_INC: 0.4,
    HEALTH_INC: 4,
    MANA_INC: 5,
    MONSTER_ATTACK_TIMEOUT: 2000,
    MONSTER_SHOOT_TIMEOUT: 4000,
    HERO_SHOOT_TIMEOUT: 2000,
    SCROLL_RANGE: 3,
    CRIPPLE_SPEED: 0.1,
    BOOST_TIME: 59,
    MM_reveal_radius: 4,
    FINAL_LEVEL: 5,
    INVENTORY_HARD_LIMIT: 20,
};
const PRG = {
    VERSION: "1.05",
    NAME: "Crawl Master II",
    YEAR: "2023",
    SG: "CrawlMaster2",
    CSS: "color: #239AFF;",
    INIT() {
        console.log("%c**************************************************************************************************************************************", PRG.CSS);
        console.log(`${PRG.NAME} ${PRG.VERSION} by Lovro Selic, (c) C00lSch00l ${PRG.YEAR} on ${navigator.userAgent}`);
        console.log("%c**************************************************************************************************************************************", PRG.CSS);
        $("#title").html(PRG.NAME);
        $("#version").html(`${PRG.NAME} V${PRG.VERSION} <span style='font-size:14px'>&copy</span> C00lSch00l ${PRG.YEAR}`);
        $("input#toggleAbout").val("About " + PRG.NAME);
        $("#about fieldset legend").append(" " + PRG.NAME + " ");

        ENGINE.autostart = true;
        ENGINE.start = PRG.start;
        ENGINE.readyCall = GAME.setup;
        ENGINE.setGridSize(64);
        ENGINE.setSpriteSheetSize(64);
        ENGINE.init();
    },
    setup() {
        if (DEBUG.SETTING) {
            //$('#debug').show();
            $("#engine_version").html(ENGINE.VERSION);
            $("#grid_version").html(GRID.VERSION);
            $("#maze_version").html(DUNGEON.VERSION);
            $("#iam_version").html(IndexArrayManagers.VERSION);
            $("#lib_version").html(LIB.VERSION);
            $("#webgl_version").html(WebGL.VERSION);

        } else {
            $('#debug').hide();
        }

        $("#toggleHelp").click(function () {
            $("#help").toggle(400);
        });

        $("#toggleAbout").click(function () {
            $("#about").toggle(400);
        });

        $("#toggleVersion").click(function () {
            $("#debug").toggle(400);
        });


        //boxes
        ENGINE.gameWIDTH = 640;
        ENGINE.titleWIDTH = 1040 + 64;
        ENGINE.sideWIDTH = (ENGINE.titleWIDTH - ENGINE.gameWIDTH) / 2;
        ENGINE.gameHEIGHT = 480;
        ENGINE.titleHEIGHT = 80;
        ENGINE.bottomHEIGHT = 40;
        ENGINE.bottomWIDTH = ENGINE.titleWIDTH;

        $("#bottom").css("margin-top", ENGINE.gameHEIGHT + ENGINE.titleHEIGHT + ENGINE.bottomHEIGHT);
        $(ENGINE.gameWindowId).width(ENGINE.gameWIDTH + 2 * ENGINE.sideWIDTH + 4);
        ENGINE.addBOX("TITLE", ENGINE.titleWIDTH, ENGINE.titleHEIGHT, ["title", "compassRose", "compassNeedle"], null);
        ENGINE.addBOX("LSIDE", ENGINE.sideWIDTH, ENGINE.gameHEIGHT, ["Lsideback", "potion", "time", "statusBars", "stat", "gold"], "side");
        ENGINE.addBOX("ROOM", ENGINE.gameWIDTH, ENGINE.gameHEIGHT, ["background", "3d_webgl", "info", "text", "FPS", "button", "click"], "side");
        ENGINE.addBOX("SIDE", ENGINE.sideWIDTH, ENGINE.gameHEIGHT, ["sideback", "keys", "minimap", "scrolls"], "fside");
        ENGINE.addBOX("DOWN", ENGINE.bottomWIDTH, ENGINE.bottomHEIGHT, ["bottom", "bottomText"], null);

        if (DEBUG._2D_display) {
            ENGINE.addBOX("LEVEL", ENGINE.gameWIDTH, ENGINE.gameHEIGHT, ["pacgrid", "grid", "coord", "player"], null);
        }
    },
    start() {
        console.log(PRG.NAME + " started.");
        $(ENGINE.topCanvas).off("mousemove", ENGINE.mouseOver);
        $(ENGINE.topCanvas).off("click", ENGINE.mouseClick);
        $(ENGINE.topCanvas).css("cursor", "");

        $("#startGame").addClass("hidden");
        $(document).keypress(function (event) {
            if (event.which === 32 || event.which === 13) {
                event.preventDefault();
            }
        });
        TITLE.startTitle();
    }
};

/** ******************************** */

class Key {
    constructor(color, spriteClass) {
        this.category = "Key";
        this.type = "Key";
        this.color = color;
        this.spriteClass = spriteClass;
    }
}
class Status {
    constructor(type, spriteClass) {
        this.type = type;
        this.spriteClass = spriteClass;
    }
}
class Scroll {
    constructor(type) {
        this.type = type;
        this.id = this.type;
        this.sprite = SPRITE["SCR_" + type];
        this.class = "Scroll";
        this.saveDefinition = ['class', 'type'];
    }
    action() {
        let T;
        let map = MAP[GAME.level].map;
        switch (this.type) {
            case "Light":
                HERO.improveVision();
                const visionTimerId = "visionTimer";
                if (ENGINE.TIMERS.exists(visionTimerId)) {
                    T = ENGINE.TIMERS.access(visionTimerId);
                    T.extend(INI.LAMP_PERSISTENCE);
                } else {
                    T = new CountDown(visionTimerId, INI.LAMP_PERSISTENCE, HERO.extinguishLamp);
                    let status = new Status("Light", "Lantern");
                    HERO.inventory.status.push(status);
                    TITLE.keys();
                }
                break;
            case "Invisibility":
                HERO.startInvisibility();
                const invisibilityTimerId = "invisibilityTimer";
                if (ENGINE.TIMERS.exists(invisibilityTimerId)) {
                    T = ENGINE.TIMERS.access(invisibilityTimerId);
                    T.extend(INI.INVISIBILITY_TIME);
                } else {
                    T = new CountDown(invisibilityTimerId, INI.INVISIBILITY_TIME, HERO.cancelInvisibility);
                    let status = new Status("Invisibility", "Invisible");
                    HERO.inventory.status.push(status);
                    TITLE.keys();
                }
                break;
            case "Map":
                let pointers = map.map_pointers;
                let origin;
                if (pointers.length > 0) {
                    origin = pointers.shift();
                } else {
                    origin = new Grid(RND(map.minX, map.maxX), RND(map.minY, map.maxY));
                }
                MINIMAP.reveal(origin, INI.MM_reveal_radius);
                break;
            case "DrainMana":
                for (let enemy of ENTITY3D.POOL) {
                    if (enemy === null) continue;
                    if (enemy.distance === null) continue;
                    if (enemy.distance <= INI.SCROLL_RANGE) {
                        enemy.mana = 0;
                    }
                }
                HERO.mana = 0;
                TITLE.status();
                break;
            case "Cripple":
                for (let enemy of ENTITY3D.POOL) {
                    if (enemy === null) continue;
                    if (enemy.distance === null) continue;
                    if (enemy.distance <= INI.SCROLL_RANGE) {
                        enemy.moveSpeed = INI.CRIPPLE_SPEED;
                    }
                }
                break;
            case "BoostWeapon":
                Scroll.boost("attack");
                break;
            case "BoostArmor":
                Scroll.boost("defense");
                break;
            case "DestroyArmor":
                for (let enemy of ENTITY3D.POOL) {
                    if (enemy === null) continue;
                    if (enemy.distance === null) continue;
                    if (enemy.distance <= INI.SCROLL_RANGE) {
                        let factor = RND(25, 50) / 100;
                        enemy.defense -= Math.ceil(enemy.defense * factor);
                    }
                }
                break;
            case "DestroyWeapon":
                for (let enemy of ENTITY3D.POOL) {
                    if (enemy === null) continue;
                    if (enemy.distance === null) continue;
                    if (enemy.distance <= INI.SCROLL_RANGE) {
                        let factor = RND(25, 50) / 100;
                        enemy.attack -= Math.ceil(enemy.attack * factor);
                    }
                }
                break;
            case "Petrify":
                for (let enemy of ENTITY3D.POOL) {
                    if (enemy === null) continue;
                    if (enemy.final_boss) continue;
                    if (enemy.petrified) continue;
                    if (enemy.distance === null) continue;
                    if (enemy.distance <= INI.SCROLL_RANGE) {
                        enemy.petrify();
                    }
                }
                break;
            case "MagicBoost":
                Scroll.boost("magic");
                break;
            case "TeleportTemple":
                if (map.type === "ARENA") break;
                const temple = map.findRoom("temple");
                const target = map.findMiddleSpaceUnreserved(temple.area);
                HERO.player.pos = Vector3.from_Grid(Grid.toCenter(target), 0.5);
                break;
            case "Luck":
                HERO.lucky();
                const luckyTimerId = "luckyTimer";
                if (ENGINE.TIMERS.exists(luckyTimerId)) {
                    T = ENGINE.TIMERS.access(luckyTimerId);
                    T.extend(INI.LUCKY_TIME);
                } else {
                    T = new CountDown(luckyTimerId, INI.LUCKY_TIME, HERO.cancelLuck);
                    let status = new Status("Luck", "Clover");
                    HERO.inventory.status.push(status);
                    TITLE.keys();
                }
                break;
            case "HalfLife":
                for (let enemy of ENTITY3D.POOL) {
                    if (enemy === null) continue;
                    if (enemy.distance === null) continue;
                    if (enemy.distance <= INI.SCROLL_RANGE) {
                        enemy.health = Math.max(1, Math.floor(enemy.health / 2));
                    }
                }
                break;
            default:
                console.error("ERROR scroll action", this);
                break;
        }
        AUDIO.UseScroll.play();
    }
    display() {
        ENGINE.clearLayer("info");
        ENGINE.draw("info", 7, 7, this.sprite);
        GAME.infoTimer();
    }
    static boost(type) {
        let T;
        HERO.incStat(type);
        const TimerId = `${type}_timer`;
        if (ENGINE.TIMERS.exists(TimerId)) {
            T = ENGINE.TIMERS.access(TimerId);
            T.reset();
        } else {
            T = new CountDown(
                TimerId,
                INI.BOOST_TIME,
                HERO.resetStat.bind(null, type)
            );
        }
    }
}

const HERO = {
    construct() {
        this.resetVision();
        this.visible();
        this.unlucky();
        this.dead = false;
        this.maxHealth = 15;
        this.maxMana = 3 * Missile.calcMana(5);
        this.restore();
        this.defense = 5;
        this.reference_defense = this.defense;
        this.attack = 5;
        this.reference_attack = this.attack;
        this.magic = 5;
        this.reference_magic = this.magic;
        this.attackExp = 0;
        this.defenseExp = 0;
        this.magicExp = 0;
        this.attackExpGoal = INI.INI_BASE_EXP_FONT;
        this.defenseExpGoal = INI.INI_BASE_EXP_FONT;
        this.magicExpGoal = INI.INI_BASE_EXP_FONT;
        this.canShoot = true;
        this.inventory.clear();
        const propsToSave = ["health", "maxHealth", "mana", "maxMana", "defense", "reference_defense", "attack",
            "reference_attack", "magic", "reference_magic", "attackExp", "defenseExp", "magicExp", "attackExpGoal", "defenseExpGoal", "magicExpGoal",
            "inventory.potion.red", "inventory.potion.blue"];
        this.attributesForSaveGame = [];
        for (const P of propsToSave) {
            this.attributesForSaveGame.push(`HERO.${P}`);
        }
    },
    resetVision() {
        this.vision = 1;
    },
    visible() {
        HERO.invisible = false;
    },
    lucky() {
        HERO.luck = 1;
    },
    unlucky() {
        HERO.luck = 0;
    },
    cancelLuck() {
        HERO.removeStatus("Luck");
        HERO.unlucky();
        TITLE.keys();
    },
    restore() {
        this.health = this.maxHealth;
        this.mana = this.maxMana;
    },
    raiseStat(which) {
        this[which]++;
        this[`reference_${which}`]++;
        TITLE.stats();
    },
    incStat(which) {
        let factor = RND(1, 3) / 10 + 1;
        HERO[which] = Math.ceil(HERO[which] * factor);
        TITLE.stats();
    },
    resetStat(which) {
        HERO[which] = HERO[`reference_${which}`];
        TITLE.stats();
    },
    removeStatus(status) {
        for (let i = HERO.inventory.status.length - 1; i >= 0; i--) {
            if (HERO.inventory.status[i].type === status) {
                HERO.inventory.status.splice(i, 1);
                break;
            }
        }
    },
    cancelInvisibility() {
        HERO.removeStatus("Invisibility");
        HERO.visible();
        TITLE.keys();
    },
    startInvisibility() {
        HERO.invisible = true;
    },
    improveVision() {
        this.vision = 2;
    },
    extinguishLamp() {
        HERO.removeStatus("Light");
        HERO.resetVision();
        TITLE.keys();
    },
    usePotion(type) {
        let Type = type.capitalize();
        let max = `max${Type}`;
        if (HERO[type] === HERO[max]) {
            return;
        }
        const color = { health: "red", mana: "blue" };
        if (HERO.inventory.potion[color[type]] > 0) {
            HERO.inventory.potion[color[type]]--;
            let add = Math.round(INI.POTION_INC * HERO[max]);
            HERO[type] += add;
            HERO[type] = Math.min(HERO[type], HERO[max]);
            TITLE.potion();
            AUDIO.Swallow.play();
            TITLE.status();
        }
    },
    incStatus(type) {
        let Type = type.capitalize();
        let max = `max${Type}`;
        if (type === 'mana') {
            this[max] = Math.max(this[max], 3 * Missile.calcMana(this.reference_magic));
        }
        this[max] += INI[`${type.toUpperCase()}_INC`];
        this[type] = this[max];
        TITLE.status();
    },
    incExp(value, type) {
        this[`${type}Exp`] += value;
        if (this[`${type}Exp`] >= this[`${type}ExpGoal`]) {
            AUDIO.LevelUp.play();
            this[`${type}Exp`] -= this[`${type}ExpGoal`];
            this[type]++;
            this[`reference_${type}`]++;
            this[`${type}ExpGoal`] = this.nextLevel(this[`${type}ExpGoal`]);
            switch (type) {
                case "attack":
                case "defense":
                    this.incStatus("health");
                    break;
                case "magic":
                    this.incStatus("mana");
                    break;
                default:
                    throw "exp type error";
            }
            TITLE.status();
        }
        TITLE.stats();
    },
    nextLevel(value) {
        return Math.round(value * INI.LEVEL_FACTOR);
    },
    hitByMissile(missile) {
        const damage = Math.max(missile.calcDamage(HERO.magic), 1) - HERO.luck;
        const exp = Math.max((damage ** 0.9) | 0, 1);
        HERO.applyDamage(damage);
        EXPLOSION3D.add(new ParticleExplosion(missile.pos));
        MISSILE3D.remove(missile.id);
        AUDIO.Explosion.volume = RAY.volume(missile.distance);
        AUDIO.Explosion.play();
        HERO.incExp(exp, "magic");
    },
    applyDamage(damage) {
        HERO.health = Math.max(HERO.health - damage, 0);
        TITLE.status();
        if (HERO.health <= 0) {
            HERO.die();
        }
    },
    shoot() {
        let cost = Missile.calcMana(HERO.reference_magic);
        if (DEBUG.FREE_MAGIC) cost = 0;
        if (cost > HERO.mana) {
            AUDIO.MagicFail.play();
            return;
        }
        if (!HERO.canShoot) return;
        HERO.canShoot = false;
        HERO.mana -= cost;
        const exp = (HERO.magic / 5) | 0;
        HERO.incExp(exp, "magic");
        TITLE.status();
        const position = HERO.player.pos.translate(HERO.player.dir, HERO.player.r);
        const missile = new Missile(position, HERO.player.dir, COMMON_ITEM_TYPE.Fireball, HERO.magic);
        MISSILE3D.add(missile);
        setTimeout(() => (HERO.canShoot = true), INI.HERO_SHOOT_TIMEOUT);
        return;
    },
    die() {
        if (DEBUG.INVINCIBLE) return;
        this.dead = true;
    },
    death() {
        this.player.pos.set_y(0.1);
        for (const L of LIGHTS3D.POOL) {
            L.lightColor = Array(0, 0, 0);
        }
        GAME.over();
    },
    inventory: {
        clear() {
            this.key = [];
            this.status = [];
            this.potion = {};
            this.potion.red = 0;
            this.potion.blue = 0;
            this.scroll = new Inventory();
        },
        totalSize() {
            return this.key.length;
        }
    },
};

const GAME = {
    upperLimit: null,
    clearInfo() {
        ENGINE.clearLayer("info");
    },
    infoTimer() {
        let T;
        if (ENGINE.TIMERS.exists(INI.INFO_TIMER_ID)) {
            T = ENGINE.TIMERS.access(INI.INFO_TIMER_ID);
            T.set(INI.INFO_TIMER);
        } else {
            T = new CountDown(INI.INFO_TIMER_ID, INI.INFO_TIMER, GAME.clearInfo);
        }
    },
    start() {
        console.log("GAME started");
        if (AUDIO.Title) {
            AUDIO.Title.pause();
            AUDIO.Title.currentTime = 0;
        }
        $(ENGINE.topCanvas).off("mousemove", ENGINE.mouseOver);
        $(ENGINE.topCanvas).off("click", ENGINE.mouseClick);
        $(ENGINE.topCanvas).css("cursor", "");
        ENGINE.hideMouse();

        $("#pause").prop("disabled", false);
        $("#pause").off();
        GAME.paused = true;

        let GameRD = new RenderData("Moria", 50, "#f6602d", "text", "#F22", 2, 2, 2);
        ENGINE.TEXT.setRD(GameRD);
        ENGINE.watchVisibility(GAME.lostFocus);
        ENGINE.GAME.start(16);
        MINIMAP.setOffset(TITLE.stack.minimapX, TITLE.stack.minimapY);
        AI.VERBOSE = false;
        AI.immobileWander = true;
        GAME.completed = false;
        GAME.upperLimit = 1;
        GAME.level = 1;
        GAME.gold = 0;

        const storeList = ["DECAL3D", "LIGHTS3D", "GATE3D", "VANISHING3D", "ITEM3D", "MISSILE3D", "INTERACTIVE_DECAL3D", "BUMP3D", "ENTITY3D"];
        GAME.STORE = new Store(storeList);

        HERO.construct();
        ENGINE.VECTOR2D.configure("player");
        GAME.fps = new FPS_short_term_measurement(300);
        GAME.prepareForRestart();
        GAME.time = new Timer("Main");

        //SAVE GAME
        SAVE_GAME.pointers = [...HERO.attributesForSaveGame, 'GAME.level', 'GAME.gold'];
        SAVE_GAME.lists = ["HERO.inventory.scroll"];
        SAVE_GAME.timers = ["Main"];
        //end SAVE GAME

        if (GAME.fromCheckpoint) {
            console.log(`%c ... Loading from checkpoint ...`, GAME.CSS);
            HERO.inventory.scroll.clear();
            SAVE_GAME.load();
            GAME.upperLimit = GAME.level;
            GAME.fromCheckpoint = false;
            //skill timers are not saved!! so resetting skills!
            HERO.defense = HERO.reference_defense;
            HERO.attack = HERO.reference_attack;
            HERO.magic = HERO.reference_magic;
        }

        if (DEBUG.LOAD) {
            console.log("########################");
            console.log("FORCE LOAD FROM DEBUG!!");
            console.log("########################");
            HERO.inventory.scroll.clear();
            DEBUG.depth5();
            //DEBUG.depth4();
        }
        if (DEBUG.STUDY) DEBUG.study();

        GAME.levelStart();
    },
    checkpoint() {
        GAME.fromCheckpoint = true;
        GAME.start();
    },
    levelStart() {
        console.log("starting level", GAME.level);
        GAME.levelFinished = false;
        GAME.initLevel(GAME.level);
        GAME.continueLevel(GAME.level);
    },
    newDungeon(level) {
        DUNGEON.MIN_PADDING = MAP[level].minPad;
        let randomDungeon;
        if (level < INI.FINAL_LEVEL) {
            randomDungeon = DUNGEON.create(MAP[level].width, MAP[level].height, 2);
        } else if (GAME.level === INI.FINAL_LEVEL) {
            console.log("newDungeon: CREATE FINAL LEVEL");
            randomDungeon = ARENA.create(MAP[level].width, MAP[level].height, 2);
        } else {
            console.info("****** STUDY - FIXED DUNGEON ******");
            randomDungeon = FREE_MAP.import(JSON.parse(MAP[level].data), 2);
            console.info(randomDungeon);
        }

        MAP[level].map = randomDungeon;
        MAP[level].pw = MAP[level].map.width * ENGINE.INI.GRIDPIX;
        MAP[level].ph = MAP[level].map.height * ENGINE.INI.GRIDPIX;
        
        MAP[level].map.level = level;
        MAP[level].map.GA.massSet(MAPDICT.FOG);
        if (DEBUG.STUDY) {
            MAP[level].map.entrance = MAP[level].entrance;
            MAP[level].map.exit = MAP[level].exit;
        }
        console.info("MAP[level].map", MAP[level].map);
    },
    buildWorld(level) {
        WebGL.init_required_IAM(MAP[level].map, HERO);
        if (level === INI.FINAL_LEVEL) {
            SPAWN.arena(level);
        } else if (DEBUG.STUDY) {
            SPAWN.study(level);
        } else {
            SPAWN.spawn(level);
        }
        MAP[level].world = WORLD.build(MAP[level].map);
    },
    setWorld(level, decalsAreSet = false) {
        const textureData = {
            wall: TEXTURE[MAP[level].wall],
            floor: TEXTURE[MAP[level].floor],
            ceil: TEXTURE[MAP[level].ceil]
        };

        WebGL.updateShaders();
        WebGL.init('webgl', MAP[level].world, textureData, HERO.player, decalsAreSet);
        MINIMAP.init(MAP[level].map, INI.MIMIMAP_WIDTH, INI.MIMIMAP_HEIGHT, HERO.player);
    },
    initLevel(level) {
        this.newDungeon(level);
        AI.initialize(HERO.player, "3D");
        WebGL.MOUSE.initialize("ROOM");
        WebGL.setContext('webgl');
        WebGL.CONFIG.ignoreHoles();
        this.buildWorld(level);

        const start_dir = MAP[level].map.entrance.vector;
        let start_grid = Grid.toClass(MAP[level].map.entrance.grid).add(start_dir);
        start_grid = Vector3.from_Grid(Grid.toCenter(start_grid), 0.5);
        HERO.player = new $3D_player(start_grid, Vector3.from_2D_dir(start_dir), MAP[level].map);

        this.setWorld(level);

        //set POV
        INTERFACE3D.associateIA("enemy", "enemyIA");
        INTERFACE3D.associateExternal_IAM("enemy", ENTITY3D);
        INTERFACE3D.associateHero(HERO);
        INTERFACE3D.add(new $POV(COMMON_ITEM_TYPE.POV, HERO.player));
        window.SWORD = INTERFACE3D.POOL[0];

        ENTITY3D.resetTime();
    },
    useStaircase(destination) {
        GAME.STORE.storeIAM(MAP[GAME.level].map);
        GAME.level = destination.level;
        if (GAME.level === GAME.WIN_LEVEL) return GAME.won();
        const level = GAME.level;
        if (!MAP[GAME.level].map) {
            SAVE_GAME.save();
            TURN.display("GAME SAVED", "#FFF");
            GAME.STORE.clearPools();
            GAME.newDungeon(level);
            GAME.buildWorld(level);
            GAME.STORE.linkMap(MAP[level].map);
            GAME.setWorld(level);
        } else {
            GAME.STORE.loadIAM(MAP[level].map);
            GAME.STORE.linkMap(MAP[level].map);
            GAME.setWorld(level, true);
        }

        HERO.player.setMap(MAP[level].map);
        BUMP3D.update();
        INTERFACE3D.linkMap(MAP[level].map);
        INTERFACE3D.associateExternal_IAM("enemy", ENTITY3D);

        const start_dir = MAP[level].map[this.destination.waypoint].vector;
        let start_grid = Grid.toClass(MAP[level].map[this.destination.waypoint].grid).add(start_dir);
        start_grid = Vector3.from_Grid(Grid.toCenter(start_grid), 0.5);
        HERO.player.setPos(start_grid);
        HERO.player.setDir(Vector3.from_2D_dir(start_dir));
        if (DEBUG._2D_display) {
            ENGINE.BLOCKGRID.draw(MAP[GAME.level].map);
            GRID.grid();
            GRID.paintCoord("coord", MAP[level].map);
        }
    },
    continueLevel(level) {
        GAME.levelExecute();
    },
    levelExecute() {
        GAME.drawFirstFrame(GAME.level);
        GAME.resume();
    },
    drawPlayer() {
        ENGINE.clearLayer(ENGINE.VECTOR2D.layerString);
        ENGINE.VECTOR2D.draw(HERO.player);
    },
    run(lapsedTime) {
        if (ENGINE.GAME.stopAnimation) return;
        const date = Date.now();
        VANISHING3D.manage(lapsedTime);
        MISSILE3D.manage(lapsedTime);
        INTERFACE3D.manage(lapsedTime);
        EXPLOSION3D.manage(date);
        ENTITY3D.manage(lapsedTime, date, [HERO.invisible, HERO.dead]);
        GAME.respond(lapsedTime);
        MINIMAP.unveil(Vector3.to_FP_Grid(HERO.player.pos), HERO.vision);
        ENGINE.TIMERS.update();

        const interaction = WebGL.MOUSE.click(HERO);
        if (interaction) GAME.processInteraction(interaction);

        GAME.frameDraw(lapsedTime);
        if (HERO.dead) GAME.checkIfProcessesComplete();
    },
    processInteraction(interaction) {
        let choices, choice, value, interatcionObj;
        switch (interaction.category) {
            case 'title':
                TITLE[interaction.section]();
                break;
            case 'gold':
                GAME.gold += interaction.value;
                TITLE.gold();
                AUDIO.Pick.play();
                TURN.display(interaction.value, "#AB8D3F");
                break;
            case 'key':
                let key = new Key(interaction.color, interaction.inventorySprite);
                HERO.inventory.key.push(key);
                TITLE.keys();
                AUDIO.Keys.play();
                display(interaction.inventorySprite);
                delete MAP[GAME.level].map.keys[interaction.color];
                break;
            case 'potion':
                HERO.inventory.potion[interaction.color]++;
                display(interaction.inventorySprite);
                TITLE.potion();
                AUDIO.Potion.play();
                break;
            case 'scroll':
                let type = weightedRnd(SCROLL_TYPE);
                if (GAME.level === INI.FINAL_LEVEL && type === 'TeleportTemple') {
                    type = 'HalfLife';
                }
                let scroll = new Scroll(type);
                scroll.display();
                HERO.inventory.scroll.add(scroll);
                TITLE.stack.scrollIndex = Math.max(TITLE.stack.scrollIndex, 0);
                TITLE.scrolls();
                AUDIO.Scroll.play();
                break;
            case 'shrine':
                HERO.raiseStat(interaction.which);
                display(interaction.inventorySprite);
                AUDIO.LevelUp.play();
                HERO.restore();
                TITLE.status();
                break;
            case 'skill':
                HERO.raiseStat(interaction.which);
                display(interaction.inventorySprite);
                AUDIO.LevelUp.play();
                break;
            case 'status':
                HERO.incStatus(interaction.which);
                display(interaction.inventorySprite);
                AUDIO.PowerUp.play();
                break;
            case 'chest':
                AUDIO.OpenChest.play();
                EXPLOSION3D.add(new WoodExplosion(Vector3.from_array(interaction.pos)));
                choices = {
                    RedPotion: 100,
                    BluePotion: 100,
                    Scroll: 100,
                    GoldBar: 50,
                    Sword: 10,
                    Shield: 10,
                    Magic: 10,
                    Heart: 20,
                    Mana: 20
                };
                choice = weightedRnd(choices);
                if (choice === "GoldBar") {
                    value = 250;
                } else {
                    value = 0;
                }
                interatcionObj = $.extend(true, {}, COMMON_ITEM_TYPE[choice]);
                interatcionObj.value = value;
                return this.processInteraction(interatcionObj);
            case 'treasure_chest':
                AUDIO.OpenChest.play();
                EXPLOSION3D.add(new WoodExplosion(Vector3.from_array(interaction.pos)));
                choices = {
                    RedPotion: 20,
                    BluePotion: 20,
                    Scroll: 75,
                    GoldBar: 100,
                    Sword: 25,
                    Shield: 25,
                    Magic: 25,
                    Heart: 50,
                    Mana: 50
                };
                choice = weightedRnd(choices);
                if (choice === "GoldBar") {
                    value = 500;
                } else {
                    value = 0;
                }
                interatcionObj = $.extend(true, {}, COMMON_ITEM_TYPE[choice]);
                interatcionObj.value = value;
                return this.processInteraction(interatcionObj);

            default:
                console.error("interaction category error", interaction);
        }

        function display(inventorySprite) {
            ENGINE.clearLayer("info");
            ENGINE.draw("info", 7, 7, SPRITE[inventorySprite]);
            GAME.infoTimer();
        }
    },
    checkIfProcessesComplete() {
        console.info("Hero died. Waiting for processes to complete");
        for (let iam of [EXPLOSION3D, VANISHING3D, MISSILE3D]) {
            if (iam.POOL.length !== 0) return;
        }
        HERO.death();
    },
    frameDraw(lapsedTime) {
        if (GAME.completed) return;
        if (DEBUG._2D_display) {
            GAME.drawPlayer();
        }
        WebGL.renderScene();
        MINIMAP.draw();
        TITLE.compassNeedle();
        TITLE.time();

        if (DEBUG.FPS) {
            GAME.FPS(lapsedTime);
        }
        if (DEBUG._2D_display) {
            ENGINE.BLOCKGRID.draw(MAP[GAME.level].map);
            MISSILE3D.draw();
            ENTITY3D.drawVector2D();
        }
    },
    drawFirstFrame(level) {
        TITLE.firstFrame();
        if (DEBUG._2D_display) {
            ENGINE.resizeBOX("LEVEL", MAP[level].pw, MAP[level].ph);
            ENGINE.BLOCKGRID.configure("pacgrid", "#FFF", "#000");
            ENGINE.BLOCKGRID.draw(MAP[GAME.level].map);
            GRID.grid();
            GRID.paintCoord("coord", MAP[level].map);
        }
    },
    blockGrid(level) {
        GRID.grid();
        GRID.paintCoord("coord", MAP[level].map);
    },
    prepareForRestart() {
        let clear = ["background", "text", "FPS", "button"];
        ENGINE.clearManylayers(clear);
        ENGINE.TIMERS.clear();
    },
    setup() {
        console.log("GAME SETUP started");
        $("#buttons").prepend("<input type='button' id='startGame' value='Start Game'>");
        $("#startGame").prop("disabled", true);
        $("#conv").remove();
        GAME.WIN_LEVEL = INI.FINAL_LEVEL + 1;
    },
    setTitle() {
        const text = GAME.generateTitleText();
        const RD = new RenderData("Annie", 16, "#0E0", "bottomText");
        const SQ = new RectArea(0, 0, LAYER.bottomText.canvas.width, LAYER.bottomText.canvas.height);
        GAME.movingText = new MovingText(text, 4, RD, SQ);
    },
    generateTitleText() {
        let text = `${PRG.NAME} ${PRG.VERSION
            }, a game by Lovro Selič, ${"\u00A9"} LaughingSkull ${PRG.YEAR
            }. 
             
            Music: 'Laughing Skull' written and performed by LaughingSkull, ${"\u00A9"
            } 2006 Lovro Selič. `;
        text += "     ENGINE, SPEECH, GRID, MAZE, Burrows-Wheeler RLE Compression, WebGL and GAME code by Lovro Selič using JavaScript and GLSL. ";
        text += "     glMatrix library by Brandon Jones and Colin MacKenzie IV. Thanks. ";
        text = text.split("").join(String.fromCharCode(8202));
        return text;
    },
    runTitle() {
        if (ENGINE.GAME.stopAnimation) return;
        GAME.movingText.process();
        GAME.titleFrameDraw();
    },
    titleFrameDraw() {
        GAME.movingText.draw();
    },
    lostFocus() {
        if (GAME.paused || HERO.dead) return;
        GAME.clickPause();
    },
    clickPause() {
        $("#pause").trigger("click");
        ENGINE.GAME.keymap[ENGINE.KEY.map.F4] = false;
    },
    pause() {
        if (GAME.paused) return;
        console.log("%cGAME paused.", PRG.CSS);
        $("#pause").prop("value", "Resume Game [F4]");
        $("#pause").off("click", GAME.pause);
        $("#pause").on("click", GAME.resume);
        ENGINE.GAME.ANIMATION.next(ENGINE.KEY.waitFor.bind(null, GAME.clickPause, "F4"));
        ENGINE.TEXT.centeredText("Game Paused", ENGINE.gameWIDTH, ENGINE.gameHEIGHT / 2);
        GAME.paused = true;
        ENGINE.TIMERS.stop();
    },
    resume() {
        console.log("%cGAME resumed.", PRG.CSS);
        $("#pause").prop("value", "Pause Game [F4]");
        $("#pause").off("click", GAME.resume);
        $("#pause").on("click", GAME.pause);
        ENGINE.clearLayer("text");
        ENGINE.TIMERS.start();
        ENGINE.GAME.ANIMATION.resetTimer();
        ENGINE.GAME.ANIMATION.next(GAME.run);
        GAME.paused = false;
    },
    respond(lapsedTime) {
        if (HERO.dead) return;
        HERO.player.respond(lapsedTime);
        const map = ENGINE.GAME.keymap;

        if (map[ENGINE.KEY.map.F4]) {
            $("#pause").trigger("click");
            ENGINE.TIMERS.display();
            ENGINE.GAME.keymap[ENGINE.KEY.map.F4] = false;
        }
        if (map[ENGINE.KEY.map.F7]) {
            if (!DEBUG.keys) return;
            console.log("TELEPORT TO GOLD ROOM");
            const M = MAP[GAME.level].map;
            const room = M.findRoom("Gold");
            const target = M.findMiddleSpaceUnreserved(room.area);
            HERO.player.pos = Vector3.from_Grid(Grid.toCenter(target), 0.5);
            ENGINE.GAME.keymap[ENGINE.KEY.map.F7] = false;
        }
        if (map[ENGINE.KEY.map.F8]) {
            if (!DEBUG.keys) return;
            console.log("TELEPORT TO TEMPLE");
            const M = MAP[GAME.level].map;
            const temple = M.findRoom("temple");
            const target = M.findMiddleSpaceUnreserved(temple.area);
            HERO.player.pos = Vector3.from_Grid(Grid.toCenter(target), 0.5);
            ENGINE.GAME.keymap[ENGINE.KEY.map.F8] = false;
        }
        if (map[ENGINE.KEY.map.F9]) {
            if (!DEBUG.keys) return;
            DEBUG.kill();
            console.log("\nDEBUG:");
            console.log("#######################################################");
            ENTITY3D.display();
            console.log("MAP", MAP[GAME.level].map);
            console.log("#######################################################");
            ENGINE.GAME.keymap[ENGINE.KEY.map.F9] = false;
        }
        if (map[ENGINE.KEY.map.left]) {
            TITLE.stack.scrollIndex--;
            TITLE.stack.scrollIndex = Math.max(0, TITLE.stack.scrollIndex);
            TITLE.scrolls();
            ENGINE.GAME.keymap[ENGINE.KEY.map.left] = false;
            return;
        }
        if (map[ENGINE.KEY.map.right]) {
            TITLE.stack.scrollIndex++;
            TITLE.stack.scrollIndex = Math.min(
                HERO.inventory.scroll.size() - 1,
                TITLE.stack.scrollIndex
            );
            TITLE.scrolls();
            ENGINE.GAME.keymap[ENGINE.KEY.map.right] = false;
            return;
        }
        if (map[ENGINE.KEY.map.enter]) {
            if (HERO.inventory.scroll.size() === 0) {
                return;
            }
            let scroll = HERO.inventory.scroll.remove(TITLE.stack.scrollIndex);
            scroll.action();
            TITLE.scrolls();
            ENGINE.GAME.keymap[ENGINE.KEY.map.enter] = false;
        }
        if (map[ENGINE.KEY.map.H]) {
            if (GAME.completed) return;
            HERO.usePotion("health");
            ENGINE.GAME.keymap[ENGINE.KEY.map.H] = false; //NO repeat
        }
        if (map[ENGINE.KEY.map.M]) {
            if (GAME.completed) return;
            HERO.usePotion("mana");
            ENGINE.GAME.keymap[ENGINE.KEY.map.M] = false; //NO repeat
        }
        if (map[ENGINE.KEY.map.ctrl]) {
            HERO.shoot();
            ENGINE.GAME.keymap[ENGINE.KEY.map.ctrl] = false; //NO repeat
        }
        if (map[ENGINE.KEY.map.up]) { }
        if (map[ENGINE.KEY.map.down]) { }
        if (map[ENGINE.KEY.map.space]) {
            SWORD.stab();
            ENGINE.GAME.keymap[ENGINE.KEY.map.space] = false; //NO repeat
        }
        return;
    },
    FPS(lapsedTime) {
        let CTX = LAYER.FPS;
        CTX.fillStyle = "white";
        ENGINE.clearLayer("FPS");
        let fps = 1000 / lapsedTime || 0;
        GAME.fps.update(fps);
        CTX.fillText(GAME.fps.getFps(), 5, 10);
    },
    over() {
        console.log(`%c HERO DIED!`, "color: red; font-size: 20px");
        AUDIO.Scream.play();
        ENGINE.TEXT.centeredText("Rest In Peace", ENGINE.gameWIDTH, ENGINE.gameHEIGHT / 2);
        ENGINE.TEXT.centeredText("(ENTER)", ENGINE.gameWIDTH, ENGINE.gameHEIGHT / 2 + ENGINE.TEXT.RD.fs * 1.2);
        ENGINE.TIMERS.stop();
        ENGINE.GAME.ANIMATION.resetTimer();
        ENGINE.GAME.ANIMATION.next(GAME.gameOverRun);
    },
    won() {
        GAME.completed = true;
        ENGINE.TIMERS.stop();
        ENGINE.GAME.ANIMATION.resetTimer();
        TITLE.music();
        TITLE.setEndingCreditsScroll();
        $("#pause").prop("disabled", true);
        $("#pause").off();
        ENGINE.GAME.ANIMATION.next(GAME.inBetween);
    },
    inBetween() {
        const layersToClear = ["FPS", "info"];
        layersToClear.forEach(item => ENGINE.layersToClear.add(item));
        ENGINE.clearLayerStack();
        ENGINE.GAME.ANIMATION.next(GAME.wonRun);
        WebGL.black();
    },
    wonRun(lapsedTime) {
        if (ENGINE.GAME.stopAnimation) return;
        if (ENGINE.GAME.keymap[ENGINE.KEY.map.enter]) {
            ENGINE.GAME.ANIMATION.waitThen(TITLE.startTitle);
        }
        GAME.endingCreditText.process(lapsedTime);
        GAME.wonFrameDraw();
    },
    wonFrameDraw() {
        GAME.endingCreditText.draw();
    },
    gameOverRun(lapsedTime) {
        if (ENGINE.GAME.stopAnimation) return;
        if (ENGINE.GAME.keymap[ENGINE.KEY.map.enter]) {
            ENGINE.GAME.ANIMATION.waitThen(TITLE.startTitle);
        }
        const date = Date.now();
        EXPLOSION3D.manage(date);
        INTERFACE3D.manage(lapsedTime);
        ENTITY3D.manage(lapsedTime, date, [HERO.invisible, HERO.dead]);
        GAME.gameOverFrameDraw(lapsedTime);
    },
    gameOverFrameDraw(lapsedTime) {
        if (DEBUG._2D_display) {
            GAME.drawPlayer();
        }
        WebGL.renderScene();

        if (DEBUG.FPS) {
            GAME.FPS(lapsedTime);
        }
        if (DEBUG._2D_display) {
            ENGINE.BLOCKGRID.draw(MAP[GAME.level].map);
            MISSILE3D.draw();
            ENTITY3D.drawVector2D();
        }
    }
};
const TITLE = {
    stack: {
        delta2: 48,
        delta3: 48,
        keyDelta: 56,
        minimapX: 20,
        minimapY: 262,
        p1: null,
        p2: null,
        PY: null,
        scrollIndex: 0,
        scrollInRow: 3,
        scrollDelta: 72,
        statusY: null,
        YL4: 180,
        YL5: 400,
    },
    firstFrame() {
        TITLE.clearAllLayers();
        TITLE.blackBackgrounds();
        TITLE.titlePlot();
        TITLE.bottom();
        TITLE.compass();
        TITLE.sidebackground_static();
    },
    startTitle() {
        $("#pause").prop("disabled", true);
        if (AUDIO.Title) AUDIO.Title.play();
        TITLE.clearAllLayers();
        TITLE.blackBackgrounds();
        TITLE.titlePlot();
        ENGINE.draw("background", (ENGINE.gameWIDTH - TEXTURE.Title.width) / 2, (ENGINE.gameHEIGHT - TEXTURE.Title.height) / 2, TEXTURE.Title);
        $("#DOWN")[0].scrollIntoView();
        ENGINE.topCanvas = ENGINE.getCanvasName("ROOM");
        TITLE.drawButtons();
        GAME.setTitle();
        ENGINE.GAME.start(16);
        ENGINE.GAME.ANIMATION.next(GAME.runTitle);
    },
    clearAllLayers() {
        ENGINE.layersToClear = new Set(["text", "sideback", "button", "title", "FPS",
            "Lsideback", "potion", "time", "statusBars", "stat", "gold",
            "sideback", "keys", "minimap", "scrolls",
            "compassRose", "compassNeedle", "info"]);
        ENGINE.clearLayerStack();
        WebGL.transparent();
    },
    blackBackgrounds() {
        this.topBackground();
        this.bottomBackground();
        this.sideBackground();
        ENGINE.fillLayer("background", "#000");
    },
    sidebackground_static() {
        //lines
        let x = ((ENGINE.sideWIDTH - SPRITE.LineTop.width) / 2) | 0;
        let y = 0;
        ENGINE.draw("Lsideback", x, y, SPRITE.LineTop);
        ENGINE.draw("sideback", x, y, SPRITE.LineTop);

        //2nd tier
        y += TITLE.stack.delta2;
        ENGINE.draw("Lsideback", x, y, SPRITE.LineBottom);
        ENGINE.draw("sideback", x, y, SPRITE.LineBottom);
        TITLE.stack.SY = (y + TITLE.stack.delta3 / 2) | 0;

        //3rd tier left
        y += TITLE.stack.delta3;
        ENGINE.draw("Lsideback", x, y, SPRITE.LineTop);
        TITLE.stack.statusY = y + SPRITE.LineTop.height;

        //4rd tier left
        ENGINE.draw("Lsideback", x, TITLE.stack.YL4, SPRITE.LineBottom);

        //5rd tier left
        ENGINE.draw("Lsideback", x, TITLE.stack.YL5, SPRITE.LineTop);

        //potion background
        let delta = 80;
        y -= TITLE.stack.delta3 / 2 - 6;
        TITLE.stack.PY = (y + SPRITE.RedPotion24.height / 4) | 0;
        let xS = ENGINE.spreadAroundCenter(2, ENGINE.sideWIDTH / 2, delta);
        let x1 = xS.shift();
        TITLE.stack.p1 = x1 + SPRITE.RedPotion24.width + 6;
        ENGINE.spriteDraw("Lsideback", x1, y, SPRITE.RedPotion24);
        let x2 = xS.shift();
        TITLE.stack.p2 = x2 + SPRITE.BluePotion24.width + 6;
        ENGINE.spriteDraw("Lsideback", x2, y, SPRITE.BluePotion24);

        //final lines
        y = (ENGINE.gameHEIGHT - SPRITE.LineBottom.height) | 0;

        ENGINE.draw("Lsideback", x, y, SPRITE.LineBottom);
        ENGINE.draw("sideback", x, y, SPRITE.LineBottom);

        y -= 224; // comment this, put in stack
        ENGINE.draw("sideback", x, y, SPRITE.LineTop);

        //initial draws
        this.potion();
        this.status();
        this.stats();
        this.gold();
        this.keys();
        this.scrolls();
    },
    scrolls() {
        const INV = HERO.inventory.scroll;
        ENGINE.clearLayer("scrolls");
        const CTX = LAYER.scrolls;

        TITLE.stack.scrollIndex = Math.min(TITLE.stack.scrollIndex, INV.size() - 1);
        let scrollSpread = ENGINE.spreadAroundCenter(TITLE.stack.scrollInRow, ((ENGINE.sideWIDTH / 2) | 0) - 16, TITLE.stack.scrollDelta);

        let LN = INV.size();
        let startIndex = Math.min((TITLE.stack.scrollIndex - TITLE.stack.scrollInRow / 2) | 0, LN - TITLE.stack.scrollInRow);
        startIndex = Math.max(0, startIndex);
        let max = startIndex + Math.min(TITLE.stack.scrollInRow, LN);
        let y = TITLE.stack.SY;
        for (let q = startIndex; q < max; q++) {
            let scroll = INV.list[q];
            let x = scrollSpread.shift();

            if (q === TITLE.stack.scrollIndex) {
                CTX.globalAlpha = 1;
            } else {
                CTX.globalAlpha = 0.75;
            }

            ENGINE.draw("scrolls", x, y, scroll.object.sprite);

            CTX.font = "10px Consolas";
            CTX.fillStyle = "#FFF";
            CTX.fillText(scroll.count.toString().padStart(2, "0"), x + 32, y + 18 + 4);

            if (q === TITLE.stack.scrollIndex) {
                CTX.strokeStyle = "#FFF";
                CTX.globalAlpha = 0.5;
                CTX.lineWidth = "1";
                CTX.beginPath();
                CTX.rect(x - 14, y - 3, 60, 44);
                CTX.closePath();
                CTX.stroke();
            }
        }
    },
    keys() {
        ENGINE.clearLayer("keys");
        let y = (SPRITE.LineTop.height / 2 + TITLE.stack.delta2 / 2) | 0;
        let list = [...HERO.inventory.key, ...HERO.inventory.status];
        const NUM = list.length;
        let spread = ENGINE.spreadAroundCenter(NUM, ENGINE.sideWIDTH / 2, TITLE.stack.keyDelta);
        for (const item of list) {
            let x = spread.shift();
            ENGINE.spriteDraw("keys", x, y, SPRITE[item.spriteClass]);
        }
    },
    gold() {
        ENGINE.clearLayer("gold");
        let y = TITLE.stack.YL5 + SPRITE.LineTop.height + 30;
        let x = ((ENGINE.sideWIDTH - SPRITE.LineTop.width) / 2) | 0;
        let fs = 18;
        const CTX = LAYER.gold;
        CTX.font = fs + "px Consolas";
        CTX.fillStyle = "#AB8D3F";
        CTX.shadowColor = "#6E5A28";
        CTX.shadowOffsetX = 1;
        CTX.shadowOffsetY = 1;
        CTX.shadowBlur = 1;
        CTX.fillText(`Gold: `, x, y);
        CTX.fillText(`${GAME.gold.toString().padStart(6, "0")}`, 100, y);
    },
    stats() {
        ENGINE.clearLayer("stat");
        let y = TITLE.stack.YL4 + SPRITE.LineTop.height + 16;
        let x = ((ENGINE.sideWIDTH - SPRITE.LineTop.width) / 2) | 0;
        let fs = 16;
        const CTX = LAYER.stat;
        CTX.font = fs + "px Consolas";
        CTX.fillStyle = "#AAA";
        CTX.shadowColor = "#666";
        CTX.shadowOffsetX = 1;
        CTX.shadowOffsetY = 1;
        CTX.shadowBlur = 1;

        const padX = 110;

        y += fs * 1.0;
        CTX.fillText(`Attack: `, x, y);
        CTX.save();
        if (HERO.attack > HERO.reference_attack) {
            CTX.fillStyle = "#0E0";
        }
        CTX.fillText(HERO.attack.toString().padStart(2, "0"), padX, y);
        CTX.restore();
        y += fs * 1.0; //
        TITLE.attackBar(x, y);

        y += fs * 3.0;
        CTX.fillText(`Defense: `, x, y);
        CTX.save();
        if (HERO.defense > HERO.reference_defense) {
            CTX.fillStyle = "#0E0";
        }
        CTX.fillText(HERO.defense.toString().padStart(2, "0"), padX, y);
        CTX.restore();
        y += fs * 1.0; //
        TITLE.defenseBar(x, y);

        y += fs * 3.0;
        CTX.fillText(`Magic: `, x, y);
        CTX.save();
        if (HERO.magic > HERO.reference_magic) {
            CTX.fillStyle = "#0E0";
        }
        CTX.fillText(HERO.magic.toString().padStart(2, "0"), padX, y);
        CTX.restore();

        y += fs * 1.0; //
        TITLE.magicBar(x, y);
    },
    statBar(x, y, value, max, color) {
        const CTX = LAYER.stat;
        CTX.save();
        ENGINE.resetShadow(CTX);
        let h = 18;
        let w = 200;
        ENGINE.statusBar(CTX, x, y, w, h, value, max, color);
        CTX.restore();
    },
    attackBar(x, y) {
        TITLE.statBar(x, y, HERO.attackExp, HERO.attackExpGoal, "#FF8C00");
    },
    defenseBar(x, y) {
        TITLE.statBar(x, y, HERO.defenseExp, HERO.defenseExpGoal, "#666600");
    },
    magicBar(x, y) {
        TITLE.statBar(x, y, HERO.magicExp, HERO.magicExpGoal, "#800080");
    },
    status() {
        ENGINE.clearLayer("statusBars");
        let fs = 16;
        const CTX = LAYER.statusBars;
        CTX.font = fs + "px Times";
        CTX.fillStyle = "#AAA";
        CTX.shadowColor = "#666";
        CTX.shadowOffsetX = 1;
        CTX.shadowOffsetY = 1;
        CTX.shadowBlur = 1;
        let y = TITLE.stack.statusY;
        let x = ((ENGINE.sideWIDTH - SPRITE.LineTop.width) / 2) | 0;

        var bx, by;
        y += fs * 1.5 + 4;
        CTX.fillText("Health:", x, y);
        inc();
        TITLE.healthBar(bx, by);

        y += fs * 1.5;
        CTX.fillText("Mana:", x, y);
        inc();
        TITLE.manaBar(bx, by);
        y += 1 * fs;

        function inc() {
            const pad = 3;
            bx = x + 58;
            by = y - fs + pad;
        }
    },
    statusBar(x, y, value, max, color) {
        const CTX = LAYER.statusBars;
        CTX.save();
        ENGINE.resetShadow(CTX);
        let h = 16;
        let w = 142;
        ENGINE.statusBar(CTX, x, y, w, h, value, max, color);
        CTX.restore();
    },
    healthBar(x, y) {
        TITLE.statusBar(x, y, HERO.health, HERO.maxHealth, "#F00");
    },
    manaBar(x, y) {
        TITLE.statusBar(x, y, HERO.mana, HERO.maxMana, "#00F");
    },
    potion() {
        ENGINE.clearLayer("potion");
        const CTX = LAYER.potion;
        CTX.fillStyle = "#AAA";
        CTX.shadowColor = "#666";
        CTX.shadowOffsetX = 1;
        CTX.shadowOffsetY = 1;
        CTX.shadowBlur = 1;
        let fs = 16;
        CTX.font = fs + "px Times";
        CTX.fillText(HERO.inventory.potion.red, TITLE.stack.p1, TITLE.stack.PY);
        CTX.fillText(HERO.inventory.potion.blue, TITLE.stack.p2, TITLE.stack.PY);
    },
    compass() {
        let x = ((ENGINE.titleWIDTH - ENGINE.sideWIDTH) + ENGINE.sideWIDTH / 2) | 0;
        let y = (ENGINE.titleHEIGHT / 2) | 0;
        ENGINE.spriteDraw("compassRose", x, y, SPRITE.CompassRose);
        TITLE.stack.compassX = x;
        TITLE.stack.compassY = y;
        this.compassNeedle();
    },
    compassNeedle() {
        ENGINE.clearLayer("compassNeedle");
        const CTX = LAYER.compassNeedle;
        CTX.strokeStyle = "#F00";
        let [x, y] = [TITLE.stack.compassX, TITLE.stack.compassY];
        CTX.beginPath();
        CTX.moveTo(x, y);
        let end = new Point(x, y).translate(Vector3.to_FP_Vector(HERO.player.dir), (SPRITE.CompassRose.width / 2 * 0.8) | 0);
        CTX.lineTo(end.x, end.y);
        CTX.stroke();
    },
    topBackground() {
        const CTX = LAYER.title;
        CTX.fillStyle = "#000";
        CTX.roundRect(0, 0, ENGINE.titleWIDTH, ENGINE.titleHEIGHT, { upperLeft: 20, upperRight: 20, lowerLeft: 0, lowerRight: 0 }, true, true);
    },
    bottomBackground() {
        const CTX = LAYER.bottom;
        CTX.fillStyle = "#000";
        CTX.roundRect(0, 0, ENGINE.bottomWIDTH, ENGINE.bottomHEIGHT, { upperLeft: 0, upperRight: 0, lowerLeft: 20, lowerRight: 20 }, true, true);
    },
    sideBackground() {
        ENGINE.fillLayer("sideback", "#000");
        ENGINE.fillLayer("Lsideback", "#000");
    },
    bottom() {
        this.bottomVersion();
    },
    bottomVersion() {
        ENGINE.clearLayer("bottomText");
        const CTX = LAYER.bottomText;
        CTX.textAlign = "center";
        var x = ENGINE.bottomWIDTH / 2;
        var y = ENGINE.bottomHEIGHT / 2;
        CTX.font = "13px Consolas";
        CTX.fillStyle = "#888";
        CTX.shadowOffsetX = 0;
        CTX.shadowOffsetY = 0;
        CTX.shadowBlur = 0;
        CTX.shadowColor = "#cec967";
        CTX.fillText("Version " + PRG.VERSION + " by Lovro Selič", x, y);
    },
    makeGrad(CTX, x, y, w, h) {
        let grad = CTX.createLinearGradient(x, y, w, h);
        grad.addColorStop("0", "#DDD");
        grad.addColorStop("0.1", "#EEE");
        grad.addColorStop("0.2", "#DDD");
        grad.addColorStop("0.3", "#AAA");
        grad.addColorStop("0.4", "#999");
        grad.addColorStop("0.5", "#666");
        grad.addColorStop("0.6", "#555");
        grad.addColorStop("0.7", "#777");
        grad.addColorStop("0.8", "#AAA");
        grad.addColorStop("0.9", "#CCC");
        grad.addColorStop("1", "#EEE");
        return grad;
    },
    titlePlot() {
        const CTX = LAYER.title;
        var fs = 36;
        CTX.font = fs + "px Moria";
        CTX.textAlign = "center";
        let txt = CTX.measureText(PRG.NAME);
        let x = ENGINE.titleWIDTH / 2;
        let y = fs + 10;
        let gx = x - txt.width / 2;
        let gy = y - fs;
        let grad = this.makeGrad(CTX, gx, gy + 10, gx, gy + fs);
        CTX.fillStyle = grad;
        GAME.grad = grad;
        CTX.shadowColor = "#cec967";
        CTX.shadowOffsetX = 2;
        CTX.shadowOffsetY = 2;
        CTX.shadowBlur = 3;
        CTX.fillText(PRG.NAME, x, y);
    },
    drawButtons() {
        ENGINE.clearLayer("button");
        FORM.BUTTON.POOL.clear();
        let x = 36;
        let y = 440;
        const w = 166;
        const h = 24;
        let startBA = new Area(x, y, w, h);
        const buttonColors = new ColorInfo("#F00", "#A00", "#222", "#666", 13);
        const musicColors = new ColorInfo("#0E0", "#090", "#222", "#666", 13);
        const checkpointColors = new ColorInfo("#F0F", "#A0A", "#222", "#666", 10);
        FORM.BUTTON.POOL.push(new Button("Start game", startBA, buttonColors, GAME.start));

        const sg = localStorage.getItem(PRG.SG);
        if (sg) {
            x += 1.2 * w;
            let resumeBA = new Area(x, y, w, h);
            FORM.BUTTON.POOL.push(new Button("Resume", resumeBA, checkpointColors, GAME.checkpoint));
        }

        x += 1.2 * w;
        let music = new Area(x, y, w, h);
        FORM.BUTTON.POOL.push(new Button("Play title music", music, musicColors, TITLE.music));
        FORM.BUTTON.draw();
        $(ENGINE.topCanvas).on("mousemove", { layer: ENGINE.topCanvas }, ENGINE.mouseOver);
        $(ENGINE.topCanvas).on("click", { layer: ENGINE.topCanvas }, ENGINE.mouseClick);
    },
    music() {
        AUDIO.Title.play();
    },
    time() {
        let fs = 14;
        let y = ((TITLE.stack.delta2 + SPRITE.LineTop.height) / 2 + fs / 4) | 0;
        let x = ((ENGINE.sideWIDTH - SPRITE.LineTop.width) / 2) | 0;
        const CTX = LAYER.time;
        ENGINE.clearLayer("time");
        CTX.font = fs + "px Consolas";
        CTX.fillStyle = "#0D0";
        CTX.fillText(`Depth: ${GAME.level.toString().padStart(2, "0")}`, x, y);
        let time = `Time: ${GAME.time.timeString()}`;
        let timeMeasure = CTX.measureText(time);
        x = (ENGINE.sideWIDTH - x - timeMeasure.width) | 0;
        CTX.fillText(time, x, y);
    },
    _grad(CTX, txt, fs, x, y) {
        let txtm = CTX.measureText(txt);
        let gx = x - txtm.width / 2;
        let gy = y - fs;
        CTX.fillStyle = this.makeGrad(CTX, gx, gy + 2, gx, gy + fs);
    },
    _label(CTX, txt, fs, x, y) {
        CTX.font = fs + "px Annie";
        this._grad(CTX, txt, fs, x, y);
        CTX.shadowColor = "#cec967";
        CTX.shadowOffsetX = 1;
        CTX.shadowOffsetY = 1;
        CTX.shadowBlur = 2;
        CTX.textAlign = "center";
        CTX.fillText(txt, x, y);
    },
    _text(layer, txt, y, what, pad) {
        ENGINE.clearLayer(layer);
        const CTX = LAYER[layer];
        let x = ENGINE.sideWIDTH / 2;
        let fs = 22;
        this._label(CTX, txt, fs, x, y);
        CTX.fillStyle = "#FFF";
        CTX.shadowColor = "#DDD";
        CTX.shadowOffsetX = 1;
        CTX.shadowOffsetY = 1;
        CTX.shadowBlur = 1;
        y += fs + 4;
        CTX.fillText(GAME[what].toString().padStart(pad, "0"), x, y);
    },
    _sprite(layer, txt, y, what, sprite) {
        ENGINE.clearLayer(layer);
        const CTX = LAYER[layer];
        let x = ENGINE.sideWIDTH / 2;
        let fs = 22;
        this._label(CTX, txt, fs, x, y);
        y += fs + SPRITE[sprite].width / 3;
        CTX.shadowColor = "transparent";
        CTX.shadowOffsetX = 0;
        CTX.shadowOffsetY = 0;
        CTX.shadowBlur = 0;
        var spread = ENGINE.spreadAroundCenter(GAME[what], x, 32);
        for (let q = 0; q < GAME[what]; q++) {
            ENGINE.spriteDraw(layer, spread[q], y, SPRITE[sprite]);
        }
    },
    _percentBar(layer, txt, y, what, firstColor = null) {
        ENGINE.clearLayer(layer);
        const CTX = LAYER[layer];
        let x = ENGINE.sideWIDTH / 2;
        let fs = 22;
        this._label(CTX, txt, fs, x, y);
        y += 8;
        let percent = GAME[what] / INI[what.toUpperCase()];
        let colors = ['green', 'yellow', 'red'];
        if (firstColor) {
            colors[0] = firstColor;
        }
        let H = 32;
        ENGINE.percentBar(percent, y, CTX, ENGINE.sideWIDTH, colors, H);
    },
    gameOver() {
        ENGINE.clearLayer("text");
        const CTX = LAYER.text;
        CTX.textAlign = "center";
        var x = ENGINE.gameWIDTH / 2;
        var y = ENGINE.gameHEIGHT / 2;
        var fs = 64;
        CTX.font = fs + "px DeedDown";
        var txt = CTX.measureText("GAME OVER");
        var gx = x - txt.width / 2;
        var gy = y - fs;
        var grad = CTX.createLinearGradient(gx, gy + 10, gx, gy + fs);
        grad.addColorStop("0", "#DDD");
        grad.addColorStop("0.1", "#EEE");
        grad.addColorStop("0.2", "#DDD");
        grad.addColorStop("0.3", "#CCC");
        grad.addColorStop("0.4", "#BBB");
        grad.addColorStop("0.5", "#AAA");
        grad.addColorStop("0.6", "#BBB");
        grad.addColorStop("0.7", "#CCC");
        grad.addColorStop("0.8", "#DDD");
        grad.addColorStop("0.9", "#EEE");
        grad.addColorStop("1", "#DDD");
        CTX.fillStyle = grad;
        CTX.shadowColor = "#FFF";
        CTX.shadowOffsetX = 2;
        CTX.shadowOffsetY = 2;
        CTX.shadowBlur = 3;
        CTX.fillText("GAME OVER", x, y);
    },
    setEndingCreditsScroll() {
        console.group("endingCredits");
        const text = this.generateEndingCredits();
        const RD = new RenderData("Moria", 16, "#DAA520", "text");
        GAME.endingCreditText = new VerticalScrollingText(text, 1, RD);
        console.groupEnd("endingCredits");
    },
    generateEndingCredits() {
        const text = `Congratulations!
        You have completed CrawlMaster II
        in ${GAME.time.timeString()}.
        You certainly had fun.
        You may think this ending is rather
        anticlimactic ... just like as in
        Crawl Master I ...
        sure ...
        but what would you prefer?
        picking gold, without noticing that it's over?
        like in 'Deep Down ...'?
        There comes a time a project has to end.
        Somehow.
        
        CREDITS:
        all libraries and game code: Lovro Selic,
        written in JavaScript and GLSL,
        except of course,  JQUERY: John Resig et al,
        glMatrix library by Brandon Jones and 
        Colin MacKenzie IV.

        Graphics taken from (hopefully) free resources
        or drawn with PiskelApp or made with Blender.

        Supplementary tools written in 
        JavaScript or Python.
          
        Music: Laughing Skull 
        written and performed by LaughingSkull, 
        ${"\u00A9"} 2006 Lovro Selic.
    
        thanks for sticking 'till the end.\n`;
        return text;

    },
};

// -- main --
$(function () {
    PRG.INIT();
    PRG.setup();
    ENGINE.LOAD.preload();
    UNIFORM.setup();
    SAVE_GAME.setKey(PRG.SG);
});