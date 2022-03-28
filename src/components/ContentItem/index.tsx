import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { Container, ContainerPropsItem, LinkContent } from "./styles";

interface IContent {
  id: string;
  description: string;
  type: string;
  background_url: string;
  product_id: string;
  type_text: string;
}

interface ContentItemProps {
  item: IContent;
  onDelete?(id: string): Promise<void>;
}

const ContentItem: React.FC<ContentItemProps> = ({ item, onDelete }) => {
  return (
    <Container background={item.background_url}>
      <LinkContent
        to={
          item.type === "P"
            ? `productscontentphotos/${item.id}`
            : `productscontentvideos/${item.id}`
        }
      >
        <ContainerPropsItem>
          <span>{item.description}</span>
          <span>{item.type_text}</span>
        </ContainerPropsItem>
      </LinkContent>
      {onDelete && (
        <FiTrash2
          onClick={() => {
            onDelete(item.id);
          }}
          cursor="pointer"
          color="red"
          size={30}
          style={{ marginLeft: 10 }}
        />
      )}
    </Container>
  );
};

export default ContentItem;
