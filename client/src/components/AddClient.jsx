import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import { FaUser } from 'react-icons/fa';

import Alerts from './Alerts';
import { GET_CLIENTS } from './Clients';

const ADD_CLIENT = gql`
  mutation addClient($name: String!, $email: String!, $phone: String!) {
    addClient(name: $name, email: $email, phone: $phone) {
      id
      name
      email
      phone
    }
  }
`;

export default function AddClient() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [success, setSuccess] = useState(false);

  const [addClient, { error: mutationError }] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    onCompleted(data) {
      setSuccess(true);
    },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] },
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    addClient();
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <div className="mb-1">
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addClientModal">
        <div className="d-flex align-items-center">
          <FaUser className="icon me-1" />
          Add Client
        </div>
      </button>

      <div
        className="modal fade"
        data-bs-backdrop="static"
        id="addClientModal"
        tabIndex="-1"
        aria-labelledby="addClientModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen-sm-down">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addClientModalLabel">
                New Client
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <Alerts action="Client added" mutationError={mutationError} success={success} />

              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="name"
                    title="Full name"
                    placeholder="Joe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    required
                    type="email"
                    className="form-control"
                    id="email"
                    title="e-mail"
                    placeholder="example@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    required
                    type="tel"
                    // pattern="^(\+?[\s\d]+)?(\d{3}|\(?\d+\))?(\-?\s?\d)+$"
                    pattern="[0-9]+"
                    className="form-control"
                    id="phone"
                    title="numbers only"
                    placeholder="+48 000 000 000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <label htmlFor="phone" className="form-label">
                    Phone
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
