import React, { useCallback, useEffect, useState } from 'react';
import {
    Container,
    ContainerLogin,
    Content,
    Background,
    Title,
    Option,
    Line,
    ContainerGoBack,
    ButtonGoBack,
    ButtonNewProduct
} from './styles';
import { AxiosResponse } from 'axios';
import api from '../../services/api';
import { FiArrowLeft } from 'react-icons/fi';
import Select from '../../components/Select';
import TagItem from '../../components/TagItem';
import { useAuth } from '../../hooks/auth';

interface IProduct {
    id: string;
    title: string;
}

interface ITags {
    id: string;
    description: string;
    product_id: string;
}

const Login: React.FC = () => {
    const { user: provider } = useAuth();
    const [background,] = useState<string>(provider.background_url);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [content, setContent] = useState<ITags[]>([]);

    useEffect(() => {
        async function loadProducts(): Promise<void> {
            const response: AxiosResponse<IProduct[]> = await api.get('/products');

            setProducts(response.data);
        }

        loadProducts();
    }, []);

    const handleChangeProduct = useCallback(async (product_id) => {
        setSelectedProduct(product_id);

        const response: AxiosResponse<ITags[]> = await api.get(`productstags/${product_id}`)

        setContent(response.data);
    }, [setSelectedProduct, setContent]);

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
                        TAGS
                    </Option>
                    <Line></Line>

                    <Select
                        label=""
                        name="product"
                        text="Selecione o produto"
                        value={selectedProduct}
                        onChange={e => handleChangeProduct(e.target.value)}
                        options={products.map(prod => {
                            return {
                                value: prod.id,
                                label: prod.title
                            }
                        })}
                    />

                    <ButtonNewProduct to='/createtag'>Novo</ButtonNewProduct>
                    <Line></Line>

                    {content.map(cont => {
                        return <TagItem item={cont} />;
                    })}
                </Content>
            </ContainerLogin>
        </Container>
    );
}

export default Login;