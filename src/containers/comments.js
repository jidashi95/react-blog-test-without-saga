import React, { Component } from "react";
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Row, Col } from "react-bootstrap"
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { getComments } from '../actions/api'
import { ContainerTitle } from '../components/MainComponents'
import dateFormat from 'dateformat'
import Time from 'react-time-format'

const CommentUnit = styled.div`
    width: 100%;
    border-bottom: 1px solid #ccc;
    padding: 20px 0;
    padding-right: 50px;
`;

const AuthorImage = styled.div`
    width: 70px;
    height: 70px;
`;

const CommentContentContainer = styled.div`
    width: 100%;
    height: 100%;
`;

const CommentText = styled.span`
    word-wrap: break-word;
    font-size: 15px;
    font-style: italic;
    font-weight: light;
    color: grey;
`;

const CreatedInfoContainer = styled.div`
    margin: 15px 0;
    font-weight: light;
    font-size: 15px;
    color: grey;
`;

const AuthorName = styled.span`
    font-size: 15px;
    font-weight: bold;
    color: black;
`;

const CreatedInfo = styled.span`
    font-style: italic;
    margin: 0 20px;
`;

const CommentContainer = styled.div`
    width: 100%;
    margin: 60px 0px;
`;



class Comments extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    static propsTypes = {
        getPost: PropTypes.func,
        getComments: PropTypes.func,
        leaveComment: PropTypes.func
    }

    componentWillMount() {
        const { getComments } = this.props;
        const { id } = this.props;
        getComments( id )
    }

    render() {
        const { commentsData } = this.props;
        if ( !commentsData || !commentsData.length ) {
            return (
                <div>
                    No Comments to display.
                </div>
            )
        }
        return (
            <CommentContainer>
            <ContainerTitle>
                Comments ({commentsData.length})
            </ContainerTitle>
            {commentsData.map((comment) => (
                <CommentUnit key={comment.id}>
                    <Row>
                        <Col xs={3} style={{ paddingRight: '8px' }}>
                            <AuthorImage>
                                <img src={'/pics/person1.jpg'}
                                style={{ width: '100%', height: '100%', borderRadius: '50%'}}
                                alt="" />
                            </AuthorImage>
                        </Col>
                        <Col xs={9} style={{ paddingLeft: '8px' }}>
                            <CommentContentContainer>
                                <CreatedInfoContainer>
                                    <AuthorName>
                                        {comment.name}
                                    </AuthorName>
                                    <CreatedInfo><Time value={comment.created_at} format="hh:mm"/></CreatedInfo>|
                                    <CreatedInfo>{dateFormat(comment.created_at, "mmm dd, yyyy")}</CreatedInfo>
                                </CreatedInfoContainer>
                                "<CommentText>
                                    {comment.message}
                                </CommentText>"
                            </CommentContentContainer>
                        </Col>
                    </Row>
                </CommentUnit>
            ))}
            </CommentContainer>
        )
    }
}
            
const mapDispatchToProps = {
  getComments,
}

const mapStateToProps = (state) => ({
    commentsData: state.entities.commentsData,
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(Comments)