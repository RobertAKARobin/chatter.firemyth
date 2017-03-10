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
		list.convos = [];
		list.events = defineDOMEvents(list);
		list.ref.on('child_added', function(snapshot, previousKey){
			list.convos.push(snapshot.val());
			m.redraw();
		});
	}
	var defineDOMEvents = function($instance){
		var list = $instance;
		var events = {};
		events.push = function(event){
			event.redraw = false;
			if(event.keyCode == 13){
				list.ref.push(event.currentTarget.value);
				event.currentTarget.value = '';
			}
		}
		return events;
	}

	$instance.view = function(){
		var list = this;
		return m('ul', [
			m('li', [
				m('input', {
					onkeyup: list.events.push
				})
			]),
			list.convos.map(function(convo){
				return m('li', convo)
			})
		])
	}

	return $Class;
})();

document.addEventListener('DOMContentLoaded', function(){
	var convoList = ConvoList.load();
	m.route.prefix('#!');
	m.route(document.getElementById('app'), '/', {
		'/': convoList
	});
});
