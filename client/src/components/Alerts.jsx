export default function Alerts({ action, error, success }) {
  return (
    <div className="row mx-1">
      {success && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          {action}
        </div>
      )}
      {error &&
        error.graphQLErrors.map(({ message }, i) => (
          <div key={i} className="alert alert-danger alert-dismissible fade show" role="alert">
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            {message}
          </div>
        ))}
    </div>
  );
}
