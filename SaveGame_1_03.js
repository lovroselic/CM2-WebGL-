/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */
"use strict";

///////////////SaveGame.js/////////////
//                                  //
//  version 1.03 by LS              //
//                                  //
//////////////////////////////////////

/*

TODO:

*/

const SAVE_GAME = {
  VERSION: "1.03",
  LISTABR: "_LST",
  TIMEABR: "_TMR",
  OBJABR: "_OBJ",
  CSS: "color: orange",
  that: window,
  ready() {
    console.log(`%cSAVE_GAME module version ${SAVE_GAME.VERSION} loaded and ready.`, SAVE_GAME.CSS);
  },
  MAP: {
    value: [],
    pointer: []
  },
  LIST: {
    value: [],
    pointer: []
  },
  TIMER: {
    value: [],
    pointer: []
  },
  OBJECT: {
    value: [],
    pointer: [],
    class: []
  },
  pointers: [],
  lists: [],
  timers: [],
  objects: [],
  clearMap() {
    SAVE_GAME.MAP.value.clear();
    SAVE_GAME.MAP.pointer.clear();
    SAVE_GAME.LIST.value.clear();
    SAVE_GAME.LIST.pointer.clear();
    SAVE_GAME.TIMER.value.clear();
    SAVE_GAME.TIMER.pointer.clear();
  },
  setKey(key) {
    SAVE_GAME.key = key;
  },
  objectify(str) {
    return eval(str);
  },
  loadLists() {
    const load = JSON.parse(SAVE_GAME.decode(localStorage[SAVE_GAME.key + SAVE_GAME.LISTABR]));
    const LL = load.pointer.length;
    for (let i = 0; i < LL; i++) {
      const obj = SAVE_GAME.objectify(load.pointer[i]);
      obj.objectify(load.value[i]);
    }
  },
  loadTimers() {
    const load = JSON.parse(SAVE_GAME.decode(localStorage[SAVE_GAME.key + SAVE_GAME.TIMEABR]));
    if (ENGINE.verbose) console.info("load timers", load);
    const LL = load.pointer.length;
    for (let i = 0; i < LL; i++) {
      const idx = ENGINE.TIMERS.index(load.pointer[i]);
      if (idx >= 0) {
        ENGINE.TIMERS.STACK[idx].stop();
        ENGINE.TIMERS.STACK[idx].load(JSON.parse(load.value[i]));
        ENGINE.TIMERS.STACK[idx].continue();
      } else {
        console.log("create timer!; NOT YET IMPLEMENTED!!!");
        console.log(load.pointer[i], JSON.parse(load.value[i]));
      }
    }
  },
  loadObjects() {
    const load = JSON.parse(SAVE_GAME.decode(localStorage[SAVE_GAME.key + SAVE_GAME.OBJABR]));
    const LL = load.pointer.length;
    for (let i = 0; i < LL; i++) {
      const unpacked = JSON.parse(load.value[i]);
      for (const item in unpacked) {
        const className = eval(load.class[i]);
        SAVE_GAME.that[load.pointer[i]][item] = new className();
        SAVE_GAME.that[load.pointer[i]][item].adopt(unpacked[item]);
      }
    }
  },
  saveObjects() {
    SAVE_GAME.objects.forEach(obj => {
      SAVE_GAME.OBJECT.pointer.push(obj.obj);
      SAVE_GAME.OBJECT.class.push(obj.class);
      obj = SAVE_GAME.that[obj.obj];
      let value = JSON.stringify(obj);
      SAVE_GAME.OBJECT.value.push(value);
    });
    const objSTR = JSON.stringify(SAVE_GAME.OBJECT);
    localStorage.setItem(SAVE_GAME.key + SAVE_GAME.OBJABR, SAVE_GAME.code(objSTR));
  },
  saveLists() {
    SAVE_GAME.lists.forEach(list => {
      const obj = SAVE_GAME.objectify(list);
      const stringified = obj.stringify();
      SAVE_GAME.LIST.pointer.push(list);
      SAVE_GAME.LIST.value.push(stringified);
    });
    const listSTR = JSON.stringify(SAVE_GAME.LIST);
    localStorage.setItem(SAVE_GAME.key + SAVE_GAME.LISTABR, SAVE_GAME.code(listSTR));
  },
  save() {
    console.log(`%cSaving game ....`, SAVE_GAME.CSS);
    SAVE_GAME.clearMap();
    SAVE_GAME.saveMap();
    SAVE_GAME.saveLists();
    SAVE_GAME.saveTimers();
    SAVE_GAME.saveObjects();
  },
  saveTimers() {
    if (ENGINE.verbose) console.info("SAVE_GAME.timers", SAVE_GAME.timers);
    for (let i = 0, LN = SAVE_GAME.timers.length; i < LN; i++) {
      const idx = ENGINE.TIMERS.index(SAVE_GAME.timers[i]);
      if (idx < 0) continue;
      SAVE_GAME.TIMER.pointer.push(SAVE_GAME.timers[i]);
      ENGINE.TIMERS.STACK[idx].stop();
      SAVE_GAME.TIMER.value.push(JSON.stringify(ENGINE.TIMERS.STACK[idx]));
      ENGINE.TIMERS.STACK[idx].continue();
    }
    const timeSTR = JSON.stringify(SAVE_GAME.TIMER);
    localStorage.setItem(SAVE_GAME.key + SAVE_GAME.TIMEABR, SAVE_GAME.code(timeSTR));
  },
  saveMap() {
    SAVE_GAME.pointers.forEach(ptr => {
      SAVE_GAME.MAP.pointer.push(ptr);
      SAVE_GAME.MAP.value.push(SAVE_GAME.objectify(ptr));
    });
    const mapSTR = JSON.stringify(SAVE_GAME.MAP);
    localStorage.setItem(SAVE_GAME.key, SAVE_GAME.code(mapSTR));
  },
  loadMap() {
    console.info("loading maps");
    const load = JSON.parse(SAVE_GAME.decode(localStorage[SAVE_GAME.key]));
    const LL = load.value.length;
    for (let i = 0; i < LL; i++) {
      const [prop, pointer] = load.pointer[i].splitOnLastDot();
      eval(prop)[pointer] = load.value[i];
    }
  },
  load() {
    console.log(`%cLoading game ....`, SAVE_GAME.CSS);
    SAVE_GAME.loadMap();
    SAVE_GAME.loadLists();
    SAVE_GAME.loadTimers();
    SAVE_GAME.loadObjects();
  },
  code(string) {
    let codes = [...string].map(char => char.charCodeAt(0) + 13);
    let hcodes = codes.map(x => x.toString(16));
    return hcodes.join('');
  },
  decode(code) {
    let hcodes = code.splitByN(2);
    let icodes = hcodes.map(x => parseInt(x, 16) - 13);
    return String.fromCharCode(...icodes);
  },
  delete(sg) {
    localStorage.removeItem(sg);
    console.log(`%cDeleted ....: ${sg}`, SAVE_GAME.CSS);
  }
};

SAVE_GAME.ready();