import React, { useCallback, useRef, useState } from 'react';
import Button from '../../components/ButtonOptions';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import { FiPower, FiEdit, FiPlusCircle } from 'react-icons/fi';
import {
    Container,
    ContainerLogin,
    Content,
    Background,
    Title,
    Option,
    Line,
    ContainerLogout,
    ButtonLogout,
    Avatar,
    InputFileBackground,
    InputFile
} from './styles';
import api from '../../services/api';
import { AxiosResponse } from 'axios';

interface UserAvatar {
    avatar_url: string;
    background_url: string;
}

const Login: React.FC = () => {
    const { signOut, user } = useAuth();
    const [background, setBackground] = useState<string>(user.background_url);
    const inputAvatarRef = useRef<HTMLInputElement>(null);
    const inputBackgroundRef = useRef<HTMLInputElement>(null);
    const [avatar, setAvatar] = useState<string>(user.avatar_url);
    const { addToast } = useToast();

    const handleSignOut = useCallback(() => {
        signOut();
    }, [signOut]);

    const handleChangeAvatar = useCallback(async () => {
        if (inputAvatarRef.current?.files) {
            const avatarData = new FormData();
            avatarData.append('avatar', inputAvatarRef.current.files[0]);
            const response: AxiosResponse<UserAvatar> = await api.patch(`/users/${user.id}/avatar`, avatarData);

            setAvatar(response.data.avatar_url);
            user.avatar_url = response.data.avatar_url;

            addToast({
                type: 'success',
                title: 'Avatar alterado',
                description: 'O avatar do fornecedor foi alterado com sucesso.'
            });
        }
    }, [setAvatar, addToast, user]);

    const handleChangeBackground = useCallback(async () => {
        if (inputBackgroundRef.current?.files) {
            const backgroundData = new FormData();
            backgroundData.append('background', inputBackgroundRef.current.files[0]);
            const response: AxiosResponse<UserAvatar> = await api.patch(`/users/${user.id}/background`, backgroundData);

            setBackground(response.data.background_url);
            user.background_url = response.data.background_url;

            addToast({
                type: 'success',
                title: 'Background alterado',
                description: 'O background do fornecedor foi alterado com sucesso.'
            });
        }
    }, [setBackground, addToast, user]);

    return (
        <Container>
            <ContainerLogin>
                <Background background_url={background}>
                    <Title>{user.nickname}</Title>

                    <InputFileBackground
                        ref={inputBackgroundRef}
                        type="file"
                        id="background"
                        name="background"
                        onChange={handleChangeBackground}
                    />
                    <label htmlFor="background"><FiEdit size={15} color='#FFFFFF' /></label>
                </Background>

                <Content>
                    <ContainerLogout>
                        <Avatar background={avatar}>
                            <InputFile
                                ref={inputAvatarRef}
                                type="file"
                                id="avatar"
                                name="avatar"
                                onChange={handleChangeAvatar}
                            />
                            <label htmlFor="avatar"><FiPlusCircle size={15} color='#FFFFFF' /></label>
                        </Avatar>

                        <ButtonLogout onClick={handleSignOut}>
                            <FiPower color="#FFF" />
                        </ButtonLogout>
                    </ContainerLogout>

                    <Option>
                        ESCOLHA UMA OPÇÃO
                    </Option>
                    <Line></Line>
                    <Button to="/products">Meus produtos</Button>
                    <Button to="/contents">Conteúdos</Button>
                    <Button to="/tags">Tags do produto</Button>
                    <Button to="/notifications">Notificações</Button>
                    <Button to="/tagnfc">Tags NFC</Button>
                    <Button to="/passwords">Passwords</Button>
                </Content>
            </ContainerLogin>
        </Container>
    );
}

export default Login;