import React, { Component } from "react";
import styled from 'styled-components';
import { Form, Row, Col } from "react-bootstrap"
import { PostButton } from '../components/MainComponents'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar} from '@fortawesome/free-solid-svg-icons'
import dateFormat from 'dateformat'


const PostUnit = styled.div`
    margin: 10px auto;
    max-width: 500px;
`;

const PostImage = styled.div`
    position: relative;
    widht: 500px;
    height: 250px;
`;

const PostText = styled.div`
    font-size: 15px;
`;

const PostHeader = styled.div`
    margin: 15px 0;
    font-weight: bold;
    font-size: 25px;
`;

const PostDetails = styled.div`
    color: grey;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const PostContent = styled.div`
    color: grey;
    font-weight: bold;
    font-size: 15px;
    text-align: justfy;
    margin: 15px 0;
`;

const CommentWidget = styled(Form)`
    width: 100%;
`;

const CommentInput = styled.input`
    width: 100%;
    height: 40px;
    margin: 8px 0;
    border: 1px solid grey;
    border-radius: 3px;
    ::placeholder {
        padding: 10px;
        color: grey;
        font-size: 15px;
    }
`;

const CommentContent = styled.textarea`
    width: 100%;
    height: 70px;
    margin: 8px 0;
    border: 1px solid grey;
    border-radius: 3px;
    ::placeholder {
        padding: 10px;
        color: grey;
        font-size: 15px;
    }
`;

class Post extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showFlag: false,
            article_img: 'pics/post1.jpg',
        }
    }

    getPostContent = () => {
        const { showFlag } = this.state;
        const { content } = this.props;
        //console.log ("++++", content.slice(0, 100))
        //const length = Math.min( content.length, 200 );
        var result = content;
        if (showFlag === false) {
            result = content.slice(0, 200);
            if (content.length > 200) {
                result = result + '...';
            }
        }
        return (
            result
        )
    }

    changeViewMode = () => {
        const { showFlag } = this.state;
        if (showFlag === true) {
            this.setState({ showFlag: false })
        }
        else {
            this.setState({ showFlag: true })
        }
    }

    postDescription = () => {
        const { created_at } = this.props;

        const result = dateFormat( created_at, "mmmm d, yyyy" )

        return (
            <div>
                <FontAwesomeIcon color={'#ef5b5b'} 
                icon={faCalendar} /><span style={{color: 'grey'}}>{` ${result}`}</span>
            </div>
        )
    }

    render() {
        const { title } = this.props;
        const { article_img, showFlag } = this.state;
        return (            
            <PostUnit>
                <PostDetails>
                    {this.postDescription()}
                </PostDetails>
                <PostImage>
                    <img src={article_img}
                        style={{ width: '100%', height: '100%' }}
                        alt="" />
                </PostImage>
                <PostText>
                    <PostHeader>
                        {title}
                    </PostHeader>
                    <PostContent>
                        {this.getPostContent()}
                    </PostContent>
                </PostText>
                <PostButton onClick={this.changeViewMode}>
                    {showFlag === true ? 'HIDE' : 'READ MORE'}
                </PostButton>
                {showFlag === true &&
                    <CommentWidget>
                        <Row>
                            <Col xs={6} style={{ paddingRight: '8px' }}><CommentInput placeholder="Name" name="name" /></Col>
                            <Col xs={6} style={{ paddingLeft: '8px' }}><CommentInput placeholder="Email" name="email" /></Col>
                        </Row>
                        <CommentInput placeholder="Title" name="title" />
                        <CommentContent placeholder="Comments" name="comments" />
                    </CommentWidget>}
            </PostUnit>            
        )
    }
}

export default Post