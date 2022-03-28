import React, { useCallback, useState } from 'react';
import Button from '../Button';
import api from '../../services/api';
import {
    Container,
    ContainerProduct,
    ContainerButton,
    Text
} from './styles';
import { AxiosResponse } from 'axios';

interface IProduct {
    id: string;
    tag_nfc: string;
    active: boolean;
}

interface IProductItemProps {
    item: IProduct;
}

const ProductItem: React.FC<IProductItemProps> = ({ item }) => {
    const [activeNfc, setActiveNfc] = useState(item.active);

    const handleInactiveItem = useCallback(async () => {
        const nfc: AxiosResponse<IProduct> = await api.patch(`productstagsnfc/inactive/${item.id}/nfc`);

        setActiveNfc(nfc.data.active);
    }, [setActiveNfc, item.id]);

    return (
        <Container>
            <ContainerProduct>
                <Text active={activeNfc}>
                    {item.tag_nfc}
                </Text>
            </ContainerProduct>
            {activeNfc && <ContainerButton>
                <Button onClick={handleInactiveItem}>Inativar</Button>
            </ContainerButton>}

        </Container>
    );
}

export default ProductItem;