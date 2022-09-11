import { gql, useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

import { GET_PROJECTS } from './Projects';

const DELETE_PROJECT = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
    }
  }
`;

export default function DeleteProject({ id }) {
  const navigate = useNavigate();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id },
    onCompleted: () => navigate('/'),
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  return (
    <div className="d-flex mt-5 ms-auto">
      <Link to="/" className="btn btn-outline-secondary m-2">
        Go back
      </Link>
      <button className="btn btn-danger m-2" onClick={deleteProject}>
        <FaTrash className="icon" /> Delete Project
      </button>
    </div>
  );
}
