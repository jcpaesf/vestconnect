import styled from 'styled-components';

import background from '../../assets/images/backgroundPassword.jpg';

export const Container = styled.div`
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ContainerConfirmEmail = styled.div`
    display: flex;
    align-items: stretch;

    flex: 1;

    max-width: 1366px;
    height: 768px;

    background-color: #000;
    box-shadow: 0px 0px 20px #F2f2f2;

    @media (max-width: 600px) {
        margin: 0px 10px;
    }
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    padding: 50px 20px;
    
    width: 100%;
    max-width: 683px;
`;

export const Background = styled.div`
    flex: 1;
    background: url(${background}) no-repeat center;
    background-size: cover;
    align-items: center;
    justify-content: center;
    display: flex;
    max-width: 683px;

    
    @media (max-width: 600px) {
        display: none;
    }
`;

export const Title = styled.span`
    font-weight: bold;
    font-size: 40px;
`;

export const Option = styled.p`
    font-weight: 500;
    font-size: 18px;
`;

export const OptionObs = styled.p`
    font-weight: 400;
    font-size: 14px;
`;

export const Line = styled.hr`
    width: 15px;
    height: 2px;
    color: green;
    border: 1px solid green;
    margin: 20px 0px 20px;
`;