import { Post as IPost} from "./main"
import { addDoc, collection, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import { FirebaseError } from "firebase/app";
import { AuthStateHook, useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";


interface Props {
    post: IPost;
}

interface Like {
    likeId: string;
    userId: string;
}

export const Post = (props: Props) => {

    const {post} = props;
    const [user] = useAuthState(auth);
    
    const [likes, setLike] = useState<Like[] | null>(null);
    const likesRef = collection(db, "likes");

    const likesDoc = query (likesRef, where("postId", "==", post.id));

    const hasLiked = likes?.find((like) => like.userId === user?.uid)
    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLike(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id})));
    }

    const addLike = async () => {
        try {
            const newDoc = await addDoc(likesRef, {
                userId: user?.uid,
                postId: post.id,
            });
            if (user) {
                setLike((prev) => prev ? [...prev, {userId: user?.uid, likeId: newDoc.id}] : [{ userId: user.uid, likeId: newDoc.id}]);
            }
        } catch (err) {
            console.log(err);
        }
        
    }

    const removeLike = async () => {
        try {
            const likeToDeleteQuery = query(likesRef, where("postId", "==", post.id), where("userId", "==", user?.uid));
            
            
            const likeToDeleteData = await getDocs(likeToDeleteQuery);
            const likeId = likeToDeleteData.docs[0].id;
            const likeToDelete = doc(db, "likes", likeToDeleteData.docs[0].id);
            
            await deleteDoc(likeToDelete);

            if (user) {
                setLike((prev) => prev && prev?.filter((like) => like.likeId !== likeId));
            }
        } catch (err) {
            console.log(err);
        }
        
    }


    useEffect(() => {
        getLikes();
    }, []);

    return (
        <div>
            <div className="title">
                <h1>{post.title}</h1>
            </div>
            <div className="body">
                <p>{post.description}</p>
            </div>
            <div className="footer">
                <p>@{post.username}</p>
                <button onClick={hasLiked ? removeLike : addLike }>{hasLiked ? <>&#128078;</> : <>&#128077;</>}</button>
                <p>Likes: {likes?.length}</p>
            </div>
            <hr />
        </div>
    )   
}