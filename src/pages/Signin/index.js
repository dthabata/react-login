import React, { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as C from './styles';

const Signin = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");

    const  handleLogin = () => {
        if (!email | !senha) {
            setError("Preencha todos os campos");
            return;
        }

        const loginUser = {
            email: email,
            password: senha,
        }

        axios.post("http://localhost:5000/api-user/login", loginUser)
        .then((response) => {
            if (response.data['status'] === true){
                localStorage.setItem("token", response.data['token']);
                localStorage.setItem("name", response.data['name']);
                navigate("/home");
                return true;
            }
            return false;
        })
        .catch((error) => {
            console.log(error);
            setError("Usuário(a) ou senha inválidos");
        })
        return;
    };

    return (
        <C.Container>
            <C.Label>
                Signin
            </C.Label>
            <C.Content>
                <Input
                    type="email"
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChange={(e) => [setEmail(e.target.value), setError("")]}
                />
                <Input
                    type="password"
                    placeholder="Digite sua senha"
                    value={senha}
                    onChange={(e) => [setSenha(e.target.value), setError("")]}
                />
                <C.LabelError>{error}</C.LabelError>
                <Button Text="Entrar" onClick={handleLogin} />
                <C.LabelSignup>
                    Não tem uma conta?
                    <C.Strong>
                        <Link to="/signup">Registre-se!</Link>
                    </C.Strong>
                </C.LabelSignup>
            </C.Content>
        </C.Container>
    );
}

export default Signin;
