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
		"Running through numbers %i with default one to one point buy",
		(a) => {
			expect((new Stats.PointBuySystem()).GetPoints(a)
				).toBe(a)
		}

	)

test('Make sure n returns n with D&D 3.5 with high vals', 
	() =>{
	expect( 
			(new Stats.PointBuySystem("DD35")).GetPoints(17)
		).toBe(13)
	}
);

test('Make sure GetAveragePointValue averages 1 through 4 to 2.5', 
	() =>{
	let s = new Stats.CardMaker();
	expect( 
			s.GetAveragePointValue([1,2,3,4])
		).toBeCloseTo(2.5)
	}
);

test('Make sure GetAveragePointValue accepts pathfinder 1e point buy system', 
	() =>{
	let s = new Stats.CardMaker();
	s.UsePointBuySystem("PF1E_f")
	expect( 
			s.GetAveragePointValue([5,4,3,4])
		).toBeCloseTo(-4)
	}
);

test('Make sure GetAveragePointValue accepts pathfinder 1e point buy system', 
	() =>{
	let s = new Stats.CardMaker();
	s.UsePointBuySystem("PF1E")
	expect( 
			s.GetAveragePointValue([8,7,6])
		).toBeCloseTo(-4)
	}
);


test('Make sure GetAveragePointValue accepts D&D 3.5 point buy system', 
	() =>{
	let s = new Stats.CardMaker();
	s.UsePointBuySystem("DD35")
	expect( 
			s.GetAveragePointValue([8,7,6])
		).toBeCloseTo(-1)
	}
);
