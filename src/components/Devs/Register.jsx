import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, google, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Register = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
  });

  //user find
  const [isUser, setIsUser] = useState("");
  console.log(isUser);

  //for photo state
  const [file, setFile] = useState(null);

  //handle data change
  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //register now
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await createUserWithEmailAndPassword(
      auth,
      input.email,
      input.password
    );

    //for photo
    const fileData = await uploadBytesResumable(ref(storage, file.name), file);
    const link = await getDownloadURL(fileData.ref);

    //for update name and photo
    const update = await updateProfile(data.user, {
      displayName: input.name,
      photoURL: link,
    });
  };

  //for logout
  const handleLogout = () => {
    signOut(auth);
  };

  //for login
  const handleLogin = async (e) => {
    e.preventDefault();
    const login = await signInWithEmailAndPassword(
      auth,
      input.email,
      input.password
    );
  };

  //login with google
  const handleGoogle = async () => {
    const googleLogin = await signInWithPopup(auth, google);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUser(user);
      } else {
        console.log("user not found");
      }
    });
  });
  return (
    <>
      <div className="register">
        <h1 className="text-center my-5">Register & Login With Firebase</h1>
        <hr />
        <div className="container">
          <div className="row my-5">
            <div className="col-md-3">
              <div className="registration-form">
                <form action="" onSubmit={handleSubmit}>
                  <div className="my-3">
                    <input
                      type="text"
                      name="name"
                      value={input.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="form-control"
                    />
                  </div>
                  <div className="my-3">
                    <input
                      type="text"
                      name="email"
                      value={input.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      className="form-control"
                    />
                  </div>
                  <div className="my-3">
                    <input
                      type="text"
                      name="password"
                      value={input.password}
                      onChange={handleChange}
                      placeholder="Password"
                      className="form-control"
                    />
                  </div>
                  <div className="my-3">
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>
                  <div className="my-3">
                    <button type="submit" className="btn btn-light w-100">
                      Register
                    </button>
                  </div>
                  <div className="my-3">
                    <button
                      type="submit"
                      className="btn btn-danger w-100"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-3">
              <div className="login-form">
                <form action="" onSubmit={handleLogin}>
                  <div className="my-3">
                    <input
                      type="text"
                      name="email"
                      value={input.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      className="form-control"
                    />
                  </div>
                  <div className="my-3">
                    <input
                      type="text"
                      name="password"
                      value={input.password}
                      onChange={handleChange}
                      placeholder="Password"
                      className="form-control"
                    />
                  </div>
                  <div className="my-3">
                    <button type="submit" className="btn btn-light w-100">
                      Login
                    </button>
                  </div>
                  <div className="my-3">
                    <button
                      onClick={handleGoogle}
                      className="btn btn-primary w-100"
                    >
                      Sign in With Google
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-5 text-center">
              {isUser ? (
                <>
                  <div className="register-info">
                    <img className="photo" src={isUser.photoURL} alt="" />
                    <h1>{isUser.displayName}</h1>
                    <h4>{isUser.email}</h4>
                  </div>
                </>
              ) : (
                <>
                  <img
                    src="https://img.freepik.com/premium-vector/no-data-concept-illustration_86047-488.jpg"
                    alt=""
                  />
                  <h3>Please login or Register!</h3>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
