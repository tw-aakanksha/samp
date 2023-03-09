import { useNavigate } from 'react-router-dom';

const Navigate = ({ path }) => {
  const navigate = useNavigate();
  console.log(path, 'path is here');
  navigate(path);
  return <></>;
};

export default Navigate;
