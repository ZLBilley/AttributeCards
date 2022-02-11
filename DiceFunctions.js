function d6() {
  return Math.floor(Math.random()*6)+1;
}

function dN(N) {
    return Math.floor(Math.random()*N)+1;
}

function sum(Nums) {
    //sums a list with anything that isn't a number type being zeroed out
    let zeroNaNs = l => typeof l === 'number' ? l : 0;
    return Nums.reduce(
        (a,b) => zeroNaNs(a) + zeroNaNs(b)
    );
}

function xdykz(x,y,z) {
  var Rolls = new Array()
  for (let i = 0; i<x; i++) {
    Rolls.push(dN(y));
  }
    Rolls.sort();
    Rolls.reverse();
    return Rolls.slice(0,z);
}


//Some relatively common roll methods
function dl4d6() {
    return sum(xdykz(4,6,3));
}

function r3d6() {
    return sum(xdykz(3,6,3));
}

function r2d6p6() {
    return sum(xdykz(2,6,2))+6;
}

function dl5d6() {
    return sum(xdykz(5,6,3));
}


function RollMethod(rollMethod) {
    switch(rollMethod) {
        case "r3d6": return r3d6;
        case "r2d6p6": return r2d6p6;
        case "dl5d6": return dl5d6;
        default: return dl4d6;
    }
}

module.exports = {dN,sum,xdykz};