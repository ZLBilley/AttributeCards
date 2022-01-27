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

function dl4d6() {
    return sum(xdykz(4,6,3));
}

module.exports = {dN,sum,xdykz};