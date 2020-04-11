/*

function f1 () {
    console.log('inside f1');
    this.a = 1;
}


function f2 () {
    console.log(this.constructor);
}


function f3 () {
    this.constructor = f2;
}
*/
//////////////////////////////////

//CODE 1
class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    add(point: Point) {
        return new Point(this.x + point.x, this.y + point.y);
    }
}
//////////////////////////////////////////////////////

//CODE 2
class Point3D extends Point {
    z: number;
    constructor(x: number, y: number, z: number) {
        super(x, y);
        this.z = z;
    }
    add(point: Point3D) {
        var point2D = super.add(point);
        return new Point3D(point2D.x, point2D.y, this.z + point.z);
    }
}
//////////////////////////////////////////////////////////////////////////////

//CODE 3
var Point3D_2 = (function (_super) {

    function Point3D(x, y, z) {
        _super.call(this, x, y);
        this.z = z;
    }

    __extends(Point3D, _super);

    Point3D.prototype.add = function (point) {
        var point2D = _super.prototype.add.call(this, point);
        return new Point3D(point2D.x, point2D.y, this.z + point.z);
    };
    return Point3D;
    })(Point);
///////////////////

//CODE 4
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];

    function __() { this.constructor = d; }

    __.prototype = b.prototype;
    
    d.prototype = new __();
};
//////////////////////////////////////

/*
This code shows of inheritence can be implemented internally in JavaScript.
CODE 1 and 2 are ES6 implementation of the class and derived class.

CODE 3 is plain JavaScript implementation of the derived class

CODE 4 is implementation of __extends methos.

CODE 3 - alone needs explanation.


Point3D - is a function , which when called with new should return Point3D object.
It is implemented as a function that takes Point as a arugument and returns a function.
COnstructor from CODE2 is reimplemented as a function Point3D
Then all the members of Point is copied to Point3D + Point3D's prototype and prototype.constructor are setup appropriately.
add method is overwrittern
finally Point3D is returned

Expanding on CODE 4. Main purpose of CODE 4 , is copy the properties on 1 function to another.
Then changing the constructor but not changing prototype is very tricky.
__ function is defined , when it is called it returns a Object with constructor property .
it is used to overwrite the constructor on d.prototype.
in the functions prototype, only useful thing is constructor reference. 
all other things are copied already.

*/

