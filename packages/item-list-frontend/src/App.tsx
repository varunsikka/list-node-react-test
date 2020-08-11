import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import ListModule from './modules/list';


function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/:id">
            <LoadList />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

function LoadList() {
  let { id } = useParams();

  return <ListModule _id={id} />
}

export default App;
