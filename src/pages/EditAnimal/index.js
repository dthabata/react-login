import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import * as C from './styles';

const EditAnimal = () => {
    const navigate = useNavigate();
    
    const [username, setUsername] = useState("");

    let { id } = useParams();

    const signout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
    };

    useEffect(() => {
        setUsername(localStorage.name);
    }, []);

    return (
        <C.Container>
            <C.Header>
                <C.Title>Olá, {username}!</C.Title>
                <C.ButtonsRow>
                    <C.Button>
                        <Button Text="Voltar" onClick={() => [navigate(`/details/${id}`)]}>
                            Voltar
                        </Button>
                    </C.Button>
                    <C.Button>
                        <Button Text="Sair" onClick={() => [signout(), navigate("/")]}>
                            Sair
                        </Button>
                    </C.Button>
                </C.ButtonsRow>
            </C.Header>
            <C.Subtitle>Edite os detalhes do animal selecionado:</C.Subtitle>
            <C.ButtonsRow>
                <Button Text="Salvar" />
            </C.ButtonsRow>
        </C.Container>
    );
};

export default EditAnimal;
