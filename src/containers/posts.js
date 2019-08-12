import React, { Component } from "react";
import Post from "./post";
import PropTypes from 'prop-types'
import { getPosts, getPost } from '../actions/api'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { PostButton, PostUnit } from '../components/PostComponents'
import { Row, Col } from 'react-bootstrap'
import { ContainerTitle } from "../components/MainComponents";
import { Button } from 'reactstrap'
import { orderBy } from 'lodash'
import styled from 'styled-components'
import DatePicker from "react-datepicker";
import AddPost from "./addPost";
import "react-datepicker/dist/react-datepicker.css";

const PostsContainer = styled.div`
    margin: 10px;
    width: 100%;
`;

const ControlContainer = styled.div`
    margin: 10px;
    width: 100%;
`;

const ControlUnitContainer = styled.div`
    margin: 10px;
    padding: 10px;
    width: 100%;
    border: 1px solid #ccc;
`;

const PostViewContainer = styled.div`
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const SortButton = styled(Button)`
    width: 100%;
    text-align: center;
    font-size: 15px;
    font-weight: bold;
    border: 1px solid #ef5b5b;
    color: black;
    background-color: white;
`;

const ControlUnitContailer = styled.div`
    width: 100%;
    margin 25px 0px;
`;

const DatePickContainer = styled.div`
    width: 100%;
    color: black;
    font-size: 15px;
    font-weight: bold;
    margin: 10px 0;
`;

class Posts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sortOrder: 0,
            filterFlag: false,
            startDate: new Date(),
            endDate: new Date(),
        }
    }

    static propsTypes = {
        getPosts: PropTypes.func,
        getPost: PropTypes.func,
        history: PropTypes.object
    }

    componentWillMount() {
      const { getPosts } = this.props
      getPosts()
    }

    readPostMore = (id) => {
        const { history, getPost } = this.props

        getPost( id ).then( res => {
            history.push(`/posts/${id}`)
        })
    }

    sortPostNewst = () => {
        this.setState({sortOrder: 0});
    }

    sortPostOldest = () => {
        this.setState({sortOrder: 1});
    }

    onStartDateChange = (date) => {
        this.setState({ startDate: date, filterFlag: false })
    }

    onEndDateChange = (date) => {
        this.setState({ endDate: date, filterFlag: false })
    }

    filterPost = () => {
        const { startDate, endDate } = this.state;
        this.setState({ filterFlag: true })
    }

    renderPosts = () => {
        const { postsData } = this.props;
        const { sortOrder, filterFlag, startDate, endDate } = this.state;
        if ( !postsData || !postsData.length ) {
            return (
                <div>
                    No posts to display.
                </div>
            )
        }
        var postData = orderBy( postsData, ["created_at"], [sortOrder ? 'asc' : 'desc'])
        if ( filterFlag === true ) {
            postData = postData.filter((item) => {
                let t =new Date(item.created_at).getTime()
                return t >= new Date(startDate).getTime() &&
                t <= new Date(endDate).getTime();
            });
        }

        return (
        postData.map((post) => (  
            <PostUnit key={post.id}>
                <Post 
                id={post.id} 
                title={post.title}
                content={post.content}
                created_at={post.created_at}
                showFlag={false} />
                <PostButton onClick={() => this.readPostMore(post.id)}>
                    READ MORE
                </PostButton>
            </PostUnit>
        )))
    }

    render() {
        const { sortOrder } = this.state
        return(
            <PostViewContainer>
                <Row>
                    <Col xs={9} >
                        <PostsContainer>
                            {this.renderPosts()}
                        </PostsContainer>
                    </Col>
                    <Col xs={3}>
                        <ControlContainer>
                            <ControlUnitContainer>
                                <ContainerTitle>Add Post</ContainerTitle>
                                <AddPost style={{display: 'inline'}}/>
                            </ControlUnitContainer>
                            <ControlUnitContainer>
                                <ContainerTitle>Filter Using Range</ContainerTitle>
                                <ControlUnitContailer>
                                    <DatePickContainer>
                                    Start Date: <DatePicker
                                    selected={this.state.startDate}
                                    onChange={this.onStartDateChange}/>
                                    </DatePickContainer>
                                    <DatePickContainer>
                                    End Date: <DatePicker
                                    selected={this.state.endDate}
                                    onChange={this.onEndDateChange}/>
                                    </DatePickContainer>
                                    <PostButton onClick={this.filterPost}>Filter</PostButton>
                                </ControlUnitContailer>
                            </ControlUnitContainer>
                            <ControlUnitContainer>
                                <ContainerTitle>Sort</ContainerTitle>
                                <ControlUnitContailer>
                                    <Row>
                                        <Col xs={6} style={{ paddingRight: '0px' }}>
                                            <PostButton 
                                            color={sortOrder === 0 ? 'danger' : 'white'  }
                                            onClick={this.sortPostNewst}>
                                                Newest
                                            </PostButton>
                                        </Col>
                                        <Col xs={6} style={{ paddingLeft: '0px' }}>
                                            <PostButton
                                            color={sortOrder === 1 ? 'danger' : 'white'  }
                                            onClick={this.sortPostOldest}>
                                                Oldest
                                            </PostButton>
                                        </Col>
                                    </Row>
                                </ControlUnitContailer>
                            </ControlUnitContainer>
                        </ControlContainer>
                    </Col>
                </Row>
            </PostViewContainer>

        )
    }
}

const mapDispatchToProps = {
    getPosts,
    getPost,
}

const mapStateToProps = (state) => ({
    postsData: state.entities.postsData
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
)(Posts)