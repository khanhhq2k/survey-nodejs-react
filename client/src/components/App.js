import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Header = () => {
  return <h2>Header</h2>;
};
const Dashboard = () => {
  return <h2>Dashboard</h2>;
};
const SurveyNew = () => {
  return <h2>SurveyNew</h2>;
};
const Landing = () => {
  return <h2>Landing</h2>;
};

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route path="/" component={Landing} />
            <Route path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
