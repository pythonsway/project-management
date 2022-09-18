import { gql, useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { FaList } from 'react-icons/fa';

import Alerts from './Alerts';
import { GET_CLIENTS } from './Clients';
import { GET_PROJECTS } from './Projects';
import Spinner from './Spinner';

const ADD_PROJECT = gql`
  mutation addProject($name: String!, $description: String!, $status: ProjectStatus!, $clientId: ID!) {
    addProject(name: $name, description: $description, status: $status, clientId: $clientId) {
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

export default function AddProject() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('NEW');
  const [clientId, setClientId] = useState('');
  const [success, setSuccess] = useState(false);

  const { error, loading, data } = useQuery(GET_CLIENTS);

  const [addProject, { error: mutationError }] = useMutation(ADD_PROJECT, {
    variables: { name, description, clientId, status },
    onCompleted(data) {
      setSuccess(true);
    },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    addProject(name, description, clientId, status);
    setName('');
    setDescription('');
    setClientId('');
    setStatus('new');
  };

  if (loading) return <Spinner />;
  if (error) return <p>{`Error! ${error.message}`}</p>;

  return (
    <div className="mb-1">
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProjectModal">
        <div className="d-flex align-items-center">
          <FaList className="icon me-1" />
          Add Project
        </div>
      </button>

      <div
        className="modal fade"
        data-bs-backdrop="static"
        id="addProjectModal"
        tabIndex="-1"
        aria-labelledby="addProjectModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen-sm-down">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addProjectModalLabel">
                New Project
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <Alerts action="Project added" mutationError={mutationError} success={success} />
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
                <div className="form-floating mb-3">
                  <select
                    required
                    name="client"
                    id="client"
                    title="client"
                    className="form-select"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                  >
                    <option value="">Select Client</option>
                    {data.clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="client" className="form-label">
                    Client
                  </label>
                </div>
                <button type="submit" className="btn btn-primary">
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
