class Car {
    constructor(){
        this.color = 'BLACK';
        this.seats = 4;
    }
}

//Class just creates a function that can create an Object based on default prototype and adds methods and Props on it.
//_proto_ of a object defined by class has a empty Object.
// Only way to change the prototype is by assigning a Object to Prototype or adding props.


 Car.prototype.TYPE = 'GAS';

class BigCar extends Car {
    constructor(seats) {
        super();
        this.seats = seats;
        this.range = 1000;
        this.driven = 0;
    }

    getRemainingMilage(){
        return this.range - this.driven;
    }

    updateDriven(driven) {
        this.driven  = driven;
    }
}


// WHEN extending , the prototype of extended class is an Object whose proto is prototype of the base class.
// All the methods and properties of base are copied over to the child

c = new Car();
bc = new BigCar(10);

Object.getPrototypeOf(c);

console.log(Object.getPrototypeOf(c));

Object.getPrototypeOf(bc);

bc.updateDriven(100);

bc.hasOwnProperty('TYPE');

pobc = Object.getPrototypeOf(bc);

Object.getPrototypeOf(pobc);

Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(bc)))

//hasOwnProperty includes inherited property and excludes those coming from prototype

//when extending a base class , all the methods in base class are added to the child class
//base class prototype is assigned to child class
/////////////////////////////////////////////////////////////////
class Foo {
    get [Symbol.toStringTag]() {
      return 'bar';
    }
  }
  
  class Bar {}
  
  const baz = Object.create(null, { [Symbol.toStringTag]: { value: 'foo' } });
  
  util.inspect(new Foo()); // 'Foo [bar] {}'
  util.inspect(new Bar()); // 'Bar {}'
  util.inspect(baz);       // '[foo] {}'