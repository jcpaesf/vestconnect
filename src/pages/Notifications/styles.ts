import styled from 'styled-components';
import { Link } from 'react-router-dom';
import background from '../../assets/images/backgroundPassword.jpg';

interface BackgroundProps {
    background_url: string;
}

interface AvatarProps {
    background: string;
}

export const Container = styled.div`
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ContainerGoBack = styled.div`
    display: flex;
    margin-bottom: 15px;
`;

export const ButtonGoBack = styled(Link)`
    background-color: transparent;
    border: none;
`;

export const ContainerLogin = styled.div`
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
    padding: 35px 20px;
    
    width: 100%;
    max-width: 683px;

    overflow-y: scroll;

    &::-webkit-scrollbar {
        width: 0.2em;
    }

    &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    }

    &::-webkit-scrollbar-thumb {
        background-color: #CCC;
        outline: 1px solid #CCC;
    }
`;

export const Background = styled.div<BackgroundProps>`
    flex: 1;
    background: ${props => `url(${props.background_url ? props.background_url : background}) no-repeat center center`};
    background-size: cover;
    align-items: center;
    justify-content: center;
    display: flex;
    max-width: 683px;

    
    @media (max-width: 600px) {
        display: none;
    }
`;

export const ContainerLogout = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
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

export const ButtonLogout = styled.button`
    background-color: transparent;
    border: none;
`;

export const Avatar = styled.div<AvatarProps>`
    background: ${props => `url(${props.background}) no-repeat center center`};
    background-size: cover;
    background-position: center;
    width: 70px;
    height: 70px;
`;