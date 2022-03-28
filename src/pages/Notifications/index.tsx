import React, { useState } from 'react';
import Button from '../../components/ButtonOptions';
import { FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';
import {
    Container,
    ContainerLogin,
    Content,
    Background,
    Title,
    Option,
    Line,
    ButtonGoBack,
    ContainerGoBack
} from './styles';

const Login: React.FC = () => {
    const { user: provider } = useAuth();
    const [background,] = useState<string>(provider.background_url);
    return (
        <Container>
            <ContainerLogin>
                <Background background_url={background}>
                    <Title>{provider.nickname}</Title>
                </Background>

                <Content>
                    <ContainerGoBack>
                        <ButtonGoBack to="/dashboard">
                            <FiArrowLeft color="#FFF" />
                        </ButtonGoBack>
                    </ContainerGoBack>

                    <Option>
                        ESCOLHA UMA OPÇÃO
                    </Option>
                    <Line></Line>
                    <Button to="/notifproduct">Enviar por produto</Button>
                    <Button to="/notificationall">Enviar para todos os clientes</Button>
                </Content>
            </ContainerLogin>
        </Container>
    );
}

export default Login;