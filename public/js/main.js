'use strict';

document.addEventListener('DOMContentLoaded', function(){
	var root = firebase.database().ref('/');
	root.on('value', function(snapshot){
		console.log(snapshot.numChildren());
	});
});
