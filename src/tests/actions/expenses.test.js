import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import db from '../../firebase/firebase';
import {
	startAddExpense,
	addExpense,
	editExpense,
	removeExpense
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';

const createMockStore = configureMockStore([thunk]);

test('should setup add expense action object with provided values', () => {
	const action = addExpense(expenses[2]);
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: expenses[2]
	});
});

// Added done parameter to make test wait for asynchronous call to complete
test('should add expense to database and store', done => {
	const store = createMockStore({});
	const expenseData = {
		description: 'Mouse',
		amount: 3000,
		note: 'Used magic mouse',
		createdAt: 1000000
	};
	store
		.dispatch(startAddExpense(expenseData))
		.then(() => {
			const actions = store.getActions();
			expect(actions[0]).toEqual({
				type: 'ADD_EXPENSE',
				expense: {
					id: expect.any(String),
					...expenseData
				}
			});

			return db.ref(`expenses/${actions[0].expense.id}`).once('value');
		})
		.then(snapshot => {
			expect(snapshot.val()).toEqual(expenseData);
			done();
		});
});

test('should add expense with defaults to database and store', done => {
	const store = createMockStore({});
	const expenseDefaults = {
		description: '',
		amount: 0,
		note: '',
		createdAt: 0
	};
	store
		.dispatch(startAddExpense({}))
		.then(() => {
			const actions = store.getActions();
			expect(actions[0]).toEqual({
				type: 'ADD_EXPENSE',
				expense: {
					id: expect.any(String),
					...expenseDefaults
				}
			});

			return db.ref(`expenses/${actions[0].expense.id}`).once('value');
		})
		.then(snapshot => {
			expect(snapshot.val()).toEqual(expenseDefaults);
			done();
		});
});

test('should setup edit expense action object', () => {
	const action = editExpense('123abc', {
		description: 'Test bill',
		amount: 12350,
		note: 'Test note'
	});
	expect(action).toEqual({
		type: 'EDIT_EXPENSE',
		id: '123abc',
		updates: {
			description: 'Test bill',
			amount: 12350,
			note: 'Test note'
		}
	});
});

test('should setup remove expense action object', () => {
	const action = removeExpense({ id: '123abc' });
	expect(action).toEqual({
		type: 'REMOVE_EXPENSE',
		id: '123abc'
	});
});
