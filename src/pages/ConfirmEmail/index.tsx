import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { FiMail } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';
import * as Yup from 'yup';
import api from '../../services/api';
import querystring from 'querystring'

import { useToast } from '../../hooks/toast';

import {
    Container,
    ContainerConfirmEmail,
    Content,
    Background,
    Title,
    Option,
    OptionObs,
    Line
} from './styles';

interface ConfirmEmailFormData {
    email: string;
}

const ConfirmEmail: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const [email, setEmail] = useState('');
    const [confirm, setConfirm] = useState(false);
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        const { email } = querystring.parse(location.search);

        setEmail(email as string);
    }, [location.search]);

    const handleSubmit = useCallback(async (data: ConfirmEmailFormData) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                email: Yup.string().required()
            });

            await schema.validate(data, {
                abortEarly: false
            });

            const token = location.search.replace('?token=', '').replace(`&email=${email}`, '');

            if (!token) {
                throw new Error();
            }

            setConfirm(true);

            await api.patch('/users/confirm', {
                email,
                token
            });

            setConfirm(false);

            addToast({
                type: 'success',
                title: 'E-mail confirmado',
                description: 'Você já acessar o App da VestConnect!'
            });

            history.push('/landing');
        } catch (e) {
            setConfirm(false);

            if (e instanceof Yup.ValidationError) {
                const errors = getValidationErrors(e);

                formRef.current?.setErrors(errors);

                return;
            }

            addToast({
                type: 'error',
                title: 'Erro ao confirmar seu e-mail',
                description: 'Ocorreu um erro ao confirmar seu e-mail. Tente novamente mais tarde.'
            });
        }
    }, [history, email, setConfirm, addToast, location.search]);

    return (
        <Container>
            <ContainerConfirmEmail>
                <Background>
                    <Title>Vest Connect</Title>
                </Background>

                <Content>
                    <Option>
                        CONFIRME SEU E-MAIL
                    </Option>
                    <Line></Line>
                    <OptionObs>
                        Por favor, confirme seu e-mail abaixo.
                    </OptionObs>

                    <Form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        initialData={{
                            email
                        }}
                    >
                        <Input name="email" icon={FiMail} placeholder="E-mail" disabled />
                        <Button type="submit" disabled={confirm ? true : false}>{confirm ? 'Confirmando' : 'Confirmar e-mail'}</Button>
                    </Form>
                </Content>
            </ContainerConfirmEmail>
        </Container>
    );
}

export default ConfirmEmail;