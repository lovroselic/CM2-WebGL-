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
};

/** Materials */

const MATERIAL = {
    VERSION: "1.00",
    standard: new Material(LIGHT_COLORS.standard, LIGHT_COLORS.standard, LIGHT_COLORS.standard, 0.125),
    standardShine: new Material(LIGHT_COLORS.standard, LIGHT_COLORS.standard, LIGHT_COLORS.standard, 0.99),
    paper: new Material(LIGHT_COLORS.standard, LIGHT_COLORS.white, LIGHT_COLORS.white, 0.8),
    gold: new Material(LIGHT_COLORS.gold, LIGHT_COLORS.gold, LIGHT_COLORS.gold, 0.90),
    silver: new Material(LIGHT_COLORS.silver, LIGHT_COLORS.silver, LIGHT_COLORS.silver, 0.9999),
    redShine: new Material(LIGHT_COLORS.fullRed, LIGHT_COLORS.fullRed, LIGHT_COLORS.fullRed, 0.99),
    blueShine: new Material(LIGHT_COLORS.blue, LIGHT_COLORS.blue, LIGHT_COLORS.blue, 0.99),
    fire: new Material(LIGHT_COLORS.fire, LIGHT_COLORS.fire, LIGHT_COLORS.fire, 0.5)
};
console.log(`%cMATERIAL v${MATERIAL.VERSION} for CrawlMaster2 loaded.`, "color: #888");
console.table(MATERIAL);

//gold: new Material(new Float32Array([]), new Float32Array([]), new Float32Array([])),
/*
gold: new Material(new Float32Array([0.24725, 0.1995, 0.0745]),
        new Float32Array([0.75164, 0.60648, 0.22648]),
        new Float32Array([0.628281, 0.555802, 0.366065]),
        0.90),
*/
/*
silver: new Material(new Float32Array([0.23125, 0.23125, 0.23125]),
        new Float32Array([0.2775, 0.2775, 0.2775]),
        new Float32Array([0.773911, 0.773911, 0.773911]), 0.99),
*/