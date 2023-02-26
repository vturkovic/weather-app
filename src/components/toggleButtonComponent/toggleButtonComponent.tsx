import ToggleButton from 'react-bootstrap/ToggleButton';

export const ToggleButtonComponent = ({ onClick, isFavorite }: any) => {

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onClick(event);
  };

  return (
    <ToggleButton
      id="toggle-check"
      type="checkbox"
      variant="outline-danger"
      checked={isFavorite}
      value="1"
      onClick={handleOnClick} >
      {isFavorite ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="grey" viewBox="0 0 16 16">
          <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
        </svg>
      )}
    </ToggleButton>
  );
};

export default ToggleButtonComponent;