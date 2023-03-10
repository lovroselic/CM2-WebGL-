/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */
"use strict";

/////////////////////////////////////////////////
/*
      
TODO:

known bugs: 
    frame rate & time discrepancy

 */
////////////////////////////////////////////////////

const DEBUG = {
    FPS: true,
    BUTTONS: false,
    SETTING: true,
    VERBOSE: true,
    _2D_display: true,
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
    CRIPPLE_SPEED: 0.5,
    BOOST_TIME: 59,
    MM_reveal_radius: 4,
    FINAL_LEVEL: 1,
};
const PRG = {
    VERSION: "0.10.08",
    NAME: "Crawl Master II",
    YEAR: "2023",
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
        console.log("PRG.setup");
        if (DEBUG.SETTING) {
            $('#debug').show();
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
        ENGINE.addBOX("ROOM", ENGINE.gameWIDTH, ENGINE.gameHEIGHT, ["background", "3d_webgl", "sword", "info", "text", "FPS", "button", "click"], "side");
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

/** WebGL extensions */

class Shrine extends WallFeature3D {
    constructor(grid, face, type) {
        super(grid, face, type);
    }
    interact() {
        if (GAME.gold >= 1000) {
            this.interactive = false;
            GAME.gold -= 1000;
            TITLE.gold();

            return {
                category: this.interactionCategory,
                inventorySprite: this.inventorySprite,
                which: this.which,
            };
        } else {
            AUDIO.MagicFail.play();
            return null;
        }
    }
}
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
                if (1 === 1) {
                    console.warn("not yet implmented");
                    break;
                }
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
                if (1 === 1) {
                    console.warn("not yet implmented");
                    break;
                }
                for (let enemy of ENEMY_RC.POOL) {
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
                if (1 === 1) {
                    console.warn("not yet implmented");
                    break;
                }
                for (let enemy of ENEMY_RC.POOL) {
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
                if (1 === 1) {
                    console.warn("not yet implmented");
                    break;
                }
                for (let enemy of ENEMY_RC.POOL) {
                    if (enemy === null) continue;
                    if (enemy.distance === null) continue;
                    if (enemy.distance <= INI.SCROLL_RANGE) {
                        let factor = RND(25, 50) / 100;
                        enemy.defense -= Math.ceil(enemy.defense * factor);
                    }
                }
                break;
            case "DestroyWeapon":
                if (1 === 1) {
                    console.warn("not yet implmented");
                    break;
                }
                for (let enemy of ENEMY_RC.POOL) {
                    if (enemy === null) continue;
                    if (enemy.distance === null) continue;
                    if (enemy.distance <= INI.SCROLL_RANGE) {
                        let factor = RND(25, 50) / 100;
                        enemy.attack -= Math.ceil(enemy.attack * factor);
                    }
                }
                break;
            case "Petrify":
                if (1 === 1) {
                    console.warn("not yet implmented");
                    break;
                }
                for (let enemy of ENEMY_RC.POOL) {
                    if (enemy === null) continue;
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
                if (1 === 1) {
                    console.warn("not yet implmented");
                    break;
                }
                let temple = map.findRoom("temple");
                let target = map.findMiddleSpaceUnreserved(temple.area);
                PLAYER.pos = Grid.toCenter(target);
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
                if (1 === 1) {
                    console.warn("not yet implmented");
                    break;
                }
                for (let enemy of ENEMY_RC.POOL) {
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

class Missile {
    constructor(position, direction, type, magic, casterId = 0) {
        this.active = true;
        this.name = "Missile";
        this.pos = position;
        this.dir = direction;
        this.magic = magic;
        this.casterId = casterId;
        this.distance = null;
        for (const prop in type) {
            this[prop] = type[prop];
        }
        this.texture = WebGL.createTexture(TEXTURE[this.texture]);
        this.start = `${this.element}_start`;
        this.element = ELEMENT[this.element];
        this.lightColor = colorStringToVector(this.lightColor);

        if (typeof (this.scale) === "number") {
            this.scale = new Float32Array([this.scale, this.scale, this.scale]);
        }
        this.r = Math.max(...this.scale);
        this.indices = this.element.indices.length;
        this.power = this.calcPower(magic);
        this.pos = this.pos.translate(this.dir, 1.2 * this.r);
    }
    static calcMana(magic) {
        return (magic ** 1.15) | 0;
    }
    draw() {
        ENGINE.VECTOR2D.drawPerspective(this, "#F00");
    }
    move(lapsedTime) {
        let length = (lapsedTime / 1000) * this.moveSpeed;
        this.pos = this.pos.translate(this.dir, length);
        this.distance = glMatrix.vec3.distance(HERO.player.pos.array, this.pos.array);
    }
    calcPower(magic) {
        return 2 * magic + RND(-2, 2);
    }
    calcDamage(magic) {
        let part1 = (magic / 2) | 0;
        let part2 = magic - part1;
        let damage = this.power - part1 - RND(0, part2);
        return damage;
    }
}

const HERO = {
    //startInit() { },
    //init() { },
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
        /*const propsToSave = ["health", "maxHealth", "mana", "maxMana", "defense", "reference_defense", "attack",
          "reference_attack", "magic", "attackExp", "defenseExp", "magicExp", "attackExpGoal", "defenseExpGoal", "magicExpGoal",
          "inventory.potion.red", "inventory.potion.blue"];*/
        //this.attributesForSaveGame = [];
        /*for (const P of propsToSave) {
          this.attributesForSaveGame.push(`HERO.${P}`);
        }*/
        //PLAYER.hitByMissile = HERO.hitByMissile;
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
        let damage = Math.max(missile.calcDamage(HERO.magic), 1) - HERO.luck;
        let exp = Math.max((damage ** 0.9) | 0, 1);
        HERO.applyDamage(damage);
        let type = "SmallShortExplosion";
        if (this.dead) type = "LongExplosion";
        let explosion = new Destruction(missile.moveState.pos, missile.base, DESTRUCTION_TYPE[type]);
        DESTRUCTION_ANIMATION.add(explosion);
        MISSILE.remove(missile.id);
        AUDIO.Explosion.volume = RAYCAST.volume(missile.distance);
        AUDIO.Explosion.play();
        HERO.incExp(exp, "magic");
    },
    applyDamage(damage) {
        HERO.health -= damage;
        HERO.health = Math.max(HERO.health, 0);
        TITLE.status();
        if (HERO.health <= 0) {
            HERO.die();
        }
    },

    die() {

    },
    death() {

        //ENGINE.TEXT.centeredText("Press <ENTER> to try again", ENGINE.gameWIDTH, ENGINE.gameHEIGHT / 2);
        //ENGINE.GAME.ANIMATION.next(ENGINE.KEY.waitFor.bind(null, GAME.levelStart, "enter"));
    },
    inventory: {
        key: [],
        status: [],
        potion: {
            red: 0,
            blue: 0
        },
        scroll: new Inventory()
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
        GAME.paused = false;

        let GameRD = new RenderData("DeepDown", 60, "#DC143C", "text", "#F22", 2, 2, 2);
        ENGINE.TEXT.setRD(GameRD);
        ENGINE.watchVisibility(GAME.lostFocus);
        ENGINE.GAME.start(16);
        MINIMAP.setOffset(TITLE.stack.minimapX, TITLE.stack.minimapY);
        GAME.completed = false;
        GAME.upperLimit = 1;
        GAME.won = false;
        GAME.level = 1;
        //GAME.level = 2;
        //GAME.gold = 0;
        GAME.gold = 10000;

        HERO.construct();
        ENGINE.VECTOR2D.configure("player");
        GAME.fps = new FPS_short_term_measurement(300);
        GAME.time = new Timer("Main");
        GAME.levelStart();
    },
    levelStart() {
        console.log("starting level", GAME.level);
        GAME.levelFinished = false;
        GAME.prepareForRestart();
        GAME.initLevel(GAME.level);
        GAME.continueLevel(GAME.level);
    },

    initLevel(level) {
        console.log("...level", level, 'initialization');
        MAP[level].map = FREE_MAP.import(JSON.parse(MAP[level].data));
        MAP[level].pw = MAP[level].map.width * ENGINE.INI.GRIDPIX;
        MAP[level].ph = MAP[level].map.height * ENGINE.INI.GRIDPIX;
        MAP[level].map.GA.massSet(MAPDICT.FOG);

        //HERO.pos from entrance
        let start_dir = FaceToDirection(MAP[GAME.level].entrance.face);
        let start_grid = Grid.toClass(MAP[GAME.level].entrance.grid).add(start_dir);
        start_grid = Vector3.from_Grid(Grid.toCenter(start_grid), 0.5);
        HERO.player = new $3D_player(start_grid, Vector3.from_2D_dir(start_dir), MAP[level].map);

        WebGL.init_required_IAM(MAP[level].map);
        WebGL.MOUSE.initialize("ROOM");
        SPAWN.spawn(level);
        const object_map = [
            "BALL", "SCROLL", "FLASK", "KEY", "BAR", "CUBE_CENTERED", "CUBE_SM", "SWORD", "HEART", "SHIELD", "PENTAGRAM", "CHEST",
            "TREASURE_CHEST",
        ];
        MAP[level].world = WORLD.build(MAP[level].map, object_map);
        console.log("world", MAP[level].world);

        const textureData = {
            wall: TEXTURE[MAP[level].wall],
            floor: TEXTURE[MAP[level].floor],
            ceil: TEXTURE[MAP[level].ceil]
        };

        WebGL.updateShaders();
        WebGL.init('webgl', MAP[level].world, textureData, HERO.player);
        MINIMAP.init(MAP[level].map, INI.MIMIMAP_WIDTH, INI.MIMIMAP_HEIGHT, HERO.player);
    },
    continueLevel(level) {
        console.log("game continues on level", level);
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
        GAME.respond(lapsedTime);
        VANISHING3D.manage(lapsedTime);
        MISSILE3D.manage(lapsedTime);
        EXPLOSION3D.manage(Date.now());
        MINIMAP.unveil(Vector3.to_FP_Grid(HERO.player.pos), HERO.vision);
        ENGINE.TIMERS.update();

        //HERO.manage();
        let interaction = WebGL.MOUSE.click(HERO);
        if (interaction) GAME.processInteraction(interaction);

        GAME.frameDraw(lapsedTime);

        if (HERO.dead) GAME.checkIfProcessesComplete();
    },
    processInteraction(interaction) {
        console.log("Processing interaction", interaction);
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
        //if (DESTRUCTION_ANIMATION.POOL.length !== 0) return;
        //if (VANISHING.POOL.length !== 0) return;
        //if (HERO.floats) return;
        HERO.death();
    },

    frameDraw(lapsedTime) {
        //ENGINE.clearLayerStack();
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
    },
    setTitle() {
        const text = GAME.generateTitleText();
        const RD = new RenderData("Annie", 16, "#0E0", "bottomText");
        const SQ = new RectArea(0, 0, LAYER.bottomText.canvas.width, LAYER.bottomText.canvas.height);
        GAME.movingText = new MovingText(text, 4, RD, SQ);
    },
    generateTitleText() {
        let text = `${PRG.NAME} ${PRG.VERSION
            }, a game by Lovro Seli??, ${"\u00A9"} C00LSch00L ${PRG.YEAR
            }. 
             
            Music: '...' written and performed by LaughingSkull, ${"\u00A9"
            } 20xx Lovro Seli??. `;
        text += "     ENGINE, SPEECH, GRID, MAZE, Burrows-Wheeler RLE Compression and GAME code by Lovro Seli?? using JavaScript. ";
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
        if (GAME.paused || false) return;
        GAME.clickPause();
    },
    clickPause() {
        if (HERO.dead || GAME.levelCompleted) return;
        $("#pause").trigger("click");
        ENGINE.GAME.keymap[ENGINE.KEY.map.F4] = false;
    },
    pause() {
        if (GAME.paused) return;
        if (GAME.levelCompleted) return;
        if (HERO.dead) return;
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

        var map = ENGINE.GAME.keymap;

        if (map[ENGINE.KEY.map.F4]) {
            $("#pause").trigger("click");
            ENGINE.TIMERS.display();
            ENGINE.GAME.keymap[ENGINE.KEY.map.F4] = false;
        }
        if (map[ENGINE.KEY.map.F9]) {
            console.log("F9");
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
            let cost = Missile.calcMana(HERO.reference_magic);
            cost = 0; //debug
            if (cost > HERO.mana) {
                AUDIO.MagicFail.play();
                return;
            }
            if (!HERO.canShoot) return;
            HERO.canShoot = false;
            HERO.mana -= cost;
            let exp = (HERO.magic / 5) | 0;
            HERO.incExp(exp, "magic");
            TITLE.status();
            let position = HERO.player.pos.translate(HERO.player.dir, HERO.player.r);
            const missile = new Missile(position, HERO.player.dir, COMMON_ITEM_TYPE.Fireball, HERO.magic);
            MISSILE3D.add(missile);

            ENGINE.GAME.keymap[ENGINE.KEY.map.ctrl] = false; //NO repeat
            setTimeout(() => (HERO.canShoot = true), INI.HERO_SHOOT_TIMEOUT);
            return;
        }
        if (map[ENGINE.KEY.map.up]) {

        }
        if (map[ENGINE.KEY.map.down]) {

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
    end() {
        ENGINE.showMouse();
        AUDIO.Death.onended = GAME.checkScore;
        AUDIO.Death.play();
    },
    checkScore() {
        SCORE.checkScore(GAME.score);
        SCORE.hiScore();
    },
    addScore(score) {
        GAME.score += score;
        TITLE.score();
    },
    over() {
        TITLE.gameOver();
        ENGINE.showMouse();
        GAME.checkScore();
        TITLE.hiScore();
        ENGINE.GAME.ANIMATION.next(ENGINE.KEY.waitFor.bind(null, TITLE.startTitle, "enter"));
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
        YL5: 400, //280
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
        //ENGINE.draw("background", (ENGINE.sideWIDTH + ENGINE.gameWIDTH - 480) / 2, (ENGINE.gameHEIGHT - 480) / 2, SPRITE.Title);
        $("#DOWN")[0].scrollIntoView();
        ENGINE.topCanvas = ENGINE.getCanvasName("ROOM");
        TITLE.drawButtons();
        GAME.setTitle();
        ENGINE.GAME.start(16);
        ENGINE.GAME.ANIMATION.next(GAME.runTitle);
    },
    clearAllLayers() {
        ENGINE.layersToClear = new Set(["text", "sideback", "button", "title", "FPS"]);
        ENGINE.clearLayerStack();
    },
    blackBackgrounds() {
        this.topBackground();
        this.bottomBackground();
        this.sideBackground();
        ENGINE.fillLayer("background", "#666");
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
        let INV = HERO.inventory.scroll;
        ENGINE.clearLayer("scrolls");
        let CTX = LAYER.scrolls;

        TITLE.stack.scrollIndex = Math.min(TITLE.stack.scrollIndex, INV.size() - 1);
        let scrollSpread = ENGINE.spreadAroundCenter(
            TITLE.stack.scrollInRow,
            ((ENGINE.sideWIDTH / 2) | 0) - 16,
            TITLE.stack.scrollDelta
        );

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
        let NUM = list.length;
        let spread = ENGINE.spreadAroundCenter(
            NUM,
            ENGINE.sideWIDTH / 2,
            TITLE.stack.keyDelta
        );
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
        var CTX = LAYER.gold;
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
        var CTX = LAYER.stat;
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
        var CTX = LAYER.stat;
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
        var CTX = LAYER.statusBars;
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
        var CTX = LAYER.statusBars;
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
        let CTX = LAYER.potion;
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
        let CTX = LAYER.compassNeedle;
        CTX.strokeStyle = "#F00";
        let [x, y] = [TITLE.stack.compassX, TITLE.stack.compassY];
        CTX.beginPath();
        CTX.moveTo(x, y);
        let end = new Point(x, y).translate(Vector3.to_FP_Vector(HERO.player.dir), (SPRITE.CompassRose.width / 2 * 0.8) | 0);
        CTX.lineTo(end.x, end.y);
        CTX.stroke();
    },
    topBackground() {
        var CTX = LAYER.title;
        CTX.fillStyle = "#000";
        CTX.roundRect(0, 0, ENGINE.titleWIDTH, ENGINE.titleHEIGHT, { upperLeft: 20, upperRight: 20, lowerLeft: 0, lowerRight: 0 }, true, true);
    },
    bottomBackground() {
        var CTX = LAYER.bottom;
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
        let CTX = LAYER.bottomText;
        CTX.textAlign = "center";
        var x = ENGINE.bottomWIDTH / 2;
        var y = ENGINE.bottomHEIGHT / 2;
        CTX.font = "13px Consolas";
        CTX.fillStyle = "#888";
        CTX.shadowOffsetX = 0;
        CTX.shadowOffsetY = 0;
        CTX.shadowBlur = 0;
        CTX.shadowColor = "#cec967";
        CTX.fillText("Version " + PRG.VERSION + " by Lovro Seli??", x, y);
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
        let CTX = LAYER.title;
        var fs = 42;
        CTX.font = fs + "px DeepDown";
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
        let w = 166;
        let h = 24;
        let startBA = new Area(x, y, w, h);
        let buttonColors = new ColorInfo("#F00", "#A00", "#222", "#666", 13);
        let musicColors = new ColorInfo("#0E0", "#090", "#222", "#666", 13);
        FORM.BUTTON.POOL.push(new Button("Start game", startBA, buttonColors, GAME.start));
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
        var CTX = LAYER.time;
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
        let CTX = LAYER[layer];
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
        let CTX = LAYER[layer];
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
        let CTX = LAYER[layer];
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
    score() {
        this._text("score", "SCORE", 36, "score", 6);
        if (GAME.score >= GAME.extraLife[0]) {
            GAME.lives++;
            GAME.extraLife.shift();
            TITLE.lives();
        }
    },
    gameOver() {
        ENGINE.clearLayer("text");
        var CTX = LAYER.text;
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
};

const TURN = {
    damage(attacker, defender) {
        if (attacker.attack === 0) return 0;
        let delta = attacker.attack - defender.defense;
        let damage = RND(Math.min(-1, (delta / 2) | 0), Math.max(delta, 1));
        return damage;
    },
    magicDamage(attacker, defender) {
        if (attacker.magic === 0) return 0;
    },
    display(value, color = "#0F0") {
        ENGINE.clearLayer("info");
        let CTX = LAYER.info;
        let fs = 16;
        CTX.font = fs + "px Times";
        CTX.shadowColor = "#666";
        CTX.shadowOffsetX = 1;
        CTX.shadowOffsetY = 1;
        CTX.shadowBlur = 0;
        CTX.fillStyle = color;
        CTX.textAlign = "center";
        CTX.fillText(value, ENGINE.gameWIDTH / 2, ENGINE.gameHEIGHT / 2);

        GAME.infoTimer();
    }
};

// -- main --
$(function () {
    PRG.INIT();
    //SPEECH.init(0.6);
    PRG.setup();
    ENGINE.LOAD.preload();
    //takes a long time, use during preloading
    UNIFORM.setup();
    //SCORE.init("SC", "RUN", 10, 2500);
    //SCORE.loadHS();
    //SCORE.hiScore();
    //SCORE.extraLife = [10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, Infinity];
});