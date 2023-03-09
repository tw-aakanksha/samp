/* eslint-disable react/react-in-jsx-scope */
import SignupBuyer from '../../components/signup-buyer/signup-buyer-component.jsx';
import SignupSeller from '../../components/signup-seller/signup-seller-component.jsx';
import './authentication-component.css';
const Authentication = () => {
  return (
    <div className="authentication-container">
      <SignupBuyer />
      <SignupSeller />
    </div>
  );
};

export default Authentication;
