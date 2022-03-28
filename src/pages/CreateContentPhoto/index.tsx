import React, { useCallback, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
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
import { useAuth } from '../../hooks/auth';

interface IProduct {
    id: string;
    title: string;
    description: string;
    content_id: string;
    url: string;
}

interface IParams {
    id: string;
}

const Login: React.FC = () => {
    const { user } = useAuth();
    const [background,] = useState<string>(user.background_url);
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const [save, setSave] = useState(false);
    const [avatar, setAvatar] = useState('');
    const history = useHistory();
    const inputAvatarRef = useRef<HTMLInputElement>(null);
    const { id } = useParams<IParams>();

    const handleSubmit = useCallback(async (data: IProduct) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                title: Yup.string().required('Título obrigatório'),
                description: Yup.string().required('Descrição obrigatório')
            });

            await schema.validate(data, {
                abortEarly: false
            });

            setSave(true);

            data.content_id = id;

            const response: AxiosResponse<IProduct> = await api.post('/productscontentphotos', data);

            if (inputAvatarRef.current?.files?.length) {
                const fileData = new FormData();
                fileData.append('file', inputAvatarRef.current.files[0]);
                await api.patch(`/productscontentphotos/${response.data.id}/file`, fileData);

                const backgroundData = new FormData();
                backgroundData.append('background', inputAvatarRef.current.files[0]);
                await api.patch(`/productscontentphotos/${response.data.id}/background`, backgroundData);
            }

            addToast({
                type: 'success',
                title: 'Foto inserida',
                description: 'Sua foto foi inserida com sucesso.'
            });

            setSave(false);

            history.push(`/productscontentphotos/${id}`);
        } catch (e) {
            setSave(false);

            if (e instanceof Yup.ValidationError) {
                const errors = getValidationErrors(e);

                formRef.current?.setErrors(errors);

                return;
            }

            addToast({
                type: 'error',
                title: 'Erro ao inserir foto',
                description: 'Ocorreu um erro ao inserir sua foto. Tente novamente.'
            });
        }
    }, [addToast, history, setSave, id]);

    const handleChangeAvatar = useCallback(() => {
        if (inputAvatarRef.current?.files) {
            var reader = new FileReader();

            reader.onload = function (e: any) {
                setAvatar(e.target.result);
            }

            reader.readAsDataURL(inputAvatarRef.current.files[0]);
        }
    }, [setAvatar]);

    return (
        <Container>
            <ContainerLogin>
                <Background background_url={background}>
                    <Title>{user.nickname}</Title>
                </Background>

                <Content>
                    <ContainerGoBack>
                        <ButtonGoBack to={`/productscontentphotos/${id}`}>
                            <FiArrowLeft color="#FFF" />
                        </ButtonGoBack>
                    </ContainerGoBack>
                    <Option>
                        CRIAR FOTO
                    </Option>
                    <Line></Line>
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <Input name="title" title="Título" />
                        <Input name="description" title="Descrição" />
                        <Input name="url" title="URL" />
                        <ContainerUpload>
                            <InputFile
                                ref={inputAvatarRef}
                                type="file"
                                id="avatar"
                                name="avatar"
                                onChange={handleChangeAvatar}
                            />
                            <label htmlFor="avatar">Escolher foto</label>
                            {avatar && <ImageProduct background={avatar} />}
                        </ContainerUpload>

                        <Button type="submit" disabled={save ? true : false}>{save ? 'Salvando' : 'Salvar'}</Button>
                    </Form>
                </Content>
            </ContainerLogin>
        </Container>
    );
}

export default Login;