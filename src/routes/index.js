import { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home'
import Details from '../pages/Details';
import EditAnimal from '../pages/EditAnimal';
import DeleteAnimal from '../pages/DeleteAnimal';
import RegisterAnimal from '../pages/Register';
import Signin from '../pages/Signin';
import Signup from '../pages/Singup';

const Private = ({ Item }) => {
    const token = localStorage.getItem("token");

    if (token && token.length > 0){
        return <Item />
    }
    return <Signin />
}

const RoutesApp = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <Routes>
                    <Route exact path="/home" element={<Private Item={Home} />} />
                    <Route exact path="/details/:id" element={<Private Item={Details} />} />
                    <Route exact path="/editanimal/:id" element={<Private Item={EditAnimal} />} />
                    <Route exact path="/deleteanimal/:id" element={<Private Item={DeleteAnimal} />} />
                    <Route exact path="/register" element={<Private Item={RegisterAnimal} />} />
                    <Route path="/" element={<Signin />} />
                    <Route exact path="/signup" element={<Signup />} />
                    <Route path="*" element={<Signin />} />
                </Routes>
            </Fragment>
        </BrowserRouter>
    );
}

export default RoutesApp;
