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
    InputFile,
    ContainerUpload,
    ImageProduct,
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
    type: string;
    description: string;
    product_id: string;
}

const Login: React.FC = () => {
    const { user } = useAuth();
    const [backgroundd, ] = useState<string>(user.background_url);
    const formRef = useRef<FormHandles>(null);
    const [products, setProducts] = useState<IProduct[]>([]);
    const { addToast } = useToast();
    const [save, setSave] = useState(false);
    const [background, setBackground] = useState('');
    const history = useHistory();
    const inputBackgroundRef = useRef<HTMLInputElement>(null);
    const [selectedType, setSelectedType] = useState('');
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

            data.type = selectedType;
            data.product_id = selectedProduct;

            const response: AxiosResponse<IContent> = await api.post('/productscontent', data);

            if (inputBackgroundRef.current?.files?.length) {
                const backgroundData = new FormData();
                backgroundData.append('background', inputBackgroundRef.current.files[0]);
                await api.patch(`/productscontent/${response.data.id}/background`, backgroundData);
            }

            addToast({
                type: 'success',
                title: 'Conteúdo inserido',
                description: 'Seu conteúdo foi inserido com sucesso.'
            });

            setSave(false);

            history.push(`/contents`);
        } catch (e) {
            setSave(false);

            if (e instanceof Yup.ValidationError) {
                const errors = getValidationErrors(e);

                formRef.current?.setErrors(errors);

                return;
            }

            addToast({
                type: 'error',
                title: 'Erro ao inserir conteúdo',
                description: 'Ocorreu um erro ao inserir seu conteúdo. Tente novamente.'
            });
        }
    }, [addToast, history, setSave, selectedType, selectedProduct]);

    const handleChangeBackgound = useCallback(() => {
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
                        <ButtonGoBack to={`/contents`}>
                            <FiArrowLeft color="#FFF" />
                        </ButtonGoBack>
                    </ContainerGoBack>
                    <Option>
                        CRIAR CONTEÚDO
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
                        <Select
                            label=""
                            name="type"
                            text="Selecione o tipo do conteúdo"
                            value={selectedType}
                            onChange={e => setSelectedType(e.target.value)}
                            options={[{
                                value: 'V',
                                label: 'Vídeo'
                            }, {
                                value: 'P',
                                label: 'Foto'
                            }]}
                        />
                        <ContainerUpload>
                            <InputFile
                                ref={inputBackgroundRef}
                                type="file"
                                id="background"
                                name="background"
                                onChange={handleChangeBackgound}
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