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
const TestCardList = [[1,2],[3,4],[5,-1]];

test('See if adding two players gives you a player count of 2', 
	() =>{

	let D = new Draft.Draft();
	D.AddPlayer();
	D.AddPlayer();
	expect( 
			D.PlayerCount()
		).toBe(2)
	}
);

test('Does passing PlayerCount 2 actually result in two players?', 
	() =>{

	let D = new Draft.Draft(TestCardList,2);
	expect( 
			D.PlayerCount()
		).toBe(2)
	}
);



test('Does Draft.Cards get initialized properly?', 
	() =>{

	let D = new Draft.Draft(TestCardList,2);
	expect( 
			D.Cards
		).toStrictEqual(TestCardList)
	}
);

test('Does initially starting the draft on default select the first player?', 
	() =>{

	let D = new Draft.Draft(TestCardList,2);
	D.StartDraft();
	expect( 
			D.ActivePlayerIndex
		).toBe(0)
	}
);

test('Does Draft.AdvanceTurn actually advance?', 
	() =>{

	let D = new Draft.Draft(TestCardList,2);
	D.StartDraft();
	D.AdvanceTurn();
	expect( 
			D.ActivePlayerIndex
		).toBe(1)
	}
);

test('Does Advance Turn loop back appropriately?', 
	() =>{

	let D = new Draft.Draft(TestCardList,2);
	D.StartDraft();
	D.AdvanceTurn();
	D.AdvanceTurn();
	expect( 
			D.ActivePlayerIndex
		).toBe(0)
	}
);

test('Does it create problems modifying TestCardList?', 
	() =>{

	let D = new Draft.Draft(TestCardList,2);
	D.StartDraft();
	D.PlayerPicksCard(0,1)
	expect( 
			TestCardList
		).toStrictEqual([[1,2],[3,4],[5,-1]])
	}
);

test('Can it deal a card correctly?', 
	() =>{
	let D = new Draft.Draft(TestCardList,2);
	console.log("Hmm: "+D.Cards[1])
	expect( 
			D.DealCard(1)
		).toStrictEqual([3,4])
	}
);


test('Will the right player get a card?', 
	() =>{

	let D = new Draft.Draft(TestCardList,2);
	D.StartDraft();
	expect( 
			D.PlayerPicksCard(0,1)
		).toStrictEqual(TestCardList[1])
	}
);

test('Will the wrong player not get a card?', 
	() =>{

	let D = new Draft.Draft(TestCardList,2);
	D.StartDraft();
	expect( 
			D.PlayerPicksCard(1,1)
		).toStrictEqual(undefined)
	}
);


test('Are the remaining cards correct after dealing?', 
	() =>{

	let D = new Draft.Draft(TestCardList,2);
	D.StartDraft();
	D.PlayerPicksCard(0,1)
	expect( 
			D.Cards
		).toStrictEqual([[1,2],[5,-1]])
	}
);
