import React, { useCallback, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
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
    InputFile,
    ContainerUpload,
    ImageProduct,
    ContainerGoBack,
    ButtonGoBack,
    VideoItem
} from './styles';
import { AxiosResponse } from 'axios';
import { FiArrowLeft } from 'react-icons/fi';

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
    const [backgroundd,] = useState<string>(user.background_url);
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const [save, setSave] = useState(false);
    const [file, setFile] = useState('');
    const [background, setBackground] = useState('');
    const history = useHistory();
    const inputFileRef = useRef<HTMLInputElement>(null);
    const inputBackgroundRef = useRef<HTMLInputElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
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

            const response: AxiosResponse<IProduct> = await api.post('/productscontentvideos', data);

            if (inputFileRef.current?.files?.length) {
                const fileData = new FormData();
                fileData.append('file', inputFileRef.current.files[0]);
                await api.patch(`/productscontentvideos/${response.data.id}/file`, fileData);
            }

            if (inputBackgroundRef.current?.files?.length) {
                const backgroundData = new FormData();
                backgroundData.append('background', inputBackgroundRef.current.files[0]);
                await api.patch(`/productscontentvideos/${response.data.id}/background`, backgroundData);
            }

            addToast({
                type: 'success',
                title: 'Vídeo inserido',
                description: 'Sua vídeo foi inserido com sucesso.'
            });

            setSave(false);

            history.push(`/productscontentvideos/${id}`);
        } catch (e) {
            setSave(false);

            if (e instanceof Yup.ValidationError) {
                const errors = getValidationErrors(e);

                formRef.current?.setErrors(errors);

                return;
            }

            addToast({
                type: 'error',
                title: 'Erro ao inserir vídeo',
                description: 'Ocorreu um erro ao inserir seu vídeo. Tente novamente.'
            });
        }
    }, [addToast, history, setSave, id]);

    const handleChangeFile = useCallback(() => {
        if (inputFileRef.current?.files) {
            var reader = new FileReader();

            reader.onload = function (e: any) {
                setFile(e.target.result);
            }

            setFile(URL.createObjectURL(inputFileRef.current.files[0]));
            videoRef.current?.load();
            //reader.readAsDataURL(inputFileRef.current.files[0]);
        }
    }, [setFile]);

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
                        <ButtonGoBack to={`/productscontentvideos/${id}`}>
                            <FiArrowLeft color="#FFF" />
                        </ButtonGoBack>
                    </ContainerGoBack>
                    <Option>
                        CRIAR VÍDEO
                    </Option>
                    <Line></Line>
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <Input name="title" title="Título" />
                        <Input name="description" title="Descrição" />
                        <Input name="url" title="URL" />
                        <ContainerUpload>
                            <InputFile
                                ref={inputFileRef}
                                type="file"
                                id="file"
                                name="file"
                                accept="video/*"
                                onChange={handleChangeFile}
                            />
                            <label htmlFor="file">Escolher vídeo</label>

                            <VideoItem ref={videoRef} controls>
                                <source src={file} id="video_preview" />
                                Seu navegador não suporta este recurso
                            </VideoItem>

                            <InputFile
                                ref={inputBackgroundRef}
                                type="file"
                                id="background"
                                name="background"
                                onChange={handleChangeBackground}
                            />
                            <label htmlFor="background">Escolher background</label>

                            {background && <ImageProduct background={background} />}
                        </ContainerUpload>

                        <Button type="submit" disabled={save ? true : false}>{save ? 'Salvando' : 'Salvar'}</Button>
                    </Form>
                </Content>
            </ContainerLogin>
        </Container>
    );
}

export default Login;