import React, { Key, useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Button, Confirm, Icon } from "semantic-ui-react";

import { FETCH_POSTS_QUERY } from "../utils/graphql";
import { PostProps } from "./pages/home";
import MyPopup from "../utils/MyPopups";

type DeleteButtonProps = {
  postId: number;
  callback?: () => void;
  commentId?: Key | null | undefined;
};

const DeleteButton = ({ postId, callback, commentId }: DeleteButtonProps) => {
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [deletePostOrMutation] = useMutation(mutation, {
    update(proxy, result) {
      setConfirmOpen(false);
      if (!commentId) {
        const data: PostProps | null = proxy.readQuery({
          query: FETCH_POSTS_QUERY,
        });
        let newData = [...data?.getPosts];
        newData = [result.data.createPost, ...newData];
        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: {
            ...data,
            getPosts: {
              newData: newData ? newData : null,
            },
          },
        });
      }
      if (callback) callback();
    },
    variables: { postId, commentId },
  });
  return (
    <>
      <MyPopup content={commentId ? "Delete comment" : "Delete post"}>
        <Button
          floated="right"
          as="div"
          color="red"
          onClick={() => setConfirmOpen(true)}
        >
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
      </MyPopup>

      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => deletePostOrMutation()}
      />
    </>
  );
};

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId) {
      id
    }
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export default DeleteButton;
