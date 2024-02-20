import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import axios from 'axios';
import * as C from './styles';

const Details = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [animalDetail, setAnimalDetail] = useState([]);

    const signout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
    };

    useEffect(() => {
        setUsername(localStorage.name);
        handleAnimalDetail();
    }, []);

    const handleAnimalDetail = () => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    
        const url = "http://localhost:5000/api-animal/getById";

        axios.get(`${url}/1`)
        .then((response) => {
            console.log(response.data);
            setAnimalDetail(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    };

    return (
        <C.Container>
            <C.Header>
                <C.Title>Olá, {username}!</C.Title>
                <C.ButtonsRow>
                    <C.Button>
                        <Button Text="Sair" onClick={() => [signout(), navigate("/")]}>
                            Sair
                        </Button>
                    </C.Button>
                </C.ButtonsRow>
            </C.Header>
            <C.Subtitle>Esses são os detalhes do animal selecionado:</C.Subtitle>
            <C.Table>
                <ul>
                    <li><b>Nome:</b> {animalDetail.name}</li>
                    <li><b>Cor:</b> {animalDetail.color}</li>
                    <li><b>Raça:</b> {animalDetail.breed}</li>
                    <li><b>Idade:</b> {animalDetail.age}</li>
                </ul>
            </C.Table>
            <C.ButtonsRow>
                <Button Text="Editar" />
                <Button Text="Deletar" />
            </C.ButtonsRow>
        </C.Container>
    );
};

export default Details;
