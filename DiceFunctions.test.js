//For dN()
const Dice = require('./DiceFunctions');
const ManyRolls = 1000 
//Some of these tests are technically nondeterministic, but with a number of rolls 1000+ the probability of a false negative is much smaller than 10^(-100)

// Roll a bunch of dice an make sure none are out of range
test('Roll a bunch ('+String(ManyRolls)+') of dice an make sure none are out of range',
	() => {
		expect(
			[...Array(ManyRolls)].map(() => Dice.dN(4)).every(x => 
				x > 0 && x < 5
			)
		).toBe(true)
	}
);

// Make sure a ton of coinflips have at least one heads and one tails
test('Make sure a ton of coinflips have at least one heads and one tails',
	() => {
		expect(
			(new Set(
					[...Array(ManyRolls)].map( () => Dice.dN(2) )
				)).has(1)
			&&
			(new Set(
					[...Array(ManyRolls)].map( () => Dice.dN(2) )
				)).has(2)
		).toBe(true)
	}
);

//Better versions of above
test('Make sure a ton of coinflips have at least one heads',
	() => {
		expect(
			[...Array(ManyRolls)].map( () => Dice.dN(2) )
		).toContain(2)
	}
);

test('Make sure a ton of coinflips have at least one tails',
	() => {
		expect(
			[...Array(ManyRolls)].map( () => Dice.dN(2) )
		).toContain(1)
	}
);

//sum
test('Does 1+2+potato == 3?',
	() => {
		expect(
			Dice.sum([1,2,"potato"])
		).toBe(3)
	}
);

test('Can we sum all numbers from 0 to 100?',
	() => {
		expect(
			Dice.sum([...Array(101).keys()])
		).toBe(5050)
	}
);

test('Will strings that contain integers be ignored?',
	() => {
		expect(
			Dice.sum([1,2,'3'])
		).toBe(3)
	}
);

//for xdykz

test('Make sure we are keeping the right number of rolls',
	() => {
		expect(
			Dice.xdykz(ManyRolls,6,8).length
		).toBe(8)
	}
);

test('Make sure we are keeping the highest rolls, basically best of '+String(ManyRolls)+' coinflips',
	() => {
		expect(
			Dice.xdykz(ManyRolls,2,1)[0]
		).toBe(2)
	}
);
