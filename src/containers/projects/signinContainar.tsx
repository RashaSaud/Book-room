import { Formik, useFormik } from "formik";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { initialValueUser } from "src/core/constants";
import { slideIn } from "src/core/utils/motion";
import { styles } from "src/styles";
import * as Yup from "yup";

import { useAuth } from "../../auth/user-context";
import { Input } from "../../components/common/input";
const SignIn = () => {
  const [showPopup, setShowPopup] = useState(false);

  const { loginUser } = useAuth();
  const handleSubmit = async () => {
    try {
      if (initialValueUser) {
        setShowPopup(!showPopup);
      }
    } catch (error) {
      //
    }
    setTimeout(() => {
      alert(JSON.stringify(initialValueUser, null, 2));
    }, 500);
  };

  const navigate = useNavigate();
  const [userCredentials, setUserCredentials] = useState<any>();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserCredentials({ ...userCredentials, [name]: value } as any);
  };
  const handleLogin = async () => {
    try {
      loginUser(userCredentials);
      console.log(userCredentials);
      
    } catch (error) {
      //
    }
  };

  const forgetPassword = ()=>{
    navigate('/forget-password')
  }
  const validationSchema = Yup.object({
    password: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });
  const formik = useFormik({
    initialValues: userCredentials,
    onSubmit: async () => {
      await handleSubmit();
      formik.resetForm();
    },
    validationSchema: validationSchema,
  });

  return (
    <div className="h-screen">
      <div
        className={`xl:mt-44 mobile:mt-32 flex xl:flex-row w-full justify-center items-center flex-col-reverse gap-10 mobile:gap-0`}
      >
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className="flex-[0.5] bg-tertiary2 p-10 h-full w-full rounded-2xl"
        >
          <h3 className={styles.sectionSubText}>SignIn user</h3>
          <Formik
            initialValues={initialValueUser}
            onSubmit={handleLogin}
            validationSchema={formik.initialValues}
            enableReinitialize
          >
            <div className="flex flex-col mobile:flex-col mobile:gap-5 gap-10 px-20 mobile:px-0">
              <label className="flex flex-col">
                <Input
                  label="Email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`bg-tertiary py-4 px-6 placeholder:text-secondary rounded-lg font-medium border-2 `}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-sm mobile:text-sm text-red-900">
                    {typeof formik.errors.email === "string" &&
                      formik.errors.email}
                  </p>
                )}
              </label>
              <label className="flex flex-col">
                <Input
                  label={"password"}
                  name="password"
                  type="password"
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`bg-tertiary py-4 px-6 placeholder:text-secondary rounded-lg font-medium border-2
               
                    }`}
                />
                {userCredentials?.password && userCredentials?.password && (
                  <p className="text-sm mobile:text-sm text-red-900"></p>
                )}
              </label>
              <div className="flex items-center justify-center">
                <button
                  onClick={handleLogin}
                  type="submit"
                  className="bg-tertiary border border-white py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
                >
                  Sign in
                </button>
              </div>
              <button onClick={forgetPassword}>Forget your password?</button>

            </div>
          </Formik>
        </motion.div>
      </div>
    </div>
  );
};

export default SignIn;
