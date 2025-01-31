import React, { useEffect, useState } from "react";
import "./Posts.css";
import PostItem from "../../components/PostItem/PostItem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../store/reducers/PostReducers/PostActions";
import Loader from "../../components/Loading/Loader";
import { getAllPages } from "../../utils/pages";
import { getComments } from "../../store/reducers/CommentReducers/commentActions";
import Comment from "../../components/Comment/Comment";

export default function Posts() {
  const { posts, pagination, isLoading } = useSelector((state) => state.post);
  const { comments } = useSelector((state) => state.comment);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const allPages = getAllPages(pagination.pages);
  
  useEffect(() => {
    if (pagination.total !== posts.length) {
      const data = { page, limit };
      dispatch(getPosts(data));
      dispatch(getComments());
    }
  }, [page]);

  return (
    <div className="Posts">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="Posts__content">
            {posts.map((e) => (
              <Link to={`/posts/${e._id}`} key={e._id}>
                <PostItem
                  author={e.user.fullName}
                  avatar={e.user.avatarUrl}
                  authorId={e.user._id}
                  image={e.imageUrl}
                  title={e.title}
                  text={e.text}
                  tags={e.tags}
                  viewsCount={e.viewsCount}
                  commentCount={e.commentCount}
                />
              </Link>
            ))}
          </div>
          <div className="Posts__settings">
            <div className="Posts__comments">
              {comments.length == 0
                ? <h3 className="Posts__comments__empoty">Empoty</h3>
                : comments.map((e) => (
                    <Comment
                      key={e._id}
                      userId={e.user._id}
                      avatarUrl={e.user.avatarUrl}
                      fullName={e.user.fullName}
                      text={e.text}
                    />
                  ))}
            </div>
          </div>
          <div className="Posts_pagination">
            <div>
              {allPages.map((e) => (
                <span key={e} onClick={() => setPage(e)}>
                  {e}
                </span>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
