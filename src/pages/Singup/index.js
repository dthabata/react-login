import React, { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as C from './styles';

const Signup = () => {
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

        try {
            const response = await axios.post("http://localhost:5000/api-user/register", registerUser);
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

    const handleSignup = async () => {
        if (!email | !emailConf | !senha) {
            setError("Preencha todos os campos");
            return;
        } else if (email !== emailConf) {
            setError("Os e-mails não são iguais");
            return;
        }

        const isSuccess = await signup(name, email, senha);

        if (isSuccess) {
            alert("Usuário cadatrado com sucesso!");
            navigate("/signin");
            return;
        }
        else {
            setError("Erro. Verifique se o e-mail já está em uso");
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
                        <Link to="/">Entre!</Link>
                    </C.Strong>
                </C.LabelSignin>
            </C.Content>
        </C.Container>
    );
};

export default Signup;
