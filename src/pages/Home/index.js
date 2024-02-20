import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import * as C from './styles';

const Home = () => {

    const signout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
    };

    const user = localStorage.name;

    const navigate = useNavigate();

    return (
        <C.Container>
            <C.Header>
                <C.Title>Olá, {user}!</C.Title>
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
            <C.Subtitle>Esses são os animais cadastrados em nosso banco de dados:</C.Subtitle>
            <C.Table>
                <ul id="lista">
                    <li>
                        <p>Animal 1</p>
                    </li>
                    <li>
                        <p>Animal 2</p>
                    </li>
                    <li>
                        <p>Animal 3</p>
                    </li>
                    <li>
                        <p>Animal 4</p>
                    </li>
                </ul>
            </C.Table>
        </C.Container>
    );
};

export default Home;
