import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Expense} from "./component/expense/expense";
import {BudgetDay} from "./component/budget/budgetDay";


export class RouterComponent extends React.Component {

    render() {
        const { history } = this.props
        return <Router>
            <Switch>
                <Route history={history} path='/expense/new' render={(props) => (
                    <Expense {...props} createMode={true}/>)}
                />
                <Route history={history} path='/expense/:id' render={(props) => (
                    <Expense {...props} createMode={false}/>)}
                />
                <Route history={history} path='/budget/day' render={(props) => (
                    <BudgetDay {...props} />)}
                />
            </Switch>
        </Router>;
    }
}