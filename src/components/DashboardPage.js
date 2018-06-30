import React from 'react';
import ExpenseListFilters from './ExpenseListFilters';
import ExpenseList from './ExpenseList';

const DashboardPage = () => (
	<div>
		<ExpenseListFilters />
		<ExpenseList />
	</div>
);

export default DashboardPage;
