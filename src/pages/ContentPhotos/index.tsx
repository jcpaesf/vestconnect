import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import ContentItemPhoto from "../../components/ContentItemPhoto";
import { useAuth } from "../../hooks/auth";
import { useToast } from "../../hooks/toast";

interface IParams {
  id: string;
}

interface IContent {
  id: string;
  title: string;
  description: string;
  file_url: string;
  background_url: string;
}

const Login: React.FC = () => {
  const { user } = useAuth();
  const [background] = useState<string>(user.background_url);
  const [content, setContent] = useState<IContent[]>([]);
  const { id } = useParams<IParams>();
  const { addToast } = useToast();

  useEffect(() => {
    async function loadContent(): Promise<void> {
      const response: AxiosResponse<IContent[]> = await api.get(
        `/productscontentphotos/${id}`
      );

      setContent(response.data);
    }

    loadContent();
  }, [id]);

  const handleDeleteContent = useCallback(
    async (id: string) => {
      const resp = window.confirm("Confirma a exclusão do conteúdo?");

      if (!resp) return;

      try {
        await api.delete(`/productscontentphotos/${id}`);

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
            <ButtonGoBack to="/contents">
              <FiArrowLeft color="#FFF" />
            </ButtonGoBack>
          </ContainerGoBack>

          <Option>FOTOS</Option>
          <Line></Line>

          <ButtonNewProduct to={`/createphoto/${id}`}>Novo</ButtonNewProduct>

          <Line></Line>

          {content.map((cont) => {
            return (
              <ContentItemPhoto item={cont} onDelete={handleDeleteContent} />
            );
          })}
        </Content>
      </ContainerLogin>
    </Container>
  );
};

export default Login;
