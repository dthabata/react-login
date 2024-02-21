import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import * as C from './styles';

const DeleteAnimal = () => {
    const navigate = useNavigate();
    
    const [username, setUsername] = useState("");

    let { id } = useParams();

    const deleteAnimal = async () => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    
        const url = "http://localhost:5000/api-animal/delete";

        try {
            const response = await axios.delete(`${url}/${id}`);
            if (response.data['status'] === true) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const handleDeleteAnimal = async () => {
        const isSuccess = await deleteAnimal();

        if (isSuccess) {
            alert("Animal deletado sucesso!");
            navigate("/home");
            return;
        }
    };

    const signout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
    };

    useEffect(() => {
        setUsername(localStorage.name);
        deleteAnimal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <C.Subtitle>Você selecionou para deletar um animal do nosso banco de dados. Confirme a ação apertando o botão:</C.Subtitle>
            <C.Content>
                <Button Text="Deletar" onClick={handleDeleteAnimal} />
            </C.Content>
        </C.Container>
    );
};

export default DeleteAnimal;
