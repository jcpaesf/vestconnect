import React from 'react';
import {
    Container,
    ContainerProduct,
    ContainerButton,
    Avatar,
    Text,
    Button
} from './styles';

interface IProduct {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    nfc_id: string;
    validate: string;
    avatar_url: string;
    background_url: string;
    active: boolean;
}

interface IProductItemProps {
    item: IProduct;
}

const ProductItem: React.FC<IProductItemProps> = ({ item }) => {
    return (
        <Container>
            <ContainerProduct>
                <Avatar background={item.avatar_url} />
                <Text active={item.active}>
                    {item.title}
                </Text>
            </ContainerProduct>
            <ContainerButton>
                <Button to={`/notification/${item.id}`}>Notificar</Button>
            </ContainerButton>
        </Container>
    );
}

export default ProductItem;