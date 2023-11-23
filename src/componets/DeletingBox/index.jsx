import { useEffect, useRef } from 'react';
import { StyledContainerBox } from './styled';

export const DeletingBox = ({ children, trueCallback, falseCallback }) => {
  const modalRef = useRef();

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      falseCallback();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Escape') {
      falseCallback();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <StyledContainerBox ref={modalRef}>
      <div className='close' onClick={falseCallback}>X</div>
      <div className='teste'>
        {children}
        <div className='buttons' >
        <button onClick={trueCallback}>Sim</button>
        <button onClick={falseCallback}>Não</button>
        </div>
      </div>
    </StyledContainerBox>
  );
};
