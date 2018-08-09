import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import db from '../../firebase/firebase';
import {
	addExpense,
	startAddExpense,
	editExpense,
	startEditExpense,
	removeExpense,
	startRemoveExpense,
	setExpenses,
	startSetExpenses
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';

const createMockStore = configureMockStore([thunk]);
const uid = 'this_is_the_test_uid';
const defaultAuthState = { auth: { uid } };

beforeEach(done => {
	const expensesData = {};
	expenses.forEach(({ id, description, note, amount, createdAt }) => {
		expensesData[id] = { description, note, amount, createdAt };
	});
	db.ref(`users/${uid}/expenses`)
		.set(expensesData)
		.then(() => done());
});

test('should setup add expense action object with provided values', () => {
	const action = addExpense(expenses[2]);
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: expenses[2]
	});
});

// Added done parameter to make test wait for asynchronous call to complete
test('should add expense to database and store', done => {
	const store = createMockStore(defaultAuthState);
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

			return db
				.ref(`users/${uid}/expenses/${actions[0].expense.id}`)
				.once('value');
		})
		.then(snapshot => {
			expect(snapshot.val()).toEqual(expenseData);
			done();
		});
});

test('should add expense with defaults to database and store', done => {
	const store = createMockStore(defaultAuthState);
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

			return db
				.ref(`users/${uid}/expenses/${actions[0].expense.id}`)
				.once('value');
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

test('should edit expense from Firebase', done => {
	const store = createMockStore(defaultAuthState);
	const id = expenses[0].id;
	const updates = { amount: 21095 };
	store
		.dispatch(startEditExpense(id, updates))
		.then(() => {
			const actions = store.getActions();
			expect(actions[0]).toEqual({
				type: 'EDIT_EXPENSE',
				id,
				updates
			});
			return db.ref(`users/${uid}/expenses/${id}`).once('value');
		})
		.then(snapshot => {
			expect(snapshot.val().amount).toBe(updates.amount);
			done();
		});
});

test('should setup remove expense action object', () => {
	const action = removeExpense({ id: '123abc' });
	expect(action).toEqual({
		type: 'REMOVE_EXPENSE',
		id: '123abc'
	});
});

test('should remove expense from Firebase', done => {
	const store = createMockStore(defaultAuthState);
	const id = expenses[2].id;
	store.dispatch(startRemoveExpense({ id })).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'REMOVE_EXPENSE',
			id
		});
		return db
			.ref(`users/${uid}/expenses/${id}`)
			.once('value')
			.then(snapshot => {
				expect(snapshot.val()).toBeFalsy();
				done();
			});
	});
});

test('should setup set expense action object with data', () => {
	const action = setExpenses(expenses);
	expect(action).toEqual({
		type: 'SET_EXPENSES',
		expenses
	});
});

test('should fetch the expenses from Firebase', done => {
	const store = createMockStore(defaultAuthState);
	store.dispatch(startSetExpenses()).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'SET_EXPENSES',
			expenses
		});
		done();
	});
});
