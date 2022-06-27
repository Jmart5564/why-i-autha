// import services and utilities
import { getUser, signIn, signUp } from './services/members-service.js';

// import component creators
import createAuthForm from './components/AuthForm.js';
import createAuthError from './components/AuthError.js';

let errorMessage = '';

// write handler functions
async function handlePageLoad() {
    // *** get the user

    // *** if there is a user, redirect (use replace) to './members'

    display();
}

async function handleSignIn(email, password) {
    

    const response = await signIn(email, password);
    checkAuth(response);
}

async function handleSignUp(email, password) {
    const response = await signUp(email, password);
    checkAuth(response);

    //const response = null; // *** ? (don't forget call is asynchronous!)
}

function checkAuth(response) {
    // *** remove next line after verifying user is being returned
    console.log(response.user);

    if (response?.error) {
        // eslint-disable-next-line no-console
        console.log(response.error);
        errorMessage = response.error.message;

        display();
    }
    else {
        location.replace('./members');
    }
}

// Create each component: 
const SignInForm = createAuthForm(document.querySelector('#sign-in'), { handleAuth: handleSignIn });

const SignUpForm = createAuthForm(document.querySelector('#sign-up'), { handleAuth: handleSignUp });

const AuthError = createAuthError(document.querySelector('#auth-error'));

function display() {
    SignInForm();
    SignUpForm();
    AuthError({ errorMessage });
}

// Call display or page load
handlePageLoad();
