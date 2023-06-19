import { getDocs, collection } from "firebase/firestore"
;
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { Post } from "./posts";


export interface Post{
    id: string;
    userId: string;
    username: string;
    title: string;
    description: string;
}


export const Main = () => {

    const postsRef = collection(db, "posts");
    const [posts, setPosts] = useState<Post[] | null>(null);
    
    const getPosts = async () => {
        const data = await getDocs(postsRef);
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})) as Post[]);
    }


    
    useEffect(() => {
        getPosts();
    }, []);


    return (
        <div>
            <div>{posts?.map((post) => (<Post post={post}/>))}</div>

        </div>
    );
}