import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase.config";

/**
 * Check if a college is registered before allowing registration/login.
 */
export const isCollegeRegistered = async (collegeName, email) => {
  const collegeRef = doc(db, "registeredColleges", collegeName); // Changed collection name
  const collegeSnap = await getDoc(collegeRef);

  if (collegeSnap.exists() && collegeSnap.data().collegeEmail === email) { // Changed variable name
    return true;
  }
  return false;
};

/**
 * Register a college user with email & password.
 */
export const registerCollegeUser = async ({ collegeName, email, password }) => {
  // Verify if the college exists before registering
  const collegeExists = await isCollegeRegistered(collegeName, email);
  if (!collegeExists) {
    throw new Error("College not found or email does not match records.");
  }

  // Create a Firebase Auth user
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Store user details in Firestore under "collegeUsers"
  await setDoc(doc(db, "collegeAuthUsers", user.uid), {  // Changed collection name
    collegeName,
    collegeEmail: email,  // Changed variable name
    uid: user.uid,
  });

  return user;
};

/**
 * Login a college user with email & password.
 */
export const loginCollegeUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};
