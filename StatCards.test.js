const Stats = require('./StatCards');
const StandardStatSpread = [...Array(16).keys()].map(l => l+2) //Gives the numbers 3-18 (possible rolls for D&D stats)


//PointBuy testing
test('Make sure n returns n at default', 
	() =>{
	expect( 
			(new Stats.PointBuySystem()).GetPoints(5)
		).toBe(5)
	}
);


test('Make sure n returns n with D&D 3.5', 
	() =>{
	expect( 
			(new Stats.PointBuySystem("DD35")).GetPoints(3)
		).toBe(-5)
	}
);

test('Make sure n returns n with D&D 3.5 with high vals', 
	() =>{
	expect( 
			(new Stats.PointBuySystem("DD35")).GetPoints(17)
		).toBe(13)
	}
);

test.each(
		StandardStatSpread
	)
	(
		"Running through numbers %i default",
		(a) => {
			expect((new Stats.PointBuySystem()).GetPoints(a)
				).toBe(a)
		}

	)

