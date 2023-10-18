import React, { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Store/Auth-context";

const CreateAccountForm = () => {
   let navigate = useNavigate();
   const authCtx = useContext(AuthContext);
   const emailInputRef = useRef(null);
   const passwordInputRef = useRef(null);
   const nicknameInputRef = useRef(null);

   const submitHandler = event => {
      event.preventDefault();

      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;
      const enteredNickname = nicknameInputRef.current.value;

      authCtx.signup(enteredEmail, enteredPassword, enteredNickname);

      // if (authCtx.isSuccess) {
      return navigate("/", { replace: true });
      // }
   };

   return (
      <section>
         <h1>Create Account</h1>
         <form onSubmit={submitHandler}>
            <div>
               <label htmlFor="email">Your email</label>
               <input type="email" id="email" required ref={emailInputRef} />
            </div>
            <div>
               <label htmlFor="password">Your password</label>
               <input type="password" id="password" required ref={passwordInputRef} />
            </div>
            <div>
               <label htmlFor="nickname">NickName</label>
               <input type="text" id="nickname" required ref={nicknameInputRef} />
            </div>
            <div>
               <button type="submit">Submit</button>
            </div>
         </form>
      </section>
   );
};

export default CreateAccountForm;
