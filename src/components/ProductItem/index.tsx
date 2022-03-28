import React from "react";
import { FiUsers } from "react-icons/fi";
import ButtonComponent from "../ButtonAction";
import {
  Container,
  ContainerProduct,
  ContainerButton,
  Avatar,
  Text,
  Button,
  UsersLink,
} from "./styles";

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
  onDelete?(id: string): void;
}

const ProductItem: React.FC<IProductItemProps> = ({ item, onDelete }) => {
  return (
    <Container>
      <ContainerProduct>
        <Avatar background={item.avatar_url} />
        <Text active={item.active}>{item.title}</Text>
      </ContainerProduct>
      <ContainerButton>
        {onDelete && (
          <ButtonComponent
            onClick={() => {
              onDelete(item.id);
            }}
          >
            Excluir
          </ButtonComponent>
        )}
        <Button to={`/edit/${item.id}`}>Editar</Button>
        <UsersLink title="Visualizar clientes" to={`/users/${item.id}`}>
          <FiUsers />
        </UsersLink>
      </ContainerButton>
    </Container>
  );
};

export default ProductItem;
