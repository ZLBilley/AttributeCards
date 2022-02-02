
//drafting table
//keeps players, cards
//keeps track of turn order
//Deal history
//Types of draft
class Draft {
	constructor(Cards, PlayerCount){
		this.Players = [];
		this.Cards = Cards;
		if(typeof Type !== "undefined"){

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
		this.DraftStarted = true;
	}

	PlayerCount(){
		return this.Players.length;
	}
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
}

module.exports = {Draft,Player};