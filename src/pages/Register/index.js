import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import Button from '../../components/Button';
import axios from 'axios';
import * as C from './styles';

const RegisterAnimal = () => {
    const navigate = useNavigate();
    
    const [username, setUsername] = useState("");

    const [name, setName] = useState("");
    const [breed, setBreed] = useState("");
    const [color, setColor] = useState("");
    const [age, setAge] = useState("");
    const [error, setError] = useState("");

    const handleRegisterAnimal = () => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    
        const createAnimal = {
            name: name,
            breed: breed,
            age: age,
            color: color,
        }

        const getCircularReplacer = () => {
            const seen = new WeakSet();
            return (value) => {
            if (typeof value === 'object' && value !== null) {
                if (seen.has(value)) {
                    return;
                }
                seen.add(value);
            }
            return value;
            };
        };
        
        axios.post("http://localhost:5000/api-animal/create", createAnimal)
        .then((response) => {
            JSON.stringify(response.data, getCircularReplacer());
            alert("Animal criado com sucesso!");
            navigate("/home");
        })
        .catch((error) => {
            console.log(error);
            setError("Erro. Verifique se as informações estão corretas");
        })
    };

    const signout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
    };

    useEffect(() => {
        setUsername(localStorage.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
            <C.Subtitle>Crie um novo animal:</C.Subtitle>
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
                    <Button Text="Salvar" onClick={handleRegisterAnimal} />
                </C.Form>
            </C.Content>
        </C.Container>
    );
};

export default RegisterAnimal;
