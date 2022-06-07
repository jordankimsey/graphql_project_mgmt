//Import components
import Header from "./components/Header";
import Clients from "./components/Clients";
import AddClientModal from "./components/AddClientModal";


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
    <Header />
    <div className='container'>
      <AddClientModal/>
      <Clients />
    </div>
    </ApolloProvider>
   </>
  );
}

export default App;
