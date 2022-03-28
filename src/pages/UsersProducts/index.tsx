import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
import api from '../../services/api';
import { FiArrowLeft } from 'react-icons/fi';
import UserItem from '../../components/UserItem';
import { useAuth } from '../../hooks/auth';

interface IParams {
    id: string;
}

interface IUsers {
    id: string;
    name: string;
    avatar_url: string;
}

const Login: React.FC = () => {
    const { user: provider } = useAuth();
    const [background,] = useState<string>(provider.background_url);
    const [users, setUsers] = useState<IUsers[]>([]);
    const { id } = useParams<IParams>();

    useEffect(() => {
        async function loadUsers(): Promise<void> {
            const response: AxiosResponse<IUsers[]> = await api.get(`/productsuser/${id}`);

            setUsers(response.data);
        }

        loadUsers();
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
                        CLIENTES
                    </Option>
                    <Line></Line>

                    {users.length ?
                        users.map(user => <UserItem key={user.id} item={user} />)
                        :
                        'Nenhum cliente...'
                    }
                </Content>
            </ContainerLogin>
        </Container>
    );
}

export default Login;