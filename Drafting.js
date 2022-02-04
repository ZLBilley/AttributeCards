
//drafting table
//keeps players, cards
//keeps track of turn order
//Deal history
//Types of draft
class Draft {

	constructor(Cards, PlayerCount){
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

	IsFinished(){
		return (this.Cards.length < 1); 
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
		for(let i = 0; i<this.Cards.length;i++){
			this.Cards[i].id = i;
		}
		return this.Cards;
	}

	AdvanceTurn(){
		switch(this.DraftType){
			default:return this.AdvanceTurnDefault();
		}
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

class Hand {

}

//methods
// add player
// player take card?

//Player
//cards taken
//attribute ranking?
class Player {
	constructor(id){
		this.Cards = [];
		this.Name = "New Player";
		this.id = id;
	}

	AddCard(Card){
		this.Cards.push(Card);
	}
	TakeCard(){
		return this.Cards.pop();
	}
}

module.exports = {Draft,Player};