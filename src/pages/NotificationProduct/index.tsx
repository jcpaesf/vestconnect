import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
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
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import Button from '../../components/Button';
import { AxiosResponse } from 'axios';
import api from '../../services/api';
import { FiArrowLeft } from 'react-icons/fi';
import TextArea from '../../components/TextArea';
import { useToast } from '../../hooks/toast';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';
import Input from '../../components/Input';

interface IParams {
    id: string;
}

interface IProduct {
    id: string;
    title: string;
    avatar_url: string;
}

interface ISubmit {
    description: string;
    url: string;
}

const Login: React.FC = () => {
    const { user: provider } = useAuth();
    const [background,] = useState<string>(provider.background_url);
    const formRef = useRef<FormHandles>(null);
    const [product, setProduct] = useState<IProduct>({} as IProduct);
    const { id } = useParams<IParams>();
    const { addToast } = useToast();
    const history = useHistory();
    const [notification, setNotification] = useState(false);

    useEffect(() => {
        async function loadProduct(): Promise<void> {
            const response: AxiosResponse<IProduct> = await api.get(`/products/${id}`);

            setProduct(response.data);
        }

        loadProduct();
    }, [id]);

    const handleSubmit = useCallback(async (data: ISubmit) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                description: Yup.string().required('Descrição obrigatório')
            });

            await schema.validate(data, {
                abortEarly: false
            });

            setNotification(true);

            await api.post('/products/notification', {
                product_id: id,
                message: data.description,
                url: data.url
            });

            addToast({
                type: 'success',
                title: 'Notificação enviada',
                description: 'Sua notificação foi enviada com sucesso.'
            });

            setNotification(false);

            history.push('/notifproduct');
        } catch (e) {
            setNotification(false);

            if (e instanceof Yup.ValidationError) {
                const errors = getValidationErrors(e);

                formRef.current?.setErrors(errors);

                return;
            }

            addToast({
                type: 'error',
                title: 'Erro ao enviar notificação',
                description: 'Ocorreu um erro ao enviar sua notificação. Tente novamente.'
            });
        }
    }, [addToast, history, setNotification, id]);

    return (
        <Container>
            <ContainerLogin>
                <Background background_url={background}>
                    <Title>{provider.nickname}</Title>
                </Background>

                <Content>
                    <ContainerGoBack>
                        <ButtonGoBack to="/notifproduct">
                            <FiArrowLeft color="#FFF" />
                        </ButtonGoBack>
                    </ContainerGoBack>

                    <Option>
                        NOTIFICAÇÃO DO PRODUTO
                    </Option>
                    <Option>
                        {product.title}
                    </Option>
                    <Line></Line>

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <TextArea name="description" title="Descrição" />
                        <Input name="url" title="URL" />
                        <Button type="submit" disabled={notification ? true : false}>{notification ? 'Notificando...' : 'Notificar'}</Button>
                    </Form>
                </Content>
            </ContainerLogin>
        </Container>
    );
}

export default Login;