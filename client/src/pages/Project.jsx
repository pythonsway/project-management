import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import ClientInfo from '../components/ClientInfo';
import DeleteProject from '../components/DeleteProject';
import Spinner from '../components/Spinner';
import UpdateProject from '../components/UpdateProject';

const GET_PROJECT = gql`
  query getProject($id: ID!) {
    project(id: $id) {
      id
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`;

export default function Project() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },
  });

  if (loading) return <Spinner />;
  if (error) return <p>{`Error! ${error.message}`}</p>;

  return (
    <div className="row">
      <div className="col-lg-8 m-auto">
        <div className="mx-auto card p-5">
          <h1 className="card-header text-center">Project</h1>
          <h2 className="card-title text-center">
            <em>{data.project.name}</em>
          </h2>
          <h3 className="mt-3">Description:</h3>
          <p>{data.project.description}</p>
          <h3 className="mt-3">Status:</h3>
          <p>{data.project.status}</p>
          <ClientInfo client={data.project.client} />
          <div className="card-footer border border-secondary mt-5">
            <UpdateProject project={data.project} />
          </div>
          <DeleteProject id={data.project.id} />
        </div>
      </div>
    </div>
  );
}

export { GET_PROJECT };
