import React from "react";
import { FiTrash2 } from "react-icons/fi";
import {
  Container,
  ContainerPropsPhoto,
  Content,
  ContainerAction,
} from "./styles";

interface IContent {
  id: string;
  title: string;
  description: string;
  file_url: string;
  background_url: string;
}

interface ContentItemVideoProps {
  item: IContent;
  onDelete?(id: string): Promise<void>;
}

const ContentItemVideo: React.FC<ContentItemVideoProps> = ({
  item,
  onDelete,
}) => {
  return (
    <Content>
      <Container background={item.background_url}>
        <ContainerPropsPhoto>
          <span>{item.description}</span>
        </ContainerPropsPhoto>
      </Container>
      <ContainerAction>
        <a href={item.file_url} target="_blank" rel="noopener noreferrer">
          Visualizar vídeo
        </a>
        {onDelete && (
          <FiTrash2
            onClick={() => {
              onDelete(item.id);
            }}
            cursor="pointer"
            color="red"
            size={15}
            style={{ marginLeft: 10 }}
          />
        )}
      </ContainerAction>
    </Content>
  );
};

export default ContentItemVideo;
