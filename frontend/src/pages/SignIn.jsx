import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiInformationCircle } from 'react-icons/hi';
import { //These are kind of reducers
  signInStart,
  signInSuccess,
  signInFailure
}
from '../redux/user/userSlice';
import {useDispatch, useSelector} from 'react-redux';  // In order to use the above reducers we have to use 'dispatch'.
//In order to access the Global state we have to use 'useSelector'.

export default function SignIn() {

    const navigate = useNavigate();
    const [formData,setFormData] = useState({});
   // const [errorMessage,setErrorMessage] = useState(null);
   // const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const {loading,error:errorMessage} = useSelector(state => state.user); // This gives the global state of the 'loading' and 'errorMessage'
    const handleChange = (e) => {
        setFormData({...formData,[e.target.id]: e.target.value.trim()})  //"trim()" method is used for removing the extra white spaces.
    };

    const handleSubmit = async (e) => {
            e.preventDefault();

            if(!formData.password ||  !formData.email){
                  //return setErrorMessage("Please fill out all fields");
                  dispatch(signInFailure("Please fill out all fields"));
            }
            try {

             // setLoading(true);
             //  setErrorMessage(null);

              dispatch(signInStart());

              const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
              });

            const data = await res.json();

            if(data.success === false){
              //setLoading(false);
             // return setErrorMessage(data.message);
              dispatch(signInFailure(data.message));
              
            }

           // setLoading(false);
            if(res.ok){
              dispatch(signInSuccess(data));
              navigate("/");
            }
            
            } catch (error) {
              // setErrorMessage(error.message);
              // setLoading(false);
              dispatch(signInFailure(error.message));
            }
    };

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-5xl mx-auto flex-col md:flex-row md:items-center gap-10'>

        {/* left */}
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-6xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
             Tech
            </span>
            <span className='text-red-600 font-bold'>Trekker</span>
          </Link>
          <p className='text-sm font-semibold mt-5'>
           Discover the world of tech and innovation.
          </p>
        </div>


        {/* right */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Email' className='text-xl' />
              <TextInput type='email' placeholder='name@company.com' id='email' onChange={handleChange} className='p-3' sizing="lg" />
            </div>
            <div>
              <Label value='Password' className='text-xl' />
              <TextInput type='password' placeholder='Password' id='password' onChange={handleChange} className='p-3' sizing="lg"/>
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading} className='p-2'> {/*At the Loading time the Button is Disabled*/}
              {loading ? 
                (<><Spinner size='sm'/> <span className='pl-3'>Loading ...</span></>) : 
                "Sign In"
              }
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account?</span>
            <Link to='/sign-up' className='text-blue-500 font-bold hover:underline cursor-pointer'>
              Sign Up
            </Link>
          </div>
          {errorMessage && (
                <Alert 
                    className='mt-5' color="failure" icon={HiInformationCircle}>
                        {errorMessage}
                </Alert>
              )
          }
        </div>
      </div>
    </div>
  );
}


