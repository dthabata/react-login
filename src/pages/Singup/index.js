import React, { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Link, useNavigate } from 'react-router-dom';
// import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import * as C from './styles';

const Signup = () => {
    // const { signup } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [emailConf, setEmailConf] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");

    const signup = async (name, email, password) => {

        const registerUser = {
            name: name,
            email: email,
            password: password,
        }
    
        await axios.post("http://localhost:5000/api-user/register", registerUser)
        .then((response) => {
            console.log("==== RESPONSE:");
            console.log(response.data);
            console.log("==========");
            if (response.data['status'] === true) {
                return true;
            } else {
                setError(response.data['message']);
                return false;
            }
        })
        .catch((error) => {
            console.log(error, "DEU ERRO!");
            setError(error);
            return false;        
        })
    };

    const handleSignup = async () => {
        if (!email | !emailConf | !senha) {
            setError("Preencha todos os campos");
            return;
        } else if (email !== emailConf) {
            setError("Os e-mails não são iguais");
            return;
        }

        try {
            await signup(name, email, senha);
            alert("Usuário cadatrado com sucesso!");
            navigate("/signin");
            return;
        } catch(err) {
            console.log(err);
            setError("Falha ao cadastrar usuário(a), verifique se este e-mail já não foi cadastrado");
        }
    };

    return (
        <C.Container>
            <C.Label>Signup</C.Label>
            <C.Content>
                <Input
                    type="text"
                    placeholder="Digite seu nome"
                    value={name}
                    onChange={(e) => [setName(e.target.value), setError("")]}
                />
                <Input
                    type="email"
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChange={(e) => [setEmail(e.target.value), setError("")]}
                />
                <Input
                    type="email"
                    placeholder="Confirme seu e-mail"
                    value={emailConf}
                    onChange={(e) => [setEmailConf(e.target.value), setError("")]}
                />
                <Input
                    type="password"
                    placeholder="Digite sua senha"
                    value={senha}
                    onChange={(e) => [setSenha(e.target.value), setError("")]}
                />
                <C.LabelError>{error}</C.LabelError>
                <Button Text="Inscrever-se" onClick={handleSignup} />
                <C.LabelSignin>
                    Já tem uma conta?
                    <C.Strong>
                        <Link to="/">&nbsp;Entre</Link>
                    </C.Strong>
                </C.LabelSignin>
            </C.Content>
        </C.Container>
    );
};

export default Signup;
