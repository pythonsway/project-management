import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';

import Alerts from './Alerts';
import { GET_PROJECT } from '../pages/Project';

const UPDATE_PROJECT = gql`
  mutation updateProject($id: ID!, $name: String!, $description: String!, $status: ProjectStatus!) {
    updateProject(id: $id, name: $name, description: $description, status: $status) {
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

export default function UpdateProject({ project }) {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState(project.status);
  const [success, setsuccess] = useState(false);

  const [updateProject, { error: mutationError }] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status },
    onCompleted(data) {
      setsuccess(true);
    },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    updateProject(name, description, status);
  };

  return (
    <div className="mt-1">
      <h3>Update Project</h3>
      <Alerts action="Project updated" mutationError={mutationError} success={success} />

      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            required
            type="text"
            className="form-control"
            id="name"
            title="Project name"
            placeholder="ProjectX"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="name" className="form-label">
            Name
          </label>
        </div>
        <div className="form-floating mb-3">
          <textarea
            required
            rows="3"
            type="text"
            className="form-control"
            id="description"
            title="Project description"
            placeholder="..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label htmlFor="description" className="form-label">
            Description
          </label>
        </div>
        <div className="form-floating mb-3">
          <select
            required
            name="status"
            id="status"
            title="Project status"
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="NEW">NEW</option>
            <option value="PROGRESS">PROGRESS</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>
          <label htmlFor="status" className="form-label">
            Status
          </label>
        </div>
        <button type="submit" className="btn btn-sm btn-secondary">
          Update
        </button>
      </form>
    </div>
  );
}
