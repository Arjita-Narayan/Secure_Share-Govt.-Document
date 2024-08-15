import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  deleteObject,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";
import {
  onAuthStateChanged,
  getAuth,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

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
const fileList = document.getElementById("fileList");
const storage = getStorage(app);

// Function to fetch and display files
function fetchFiles() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userFilesRef = ref(storage, `uploads/${user.uid}/`);
      console.log("userFileRef", `uploads/${user.uid}/`);
      listAll(userFilesRef)
        .then((result) => {
          console.log(result);
          fileList.innerHTML = ""; // Clear previous file list

          if (result.items.length === 0) {
            fileList.innerHTML = "<p>No files found.</p>";
            return;
          }

          result.items.forEach((itemRef) => {
            getDownloadURL(itemRef)
              .then((url) => {
                const listItem = document.createElement("li");
                const link = document.createElement("a");
                link.href = url;
                link.textContent = itemRef.name;
                link.target = "_blank";

                if (itemRef.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
                  // If the file is an image
                  const img = document.createElement("img");
                  img.src = url;
                  img.alt = itemRef.name;
                  img.style.maxWidth = "200px"; // Set a max width for images
                  img.style.display = "block";

                  // Create a view button
                  const viewButton = document.createElement("button");
                  viewButton.textContent = "View";
                  viewButton.style.display = "block";
                  viewButton.style.marginTop = "5px";
                  viewButton.style.backgroundColor = "#007bff";
                  viewButton.style.color = "#fff";
                  viewButton.style.border = "none";
                  viewButton.style.padding = "5px 10px";
                  viewButton.style.borderRadius = "5px";
                  viewButton.style.cursor = "pointer";

                  // Create a share button
                  const shareButton = document.createElement("button");
                  shareButton.textContent = "Share";
                  shareButton.style.display = "block";
                  shareButton.style.marginTop = "5px";
                  shareButton.style.backgroundColor = "#28a745";
                  shareButton.style.color = "#fff";
                  shareButton.style.border = "none";
                  shareButton.style.padding = "5px 10px";
                  shareButton.style.borderRadius = "5px";
                  shareButton.style.cursor = "pointer";

                  // Create a delete button
                  const deleteButton = document.createElement("button");
                  deleteButton.textContent = "Delete";
                  deleteButton.style.display = "block";
                  deleteButton.style.marginTop = "5px";
                  deleteButton.style.backgroundColor = "#dc3545";
                  deleteButton.style.color = "#fff";
                  deleteButton.style.border = "none";
                  deleteButton.style.padding = "5px 10px";
                  deleteButton.style.borderRadius = "5px";
                  deleteButton.style.cursor = "pointer";

                  // Set up view functionality
                  viewButton.addEventListener("click", () => {
                    window.open(url, "_blank"); // Open file in a new tab
                  });

                  // Set up share functionality
                  shareButton.addEventListener("click", () => {
                    navigator.clipboard
                      .writeText(url)
                      .then(() => {
                        alert("Link copied to clipboard.");
                      })
                      .catch((err) => {
                        console.error("Failed to copy the link: ", err);
                      });
                  });

                  // Set up delete functionality
                  deleteButton.addEventListener("click", () => {
                    deleteObject(itemRef)
                      .then(() => {
                        alert("File deleted successfully.");
                        fetchFiles(); // Refresh file list
                      })
                      .catch((error) => {
                        console.error("Error deleting file:", error);
                      });
                  });

                  listItem.appendChild(img);
                  listItem.appendChild(viewButton);
                  listItem.appendChild(shareButton);
                  listItem.appendChild(deleteButton);
                  fileList.appendChild(listItem);
                } else {
                  listItem.appendChild(link);
                  fileList.appendChild(listItem);
                }
              })
              .catch((error) => {
                console.error("Error getting download URL:", error);
              });
          });
        })
        .catch((error) => {
          console.error("Error listing files:", error);
        });
    } else {
      console.log("No user is signed in");
    }
  });
}

// Fetch files on page load
fetchFiles();
