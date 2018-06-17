import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const ExpenseDashboardPage = () => <div>This is my dashboard component.</div>;
const AddExpensePage = () => <div>This is my add expense component.</div>;
const EditExpensePage = () => <div>This is my edit expense component.</div>;
const HelpPage = () => <div>This is my help component.</div>;

const routes = (
	<Router>
		<div>
			<Route exact path="/" component={ExpenseDashboardPage} />
			<Route path="/create" component={AddExpensePage} />
			<Route path="/edit" component={EditExpensePage} />
			<Route path="/help" component={HelpPage} />
		</div>
	</Router>
);

ReactDOM.render(routes, document.getElementById('app'));
