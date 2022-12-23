/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */
"use strict";

///////////////////////////////////////////////
//                                           //
//           LS matrix                       //
//          uses glMatrix                    //
//           wraps glMatrix and extends      //
// it for use with other LS libs             //
//                                           //
///////////////////////////////////////////////

const LS_matrix = {
    VERSION: "0.01",
    CSS: "color: red",
};

class Vector3 {
    constructor(x = 0, y = 0, z = 0) {
        this.array = glMatrix.vec3.fromValues(x, y, z);
        this.refresh();
    }
    refresh() {
        this.x = this.array[0];
        this.y = this.array[1];
        this.z = this.array[2];
    }
    toArray() {
        this.array = new Float32Array([this.x, this.y, this.z]);
    }
    static from_2D_dir(dir, z = 0) {
        return new Vector3(dir.x, dir.y, z);
    }
    static to_FP_Grid(v) {
        return new FP_Grid(v.x, v.y);
    }
    static to_FP_Vector(v) {
        return new FP_Vector(v.x, v.y);
    }
    toPoint() {
        let grid = new FP_Grid(this.x, this.y);
        return grid.toPoint();
    }
    rotate2D(rad) {
        let FPV = new FP_Vector(this.x, this.y);
        return FPV.rotate(rad);
    }
    rotateX() { }
    rotateY() { }
    rotateZ() { }
    translate(vector, length = 1) {
        let x = this.x + length * vector.x || 0;
        let y = this.y + length * vector.y || 0;
        let z = this.z + length * vector.z || 0;
        return new Vector3(x, y, z);
    }
}

//END
console.log(`%cLS_matrix ${LS_matrix.VERSION} loaded.`, LS_matrix.CSS);