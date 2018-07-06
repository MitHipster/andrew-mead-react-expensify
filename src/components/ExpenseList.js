import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

// Export as a named, unconnected version to use for testing with random test data
export const ExpenseList = props => (
	<div>
		{props.expenses.length === 0 ? (
			<p>No Expenses</p>
		) : (
			props.expenses.map((expense, i) => (
				<ExpenseListItem key={expense.id} {...expense} />
			))
		)}
	</div>
);

const mapStateToProps = state => {
	return {
		expenses: selectExpenses(state.expenses, state.filters)
	};
};

export default connect(mapStateToProps)(ExpenseList);
