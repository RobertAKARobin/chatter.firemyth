'use strict';

var ConvoList = (function(){
	var $Class = {};
	var $instance = {};

 	$Class.base = firebase.database();
	$Class.load = function(){
		var list = Object.create($instance);
		construct.apply(list, arguments);
		return list;
	}

	var construct = function(){
		var list = this;
		list.ref = ConvoList.base.ref('/convos');
		list.db = defineDBEvents(list);
		list.ref.on('value', list.db.onChange);
	}
	var defineDBEvents = function($instance){
		var list = $instance;
		var db = {};
		db.onChange = function(snapshot){
			console.log(snapshot.val());
		}
		return db;
	}

	return $Class;
})();

document.addEventListener('DOMContentLoaded', function(){
	var convoList = ConvoList.load();

	m.mount(document.getElementById('app'), {
		view: function(){
			return m('h2', 'Mitrhil.js');
		}
	});
});
