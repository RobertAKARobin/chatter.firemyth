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
		list.events = defineDOMEvents(list);
		list.ref.on('value', list.db.onChange);
	}
	var defineDBEvents = function($instance){
		var list = $instance;
		var db = {};
		db.onChange = function(snapshot){
			console.log(JSON.stringify(snapshot.val()));
		}
		return db;
	}
	var defineDOMEvents = function($instance){
		var list = $instance;
		var events = {};
		events.push = function(event){
			if(event.keyCode == 13){
				list.ref.push(event.currentTarget.value);
			}
		}
		return events;
	}

	$instance.view = function(){
		var list = this;
		return m('input', {
			onkeyup: list.events.push
		});
	}

	return $Class;
})();

document.addEventListener('DOMContentLoaded', function(){
	var convoList = ConvoList.load();
	m.mount(document.getElementById('app'), convoList);
});
