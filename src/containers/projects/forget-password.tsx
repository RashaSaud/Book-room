import React, { useState } from "react";
import { motion } from "framer-motion";
import { slideIn } from "src/core/utils/motion";
import { styles } from "src/styles";
import Input from "src/components/common/input";
import axios from "axios";
function ForgetPassword() {
  const [userCredentials, setUserCredentials] = useState<any>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserCredentials({ ...userCredentials, [name]: value } as any);
  };
  const changePassword = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/change-password`,
        userCredentials
      );
      if (response.status === 200) {
        console.log(response.data);
      }
    } catch (error) {
      //
    }
  };
  return (
    <div className="h-screen">
      <div
        className={`xl:mt-44 mobile:mt-32 flex xl:flex-row w-full justify-center items-center flex-col-reverse gap-10 mobile:gap-0`}
      >
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className="flex-[0.5] bg-tertiary2 p-10 h-full w-full rounded-2xl"
        >
          <h3 className={styles.sectionSubText}>Change your password</h3>

          <div className="flex flex-col mobile:flex-col mobile:gap-5 gap-10 px-20 mobile:px-0">
            <label className="flex flex-col">
              <Input
              onChange={handleChange}
                label="email"
                name="email"
                placeholder="Enter your email"
                className={`bg-tertiary py-4 px-6 placeholder:text-secondary rounded-lg font-medium border-2 `}
              />
            </label>
            <label className="flex flex-col">
              <Input
              onChange={handleChange}
                label={"password"}
                name="password"
                type="password"
                placeholder="Enter your new password"
                className={`bg-tertiary py-4 px-6 placeholder:text-secondary rounded-lg font-medium border-2
             
                  }`}
              />

              <p className="text-sm mobile:text-sm text-red-900"></p>
            </label>
            <div className="flex items-center justify-center">
              <button
              onClick={changePassword}
                type="submit"
                className="bg-tertiary border border-white py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
              >
                Change your password{" "}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ForgetPassword;
