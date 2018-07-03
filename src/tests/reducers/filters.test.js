import moment from 'moment';
import filtersReducer from '../../reducers/filters';

test('should setup default filter values', () => {
	const state = filtersReducer(undefined, { type: '@@INT' });
	expect(state).toEqual({
		text: '',
		sortBy: 'date',
		startDate: moment().startOf('month'),
		endDate: moment().endOf('month')
	});
});

test('should set text filter', () => {
	const text = 'water';
	const action = {
		type: 'SET_TEXT_FILTER',
		text
	};
	const state = filtersReducer(undefined, action);
	expect(state.text).toBe('water');
});

test('should set sort by to amount', () => {
	const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });
	expect(state.sortBy).toBe('amount');
});

test('should set sort by to date', () => {
	const currentState = {
		text: '',
		startDate: undefined,
		endDate: undefined,
		sortBy: 'amount'
	};
	const action = { type: 'SORT_BY_DATE' };
	const state = filtersReducer(currentState, action);
	expect(state.sortBy).toBe('date');
});

test('should set start date', () => {
	const startDate = moment();
	const action = {
		type: 'SET_START_DATE',
		startDate
	};
	const state = filtersReducer(undefined, action);
	expect(state.startDate).toEqual(startDate);
});

test('should set end date', () => {
	const endDate = moment();
	const action = {
		type: 'SET_END_DATE',
		endDate
	};
	const state = filtersReducer(undefined, action);
	expect(state.endDate).toEqual(endDate);
});
