import React, { useCallback, useEffect, useState } from "react";
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
import Select from "../../components/Select";
import { useAuth } from "../../hooks/auth";
import { useToast } from "../../hooks/toast";
import ContentItem from "../../components/ContentItem";

interface IProduct {
  id: string;
  title: string;
}

interface IContent {
  id: string;
  description: string;
  type: string;
  background_url: string;
  product_id: string;
  type_text: string;
}

const Login: React.FC = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [background] = useState<string>(user.background_url);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [content, setContent] = useState<IContent[]>([]);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const response: AxiosResponse<IProduct[]> = await api.get("/products");

      setProducts(response.data);
    }

    loadProducts();
  }, []);

  const handleChangeProduct = useCallback(
    async (product_id) => {
      setSelectedProduct(product_id);

      const response: AxiosResponse<IContent[]> = await api.get(
        `productscontent/${product_id}`
      );

      setContent(response.data);
    },
    [setSelectedProduct, setContent]
  );

  const handleDeleteContent = useCallback(
    async (id: string) => {
      const resp = window.confirm("Confirma a exclusão do conteúdo?");

      if (!resp) return;

      try {
        await api.delete(`productscontent/${id}`);

        setContent(content.filter((ctnt) => ctnt.id !== id));

        addToast({
          title: "Conteúdo excluído",
          description: "Conteúdo excluído com sucesso",
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
    [addToast, content]
  );

  return (
    <Container>
      <ContainerLogin>
        <Background background_url={background}>
          <Title>{user.nickname}</Title>
        </Background>

        <Content>
          <ContainerGoBack>
            <ButtonGoBack to="/dashboard">
              <FiArrowLeft color="#FFF" />
            </ButtonGoBack>
          </ContainerGoBack>

          <Option>CONTEÚDOS</Option>
          <Line></Line>

          <Select
            label=""
            name="product"
            text="Selecione o produto"
            value={selectedProduct}
            onChange={(e) => handleChangeProduct(e.target.value)}
            options={products.map((prod) => {
              return {
                value: prod.id,
                label: prod.title,
              };
            })}
          />

          <ButtonNewProduct to="/createcontent">Novo</ButtonNewProduct>
          <Line></Line>

          {content.map((cont) => {
            return <ContentItem item={cont} onDelete={handleDeleteContent} />;
          })}
        </Content>
      </ContainerLogin>
    </Container>
  );
};

export default Login;
