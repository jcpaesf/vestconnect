import styled from 'styled-components';

export const Container = styled.div`
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    margin-top: 0px;

    @media (min-height: 500px) {
        margin-top: 100px;
    }
`;