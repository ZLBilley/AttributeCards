const Draft = require('./Drafting');


test('Make sure Player makes a "New Player"', 
	() =>{
	expect( 
			(new Draft.Player()).Name
		).toBe("New Player")
	}
);

