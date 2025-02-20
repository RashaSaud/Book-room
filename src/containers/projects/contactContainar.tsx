import axios from "axios";
import { Form, Formik, useFormik } from "formik";
import { motion } from "framer-motion";
import { useState } from "react";
import { initialValues } from "src/core/constants";
import {
  baseUrl,
  selectionMeetingPlaces,
  selectionProgram,
} from "src/core/static/static";
import { slideIn } from "src/core/utils/motion";
import { styles } from "src/styles";
import * as Yup from "yup";

import DropListComponent from "../../components/common/dropdown";
import Input from "../../components/common/input";

const Contact = () => {
  const [formData, setFormData] = useState<any>({
    name: "",
    email: "",
    startTime: "",
    endTime: "",
    companyName: "",
    meetingRoom: "",
    program: "",
  });

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(0);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleClick = (program: string) => {
    setFormData({ ...formData, program });
  };

  const handleClick_ = (meetingRoom: string) => {
    setFormData({ ...formData, meetingRoom });
  };

  const handleSubmit_ = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}/new-book`, formData);

      if (response.status === 201) {
        setMessage("Booking has been Send");
        setStatus(response.status);
      } else if (response.status === 409) {
        setStatus(response.status);
        setMessage("Sorry this Meeting Room already Booked");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setMessage(error.response.data.message);
        setStatus(error.status as any);
      } else {
        setMessage(String(error));
      }
    }
  };
  const handleSubmit = async () => {
    try {
      if (initialValues) {
        //
      }
    } catch (error) {
      handleRequestError(error);
    }
    setTimeout(() => {
      alert(JSON.stringify(initialValues, null, 2));
    }, 500);
  };
  const validationSchema = Yup.object({
    password: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async () => {
      await handleSubmit();
      formik.resetForm();
    },
    validationSchema: validationSchema,
  });

  return (
    <div className="h-screen  ">
      <div
        className={`${status == 0 ? "hidden" : "flex my-2 w-full items-center justify-center  content-center"}`}
      >
        <div
          className={`  items-center justify-center text-black  content-center flex w-[600px] h-[40px] border-2 rounded-md  ${status == 201 ? "border-green-700 bg-green-200" : "bg-red-500 "}`}
        >
          {message}
        </div>{" "}
      </div>
      <div
        className={` flex w-full justify-center items-center flex-col-reverse gap-10 mobile:gap-0`}
      >
        <div>
          <motion.div
            variants={slideIn("left", "tween", 0.2, 1)}
            className="flex-[0.75] bg-tertiary2 p-8 h-full rounded-2xl"
          >
            <h3 className={styles.sectionHeadText}>Book Meeting Room</h3>

            <Formik
              initialValues={initialValues}
              onSubmit={() => formik.submitForm()}
              validationSchema={formik.initialValues}
              enableReinitialize
            >
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  formik.handleSubmit();
                }}
                className="mt-20 mobile:mt-10 flex flex-col gap-8 mobile:gap-4"
              >
                <div className="flex flex-row mobile:flex-col mobile:gap-5 gap-20">
                  <label className="flex flex-col w-full">
                    <Input
                      label={"Name"}
                      name="name"
                      onChange={handleChange}
                      placeholder="What's your good name?"
                      className={`bg-tertiary py-4 px-6 placeholder:text-secondary rounded-lg font-medium border-2
                    ${
                      formik.touched.name && formik.errors.name
                        ? "border-red-600"
                        : "border-violet-950"
                    }`}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <p className="text-sm mobile:text-sm text-red-900">
                        {formik.errors.name}
                      </p>
                    )}
                  </label>
                  <label className="flex flex-col w-full">
                    <Input
                      label="Email"
                      name="email"
                      onChange={handleChange}
                      placeholder="What's your email address?"
                      className={`bg-tertiary py-4 px-6 placeholder:text-secondary rounded-lg font-medium border-2 ${
                        formik.touched.email && formik.errors.email
                          ? "border-red-600"
                          : "border-violet-950"
                      }`}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="text-sm mobile:text-sm text-red-900">
                        {formik.errors.email}
                      </p>
                    )}
                  </label>
                </div>
                <div className="flex flex-row mobile:flex-col mobile:gap-5 gap-20">
                  <label className="flex flex-col w-full">
                    <Input
                      label={"Name of company"}
                      name="name"
                      onChange={handleChange}
                      placeholder="What's your company name?"
                      className={`bg-tertiary py-4 px-6 placeholder:text-secondary rounded-lg font-medium border-2
                    ${
                      formik.touched.name && formik.errors.name
                        ? "border-red-600"
                        : "border-violet-950"
                    }`}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <p className="text-sm mobile:text-sm text-red-900">
                        {formik.errors.name}
                      </p>
                    )}
                  </label>
                  <div className="flex flex-col w-full">
                    <DropListComponent
                      id="program"
                      name="program"
                      onClick={handleClick}
                      title={
                        formData.program
                          ? formData.program
                          : "What's your program?"
                      }
                      currrentValue={formData.program}
                      selectionList={selectionProgram}
                      label={"Program"}
                    />
                  </div>
                </div>

                <div className="flex flex-row mobile:flex-col mobile:gap-5 gap-20">
                  <div className="flex flex-col w-full">
                    <DropListComponent
                      onClick={handleClick_}
                      id="meetingRoom"
                      name="meetingRoom"
                      title={
                        formData.meetingRoom
                          ? formData.meetingRoom
                          : "Meeting Room"
                      }
                      currrentValue={formData.meetingRoom}
                      selectionList={selectionMeetingPlaces}
                      label={"Meeting Room"}
                    />
                  </div>

                  <div className="flex flex-col w-full">
                    <label className="text-2xl font-arMedium mobile:text-base text-searchText font-verdana">
                      choos a time
                    </label>
                    <div className="flex items-center">
                      <span className="text-sm">Start Time </span>

                      <input
                        type="time"
                        name="startTime"
                        onChange={handleChange}
                        className="border border-gray-300 text-black rounded-md px-2 py-1 mx-1"
                      />
                      <span className="text-sm">End Time </span>
                      <input
                        type="time"
                        name="endTime"
                        onChange={handleChange}
                        className="border text-black border-gray-300 rounded-md px-2 py-1 mx-1"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <button
                    onClick={handleSubmit_}
                    type="submit"
                    className="text-tertiary py-3 px-8 rounded-xl outline-none w-fit bg-white font-bold shadow-md shadow-primary"
                  >
                    Send
                  </button>
                </div>
              </Form>
            </Formik>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function handleRequestError(error: unknown) {
  throw new Error("Function not implemented.");
}
