function d6() {
  return Math.floor(Math.random()*6)+1;
}

function dN(N) {
    return Math.floor(Math.random()*N)+1;
}

function sum(Nums) {
    let zeroNaNs = l => isNaN(l) ? 0 : l;
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
