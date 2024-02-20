import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import * as C from './styles';

const Home = () => {
    const signout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
    };

    const navigate = useNavigate();

    return (
        <C.Container>
            <C.Content>
                <C.Title>Home</C.Title>
                <Button Text="Sair" onClick={() => [signout(), navigate("/")]}>
                    Sair
                </Button>
            </C.Content>
        </C.Container>
    );
};

export default Home;
