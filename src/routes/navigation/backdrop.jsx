import './backdrop.css';
const Backdrop = ({ sidebar }) => {
  return (
    <div
      className={sidebar ? 'backdrop backdrop--open' : 'backdropbackdrop'}
    ></div>
  );
};

export default Backdrop;
