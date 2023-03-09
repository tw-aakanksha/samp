import './form-input-component.css';
const formInput = ({ label, ...otherProps }) => {
  return (
    <div className="container">
      <label className="form-input-label"> {label} </label>
      <input className="form-input " {...otherProps} />
    </div>
  );
};

export default formInput;
