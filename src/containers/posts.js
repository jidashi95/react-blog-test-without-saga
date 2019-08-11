import React, { Component } from "react";
import Post from "./post";
import PropTypes from 'prop-types'
import { getPosts, getPost } from '../actions/api'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { PostButton, PostUnit } from '../components/PostComponents'

class Posts extends Component {
    constructor(props) {
        super(props)
        this.state = {
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

    renderPosts = () => {
        const { postsData } = this.props;
        console.log( postsData )
        if ( !postsData || !postsData.length ) {
            return (
                <div>
                    No posts to display.
                </div>
            )
        }
        return (
        postsData.map((post) => (
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
        return(
            <div>
                {this.renderPosts()}
            </div>

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