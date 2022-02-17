
//drafting table
//keeps players, cards
//keeps track of turn order
//Deal history
//Types of draft
class Draft {

	constructor(Cards, PlayerCount, ExtraCards){
		this.Players = [];

		if(typeof Cards !== "undefined"){
			this.Cards = Cards.map((x)=>x); //Should create a copy of Cards
		}

		this.ActivePlayerIndex = null;

		if(typeof PlayerCount !== "undefined"){

			for(let i=0; i<PlayerCount; i++){
				this.AddPlayer(i);
			}
		}

		if(typeof ExtraCards !== "undefined"){
			this.ExtraCards = ExtraCards;
		} else{
			this.ExtraCards = 0;
		}

		this.DraftType = "standard";
		this.DraftStarted = false;
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
		return this.Cards.splice(Index,1)[0]

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

	AdvanceTurn(){
		if(this.IsFinishing()) {
			this.EndDraft();
			return;
		}
		switch(this.DraftType){
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

	PlayerPicksCard(Player,Card){
		if(this.DraftStarted) {
			switch(this.DraftType) {
				default:return this.PlayerPicksCardDefault(Player,Card);
			}
		}
	}

	PlayerPicksCardDefault(Player,Card){
		if(Player == this.ActivePlayerIndex) {
			this.AdvanceTurn();
			return this.DealCard(Card);
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
}

module.exports = {Draft,Player};