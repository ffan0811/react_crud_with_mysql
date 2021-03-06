import React, { Component } from 'react';
import axios from 'axios';

class Comment extends Component{
    state = {
        comment: {
            comment_id: this.props.comment.idx,
            post_id: this.props.comment.post_id,
            group_number: this.props.comment.group_number,
            group_order: this.props.comment.group_order,
            depth: this.props.comment.depth,
            parent_id: this.props.comment.parent_id,
            content: this.props.comment.content,
        },
        reComment: false,
        defaultReComment: ''
    }
    deleteComment = (comment) => {
        let comment_id = comment;
        console.log(comment_id);
        let data = {
            group_number: this.state.comment.group_number,
            group_order: this.props.comment.group_order
        }
		try{
			axios.post(`http://localhost:4000/comments/${comment_id}`, data)
				.then(res => {
                    console.log(res);
				})
		}
		catch(err) {
			console.error(err);
		}
    }
    askReComment = () => {
        this.setState({
            reComment: !this.state.reComment
        })
    }
    addComment = (post) => {
        let data ={
            post_id: post,
            group_number: this.state.comment.group_number,
            // group_order: this.props.comment.group_order + 1,
            depth: this.state.comment.depth + 1,
            parent_id: this.state.comment.comment_id,
            content: this.state.defaultReComment,
        }
        console.log(data);
		try {
			axios.post('http://localhost:4000/comments', data)
				.then((res) => {
					console.log(res);
			})
		}
		catch(err) {
			console.log(err);
		}
        this.setState({
            reComment: false
        })
    }
    render(){
        const { comment, reComment, defaultReComment } = this.state;
        return(
            <div>
                

                <span style={{marginLeft: `${comment.depth * 20}px`}}>{comment.content}</span>
                <span onClick={() => this.deleteComment(comment.comment_id)} style={{cursor: 'pointer'}} role="img" aria-label="댓글삭제"> ❌</span> 
                <span onClick={this.askReComment} style={{cursor: 'pointer'}} role="img" aria-label="답댓글 달기"> ➕</span> 
                <br/>
                {reComment ? <div><input
						name="defaultReComment"
                        onChange={e => this.setState({ defaultReComment:  e.target.value})}
                        value={defaultReComment}
						type="test"
						placeholder="답댓글을 입력하세요."
					/><button type="button" onClick={() => this.addComment(comment.post_id)}>답글 달기</button></div> : null}
            </div>
            
        );
    };
};

export default Comment;