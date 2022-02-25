
//drafting table
//keeps players, cards
//keeps track of turn order
//Deal history
//Types of draft
class Draft {

	constructor(Cards, PlayerCount, PlayerMaxCards){
		this.Players = [];
		this.ActivePlayerIndex = null;
		this.LastPlayerIndices = [];
		this.DraftType = "standard";
		this.DraftStarted = false;

		if(typeof PlayerCount !== "undefined"){

			for(let i=0; i<PlayerCount; i++){
				this.AddPlayer(i);
			}
		}

		if(typeof PlayerMaxCards !== "undefined"){
			this.PlayerMaxCards = PlayerMaxCards;
		} else{

			this.PlayerMaxCards = 3;
		}

		this.MaxTotalCards = this.PlayerMaxCards * this.Players.length;

		if(typeof Cards !== "undefined"){
			this.Cards = Cards.map((x)=>x); //Should create a copy of Cards
			this.ExtraCards = this.Cards.length-this.MaxTotalCards;
		}

		/*
		console.log("Players: "+this.Players.length);
		console.log("PlayerMaxCards: "+this.PlayerMaxCards);
		if(typeof Cards !== "undefined"){
			console.log("Cards: "+this.Cards.length);
		}*/
	}

	AddPlayer(){
		if(this.DraftStarted){
			return;
		} else{
		this.Players.push(new Player(this.Players.length));
		}
	}

	StartDraft(){
		if(this.Players.length > 0){
			this.DraftStarted = true;
			this.AdvanceTurn();
		}
	}

	IsFinishing(){
		return (this.Cards.length-this.ExtraCards < 2); 
	}

	IsFinished(){
		return (this.Cards.length-this.ExtraCards < 1); 
	}

	SetDraftType(DraftType){
		if(this.DraftStarted = false) {
			this.DraftType = DraftType;
		}
	}

	PlayerCount(){
		return this.Players.length;
	}

	DealCard(Index){
		return this.Cards.splice(Index,1)[0];

	}

	CardSelection(PlayerIndex){
		switch(this.DraftType){
			default:return this.CardSelectionDefault(PlayerIndex);
		}
	}

	CardSelectionDefault(PlayerIndex){
		if(PlayerIndex == this.ActivePlayerIndex) {
			for(let i = 0; i<this.Cards.length;i++){
				this.Cards[i].id = i;
			}
			return this.Cards;
		} else {
			return [];
		}
	}

	AdvanceTurn(Player, Card){
		//makes a list for undoing
		if(this.ActivePlayerIndex !== null) {
			this.LastPlayerIndices.push(this.ActivePlayerIndex)
		}
		console.log("Cards left: "+(this.Cards.length-this.ExtraCards) )
		if(this.IsFinished()) {
			this.EndDraft();
			return;
		}
		switch(this.DraftType){
			case "snake":return this.AdvanceTurnSnake();
			case "fewestpoints":return this.AdvanceTurnFewestPoints(Player, Card);
			default:return this.AdvanceTurnDefault();
		}
	}

	EndDraft() {
		this.ActivePlayerIndex = null;
	}

	AdvanceTurnDefault(){
		if (this.ActivePlayerIndex === null){
			this.ActivePlayerIndex = 0;
		} else {
			this.ActivePlayerIndex = (this.ActivePlayerIndex + 1) % this.Players.length;
		}
	}

	AdvanceTurnFewestPoints(Player, Card){
		let PlayersCopy = [];
		for(let P of this.Players){
			if(P.Cards.length<this.PlayerMaxCards){
				if(P.id == Player){
					var AddPoints = Card.Points;
				} else{
					var AddPoints = 0;
				}

				PlayersCopy.push(
						{id:P.id, points:(P.GetPointsHeld()+AddPoints)}
					);

			}
		}
		//console.log("Players: "+PlayersCopy)


		//shuffle them
		PlayersCopy.sort(()=>Math.random()-0.5);

		//sort
		PlayersCopy.sort( (a,b) => (a.points-b.points) );

		/*console.log("Players: "+PlayersCopy)
		let LogOutput = ""
		//for(let P in PlayersCopy){
		for(let i = 0; i< PlayersCopy.length; i++){
			let P = PlayersCopy[i]
			console.log(P)
			LogOutput += "Player "+P.id+" Points held: "+P.points+"\n"
		}
		console.log(
			LogOutput
			);*/
		if(PlayersCopy.length > 0) {
			this.ActivePlayerIndex = PlayersCopy[0].id;	
		} else{
			this.ActivePlayerIndex = null;
		}
			
	}

	AdvanceTurnSnake() { //DOesn't work right with 2 players
		//console.log("Last Players list: "+this.LastPlayerIndices)
		//0 or 1 previous turns, use default
		if(this.LastPlayerIndices.length<=1){
			this.AdvanceTurnDefault();
			return;
		}
		//if we are at the high end
		if(this.LastPlayerIndices.slice(-1) >= this.Players.length-1){
			// if has repeated, go down 1
			if(this.LastPlayerIndices.slice(-1)[0] == this.LastPlayerIndices.slice(-2,-1)[0]) {
				this.ActivePlayerIndex -= 1;
				return;
			} else{ // else repeat
				return;
			}
		}

		//this gets separated out here so that code will work with 2 players
		if(this.LastPlayerIndices.length<=2){ 
			this.AdvanceTurnDefault();
			return;
		}		

		if(this.LastPlayerIndices.slice(-1) <= 0){
			// if has repeated, go up 1
			if(this.LastPlayerIndices.slice(-1)[0] == this.LastPlayerIndices.slice(-2,-1)[0]) {
				this.ActivePlayerIndex += 1;
				return;
			} else{ // else repeat
				return;
			}
		}
		//else continue on path (same interval as last time
		this.ActivePlayerIndex += (this.LastPlayerIndices.slice(-1)-this.LastPlayerIndices.slice(-2,-1));
		return;
	}

	PlayerPicksCard(Player,CardID){ //Need to sort out Player vs PlayerID in variable names for less confusion
		if(this.DraftStarted) {
			switch(this.DraftType) {
				default:return this.PlayerPicksCardDefault(Player,CardID);
			}
		}
	}

	PlayerPicksCardDefault(Player,CardID){
		if(Player == this.ActivePlayerIndex) {
			var CardDealt = this.DealCard(CardID);
			this.AdvanceTurn(Player, CardDealt);
			return CardDealt; 
		}

	}

	Undo() {
		if(this.LastPlayerIndices.length > 0){
			this.ActivePlayerIndex = this.LastPlayerIndices.pop();
			this.Cards.push(this.Players[this.ActivePlayerIndex].GiveCard());
		}
	}


}


class Player {
	constructor(id){
		this.Cards = [];
		if(typeof id !== "undefined"){
			this.Name = "Player "+(id+1);
		} else {
			this.Name = "New Player"
		}
		this.id = id;
	}

	TakeCard(Card){
		this.Cards.push(Card);
	}
	GiveCard(){
		return this.Cards.pop();
	}
	StatList(topN){
		//returns the t
		//defaults to 6
		if(typeof topN !== "undefined"){
			topN = 6;
		}
		return this.AllScores().slice(0,topN);
	}
	AllScores() {
		let vals =[];
		for(let Card of this.Cards) {
			vals.push(Card.High);
			vals.push(Card.Low);
		}
		vals.sort((a,b)=>(b-a));
		return vals;

	}

	GetPointsHeld() {
		let Points = 0;
		if(this.Cards.length < 1){return 0}
		for(let Card of this.Cards){
			Points+=Card.Points;
		}
		return Points;
	}
}

module.exports = {Draft,Player};