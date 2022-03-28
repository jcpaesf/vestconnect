import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    Container,
    ContainerLogin,
    Content,
    Background,
    Title,
    Option,
    Line,
    ContainerGoBack,
    ButtonGoBack,
    InputFile
} from './styles';
import { AxiosResponse } from 'axios';
import api from '../../services/api';
import { FiArrowLeft } from 'react-icons/fi';
import Select from '../../components/Select';
import TagNfcItem from '../../components/TagNfcItem';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';
import Pagination from '../../components/Pagination';

interface IProduct {
    id: string;
    title: string;
}

interface IProductsTagNfc {
    id: string;
    tag_nfc: string;
    active: boolean;
}

interface IContent {
    total: number;
    total_pages: number;
    productsTagNfc: Array<IProductsTagNfc>;
}

const Login: React.FC = () => {
    const { user: provider } = useAuth();
    const [background,] = useState<string>(provider.background_url);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [content, setContent] = useState<IProductsTagNfc[]>([]);
    const [, setFile] = useState('');
    const [nameFile, setNameFile] = useState('');
    const [importFile, setImportFile] = useState(false);
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        async function loadProducts(): Promise<void> {
            const response: AxiosResponse<IProduct[]> = await api.get('/products');

            setProducts(response.data);
        }

        loadProducts();
    }, []);

    const loadTagsNfc = useCallback(async (page: number): Promise<void> => {
        const response: AxiosResponse<IContent> = await api.get(`productstagsnfc/${selectedProduct}?page=${page}`)

        setContent(response.data.productsTagNfc);
        setTotalPages(response.data.total_pages);
    }, [selectedProduct]);

    useEffect(() => {
        loadTagsNfc(currentPage);
    }, [loadTagsNfc, currentPage]);

    const handleChangeProduct = useCallback(async (product_id) => {
        setSelectedProduct(product_id);

        loadTagsNfc(currentPage);
    }, [currentPage, loadTagsNfc]);

    const handleChangeFile = useCallback(() => {
        if (inputFileRef.current?.files) {
            var reader = new FileReader();

            reader.onload = function (e: any) {
                setFile(e.target.result);
            }

            setNameFile(inputFileRef.current.files[0].name);

            reader.readAsDataURL(inputFileRef.current.files[0]);
        }
    }, [setFile, setNameFile]);

    const handleImportFile = useCallback(async () => {
        if (inputFileRef.current?.files?.length) {
            setImportFile(true);
            const fileData = new FormData();
            fileData.append('file', inputFileRef.current.files[0]);

            await api.post(`/productstagsnfc/${selectedProduct}`, fileData);

            loadTagsNfc(1);
            setCurrentPage(1);

            inputFileRef.current.value = '';
            setNameFile('');
            setImportFile(false);
        }
    }, [selectedProduct, setImportFile, setNameFile, loadTagsNfc]);

    return (
        <Container>
            <ContainerLogin>
                <Background background_url={background}>
                    <Title>{provider.nickname}</Title>
                </Background>

                <Content>
                    <ContainerGoBack>
                        <ButtonGoBack to="/dashboard">
                            <FiArrowLeft color="#FFF" />
                        </ButtonGoBack>
                    </ContainerGoBack>

                    <Option>
                        TAGS NFC
                    </Option>
                    <Line></Line>

                    <Select
                        label=""
                        name="product"
                        text="Selecione o produto"
                        value={selectedProduct}
                        onChange={e => handleChangeProduct(e.target.value)}
                        options={products.map(prod => {
                            return {
                                value: prod.id,
                                label: prod.title
                            }
                        })}
                    />

                    {selectedProduct &&
                        <>
                            <InputFile
                                ref={inputFileRef}
                                type="file"
                                id="filenfc"
                                onChange={handleChangeFile}
                            />
                            <label htmlFor="filenfc">{nameFile ? nameFile : 'Escolher arquivo'}</label>

                            <ContainerGoBack>
                                <Button onClick={handleImportFile}>{importFile ? 'Importando...' : 'Importar'}</Button>
                            </ContainerGoBack>
                        </>
                    }
                    <Line></Line>

                    {content.map(cont => {
                        return <TagNfcItem key={cont.id} item={cont} />;
                    })}

                    <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} />
                </Content>
            </ContainerLogin>
        </Container>
    );
}

export default Login;