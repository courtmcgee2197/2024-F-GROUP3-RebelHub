"use client";

import { Post, PostComment } from "@/utils/posts/definitions";
import styles from "./SingleComment.module.css";
import recursiveStyles from "./RecursiveComment.module.css";
import LikeDislikeButtons from "../posts/buttons/like-dislike-buttons";
import { getLikeCommentUrl, getDislikeCommentUrl } from "@/utils/url-segments";
import AccountButton from "@/components/navbar/AccountButton";
import { useEffect, useState } from "react";
import CreateCommentButton from "./buttons/CreateCommentButton";
import CreateComment from "./CreateComment";
import DeleteCommentButton from "./buttons/DeleteCommentButton";

import bStyles from "@/components/posts/buttons/post-buttons.module.css";

interface ComponentProps {
    post: Post;
    comment: PostComment;
    parentCreate: (create: PostComment) => void;
    parentDelete: (del: PostComment) => void;
    showButtons?: boolean;
    userId: number|null;
    moddedHubs: number[];
    inHub: boolean;
}

/*
    SingleComment

    Displays a single comment along with all the necessary components.

    post: the post the comment is on
    comment: the comment that is being displayed
    parentUpdate: used to change the information in the current comment so the parent can render the changes
    parentCreate: used to create a reply to the current comment
    parentDelete: used to delete the current comment
    showButtons: used to show the likes/dislikes buttons or just show some text
*/

const SingleComment: React.FC<ComponentProps> = ({ post, comment, parentCreate, parentDelete, showButtons=true, userId, moddedHubs, inHub=true }) => {
    const [showCreateComment, setShowCreateComment] = useState(false);
    const [isAuthor, setIsAuthor] = useState(false);
    const [isMod, setIsMod] = useState(false);

    useEffect(() => {
        if (userId != null) {
            setIsAuthor(comment.author == userId);
        }
    }, [userId]);

    useEffect(() => {
        setIsMod(moddedHubs.includes(post.hub));
    }, [moddedHubs]);

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.accountButtonBanner}>
                    <AccountButton username={comment.author} darkTheme={true} noBackground={true}/>
                    {comment.author == post.author &&
                        <p style={{'fontWeight': "bold"}}>(Post Author)</p>
                    }
                </div>
                <div className={styles.messageContainer}>
                    <div style={{'overflowWrap': 'break-word'}}>
                        {comment.message}
                    </div>
                    <div className={bStyles.buttonHorizontalList}>
                        <div className={bStyles.buttonsLeft}>
                            <LikeDislikeButtons 
                                postObject={comment} 
                                likeUrlFunction={getLikeCommentUrl} 
                                dislikeUrlFunction={getDislikeCommentUrl}
                                containerClassName={styles.voteContainer}
                                showButtons={showButtons}
                            />
                        </div>
                        <div className={bStyles.buttonsRight}>
                            {isAuthor &&  
                                <>
                                    <DeleteCommentButton comment={comment} parentDelete={parentDelete} />
                                </>
                            }
                            {!isAuthor && isMod &&
                                <>
                                    <DeleteCommentButton comment={comment} parentDelete={parentDelete} />
                                </>
                            }
                            {inHub &&
                                <CreateCommentButton toggleReply={() => setShowCreateComment(!showCreateComment)} buttonMessage="Reply"/>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {showCreateComment &&
                <div className={recursiveStyles.recursiveContainer}>
                    <div></div>
                    <CreateComment 
                        post={post} 
                        onClose={() => setShowCreateComment(false)} 
                        commentReply={comment}
                        parentCreate={parentCreate}
                    />
                </div>
            }
        </div>
    );
}

export default SingleComment;
