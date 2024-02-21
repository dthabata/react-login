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

export const ButtonsRow = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    gap: 10px;
`;

export const Button = styled.div``;

export const Title = styled.h3``;

export const Subtitle = styled.p`
    margin-bottom: 10px;
`;

export const Table = styled.div`
    display: flex;
    align-items: center;
    justify-content: initial;
    width: 100%;
    padding: 10px;
    margin-left: 10px;
`;

export const AnimalList = styled.div`
    margin-bottom: 15px;
    cursor: pointer;
    text-decoration: underline;
`;
