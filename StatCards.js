function IntegerDescending(a, b) {
   return b-a;
}
function IntegerAscending(a, b) {
   return a-b;
}

class CardPool {
    constructor(Rolls) {
        let N = Rolls.length/2;
        
        //sort rolls
        Rolls.sort(IntegerDescending);
        
        this.Highs = Rolls.slice(0,N);
        Rolls.reverse();
        this.Lows = Rolls.slice(0,N);
        Rolls.reverse();
        
        this.Pairings = {
            "straight":this.PairStraight,
            //"jitter":this.PairJitter
        };
        
        this.CardList = this.PairStraight(this.Highs, this.Lows);
    }
    
    PairStraight(High, Low) {
        High.sort(IntegerDescending);
        Low.sort(IntegerAscending);
        var PairPool = [];
        for (let i = 0; i<High.length; i++) {
            PairPool.push([High[i],Low[i]]);
        }
        return PairPool;
    }    
        
    Pool(Type) {
        if (typeof Type !== "undefined"){
            this.CardList = this.Pairings[Type](this.Highs,this.Lows);
        }
        return this.CardList;
    }
    
    Deal(){
        //"deals" attribute pairs as a list of objects
        // objects have high, low, and value
        var PairPool = [];
        for (let i = 0; i<this.Highs.length; i++) {
            PairPool.push({
                "High":this.Highs[i],
                "Low":this.Lows[i],
                "id":i
            });
        }
        return PairPool;
    }
}

class CardMaker {
    constructor() {
        this.Roll = dl4d6;
        this.PointBuyConstraint = false;
        this.PointBuy = 25;
        
        this.PartySize = 4;
        this.AttrsPerCharacter = 6;
        this.BonusRolls = 0;
    }
    
    RollPool() {
        if(this.PointBuyConstraint) {
            alert("This feature has not been implemented yet");
            return;
        } else {
            return this.RollPoolStd();
        }
    }
    
    RollPoolBasic() {
        let TotalRolls = (
            this.PartySize *
            this.AttrsPerCharacter +
            this.BonusRolls
        )
        var Rolls = [];
        for (let i = 0; i<TotalRolls; i++) {
            Rolls.push(this.Roll());
        }
        return Rolls;
    }
    
    RollPoolStd() {
        let TotalRolls = (
            this.PartySize *
            this.AttrsPerCharacter +
            this.BonusRolls
        )
        var Rolls = [];
        for (let i = 0; i<TotalRolls; i++) {
            Rolls.push(this.Roll());
        }
        return new CardPool(Rolls);
    }
            
}