import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';

import ClientRow from './ClientRow';
import Search from './Search';
import Spinner from './Spinner';

const GET_CLIENTS = gql`
  query GetClients {
    clients {
      id
      name
      email
      phone
    }
  }
`;

export default function Clients() {
  const [searchName, setSearchName] = useState('');
  const { loading, error, data } = useQuery(GET_CLIENTS);

  const handleSearch = (value) => {
    setSearchName(value);
  };

  if (loading) return <Spinner />;
  if (error) return <p>Error...</p>;

  return (
    <>
      <div className="table-responsive vh-30">
        <table className="table table-hover h-10">
          <thead>
            <tr>
              <th>
                <Search searchName={searchName} handleChange={handleSearch} />
              </th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.clients
              .filter((client) => client['name'].toLowerCase().indexOf(searchName.toLowerCase()) > -1)
              .map((client) => (
                <ClientRow key={client.id} client={client} />
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export { GET_CLIENTS };
