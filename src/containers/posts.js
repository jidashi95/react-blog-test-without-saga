import React, { Component } from "react";
import Post from "./post";
import PropTypes from 'prop-types'
import { getPosts } from '../actions/api'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

class Posts extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    static propsTypes = {
        getPosts: PropTypes.func,
    }

    componentWillMount() {
      const { getPosts } = this.props
      getPosts()
    }

    renderPosts = () => {
        const { postsData } = this.props;
        console.log("PostData++", postsData)
        if ( !postsData || !postsData.length ) {
            return (
                <div>
                    No posts to display.
                </div>
            )
        }
        return (
        postsData.map((post, id) => (
            <Post key={id} 
            title={post.title}
            content={post.content}
            created_at={post.created_at} />
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
}

const mapStateToProps = (state) => ({
    postsData: state.entities.postsData
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
)(Posts)