var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', function () {
	it('should', () => {
		//store response
		var from = 'Server';
		var text = 'This test was successful.';
		//from match
		var message = generateMessage(from, text);
		//createdAt
		expect(message.createdAt).toBeA('number');
		
		//text match
		expect(message).toInclude({from, text});

		
		
		
		 
	});
});