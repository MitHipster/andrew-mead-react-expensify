import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, NavLink, Link } from 'react-router-dom';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const ExpenseDashboardPage = () => <div>This is my dashboard component.</div>;
const AddExpensePage = () => <div>This is my add expense component.</div>;
const EditExpensePage = () => <div>This is my edit expense component.</div>;
const HelpPage = () => <div>This is my help component.</div>;
const NotFoundPage = () => (
	<div>
		404 - <Link to="/">Go Home</Link>
	</div>
);
const Header = () => (
	<header>
		<h1>Expensify</h1>
		<NavLink exact to="/" activeClassName="is-active">Dashboard</NavLink>
		<NavLink to="/create" activeClassName="is-active">Create Expense</NavLink>
		<NavLink to="/edit" activeClassName="is-active">Edit Expense</NavLink>
		<NavLink to="/help" activeClassName="is-active">Help</NavLink>
	</header>
);

const routes = (
	<Router>
		<div>
			<Header />
			<Switch>
				<Route exact path="/" component={ExpenseDashboardPage} />
				<Route path="/create" component={AddExpensePage} />
				<Route path="/edit" component={EditExpensePage} />
				<Route path="/help" component={HelpPage} />
				<Route component={NotFoundPage} />
			</Switch>
		</div>
	</Router>
);

ReactDOM.render(routes, document.getElementById('app'));
