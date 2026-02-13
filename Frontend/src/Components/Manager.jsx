import React, { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const eyeicon = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const savePassword = () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      setPasswordArray([
        ...passwordArray,
        { ...form, id: form.id || uuidv4() },
      ]); // when edit use prev id
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]),
      );
      console.log([...passwordArray, form]);
      setform({ site: "", username: "", password: "" });

      toast("Password Saved !", {
        position: "bottom-left",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast("Error: password not saved !");
    }
  };

  const deletePassword = (id) => {
    if (confirm("Are you sure to delete password !")) {
      setPasswordArray(passwordArray.filter((item) => item.id != id));
      localStorage.setItem(
        "passwords",
        JSON.stringify([passwordArray.filter((item) => item.id != id)]),
      );

      toast("Password Deleted !", {
        position: "bottom-left",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const editPassword = (id) => {
    console.log("editing password with id ", id);
    setform(passwordArray.filter((i) => i.id === id)[0]); // return a array that's why use [0]
    setPasswordArray(passwordArray.filter((item) => item.id != id));
  };

  const showPassword = () => {
    // console.log(eyeicon.current.src);

    if (eyeicon.current.src.includes("icons/closeEye.svg")) {
      if (confirm("show the password")) {
        // includes(direct file name ) not resolve abs path  | src resolve abs path
        eyeicon.current.src = "icons/eye.svg"; // worked with both ./icons
        passwordRef.current.type = "test";
      }
    } else {
      eyeicon.current.src = "icons/closeEye.svg";
      passwordRef.current.type = "password";
    }
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    toast("Copied to clipboard!", {
      position: "bottom-left",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      // transition: "Bounce",
    });

    navigator.clipboard.writeText(text);
  };

  const deleteText = (text) => {};

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition="Bounce"
      />

      <div className="absolute inset-0 -z-10 h-full w-full bg-green-100 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>

      <div className=" md:myContainer min-h-[88vh] container mx-auto max-w-5xl py-3 px-1.5  md:px-20 flex flex-col items-center gap-2">
        <div className="logo font-bold text-white text-3xl">
          <span className="text-green-500 ">&lt;</span>
          <span className="text-black">Pass</span>
          <span className="text-green-500 ">Vault/&gt;</span>
        </div>

        <h3>Your Own Password Manager</h3>

        <div className="flex flex-col gap-4 w-full py-4">
          <input
            value={form.site}
            onChange={handleChange}
            className="border border-green-400 rounded-full px-2"
            type="text"
            name="site"
            id="site"
            placeholder="Enter Website URL"
          />

          <div className="md:flex gap-3  ">
            <input
              value={form.username}
              onChange={handleChange}
              className="border border-green-400 rounded-full w-[100%] md:w-[70%] px-2 mb-3"
              type="text"
              name="username"
              id="username"
              placeholder="Username"
            />

            <div className="relative  md:w-[30%]">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                className="border border-green-400 rounded-full w-full px-2"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
              <span
                className="text-xl absolute right-0 py-0.5 px-2"
                onClick={showPassword}
              >
                <img ref={eyeicon} src="icons/closeEye.svg" alt="" />
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={savePassword}
          className="font-semibold flex justify-center items-center px-2 rounded-full gap-2 border border-white bg-green-500 hover:bg-green-400 "
        >
          <span>
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger={"hover"}
              style={{ width: "22px", paddingTop: "2px" }}
            ></lord-icon>
          </span>
          Save
        </button>

        <div className="w-full">
          <h2 className="font-bold text-xl px-1">Your Passwords</h2>
          {passwordArray.length == 0 && (
            <div className="py-5">No password to show</div>
          )}
          {passwordArray.length != 0 && (
            <table class="table-auto border border-green-700 w-full  rounded-lg overflow-hidden mb-3">
              <thead className="bg-green-800 text-white py-6">
                <tr>
                  <th className="py-2 font-semibold">Site</th>
                  <th className="py-2 font-semibold">Username</th>
                  <th className="py-2 font-semibold">Password</th>
                  <th className="py-2 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="border border-white w-300 py-2 px-1  ">
                        <div className="flex justify-center items-center gap-1">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <img
                            onClick={() => {
                              copyText(item.site);
                            }}
                            className="w-4 h-4 cursor-pointer"
                            src="icons/copy.gif"
                            alt="copy"
                          />
                        </div>
                      </td>
                      <td className="border border-white w-200 py-2 px-1">
                        <div className="flex justify-center items-center">
                          {item.username}
                          <img
                            onClick={() => {
                              copyText(item.username);
                            }}
                            className="w-4 h-4 cursor-pointer"
                            src="icons/copy.gif"
                            alt="copy"
                          />
                        </div>
                      </td>
                      <td className="border border-white w-200 py-2 px-1">
                        <div className="flex justify-center items-center">
                          <span style={{ WebkitTextSecurity: "disc" }}>
                            {item.password}
                          </span>
                          <img
                            onClick={() => {
                              copyText(item.password);
                            }}
                            className="w-4 h-4 cursor-pointer"
                            src="icons/copy.gif"
                            alt="copy"
                          />
                        </div>
                      </td>
                      <td className="border border-white w-fit py-4 px-8 flex justify-center ">
                        <span
                          className="edit cursor-pointer"
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/qnpnzlkk.json"
                            trigger="hover"
                            style={{ height: "22px" }}
                          ></lord-icon>
                        </span>
                        <span
                          className="delete cursor-pointer"
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{ height: "22px" }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
