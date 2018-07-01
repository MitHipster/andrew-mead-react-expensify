import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('should setup add expense action object with provided values', () => {
	const expenseData = {
		description: 'Test bill',
		note: 'Test note',
		amount: 110000,
		createdAt: 1000
	};
	const action = addExpense(expenseData);
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			...expenseData,
			id: expect.any(String)
		}
	});
});

test('should setup add expense action object with default values', () => {
	const action = addExpense();
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			id: expect.any(String),
			description: '',
			note: '',
			amount: 0,
			createdAt: 0
		}
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
