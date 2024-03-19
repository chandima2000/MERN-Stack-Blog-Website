import React from 'react';
import {Button} from 'flowbite-react';
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider,getAuth, signInWithPopup } from "firebase/auth";
import { app } from '../firebase';
import {useNavigate} from 'react-router-dom'
import {signInSuccess} from '../redux/user/userSlice';
import {useDispatch} from 'react-redux';

export default function OAuth() {

    const auth = getAuth(app);
    const navigate = useNavigate();
    const dispatch =useDispatch();
    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({prompt:'select_account'})
        try {
          const resultsFromGoogle = await signInWithPopup(auth,provider);
          const res = await fetch('/api/auth/google',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body : JSON.stringify({
              name : resultsFromGoogle.user.displayName,
              email : resultsFromGoogle.user.email,
              googlePhotoUrl : resultsFromGoogle.user.photoURL,
            }),
        });
        const data = await res.json();
        if(res.ok){
          dispatch(signInSuccess(data));
          navigate('/');
        }

        } catch (error) {
          console.log(error)
        }
    }
  return (
    <Button  
        type='button' 
        outline  
        gradientMonochrome="teal"
        onClick={handleGoogleClick}>
            <div className="flex gap-3 text-lg items-center justify-center">
                <FcGoogle />
                <p className=''>Continue with Google</p>
            </div>           
    </Button>
  )
}
