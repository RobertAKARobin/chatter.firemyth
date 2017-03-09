const express = require('express')
const app = express()

const FirebaseServer = require('firebase-server')
const firebaseServer = new FirebaseServer(5000, 'localhost.firebaseio.test')
firebaseServer.setRules(require('./firebase.rules.json'))

app
	.use('/', express.static('./public'))
	.use('/vendor', express.static('./node_modules'))
	.listen('3000', () => console.log(Date().toLocaleString()))

app
	.get('/test', (req, res) => res.send('hello'))
