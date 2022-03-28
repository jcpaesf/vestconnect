import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import Input from '../../components/Input';
import InputDate from '../../components/InputDate';
import api from '../../services/api';

import {
    Container,
    ContainerLogin,
    Content,
    Background,
    Title,
    Option,
    Line,
    ContainerGoBack,
    ButtonGoBack
} from './styles';
import { AxiosResponse } from 'axios';
import { FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';

interface IParams {
    id: string;
}

interface IUser {
    id: string;
    name: string;
    email: string;
    birth_user: string;
    created: Date;
}

const Login: React.FC = () => {
    const { user: provider } = useAuth();
    const [background,] = useState<string>(provider.background_url);
    const [user, setUser] = useState<IUser>({} as IUser);
    const { id } = useParams<IParams>();

    useEffect(() => {
        async function loadUser(): Promise<void> {
            const response: AxiosResponse<IUser> = await api.get(`/users/${id}`);

            setUser(response.data);
        }

        loadUser();
    }, [id]);

    return (
        <Container>
            <ContainerLogin>
                <Background background_url={background}>
                    <Title>{provider.nickname}</Title>
                </Background>

                <Content>
                    <ContainerGoBack>
                        <ButtonGoBack to="/products">
                            <FiArrowLeft color="#FFF" />
                        </ButtonGoBack>
                    </ContainerGoBack>
                    <Option>
                        {user.name}
                    </Option>
                    <Line></Line>
                    <Form initialData={{
                        name: user.name,
                        email: user.email,
                        birth: user.birth_user,
                        created: user.created
                    }} onSubmit={() => { }}>
                        <Input name="name" title="Nome" disabled={true} />
                        <Input name="email" title="E-mail" disabled={true} />
                        <InputDate name="birth" title="Data de nascimento" disabled={true} />
                        <InputDate name="created" title="Data de criação" disabled={true} />
                    </Form>
                </Content>
            </ContainerLogin>
        </Container>
    );
}

export default Login;