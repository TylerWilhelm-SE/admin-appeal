const expect = require('expect');

const {Users} = require('./user');

describe('Users', function (){
	var users;
	beforeEach (function(){
		users = new Users();
		users.users = [{
			id: '1',
			user: 'Bro Burton',
			group: '2'
		},
		{
			id: '2',
			user: 'Tyler',
			group: '2'
		},
		{
			id: '3',
			user: 'Connor',
			group: '2'
		}];
	});

	it('should add user', function (){
		var users = new Users();
		var appellant = {
			id: '',
			user: '',
			group: ''

		};
		var responseUser = users.addAppellant(appellant.id, appellant.user, appellant.group);
	
		expect(users.users).toEqual([appellant]);
	});
	it('should return group users', function(){
		var appellantList = users.getAppellantList(`${group}`);
		expect(appellantList).toEqual(`${user}`);
	})
});