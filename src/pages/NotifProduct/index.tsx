import React, { useEffect, useState } from 'react';
import ProductItemNotif from '../../components/ProductItemNotif'
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
import { useAuth } from '../../hooks/auth';

interface IProduct {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    nfc_id: string;
    validate: string;
    avatar_url: string;
    background_url: string;
    active: boolean;
}

const Login: React.FC = () => {
    const { user: provider } = useAuth();
    const [background, ] = useState<string>(provider.background_url);
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        async function loadProducts(): Promise<void> {
            const response: AxiosResponse<IProduct[]> = await api.get('/products');

            setProducts(response.data);
        }

        loadProducts();
    }, []);

    return (
        <Container>
            <ContainerLogin>
                <Background background_url={background}>
                    <Title>{provider.nickname}</Title>
                </Background>

                <Content>
                    <ContainerGoBack>
                        <ButtonGoBack to="/notifications">
                            <FiArrowLeft color="#FFF" />
                        </ButtonGoBack>
                    </ContainerGoBack>

                    <Option>
                        NOTIFICAÇÕES POR PRODUTO
                    </Option>
                    <Line></Line>

                    {products.length ?
                        products.map(prd => <ProductItemNotif key={prd.id} item={prd} />)
                        :
                        'Nenhum produto'
                    }
                </Content>
            </ContainerLogin>
        </Container>
    );
}

export default Login;