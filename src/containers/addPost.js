import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { compose } from "redux"
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import { createPost, getPosts } from '../actions/api'
import { TitleInput, ContentArea } from '../components/MainComponents'
import { PostButton } from '../components/PostComponents'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

const MyModal = styled(Modal)`
  position: relative;
  display: inline-block;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 4px 16px rgba(0, 0, 0, .5);
  min-width: $modal-xs-width;
  white-space: normal;
  padding: 20px 10px;
`;

const ModalHeader = styled.div`
  min-height: $modal-header-height;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
  position: relative;
`;

const ModalTitle = styled.span`
  font-weight: 200;
  color: #222;
  letter-spacing: -.02em;
  font-size: 18px;

  &.ellipsis {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
  }
`;

const CloseButton = styled(Button)`
  float: right;
  background-color: white;
  margin-top: -5px;
  align-text: center;
  font-size: 25px;
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &:hover, &:focus {
      opacity: 0.5;
  }
`;

const ModalBody = styled.div`
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;

`;

const ModalFooter = styled.div`
  float: right;
`;

const ModalButton = styled(Button)`
  float: right;
  margin: 10px;
  width: 100px;
  font-size: 15px;
  font-weight: bold;
`;

class AddPost extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      title: null,
      content: null,
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  static propsTypes = {
    createPost: PropTypes.func,
    getPosts: PropTypes.func,
  };

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  onTitleChange = (e) => {
    this.setState({ title: e.target.value });
  }

  onContentChange = (e) => {
    this.setState({ content: e.target.value });
  }

  addNewPost = () => {
    const { createPost, getPosts } = this.props;
    const { title, content } = this.state;
    const values = { 
      title: title,
      content: content
    };

    createPost(values).then( res => {
      getPosts();
      this.setState({ modalIsOpen: false });
    })
  }

  render() {
    return (
      <div style={{ display: 'inline' }}>
        <PostButton onClick={this.openModal}>Add Listing</PostButton>
        <MyModal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <ModalHeader>
            <ModalTitle >Add Post</ModalTitle>
            <CloseButton color='white' onClick={this.closeModal}>&times;</CloseButton>
          </ModalHeader>
          <ModalBody>
            <label>Title</label>
            <TitleInput name="title" placeholder="title"
              onChange={this.onTitleChange} />
            <label>Content</label>
            <ContentArea name="content" placeholder="content"
              onChange={this.onContentChange} />
          </ModalBody>
          <ModalFooter>
            <ModalButton color='danger' onClick={this.closeModal}>Cancel</ModalButton>
            <ModalButton color='primary' onClick={this.addNewPost}>Add</ModalButton>
          </ModalFooter>
        </MyModal>
      </div>
    );
  }
}

const mapDispatchToProps = {
  createPost,
  getPosts,
}

export default compose(
  connect( null, mapDispatchToProps ),
)(AddPost)