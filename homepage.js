import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
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

// Your web app's Firebase configuration
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
const auth = getAuth();
const db = getFirestore();

// Function to display user details
function displayUserDetails(userData) {
  document.getElementById("loggedUserFName").innerText = userData.firstName;
  document.getElementById("loggedUserLName").innerText = userData.lastName;
  document.getElementById("loggedUserEmail").innerText = userData.email;
  // Show user details
  document.getElementById("userDetails").style.display = "block";
}

// Check if user is logged in and display details if true
onAuthStateChanged(auth, (user) => {
  if (user) {
    const loggedInUserId = localStorage.getItem("loggedInUserId");
    if (loggedInUserId) {
      const docRef = doc(db, "users", loggedInUserId);
      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
          } else {
            console.log("No document found matching the ID");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    } else {
      console.log("User ID not found in local storage");
    }
  } else {
    console.log("No user is signed in");
  }
});

// Logout function
const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
});

// Event listener for "My Profile" button
const myProfileButton = document.getElementById("myProfile");
myProfileButton.addEventListener("click", () => {
  const loggedInUserId = localStorage.getItem("loggedInUserId");
  if (loggedInUserId) {
    const docRef = doc(db, "users", loggedInUserId);
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          displayUserDetails(userData);
        } else {
          console.log("No document found matching the ID");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  } else {
    console.log("User ID not found in local storage");
  }
});

// Adding event listener to the upload button
const uploadButton = document.getElementById("uploadButton");
const fileInput = document.getElementById("fileInput");

uploadButton.addEventListener("click", () => {
  const file = fileInput.files[0]; // Get the selected file
  if (file) {
    console.log("File selected:", file.name);

    const storage = getStorage();
    const user = auth.currentUser;
    if (user) {
      const storageRef = ref(storage, `uploads/${user.uid}/${file.name}`);
      const uploadTask = uploadBytes(storageRef, file);

      uploadTask
        .then((snapshot) => {
          console.log("Uploaded a blob or file!");
          alert("File uploaded successfully");

          fileInput.value = "";
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    } else {
      alert("User not authenticated. Please sign in.");
    }
  } else {
    console.log("No file selected");
  }
});

// Redirect to files.html on button click
document.getElementById("fileList").addEventListener("click", () => {
  window.location.href = "files.html";
});

document
  .getElementById("phoneForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const phoneNumber = document.getElementById("phoneNumber").value;
    console.log(phoneNumber);
  });
