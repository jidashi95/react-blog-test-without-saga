import { Form } from 'react-bootstrap'
import { Button } from 'reactstrap'
import styled from 'styled-components'

export const PostUnit = styled.div`
margin: 10px auto;
max-width: 500px;
`;

export const PostImage = styled.div`
position: relative;
widht: 500px;
height: 250px;
`;

export const PostText = styled.div`
font-size: 15px;
`;

export const PostHeader = styled.div`
margin: 15px 0;
font-weight: bold;
font-size: 25px;
`;

export const PostDetails = styled.div`
color: grey;
margin-top: 10px;
margin-bottom: 10px;
`;

export const PostContent = styled.div`
color: grey;
font-weight: bold;
font-size: 15px;
text-align: justfy;
word-wrap: break-word;
margin: 15px 0;
`;

export const CommentWidget = styled(Form)`
width: 100%;
`;

export const PostButton = styled(Button)`
padding: 10px 20px;
margin: 10px 0;
border: none;
color: white;
font-size: 13px;
font-weight: bold;
font-color: white;
background-color: #ef5b5b;
min-width: 120px;
`;