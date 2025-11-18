import React, { useEffect, useState } from "react";
import { auth, db } from "../../components/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Spinner from "../../components/Spinner";

function Profile() {
  const [userAuth, setUserAuth] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUserAuth(null);
        setUserData(null);
        setLoading(false);
        return;
      }

      try {
        setUserAuth(currentUser);

        // Fix 1: Collection name is "Users" (capital U), not "users"
        const userRef = doc(db, "Users", currentUser.uid);
        const snap = await getDoc(userRef);

        if (snap.exists()) {
          const data = snap.data();
          setUserData(data);
          console.log("Firestore user data:", data);
        } else {
          console.log("No user document found in Firestore (Users collection)");
          setUserData(null);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Spinner size="lg" color="text-purple-600" />
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-red-600 text-center">{error}</div>;
  }

  if (!userAuth) {
    return (
      <div className="p-6 text-center">Please log in to view your profile.</div>
    );
  }

  // Construct full name with fallbacks
  const firstName = userData?.firstName || "";
  const lastName = userData?.lastName || "";
  const fullName =
    `${firstName} ${lastName}`.trim() || userAuth.displayName || "User";

  // Fix 2: Field is "photo", not "profileImgUrl"
  const photoUrl =
    userData?.photo || userAuth?.photoURL || "/default-avatar.png";

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">My Profile</h1>

      <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
        {/* Profile Photo */}
        <div className="flex justify-center mb-6">
          <img
            src={photoUrl}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-md"
            onError={(e) => {
              e.target.src = "/default-avatar.png"; // fallback if image fails
            }}
          />
        </div>

        {/* User Info */}
        <div className="space-y-4 text-lg">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800">{fullName}</h2>
            <p className="text-gray-500">{userAuth.email}</p>
          </div>

          <hr className="my-6" />

          <div className="space-y-3">
            <p>
              <strong className="text-gray-700">Name:</strong>{" "}
              {firstName || "—"}
            </p>

            <p>
              <strong className="text-gray-700">Email:</strong> {userAuth.email}
            </p>
            <p className="text-sm text-gray-500 font-mono break-all">
              <strong>User ID:</strong> {userAuth.uid}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
