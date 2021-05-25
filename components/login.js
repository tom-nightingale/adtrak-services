import { signIn } from 'next-auth/client';

export default function Login ({ }) {
    return(
        <div className="flex flex-col items-center justify-center w-full min-h-screen text-white bg-primary">
                      
            <img className="mx-auto mb-8" src="images/adtrak-logo.svg" width={160} height={35} alt="Adtrak Media Limited" /> 
            
            <p>Please login to see our services.</p>
            
                <a
                href="/api/auth/signin"
                onClick={(e) => {
                    e.preventDefault();
                    signIn();
                }}
                >
                <button className="px-4 py-2 mt-4 transition-all duration-500 bg-white border-2 border-white rounded signIn text-secondary-dark hover:text-secondary hover:border-secondary">Sign in</button>
                </a>

            </div>
    )
}