import styled from 'styled-components'

export const MainContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
min-height: 100vh;
`;

export const MainWidget = styled.div`
text-align: center;
background-color: white;
border-radius: 5px;
padding-bottom: 20px;
width: 33.33%;
max-width: 400px;
`;

export const MainHeader = styled.div`
background-image: linear-gradient(to right, rgba(174,68,192), rgba(118,27,156));
box-shadow: 5px 25px 20px 0 rgba(0, 0, 0, 0.2);
border-radius: 2px;
margin: -20px 10px 0px;
height: 80px;
color: white;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

export const MainButton = styled.button`
width: 33.33%;
height: 45px;
margin: 15px 0;
border: none;
border-radius: 3px;
color: white;
background-color: RGB(130, 40, 167);
font-size: 12px;
`;