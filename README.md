# Secure_Share Govt. Document With Family Memebers

This file management system is an advanced solution to handle government and personal documents with utmost efficiency and security ensuring that they are easily accessible and protected.

## Features

- Signup .
- Signin by using anyone of the method that is by using "email/password" or by using "phone number".
- Homepage.
- My Profile button which display the details of the signedin user.
- Input field to enter your mobile number and link it with your email.
- Option to upload file.
- Option to view saved files .
- Saved files page to view,share and delete the file.
- Logout button.

## File Structure

The project is organized into the following directories and files:

index.html - The main HTML file that serves as the entry point of the application.

styles.css - To give the styling to the pages

script.js- This file is helps in switching betweeen signin and signup form. Also handles the feature to select the radio button used for signin option.

firebaseConfig.js - This code initializes a Firebase app with configuration details and exports the Firebase Authentication and Storage services. It also exports the Firebase configuration for use in other parts of the application.

firebaseauth.js-This JavaScript code manages user registration, email/password sign-in, and phone number verification using Firebase Authentication, with the data stored in Firestore. It also includes reCAPTCHA verification for security during phone number authentication.

homepage.html-This HTML page serves as a homepage with features for linking a phone number with OTP verification, viewing user profile details, logging out, and uploading files. It also includes buttons for accessing saved files and user profile information.

homepage.js- This code initializes Firebase and handles user authentication, profile management, and file uploads. It also includes event listeners for logging out, viewing user details, and redirecting to a file list page.

files.html-This HTML page displays a list of saved files, styled with a gradient background and centered heading. The files are presented in a list with optional image previews and are dynamically populated by the files.js script.

files.js-This JavaScript code fetches and displays a list of files from Firebase Storage for the authenticated user, adding functionalities to view, share, or delete the files directly from the web page. It dynamically updates the file list with images and provides buttons for interaction, ensuring a user-friendly file management experience.

phoneLinker.js-This JavaScript code handles the process of linking a phone number to an existing Firebase user account by sending an OTP for verification, which is then validated to complete the linkage. It includes Firebase Authentication integration with reCAPTCHA for security, ensuring that phone numbers are securely verified and linked to user accounts.

## 🔗 Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/arjita-narayan-ab9a36304?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app)
