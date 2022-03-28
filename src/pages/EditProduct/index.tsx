import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';
import TextArea from '../../components/TextArea';
import InputDate from '../../components/InputDate';
import CheckBox from '../../components/CheckBox';
import * as Yup from 'yup';
import api from '../../services/api';

import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

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

interface IParams {
    id: string;
}

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
    active: boolean;
    active_product: string[];
}

const Login: React.FC = () => {
    const { user } = useAuth();
    const [backgroundd, ] = useState<string>(user.background_url);
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const [save, setSave] = useState(false);
    const [avatar, setAvatar] = useState('');
    const [background, setBackground] = useState('');
    const [product, setProduct] = useState<IProduct>({} as IProduct);
    const history = useHistory();
    const { id } = useParams<IParams>();
    const inputAvatarRef = useRef<HTMLInputElement>(null);
    const inputBackgroundRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        async function loadProduct(): Promise<void> {
            const response: AxiosResponse<IProduct> = await api.get(`/products/${id}`);

            setProduct(response.data);
        }

        loadProduct();
    }, [id]);

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

            data.id = id;
            data.active = (data.active_product.length ? true : false);

            await api.put('/products', data);

            if (inputAvatarRef.current?.files?.length) {
                const avatarData = new FormData();
                avatarData.append('avatar', inputAvatarRef.current.files[0]);

                await api.patch(`/products/${id}/avatar`, avatarData);
            }

            if (inputBackgroundRef.current?.files?.length) {
                const backgroundData = new FormData();
                backgroundData.append('background', inputBackgroundRef.current.files[0]);
                await api.patch(`/products/${id}/background`, backgroundData);
            }

            addToast({
                type: 'success',
                title: 'Cadastro alterado',
                description: 'Seu cadastro foi alterado com sucesso.'
            });

            setSave(false);

            history.push('/products');
        } catch (e) {
            setSave(false);

            if (e instanceof Yup.ValidationError) {
                const errors = getValidationErrors(e);

                formRef.current?.setErrors(errors);

                return;
            }

            addToast({
                type: 'error',
                title: 'Erro ao cadastrar produto',
                description: 'Ocorreu um erro ao cadastrar seu produto. Tente novamente.'
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
                        EDITAR PRODUTO
                    </Option>
                    <Line></Line>
                    <Form initialData={{
                        title: product.title,
                        subtitle: product.subtitle,
                        nfc_id: product.nfc_id,
                        description: product.description,
                        validate: product.validate_br,
                        active_product: [String(product.active)]
                    }} ref={formRef} onSubmit={handleSubmit}>
                        <Input name="title" title="Título" />
                        <Input name="subtitle" title="Subtítulo" />
                        <Input name="nfc_id" title="NFC" />
                        <InputDate name="validate" title="Validade" />
                        <TextArea name="description" title="Descrição" />
                        <CheckBox name="active_product" options={[{
                            id: 'true', value: 'true', label: 'Ativo'
                        }]} />
                        <ContainerUpload>
                            <InputFile
                                ref={inputAvatarRef}
                                type="file"
                                id="avatar"
                                onChange={handleChangeAvatar}
                            />
                            <label htmlFor="avatar">Escolher avatar</label>
                            <ImageProduct background={!avatar ? product.avatar_url : avatar} />

                            <InputFile
                                ref={inputBackgroundRef}
                                type="file"
                                id="background"
                                onChange={handleChangeBackground}
                            />
                            <label htmlFor="background">Escolher background</label>
                            <ImageProduct background={!background ? product.background_url : background} />
                        </ContainerUpload>
                        <Button type="submit" disabled={save ? true : false}>{save ? 'Salvando' : 'Salvar'}</Button>
                    </Form>
                </Content>
            </ContainerLogin>
        </Container>
    );
}

export default Login;