import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import * as C from './styles';

const EditAnimal = () => {
    const navigate = useNavigate();
    
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [breed, setBreed] = useState("");
    const [color, setColor] = useState("");
    const [age, setAge] = useState("");
    const [error, setError] = useState("");

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
            <C.Content>
                <Input
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => [setName(e.target.value), setError("")]}
                />
                <Input
                    type="text"
                    placeholder="Raça"
                    value={breed}
                    onChange={(e) => [setBreed(e.target.value), setError("")]}
                />
                <Input
                    type="text"
                    placeholder="Cor"
                    value={color}
                    onChange={(e) => [setColor(e.target.value), setError("")]}
                />
                <Input
                    type="text"
                    placeholder="Idade"
                    value={age}
                    onChange={(e) => [setAge(e.target.value), setError("")]}
                />
                <C.LabelError>{error}</C.LabelError>
                <Button Text="Salvar" />
            </C.Content>
        </C.Container>
    );
};

export default EditAnimal;
