// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  RecaptchaVerifier,
  linkWithPhoneNumber,
  PhoneAuthProvider,
  linkWithCredential,
  signInWithPhoneNumber,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  getFirestore,
  getDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";

import { firebaseConfig } from "./firebaseConfig";
// Your Firebase config
const firebaseConfig = {
  apiKey: "ENTER_YOUR_OWN_API_KEY",
  authDomain: "form-authentication-5cf22.firebaseapp.com",
  projectId: "form-authentication-5cf22",
  storageBucket: "form-authentication-5cf22.appspot.com",
  messagingSenderId: "701947966529",
  appId: "1:701947966529:web:a20c94a602d3ff040882c0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

console.log(auth);

window.recaptchaVerifier = new RecaptchaVerifier(
  auth,
  "recaptcha-container",
  {
    size: "invisible",
    callback: (response) => {
      // reCAPTCHA solved, allow user to proceed
      if (document.getElementById("signInPhone").checked) {
        sendVerificationCode();
      }
    },
  },
  auth
);

function showMessage(message, divId) {
  var messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(function () {
    messageDiv.style.opacity = 0;
  }, 5000);
}

// Function to send OTP
function sendVerificationCode() {
  const phoneNumber = document.getElementById("phoneNumber").value;
  const appVerifier = window.recaptchaVerifier;

  signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      showMessage("OTP sent to " + phoneNumber, "signInMessage");
      document.getElementById("verify-code").style.display = "block";
    })
    .catch((error) => {
      showMessage("Error sending OTP: " + error.message, "signInMessage");
    });
}

// Function to verify OTP
// Function to verify OTP and link phone number
function verifyCode() {
  const otp = document.getElementById("otp").value;
  const user = auth.currentUser;

  if (!user) {
    showMessage("No user is currently signed in.", "signInMessage");
    return;
  }

  const credential = PhoneAuthProvider.credential(
    window.confirmationResult.verificationId,
    otp
  );

  linkWithCredential(user, credential)
    .then(() => {
      showMessage("Phone number linked successfully", "signInMessage");
    })
    .catch((error) => {
      if (error.code === "auth/credential-already-in-use") {
        showMessage(
          "This phone number is already linked to another account.",
          "signInMessage"
        );
      } else {
        showMessage(
          "Error linking phone number: " + error.message,
          "signInMessage"
        );
      }
    });
}

// Add event listener to Verify OTP button
document
  .getElementById("verifyOtpButton")
  .addEventListener("click", verifyCode);

document
  .getElementById("phoneForm")
  .addEventListener("submit", sendVerificationCode);
