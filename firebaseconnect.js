import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updatePassword } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { getDatabase, ref, onValue, set, push, update, remove, child, get } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js';

// Replace with your actual Firebase config
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAnCRqvn8TuhmHqplGMrxDIjn9jJZV_gO4",
    authDomain: "seller-bazaarika.firebaseapp.com",
    databaseURL: "https://seller-bazaarika-default-rtdb.firebaseio.com",
    projectId: "seller-bazaarika",
    storageBucket: "seller-bazaarika.firebasestorage.app",
    messagingSenderId: "1079321412541",
    appId: "1:1079321412541:web:2d03f697cc6ff99f1f48d4",
    measurementId: "G-1QQZD8MWTD"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);

export function showToast(message) {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toastContainer.prepend(toast);
    setTimeout(() => { toast.classList.add('show'); }, 10);
    setTimeout(() => {
        toast.classList.remove('show');
        toast.addEventListener('transitionend', () => toast.remove());
    }, 3000);
}

export function handleLogout() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            try {
                await signOut(auth);
                showToast('You have been logged out.');
                window.location.href = 'index.html';
            } catch (error) {
                showToast('Logout failed.');
            }
        });
    }
}

export function setupAuthListener() {
    onAuthStateChanged(auth, (user) => {
        const currentPath = window.location.pathname.split('/').pop();
        if (!user && currentPath !== 'index.html') {
            window.location.href = 'index.html';
        }
        if (user && currentPath === 'index.html') {
            window.location.href = 'dashboard.html';
        }
    });
}

export { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, updatePassword, ref, onValue, set, push, update, remove, child, get, storageRef, uploadBytes, getDownloadURL };
