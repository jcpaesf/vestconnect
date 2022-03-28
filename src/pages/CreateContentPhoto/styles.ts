import styled from 'styled-components';
import { Link } from 'react-router-dom';
import background from '../../assets/images/backgroundPassword.jpg';

interface BackgroundProps {
    background_url: string;
}

interface ImageProductProps {
    background: string;
}

export const Container = styled.div`
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
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
    overflow-x: hidden;

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

export const ContainerUpload = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ImageProduct = styled.div<ImageProductProps>`
    height: 250px;
    margin-right: 5px;
    width: 100%;
    background: ${props => `url(${props.background}) no-repeat`};
    background-size: cover;
    background-position: top;
`;

export const InputFile = styled.input`
    width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	z-index: -1;
    & + label {
        color: white;
        background-color: black;
        display: inline-block;
        margin-bottom: 10px;
        margin-top: 10px;
    }
`;

export const ContainerGoBack = styled.div`
    display: flex;
    margin-bottom: 15px;
`;

export const ButtonGoBack = styled(Link)`
    background-color: transparent;
    border: none;
`;

export const ContainerContent = styled.div`
    display: flex;
    flex-direction: column;
`

export const ContainerItem = styled.div`
    display: flex;
    margin-top: 10px;
    flex-direction: column;
`