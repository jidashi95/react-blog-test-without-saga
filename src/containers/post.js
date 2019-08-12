import React, { Component } from "react";
import { PostDetails, 
        PostText, 
        PostHeader, 
        PostContent, 
        PostImage, } from '../components/PostComponents'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar} from '@fortawesome/free-solid-svg-icons'
import dateFormat from 'dateformat'

class Post extends Component {

    constructor(props) {
        super(props)
        const { id } = this.props
        this.state = {
            showFlag: false,
            article_img: `/pics/post${id % 3 + 1}.jpg`,
        }
    }

    getPostContent = () => {
        const { showFlag, content } = this.props;
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
        const { article_img } = this.state;
        return (            
            <div>
                <PostImage>
                    <img src={article_img}
                        style={{ width: '100%', height: '100%' }}
                        alt="" />
                </PostImage>
                <PostDetails>
                    {this.postDescription()}
                </PostDetails>
                <PostText>
                    <PostHeader>
                        {title}
                    </PostHeader>
                    <PostContent>
                        {this.getPostContent()}
                    </PostContent>
                </PostText>
            </div>            
        )
    }
}

export default Post