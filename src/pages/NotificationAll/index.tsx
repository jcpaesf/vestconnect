import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
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
import api from '../../services/api';
import { FiArrowLeft } from 'react-icons/fi';
import TextArea from '../../components/TextArea';
import { useToast } from '../../hooks/toast';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';
import Input from '../../components/Input';

interface ISubmit {
    description: string;
    url: string;
}

const Login: React.FC = () => {
    const { user } = useAuth();
    const [background,] = useState<string>(user.background_url);
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();
    const [notification, setNotification] = useState(false);

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
                message: data.description,
                url: data.url
            });

            addToast({
                type: 'success',
                title: 'Notificação enviada',
                description: 'Sua notificação foi enviada com sucesso.'
            });

            setNotification(false);

            history.push('/notifications');
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
    }, [addToast, history, setNotification]);

    return (
        <Container>
            <ContainerLogin>
                <Background background_url={background}>
                    <Title>{user.nickname}</Title>
                </Background>

                <Content>
                    <ContainerGoBack>
                        <ButtonGoBack to="/notifications">
                            <FiArrowLeft color="#FFF" />
                        </ButtonGoBack>
                    </ContainerGoBack>

                    <Option>
                        NOTIFICAÇÃO
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