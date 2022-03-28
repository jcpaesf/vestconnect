import styled from "styled-components";
import { Link } from "react-router-dom";
interface ContainerProps {
  background: string;
}

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  a {
    max-width: 130px;
    color: #fff;
    text-decoration: none;
    font-size: 10px;
  }
`;

export const Container = styled.div<ContainerProps>`
  width: 100%;
  display: flex;
  min-height: 325px;
  background: ${(props) => `url(${props.background}) no-repeat`};
  background-size: 100% 100%;
  background-position: top;
  justify-content: flex-end;
  padding: 0 20px;
`;

export const ContainerPropsPhoto = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  flex-direction: column;

  span {
    font-size: 12px;
    width: 100%;
    margin-bottom: 10px;
  }
`;

export const LinkContent = styled(Link)`
  text-decoration: none;
  color: #fff;
`;

export const ContainerAction = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 0px;
`;
