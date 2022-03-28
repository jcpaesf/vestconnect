import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import {
    Container,
    ContainerLogin,
    Content,
    Background,
    Title,
    Option,
    OptionObs,
    Line
} from './styles';

interface LoginFormData {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { signIn } = useAuth();
    const { addToast } = useToast();
    const [login, setLogin] = useState(false);
    const history = useHistory();

    const handleSubmit = useCallback(async (data: LoginFormData) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                password: Yup.string().required('Senha obrigatória')
            });

            await schema.validate(data, {
                abortEarly: false
            });

            setLogin(true);

            await signIn({
                email: data.email,
                password: data.password
            });

            setLogin(false);

            history.push('/dashboard');
        } catch (e) {
            setLogin(false);

            if (e instanceof Yup.ValidationError) {
                const errors = getValidationErrors(e);

                formRef.current?.setErrors(errors);

                return;
            }

            addToast({
                type: 'error',
                title: 'Erro ao fazer login',
                description: 'Ocorreu um erro ao fazer login. Tente novamente.'
            });
        }
    }, [addToast, history, setLogin, signIn]);

    return (
        <Container>
            <ContainerLogin>
                <Background>
                    <Title>Vest Connect</Title>
                </Background>

                <Content>
                    <Option>
                        FAÇA SEU LOGIN
                    </Option>
                    <Line></Line>
                    <OptionObs>
                        Por favor, informe suas credenciais
                    </OptionObs>

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <Input name="email" icon={FiMail} placeholder="E-mail" />
                        <Input name="password" type="password" icon={FiLock} placeholder="Senha" />

                        <Button type="submit" disabled={login ? true : false}>{login ? 'Logando' : 'Login'}</Button>
                    </Form>
                </Content>
            </ContainerLogin>
        </Container>
    );
}

export default Login;