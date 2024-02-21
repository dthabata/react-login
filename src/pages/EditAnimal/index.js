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

    const editAnimal = async (name, breed, age, color) => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    
        const updateAnimal = {
            name: name,
            breed: breed,
            age: age,
            color: color,
        }

        const url = "http://localhost:5000/api-animal/update";

        try {
            const response = await axios.put(`${url}/${id}`, updateAnimal);
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

    const handleEditAnimal = async () => {
        if (!name | !breed | !age | !color) {
            setError("Preencha todos os campos");
            return;
        }

        const isSuccess = await editAnimal(name, breed, age, color);

        if (isSuccess) {
            alert("Animal editado com sucesso!");
            navigate("/home");
            return;
        }
        else {
            setError("Erro. Verifique se as informações estão corretas");
        }
    };

    const signout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
    };

    useEffect(() => {
        setUsername(localStorage.name);
        editAnimal();
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
            <C.Subtitle>Edite os detalhes do animal selecionado:</C.Subtitle>
            <C.Content>
                <C.Form>
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
                        type="number"
                        placeholder="Idade"
                        value={age}
                        onChange={(e) => [setAge(e.target.value), setError("")]}
                    />
                    <Input
                        type="text"
                        placeholder="Cor"
                        value={color}
                        onChange={(e) => [setColor(e.target.value), setError("")]}
                    />
                    <C.LabelError>{error}</C.LabelError>
                    <Button Text="Salvar" onClick={handleEditAnimal} />
                </C.Form>
            </C.Content>
        </C.Container>
    );
};

export default EditAnimal;
