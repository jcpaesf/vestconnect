import React, { useCallback } from 'react';
import ButtonAction from '../ButtonAction';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import {
    ContainerPropsItem
} from './styles';

interface IContent {
    id: string;
    description: string;
    product_id: string;
}

interface ContentItemProps {
    item: IContent;
}

const ContentItem: React.FC<ContentItemProps> = ({ item }) => {
    const history = useHistory();

    const handleDeleteTag = useCallback(async (id: string) => {
        await api.delete(`/productstags/${id}`);

        history.push(`/dashboard`);
    }, [history]);

    return (
        <ContainerPropsItem>
            <span>{item.description}</span>
            <ButtonAction onClick={() => handleDeleteTag(item.id)}>Excluir</ButtonAction>
        </ContainerPropsItem>
    );
}

export default ContentItem;