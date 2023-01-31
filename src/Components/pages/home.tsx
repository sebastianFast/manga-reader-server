import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_POSTS_QUERY } from "../../utils/graphql";
import { Grid, Transition } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import PostCard from "../post-card";
import PostForm from "../PostForm";

export type PostProps = {
  id: number;
  body: string;
  createdAt: number;
  username: string;
  likeCount: number;
  likes: LikeProps[];
  commentCount: number;
  comments: CommentsProps;
  getPosts?: any;
};

export type LikeProps = {
  id: number;
  username: string;
};

export type CommentsProps = {
  id: number;
  username: string;
  createdAt: number;
  body: string;
};

const Home = () => {
  const { user } = useContext(AuthContext);
  const { loading, data: { getPosts: posts } = {} } =
    useQuery(FETCH_POSTS_QUERY);
  // if (posts) {
  //   console.log(posts);
  // }
  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading posts..</h1>
        ) : (
          <Transition.Group>
            {posts &&
              posts.map((post: PostProps) => (
                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
