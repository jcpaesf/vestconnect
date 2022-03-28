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
    pass: string;
    active: boolean;
    client: {
        name: string;
        email: string;
    }
}

interface IProductItemProps {
    item: IProduct;
}

const ProductItem: React.FC<IProductItemProps> = ({ item }) => {
    const [activePassword, setActivePassword] = useState(item.active);

    const handleInactiveItem = useCallback(async () => {
        const nfc: AxiosResponse<IProduct> = await api.patch(`passwords/inactive/${item.id}`);

        setActivePassword(nfc.data.active);
    }, [setActivePassword, item]);

    return (
        <Container>
            <ContainerProduct>
                <Text active={activePassword}>{item.pass} {item.client && ` - Usado por: ${item.client.name}`}</Text>
            </ContainerProduct>
            {activePassword && <ContainerButton>
                <Button onClick={handleInactiveItem}>Inativar</Button>
            </ContainerButton>}

        </Container>
    );
}

export default ProductItem;