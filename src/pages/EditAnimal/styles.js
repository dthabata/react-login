import styled from 'styled-components';

export const Container = styled.div`
    margin: 0;
    padding: 10px;
    height: 100vh;
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    width: 100%;
`;

export const Title = styled.h3`
    margin-top: -10px;
`;

export const ButtonsRow = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;
`;

export const Button = styled.div`
`;

export const Subtitle = styled.p`
    margin-top: -10px;
    margin-bottom: 5px;
`;

export const Content = styled.div`
    gap: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    box-shadow: 0 1px 2px #0003;
    background-color: white;
    max-width: 350px;
    padding: 20px;
    border-radius: 5px;

    Button {
        margin-bottom: 10px;
    }
`;

export const LabelError = styled.label`
    font-size: 14px;
    color: red;
`;