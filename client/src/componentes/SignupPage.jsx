import React from 'react'
import SignupForm from './SignupForm'

const SignupPage = () => {
    const handleSignup = (userData) => {
        console.log('User signed up:', userData);
        
        // You can perform further actions here, such as redirecting the user
    };
  return (
    <div>
        <SignupForm onSignup={handleSignup} />
    </div>

  )
}

export default SignupPage