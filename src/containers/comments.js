import React, { Component } from "react";
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Row, Col } from "react-bootstrap"
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { getComments } from '../actions/api'
import dateFormat from 'dateformat'

const ContainerTitle = styled.div`
    font-size: 15px;
    font-weight: bold;

`;

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

const CommentContainer = styled.div`
    width: 100%;
    height: 100%;
`;

const AuthorName = styled.span`
    font-size: 15px;
    font-weight: bold;
`;

const CreatedInfo = styled.div`
    margin: 15px 0;
`;

const CommentText = styled.span`
    font-size: 15px;
    font-style: italic;
    font-weight: light;
    color: grey;
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
        console.log("post id herer", id)
        getComments( id )
    }

    render() {
        const { commentsData } = this.props;
        console.log("here is commnetDAta", commentsData)
        if ( !commentsData || !commentsData.length ) {
            return (
                <div>
                    No posts to display.
                </div>
            )
        }
        return (
            <div>
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
                            <CommentContainer>
                                <CreatedInfo>
                                    <AuthorName>
                                        {comment.name}
                                    </AuthorName>
                                    <CommentText>
                                        {`  ${dateFormat(comment.created_at, "hh:mm a")}   |   
                                        ${dateFormat(comment.created_at, "mmm dd, yyyy")}`}
                                    </CommentText>
                                </CreatedInfo>
                                "<CommentText>
                                    {comment.message}
                                </CommentText>"
                            </CommentContainer>
                        </Col>
                    </Row>
                </CommentUnit>
            ))}
            </div>
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