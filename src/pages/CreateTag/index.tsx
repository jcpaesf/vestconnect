import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';
import * as Yup from 'yup';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import { useToast } from '../../hooks/toast';

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
import Select from '../../components/Select';

interface IProduct {
    id: string;
    title: string;
}

interface IContent {
    id: string;
    description: string;
    product_id: string;
}

const Login: React.FC = () => {
    const { user } = useAuth();
    const [background,] = useState<string>(user.background_url);
    const formRef = useRef<FormHandles>(null);
    const [products, setProducts] = useState<IProduct[]>([]);
    const { addToast } = useToast();
    const [save, setSave] = useState(false);
    const history = useHistory();
    const [selectedProduct, setSelectedProduct] = useState('');

    useEffect(() => {
        async function loadProducts(): Promise<void> {
            const response: AxiosResponse<IProduct[]> = await api.get('/products');

            setProducts(response.data);
        }

        loadProducts();
    }, []);

    const handleSubmit = useCallback(async (data: IContent) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                description: Yup.string().required('Descrição obrigatório')
            });

            await schema.validate(data, {
                abortEarly: false
            });

            setSave(true);

            data.product_id = selectedProduct;

            await api.post('/productstags', data);

            addToast({
                type: 'success',
                title: 'Tag inserida',
                description: 'Sua tag foi inserida com sucesso.'
            });

            setSave(false);

            history.push(`/tags`);
        } catch (e) {
            setSave(false);

            if (e instanceof Yup.ValidationError) {
                const errors = getValidationErrors(e);

                formRef.current?.setErrors(errors);

                return;
            }

            addToast({
                type: 'error',
                title: 'Erro ao inserir tag',
                description: 'Ocorreu um erro ao inserir sua tag. Tente novamente.'
            });
        }
    }, [addToast, history, setSave, selectedProduct]);

    return (
        <Container>
            <ContainerLogin>
                <Background background_url={background}>
                    <Title>{user.nickname}</Title>
                </Background>

                <Content>
                    <ContainerGoBack>
                        <ButtonGoBack to={`/tags`}>
                            <FiArrowLeft color="#FFF" />
                        </ButtonGoBack>
                    </ContainerGoBack>
                    <Option>
                        CRIAR TAG
                    </Option>
                    <Line></Line>
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <Select
                            label=""
                            name="product"
                            text="Selecione o produto"
                            value={selectedProduct}
                            onChange={e => setSelectedProduct(e.target.value)}
                            options={products.map(prod => {
                                return {
                                    value: prod.id,
                                    label: prod.title
                                }
                            })}
                        />
                        <Input name="description" title="Descrição" />

                        <Button type="submit" disabled={save ? true : false}>{save ? 'Salvando' : 'Salvar'}</Button>
                    </Form>
                </Content>
            </ContainerLogin>
        </Container>
    );
}

export default Login;