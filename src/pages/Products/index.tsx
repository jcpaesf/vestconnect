import React, { useCallback, useEffect, useState } from "react";
import ProductItem from "../../components/ProductItem";
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
  ButtonNewProduct,
} from "./styles";
import { AxiosResponse } from "axios";
import api from "../../services/api";
import { FiArrowLeft } from "react-icons/fi";
import { useAuth } from "../../hooks/auth";
import { useToast } from "../../hooks/toast";

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

const Login: React.FC = () => {
  const { user: provider } = useAuth();
  const [background] = useState<string>(provider.background_url);
  const [products, setProducts] = useState<IProduct[]>([]);
  const { addToast } = useToast();

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const response: AxiosResponse<IProduct[]> = await api.get("/products");

      setProducts(response.data);
    }

    loadProducts();
  }, []);

  const handleDeleteProduct = useCallback(
    async (id: string) => {
      const resp = window.confirm("Confirma a exclusão do produto?");

      if (!resp) return;

      try {
        await api.delete(`products/${id}`);

        setProducts(products.filter((product) => product.id !== id));

        addToast({
          title: "Produto excluído",
          description: "Seu produto foi excluído com sucesso",
          type: "success",
        });
      } catch (e) {
        addToast({
          title: "Erro ao excluir",
          description: e.message,
          type: "error",
        });
      }
    },
    [products, addToast]
  );

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

          <Option>MEUS PRODUTOS</Option>
          <Line></Line>

          <ButtonNewProduct to="/register">Novo</ButtonNewProduct>
          <Line></Line>

          {products.length
            ? products.map((prd) => (
                <ProductItem
                  key={prd.id}
                  item={prd}
                  onDelete={handleDeleteProduct}
                />
              ))
            : "Nenhum produto"}
        </Content>
      </ContainerLogin>
    </Container>
  );
};

export default Login;
