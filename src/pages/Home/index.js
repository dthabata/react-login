import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import axios from 'axios';
import * as C from './styles';

const Home = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [animalTable, setAnimalTable] = useState([]);
    
    const signout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
    };

    useEffect(() => {
        setUsername(localStorage.name);
        handleDatabase();
    }, []);

    const handleDatabase = () => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    
        axios.get("http://localhost:5000/api-animal/getList")
            .then((response) => {
                console.log(response.data);
                setAnimalTable(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    };

    return (
        <C.Container>
            <C.Header>
                <C.Title>Olá, {username}! Temos {animalTable.length} animais no banco de dados.</C.Title>
                <C.ButtonsRow>
                    <C.Button>
                        <Button Text="Sair" onClick={() => [signout(), navigate("/")]}>
                            Sair
                        </Button>
                    </C.Button>
                    <C.Button>
                        <Button Text="Cadastrar novo animal" onClick={() => [signout(), navigate("/")]}>
                            Cadastrar novo animal
                        </Button>
                    </C.Button>
                </C.ButtonsRow>
            </C.Header>
            <C.Table>
                <ul id="lista">
                    { animalTable.map( (animal) => <li key="{animal.id}"><p>{ animal.name }</p></li>) }
                </ul>
            </C.Table>
        </C.Container>
    );
};

export default Home;
