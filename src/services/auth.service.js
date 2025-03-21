import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase.config";

/**
 * Check if a college exists before login/registration
 * @param {string} collegeName
 * @param {string} email
 * @returns {boolean}
 */
export const isCollegeRegistered = async (collegeName, email) => {
    console.log("Checking College:", { collegeName, email });
  
    const collegeRef = doc(db, "colleges", collegeName);
    const collegeSnap = await getDoc(collegeRef);
  
    if (!collegeSnap.exists()) {
      console.log("College not found in Firestore.");
      return false;
    }
  
    const collegeData = collegeSnap.data();
    console.log("Firestore Data:", collegeData);

    console.log(collegeData.email)
  
    return collegeData.email === email;
  };
  

/**
 * Register a new college user
 * @param {Object} data - Registration data
 */
export const registerCollegeUser = async ({ collegeName, email, password }) => {
  // Check if the college is already registered
  const collegeExists = await isCollegeRegistered(collegeName, email);
  if (collegeExists) {
    throw new Error("College already registered with this email.");
  }

  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Store user data in Firestore under "colleges" collection
  await setDoc(doc(db, "colleges", collegeName), {
    collegeName,
    email,
    uid: user.uid,
  });

  return user;
};

/**
 * Login a college user
 * @param {string} email
 * @param {string} password
 */
export const loginCollegeUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};
