import { FaSearch } from 'react-icons/fa';

export default function Search({ searchName, handleChange }) {
  return (
    <div className="input-group">
      <div className="input-group-text">
        <FaSearch className="icon" />
      </div>
      <input
        className="form-control form-control-sm"
        type="text"
        placeholder="Name"
        value={searchName}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}
