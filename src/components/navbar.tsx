import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import './navbar.css';
import { useAuthState } from 'react-firebase-hooks/auth';


export const Navbar = () => {

    const [ user ] = useAuthState(auth);

    const signUserOut = async () => {
        await signOut(auth);
    }

    return (
        <div className="navbar">
            
            <div className="links">
                <Link to='/' className="link">Home</Link>
                {!user ? <Link to='/login' className="link">Login</Link> : <Link to='/create-post' className="link">Create Post</Link>}
                
            </div>
            <div className="user">
                <p className="profile-name">{user?.displayName}</p>
                {user ? <img src={user?.photoURL || ""} className="profile-img"/> : " "}
            </div>
            {user ? (<button onClick={signUserOut}>Sign Out</button>) : ""}       
        </div>
    )
}