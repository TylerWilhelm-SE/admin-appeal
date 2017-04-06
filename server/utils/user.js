[{
	id: '',
	user: '',
	group: ''

}]

class Users{
	constructor (){
		this.users = [];
	}
	addAppellant (id, user, group){
		var appellant ={id, user, group};
		this.users.push(appellant);
		return appellant;
	}
	removeAppellant (id){
		//return removed user
		var appellant = this.getAppellant(id);
		if(appellant){
			this.users = this.users.filter(function(appellant){
				appellant.id !== id;
			});
		}
		return appellant;
	}
	getAppellant(id){
		return this.users.filter(function (appellant){
			appellant.id === id})[0]
		
	}
	getAppellantList(group){
		var users = this.users.filter(function(appellant){
			return appellant.group === group;
		});
		var userArray = users.map(function (appellant){
			return appellant.user;
		});
		return userArray;
	}
}

module.exports = {Users};

