//React Router Imports
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

//Import components
import Header from "./components/Header";
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Project from './pages/Project';

//Set up Apollo GraphQL
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';

//fixes cache merge error
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <div className='container'>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/projects/:id' element={<Project/>}/>
              <Route path='*' element={<NotFound/>} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
