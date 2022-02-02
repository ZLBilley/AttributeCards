const Draft = require('./Drafting');


test('Make sure Player makes a "New Player"', 
	() =>{
	expect( 
			(new Draft.Player()).Name
		).toBe("New Player")
	}
);

test('Does adding a card work?', 
	() =>{

	let D = new Draft.Player();
	D.AddCard([1,2]);
	expect( 
			D.Cards[0]
		).toStrictEqual([1,2])
	}
);


test('Does taking a card return the card?', 
	() =>{

	let D = new Draft.Player();
	D.AddCard([1,2]);
	expect( 
			D.TakeCard()
		).toStrictEqual([1,2])
	expect( 
			D.Cards
		).toStrictEqual([])
	}
);

test('Does taking the last card leave the list empty?', 
	() =>{

	let D = new Draft.Player();
	D.AddCard([1,2]);
	D.TakeCard();
	expect( 
			D.Cards
		).toStrictEqual([])
	}
);

//
test('Does ', 
	() =>{

	let D = new Draft.Draft();
	D.AddPlayer();
	D.AddPlayer();
	expect( 
			D.PlayerCount()
		).toBe(2)
	}
);