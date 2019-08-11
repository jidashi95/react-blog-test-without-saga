import React, { Component } from "react";
import Post from './post'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Row, Col } from "react-bootstrap"
import PropTypes from 'prop-types'
import { TitleInput, ContentArea } from '../components/MainComponents'
import { PostButton,
        PostUnit,
        CommentWidget } from '../components/PostComponents'
import { getPost, getComments, leaveComment } from '../actions/api'
import Comments from './comments'

class PostDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            message: '',
        }
    }

    static propsTypes = {
        getPost: PropTypes.func,
        getComments: PropTypes.func,
        leaveComment: PropTypes.func
    }

    componentWillMount() {
        const { getPost } = this.props;
        const postId = this.props.match.params.id;
        getPost(postId)
    }

    onLeaveComments = (id) => {
        const { leaveComment } = this.props;
        const { name, message } = this.state;
        const values = {
            name: name,
            message: message,
        }
        console.log("???", id, values)
        leaveComment(id, values)
    }

    onNameChange = (e) => {
        console.log( e.target.value )
        this.setState({ name: e.target.value })
    }

    onMessageChange = (e) => {
        console.log( e.target.value )
        this.setState({ message: e.target.value })
    }

    render() {
        const { postData } = this.props;
        if( !postData || !postData.id ) {
            return (
                <div>
                    No post to display.
                </div>
            )
        }
        const { id, title, content, created_at } = postData;
        return (
            <PostUnit>
                <div>here is id of post {id}</div>
                <Post 
                id={id}
                title={title}
                content={content}
                created_at={created_at}
                showFlag={true}/>
                <CommentWidget>
                    <Row>
                        <Col xs={6} style={{ paddingRight: '8px' }}><TitleInput placeholder="Name" onChange={this.onNameChange} name="name" /></Col>
                        <Col xs={6} style={{ paddingLeft: '8px' }}><TitleInput placeholder="Email" name="email" /></Col>
                    </Row>
                    <TitleInput placeholder="Title" name="title" />
                    <ContentArea placeholder="Message" onChange={this.onMessageChange} name="message" />
                </CommentWidget>
                <PostButton onClick={() => this.onLeaveComments(id)}>Leave Comment</PostButton>
                <Comments id={id}/>
            </PostUnit>
        )
    }
}

            
const mapDispatchToProps = {
  leaveComment,
  getPost,
}

const mapStateToProps = (state) => ({
    postData: state.entities.postData,
    commentsData: state.entities.commentsData,
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
)(PostDetail)