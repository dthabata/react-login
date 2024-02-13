import React, { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Link, useNavigate } from 'react-router-dom';
// import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import * as C from './styles';

const Signin = () => {
    // const { signin } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");

    const  handleLogin = async () => {
        if (!email | !senha) {
            setError("Preencha todos os campos");
            return;
        }

        const loginUser = {
            email: email,
            password: senha,
        }

        console.log("================= REQUEST:");
        console.log(loginUser)

        let isSigned = await axios.post("http://localhost:5000/api-user/login", loginUser)
        .then((response) => {
            console.log("==== RESPONSE:");
            console.log(response.data);
            console.log("==========");
            if (response.data['status'] === true){
                localStorage.setItem("token", response.data['token']);
                localStorage.setItem("name", response.data['name']);
                console.log("qualquer coisa para teste 2");
                return true;
            }
            return false;
        })
        .catch((error) => {
            console.log(error, "DEU ERRO!");
            return false;        
        })
    
        console.log("usuário(a) logou:", isSigned);
        
        if (isSigned) {
            navigate("/home");
        }

        setError("Usuário(a) ou senha inválidos");
        return;
    };

    return (
        <C.Container>
            <C.Label>
                Login
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
                        <Link to="/signup">&nbsp;Registre-se</Link>
                    </C.Strong>
                </C.LabelSignup>
            </C.Content>
        </C.Container>
    );
}

export default Signin;
