var expect = require('expect');

const {realString} = require('./validate');

describe('realString', function () {
	it('should reject bad strings', function (){
		//store response
		var response = realString(47);
		expect(response).toBe(false);

	});
	it('should reject just spaces', function (){
		var response = realString('   ');
		expect(response).toBe(false);
	});

	it('should allow characters', function (){
		var response = realString(' cs313  ');
		expect(response).toBe(true);
	});
	
});