
//drafting table
//keeps players, cards
//keeps track of turn order
//Deal history
//Types of draft
class Draft {

	constructor(Cards, PlayerCount){
		this.Players = [];
		this.Cards = Cards;
		this.ActivePlayerIndex = null;

		if(typeof PlayerCount !== "undefined"){

			for(let i=0; i<PlayerCount; i++){
				this.AddPlayer();
			}
		}

		this.DraftType = "standard";
		this.DraftStarted = false;
	}

	AddPlayer(){
		if(this.DraftStarted){
			return;
		} else{
		this.Players.push(new Player());
		}
	}

	StartDraft(){
		if(this.Players.length > 0){
			this.DraftStarted = true;
		}
	}

	PlayerCount(){
		return this.Players.length;
	}

	DealCard(Index){
		return this.Cards.splice(Index)

	}

	CardSelection(PlayerIndex){
		switch(this.DraftType){
			default:return CardSelectionDefault(PlayerIndex);
		}
	}

	CardSelectionDefault(PlayerIndex){
		let Indexing = [...Array(this.Cards.length).keys()];
		return [this.Cards, Indexing];
	}

	AdvanceTurn(){
		switch(this.DraftType){
			default:return AdvanceTurnDefault(PlayerIndex);
		}
	}

	AdvanceTurnDefault(){
		if (this.ActivePlayerIndex === null){
			this.ActivePlayerIndex = 0;
		} else {
			this.ActivePlayerIndex = (this.ActivePlayerIndex + 1) % this.Players.length;
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
	constructor(){
		this.Cards = [];
		this.Name = "New Player";
	}

	AddCard(Card){
		this.Cards.push(Card);
	}
	TakeCard(){
		return this.Cards.pop();
	}
}

module.exports = {Draft,Player};