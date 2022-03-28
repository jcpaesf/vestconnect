import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';
import TextArea from '../../components/TextArea';
import InputDate from '../../components/InputDate';
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
    InputFile,
    ContainerUpload,
    ImageProduct,
    ContainerGoBack,
    ButtonGoBack
} from './styles';
import { AxiosResponse } from 'axios';
import { FiArrowLeft } from 'react-icons/fi';

interface IProduct {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    nfc_id: string;
    validate: string;
    validate_br: string;
    avatar_url: string;
    background_url: string;
}

const Login: React.FC = () => {
    const { user } = useAuth();
    const [backgroundd, ] = useState<string>(user.background_url);
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const [save, setSave] = useState(false);
    const [avatar, setAvatar] = useState('');
    const [background, setBackground] = useState('');
    const history = useHistory();
    const inputAvatarRef = useRef<HTMLInputElement>(null);
    const inputBackgroundRef = useRef<HTMLInputElement>(null);

    const handleSubmit = useCallback(async (data: IProduct) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                title: Yup.string().required('Título obrigatório'),
                subtitle: Yup.string().required('Subtítulo obrigatório'),
                nfc_id: Yup.string().required('NFC obrigatório'),
                description: Yup.string().required('Descrição obrigatório'),
                validate: Yup.string().required('Data obrigatório')
            });

            await schema.validate(data, {
                abortEarly: false
            });

            setSave(true);

            const response: AxiosResponse<IProduct> = await api.post('/products', data);

            if (inputAvatarRef.current?.files?.length) {
                const avatarData = new FormData();
                avatarData.append('avatar', inputAvatarRef.current.files[0]);
                await api.patch(`/products/${response.data.id}/avatar`, avatarData);
            }

            if (inputBackgroundRef.current?.files?.length) {
                const backgroundData = new FormData();
                backgroundData.append('background', inputBackgroundRef.current.files[0]);
                await api.patch(`/products/${response.data.id}/background`, backgroundData);
            }

            addToast({
                type: 'success',
                title: 'Produto inserido',
                description: 'Seu produto foi inserido com sucesso.'
            });

            setSave(false);

            history.push('/products');
        } catch (e) {
            setSave(false);
            console.log(e);


            if (e instanceof Yup.ValidationError) {
                const errors = getValidationErrors(e);

                formRef.current?.setErrors(errors);

                return;
            }

            addToast({
                type: 'error',
                title: 'Erro ao inserir produto',
                description: 'Ocorreu um erro ao inserir seu produto. Tente novamente.'
            });
        }
    }, [addToast, history, setSave]);

    const handleChangeAvatar = useCallback(() => {
        if (inputAvatarRef.current?.files) {
            var reader = new FileReader();

            reader.onload = function (e: any) {
                setAvatar(e.target.result);
            }

            reader.readAsDataURL(inputAvatarRef.current.files[0]);
        }
    }, [setAvatar]);

    const handleChangeBackground = useCallback(() => {
        if (inputBackgroundRef.current?.files) {
            var reader = new FileReader();

            reader.onload = function (e: any) {
                setBackground(e.target.result);
            }

            reader.readAsDataURL(inputBackgroundRef.current.files[0]);
        }
    }, [setBackground]);

    return (
        <Container>
            <ContainerLogin>
                <Background background_url={backgroundd}>
                    <Title>{user.nickname}</Title>
                </Background>

                <Content>
                    <ContainerGoBack>
                        <ButtonGoBack to="/products">
                            <FiArrowLeft color="#FFF" />
                        </ButtonGoBack>
                    </ContainerGoBack>
                    <Option>
                        CRIAR PRODUTO
                    </Option>
                    <Line></Line>
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <Input name="title" title="Título" />
                        <Input name="subtitle" title="Subtítulo" />
                        <Input name="nfc_id" title="NFC" />
                        <InputDate name="validate" title="Validade" />
                        <TextArea name="description" title="Descrição" />
                        <ContainerUpload>
                            <InputFile
                                ref={inputAvatarRef}
                                type="file"
                                id="avatar"
                                name="avatar"
                                onChange={handleChangeAvatar}
                            />
                            <label htmlFor="avatar">Escolher avatar</label>
                            {avatar && <ImageProduct src={avatar} />}

                            <InputFile
                                ref={inputBackgroundRef}
                                type="file"
                                id="background"
                                name="background"
                                onChange={handleChangeBackground}
                            />
                            <label htmlFor="background">Escolher background</label>

                            {background && <ImageProduct src={background} />}
                        </ContainerUpload>

                        <Button type="submit" disabled={save ? true : false}>{save ? 'Salvando' : 'Salvar'}</Button>
                    </Form>
                </Content>
            </ContainerLogin>
        </Container>
    );
}

export default Login;