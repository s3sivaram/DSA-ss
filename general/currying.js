// Learning notes on Currying in Javascript.

/*
const addtob = (a) => (b) => a + b;
let add3tob = addtob(3);
console.log(add3tob);
console.log(add3tob(5));

*/

function infinitecurry(a) {
  return function (b) {
    console.log(a, b);
    if (b) return infinitecurry(a + b);
    console.log("after if");
    return a;
  };
}

// let r = infinitecurry(1);
// let r = infinitecurry(1)(2);
// r = infinitecurry(1)(2)(4)(5);
// console.log(r());
// let r = infinitecurry(1)(2)(3)(6);

// console.log(r());

/*----------------------------------------------------------
  Converting a normal function to a  curryed function:
  e.g:
  const sum = (a, b, c) => console.log(a + b + c);   
               ====> to 
      const totalsum = curry(sum);
      totalsum(1)(2)(3);
  
  
  - curry is a function that takes in a function (e.g: function sum )as an argument.
  - It returns a function that will take the parameters of the function sum.
  - until it receives all the parameters needed for the function sum, it will keep returning
    a function that will be accepting the parameters for function sum.
  - when it has received all the requried no of parameters for function sum, it will pass those 
    to the function sum and execute function sum.
  
  
  
  
  --------------------------------------------------------------*/

function curry(func) {
  return function curriedfunc(...args) {
    // console.log("args,args.length", args, args.length);
    if (args.length >= func.length) {
      return func(...args);
    } else {
      // console.log("calling func");
      return function (...next) {
        // console.log("next=", next);
        return curriedfunc(...args, ...next);
      };
    }
  };
}

const sum = (a, b, c) => console.log(a + b + c);

const totalsum = curry(sum);

// console.log(totalsum);
// totalsum(1);
// console.log(totalsum(1)(2));
// totalsum(1)(2)(3);

// ----------------currying-----------------

// ------------ss curry

let smallfn = (a, b) => a + b;

let smallfncurried = (smallfn) => {
  return function tempcurryfn(...args) {
    if (args.length >= smallfn.length) {
      return smallfn(...args);
    } else {
      return (...next) => {
        return tempcurryfn(...args, ...next);
      };
    }
  };
};

let r = smallfncurried(smallfn);
let res = r(1)(2);
// console.log(res);
// ----------------------
