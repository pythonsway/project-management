import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Project from './pages/Project';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge: false,
        },
        projects: {
          merge: false,
        },
      },
    }
  },
});

const client = new ApolloClient({
  uri: process.env.REACT_APP_SERVER_URI,
  cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <div className="container-md">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects/:id" element={<Project />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <div className="text-center mt-5">
              <p> by <a href="https://pythonsway.it" target="_blank" rel="noopener noreferrer">Python&#39;s way</a></p>
            </div>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
