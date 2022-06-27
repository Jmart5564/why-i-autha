import { getUser, signOut } from '../services/members-service.js';

let user = null;

import createSignOut from '../components/SignOut.js';

// write handler functions
async function handlePageLoad() {
    user = await getUser();

    if (!user) {
        window.location.replace('../');
    }

    display();
}

async function handleSignOut() {
    await signOut();
}

// Create each component: 
const SignOut = createSignOut(document.querySelector('#sign-out'), { handleSignOut });

// Roll-up display function that renders (calls with state) each component
function display() {
    SignOut({ email: user.email });
}

// Call display on page load
handlePageLoad();
