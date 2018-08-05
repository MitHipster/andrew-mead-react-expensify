import * as firebase from 'firebase';
import config from './config';
console.log(config);

firebase.initializeApp(config);

const db = firebase.database();

// Fires when a record is added
db.ref('expenses').on('child_added', snapshot => {
	console.log(snapshot.key, snapshot.val());
});

// Fires when a record is changed
db.ref('expenses').on('child_changed', snapshot => {
	console.log(snapshot.key, snapshot.val());
});

// Fires when a record is removed
db.ref('expenses').on('child_removed', snapshot => {
	console.log(snapshot.key, snapshot.val());
});
