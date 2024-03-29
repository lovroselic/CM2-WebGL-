/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */

"use strict";

/** Lights */
const LIGHT_COLORS = {
    standard: new Float32Array([0.90, 0.90, 0.81]),
    fire: new Float32Array([0.94, 0.50, 0.07]),
    red: new Float32Array([0.95, 0.70, 0.70]),
    yellowgreen: new Float32Array([0.90, 0.90, 0.50]),
    white: new Float32Array([1.0, 1.0, 1.0]),
    blue: new Float32Array([0.0, 0.0, 1.0]),
    fullRed: new Float32Array([1.0, 0.0, 0.0]),
    gold: new Float32Array([0.831372, 0.686274, 0.21568627]),
    silver: new Float32Array([0.752941176, 0.752941176, 0.752941176]),
    green: new Float32Array([0.0, 1.0, 0.0]),
    gray: new Float32Array([0.5, 0.5, 0.5]),
    darkgray: new Float32Array([0.25, 0.25, 0.25]),
    lightgray: new Float32Array([0.75, 0.75, 0.75]),
};

/** Materials */

const MATERIAL = {
    VERSION: "1.00",
    //wall: new Material(LIGHT_COLORS.gray, LIGHT_COLORS.lightgray, LIGHT_COLORS.gray, 0.999),
    wall: new Material(LIGHT_COLORS.gray, LIGHT_COLORS.lightgray, LIGHT_COLORS.darkgray, 0.8),
    marble: new Material(LIGHT_COLORS.gray, LIGHT_COLORS.lightgray, LIGHT_COLORS.darkgray, 0.85),
    standard: new Material(LIGHT_COLORS.standard, LIGHT_COLORS.standard, LIGHT_COLORS.standard, 0.125),
    standardShine: new Material(LIGHT_COLORS.standard, LIGHT_COLORS.standard, LIGHT_COLORS.standard, 0.8),
    paper: new Material(LIGHT_COLORS.standard, LIGHT_COLORS.white, LIGHT_COLORS.white, 0.8),
    gold: new Material(LIGHT_COLORS.gold, LIGHT_COLORS.gold, LIGHT_COLORS.gold, 0.90),
    silver: new Material(LIGHT_COLORS.silver, LIGHT_COLORS.silver, LIGHT_COLORS.silver, 0.90),
    redShine: new Material(LIGHT_COLORS.fullRed, LIGHT_COLORS.fullRed, LIGHT_COLORS.fullRed, 0.5),
    blueShine: new Material(LIGHT_COLORS.blue, LIGHT_COLORS.blue, LIGHT_COLORS.blue, 0.5),
    fire: new Material(LIGHT_COLORS.fire, LIGHT_COLORS.fire, LIGHT_COLORS.fire, 0.5),
    greenShine: new Material(LIGHT_COLORS.green, LIGHT_COLORS.green, LIGHT_COLORS.green, 0.90),
};
console.log(`%cMATERIAL v${MATERIAL.VERSION} for CrawlMaster2 loaded.`, "color: #888");
if (ENGINE.verbose) console.table(MATERIAL);