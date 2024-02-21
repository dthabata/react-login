import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import * as C from './styles';

const Details = () => {
    const navigate = useNavigate();
    
    const [username, setUsername] = useState("");
    const [animalDetail, setAnimalDetail] = useState([]);
    
    let { id } = useParams();
    
    const signout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
    };

    useEffect(() => {
        setUsername(localStorage.name);
        handleAnimalDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleAnimalDetail = () => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    
        const url = "http://localhost:5000/api-animal/getById";

        axios.get(`${url}/${id}`)
        .then((response) => {
            console.log(response.data);
            setAnimalDetail(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    };

    const openEdit = (id) =>{
        navigate(`/editanimal/${id}`);
    }

    return (
        <C.Container>
            <C.Header>
                <C.Title>Olá, {username}!</C.Title>
                <C.ButtonsRow>
                    <C.Button>
                        <Button Text="Voltar" onClick={() => [navigate("/home")]}>
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
            <C.Subtitle>Esses são os detalhes do animal selecionado:</C.Subtitle>
            <C.Table>
                <ul>
                    <C.AnimalDetailList><b>Nome:</b> {animalDetail.name}</C.AnimalDetailList>
                    <C.AnimalDetailList><b>Raça:</b> {animalDetail.breed}</C.AnimalDetailList>
                    <C.AnimalDetailList><b>Cor:</b> {animalDetail.color}</C.AnimalDetailList>
                    <C.AnimalDetailList><b>Idade:</b> {animalDetail.age}</C.AnimalDetailList>
                </ul>
            </C.Table>
            <C.ButtonsRow>
                <Button Text="Editar" onClick={() => [openEdit(id)]} />
                <Button Text="Deletar" />
            </C.ButtonsRow>
        </C.Container>
    );
};

export default Details;
