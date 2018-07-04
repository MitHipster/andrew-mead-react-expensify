import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
	const state = expensesReducer(undefined, { type: '@@INIT' });
	expect(state).toEqual([]);
});

test('should add an expense', () => {
	const expense = {
		id: '99',
		description: 'Test Expense',
		note: 'Test note',
		amount: 5000,
		createdAt: 100000
	};
	const action = {
		type: 'ADD_EXPENSE',
		expense
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([...expenses, expense]);
});

test('should remove expense by id', () => {
	const action = {
		type: 'REMOVE_EXPENSE',
		id: expenses[1].id
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expenses if id not found', () => {
	const action = {
		type: 'REMOVE_EXPENSE',
		id: '-1'
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual(expenses);
});

test('should edit expense by id', () => {
	const updates = {
		description: 'Rent Paid',
		note: 'Test note',
		amount: 100000
	};
	const action = {
		type: 'EDIT_EXPENSE',
		id: expenses[1].id,
		updates
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([
		expenses[0],
		{ ...expenses[1], ...updates },
		expenses[2]
	]);
});

test('should not edit expenses if id not found', () => {
	const updates = {
		description: 'Rent Paid',
		note: 'Test note',
		amount: 100000
	};
	const action = {
		type: 'EDIT_EXPENSE',
		id: '-1',
		updates
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual(expenses);
});
