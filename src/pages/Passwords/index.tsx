import React, { useCallback, useEffect, useRef, useState } from "react";
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
  InputFile,
} from "./styles";
import { AxiosResponse } from "axios";
import api from "../../services/api";
import { FiArrowLeft } from "react-icons/fi";
import PasswordItem from "../../components/PasswordItem";
import Button from "../../components/Button";
import { useAuth } from "../../hooks/auth";
import Pagination from '../../components/Pagination';

interface IPasswords {
  id: string;
  pass: string;
  active: boolean;
  client: {
    name: string;
    email: string;
  }
}
interface IContent {
  total: number;
  total_pages: number;
  passwords: Array<IPasswords>;
}

const Login: React.FC = () => {
  const { user: provider } = useAuth();
  const [background] = useState<string>(provider.background_url);
  const [content, setContent] = useState<IPasswords[]>([]);
  const [, setFile] = useState("");
  const [nameFile, setNameFile] = useState("");
  const [importFile, setImportFile] = useState(false);
  const [inactiveAll, setInactiveAll] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const inputFileRef = useRef<HTMLInputElement>(null);

  async function loadPasswords(page: number): Promise<void> {
    const response: AxiosResponse<IContent> = await api.get(`/passwords?page=${page}`);

    setContent(response.data.passwords);
    setTotalPages(response.data.total_pages);
  }

  useEffect(() => {
    loadPasswords(currentPage);
  }, [currentPage]);

  const handleChangeFile = useCallback(() => {
    if (inputFileRef.current?.files) {
      var reader = new FileReader();

      reader.onload = function (e: any) {
        setFile(e.target.result);
      };

      setNameFile(inputFileRef.current.files[0].name);

      reader.readAsDataURL(inputFileRef.current.files[0]);
    }
  }, [setFile, setNameFile]);

  const handleImportFile = useCallback(async () => {
    if (inputFileRef.current?.files?.length) {
      setImportFile(true);
      const fileData = new FormData();
      fileData.append("file", inputFileRef.current.files[0]);

      await api.post(
        "/passwords",
        fileData
      );

      loadPasswords(currentPage);
      inputFileRef.current.value = "";
      setNameFile("");
      setImportFile(false);
    }
  }, [currentPage, setImportFile, setNameFile]);

  const handleInactiveAll = useCallback(async () => {
    setInactiveAll(true);

    await api.patch(
      "/passwords/inactive/all"
    );

    loadPasswords(currentPage);

    setInactiveAll(false);
  }, [setInactiveAll, currentPage]);

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

          <Option>SENHAS</Option>
          <Line></Line>

          <InputFile
            ref={inputFileRef}
            type="file"
            id="filenfc"
            onChange={handleChangeFile}
          />
          <label htmlFor="filenfc">
            {nameFile ? nameFile : "Escolher arquivo"}
          </label>

          <ContainerGoBack>
            <Button onClick={handleImportFile}>
              {importFile ? "Importando..." : "Importar"}
            </Button>
            <Button onClick={handleInactiveAll}>
              {inactiveAll ? "Inativando..." : "Inativar todos"}
            </Button>
          </ContainerGoBack>

          <Line></Line>

          {content.map((cont) => {
            return <PasswordItem key={cont.id} item={cont} />;
          })}

          <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </Content>
      </ContainerLogin>
    </Container>
  );
};

export default Login;
