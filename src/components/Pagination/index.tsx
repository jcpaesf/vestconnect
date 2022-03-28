import {
  faArrowLeft,
  faArrowRight,
  faStepBackward,
  faStepForward,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { HTMLAttributes, useEffect, useState } from 'react';
import styled from 'styled-components';
import { getColor } from '../../styles/colorPallete';

const Container = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  justify-content: flex-end;
`;

interface PaginationProps extends HTMLAttributes<HTMLDivElement> {
  totalPages: number;
  setCurrentPage(value: number): void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  setCurrentPage,
}) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setCurrentPage(page);
  }, [page, setCurrentPage]);

  function handleAddPage() {
    if (page < totalPages) {
      setPage(page + 1);
    }
  }

  function handleDecPage() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  return (
    <Container>
      <FontAwesomeIcon
        icon={faStepBackward}
        title="Primeira página"
        style={{
          color: page === 1 ? getColor('default') : getColor('grayLight'),
          cursor: page === 1 ? 'no-drop' : 'pointer',
          marginRight: 8,
        }}
        onClick={() => setPage(1)}
      />
      <FontAwesomeIcon
        icon={faArrowLeft}
        title="Página anterior"
        style={{
          color: page === 1 ? getColor('default') : getColor('grayLight'),
          cursor: page === 1 ? 'no-drop' : 'pointer',
          marginRight: 8,
        }}
        onClick={() => handleDecPage()}
      />
      <span style={{ fontSize: 14 }}>
        página {page} de {totalPages}
      </span>
      <FontAwesomeIcon
        icon={faArrowRight}
        title="Próxima página"
        style={{
          color:
            page === totalPages ? getColor('default') : getColor('grayLight'),
          cursor: page === totalPages ? 'no-drop' : 'pointer',
          marginLeft: 8,
        }}
        onClick={() => handleAddPage()}
      />
      <FontAwesomeIcon
        icon={faStepForward}
        title="Última página"
        style={{
          color:
            page === totalPages ? getColor('default') : getColor('grayLight'),
          cursor: page === totalPages ? 'no-drop' : 'pointer',
          marginLeft: 8,
        }}
        onClick={() => setPage(totalPages)}
      />
    </Container>
  );
};

export default Pagination;