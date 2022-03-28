import React, { useCallback, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';
import * as Yup from 'yup';
import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import {
    Container,
    ContainerResetPassword,
    Content,
    Background,
    Title,
    Option,
    OptionObs,
    Line
} from './styles';

interface ResetPasswordFormData {
    password: string;
    confirmPassword: string;
}

const ResetPassword: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const [reset, setReset] = useState(false);
    const history = useHistory();
    const location = useLocation();

    const handleSubmit = useCallback(async (data: ResetPasswordFormData) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                password: Yup.string().min(6, 'Mínimo 6 dígitos'),
                confirmPassword: Yup.string().oneOf([Yup.ref('password'), undefined], 'Senha incorreta')
            });

            await schema.validate(data, {
                abortEarly: false
            });

            const token = location.search.replace('?token=', '');

            if (!token) {
                throw new Error();
            }

            setReset(true);

            await api.post('/password/reset', {
                password: data.password,
                token
            });

            setReset(false);

            addToast({
                type: 'success',
                title: 'Senha redefinida',
                description: 'Você já pode fazer seu logon no VestConnect!'
            });

            history.push('/landing');
        } catch (e) {
            setReset(false);

            if (e instanceof Yup.ValidationError) {
                const errors = getValidationErrors(e);

                formRef.current?.setErrors(errors);

                return;
            }

            addToast({
                type: 'error',
                title: 'Erro ao redefinir senha',
                description: 'Ocorreu um erro ao redefinir sua senha. Tente novamente.'
            });
        }
    }, [location.search, addToast, history, setReset]);

    return (
        <Container>
            <ContainerResetPassword>
                <Background>
                    <Title>Vest Connect</Title>
                </Background>

                <Content>
                    <Option>
                        REDEFINA SUA SENHA
                    </Option>
                    <Line></Line>
                    <OptionObs>
                        Por favor, informe e confirme sua nova senha.
                    </OptionObs>

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <Input name="password" type="password" icon={FiLock} placeholder="Senha" />
                        <Input name="confirmPassword" type="password" icon={FiLock} placeholder="Confirme sua senha" />
                        <Button type="submit" disabled={reset ? true : false}>{reset ? 'Redefinindo' : 'Redefinir senha'}</Button>

                    </Form>
                </Content>
            </ContainerResetPassword>
        </Container>
    );
}

export default ResetPassword;