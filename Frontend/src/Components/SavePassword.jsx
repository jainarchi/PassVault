import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { toast } from "react-toastify";

const SavePassword = () => {
  const [allPasswords, setAllPasswords] = useState([]);
  const [updatePasswordId, setUpdatePasswordId] = useState(null);
  const [originalData, setOriginalData] = useState({});

  const fetchSavedPasswords = () => {
    axios
      .get("http://localhost:3000/api/credential", {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res.data.message, res.data.count);
        // console.log(res.data.credentials);
        setAllPasswords(res.data.credentials);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const savePassword = (e) => {

    e.preventDefault();


    if(form.password.trim() == '' 
    || form.website.trim() == '' 
    || form.username.trim == ''){

      console.log('all fields are required !')
      return 
    }



    if (updatePasswordId) {
      const payload = {};

      if (originalData.website !== form.website) {
        payload.website = form.website;
      }
      if (originalData.username !== form.username) {
        payload.username = form.username;
      }
      if (originalData.password !== form.password) {
        payload.password = form.password;
      }

      console.log(payload);

      axios
        .patch(
          "http://localhost:3000/api/credential/" + updatePasswordId,
          {
            payload,
          },
          {
            withCredentials: true,
          },
        )
        .then((res) => {
         toast.success(res.data.message);
          fetchSavedPasswords();
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } else {
      console.log(form.website, form.username, form.password);

      axios
        .post(
          "http://localhost:3000/api/credential",
          {
            website: form.website,
            username: form.username,
            password: form.password,
          },
          {
            withCredentials: true,
          },
        )
        .then((res) => {
          toast.success(res.data.message);
          fetchSavedPasswords();
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }

    setForm({ ...form, website: "", username: "", password: "" });
  };




  const editPassword = (item) => {
    setForm({
      ...form,
      website: item.website,
      username: item.username,
      password: item.password,
    });
    setUpdatePasswordId(item._id);
    setOriginalData(item);
  };

  const deletePassword = (id) => {
    if (confirm("You sure to delete the password")) {
      axios
        .delete("http://localhost:3000/api/credential/" + id, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          fetchSavedPasswords();
        })
        .catch((err) => {
         toast.error(err.response.data.message);
        });
    }
  };

  const [form, setForm] = useState({
    website: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchSavedPasswords();
  }, []);


 const copyText = async (text) => {
  
  try{
     await navigator.clipboard.writeText(text);
     toast.success('Copied text')

   }catch(err){
       toast.error('Failed to Copy')
   }
 };




  
  return (

    <>
    <Navbar />
    <div className="container w-full m-auto">
      <div className="p-2 ">
        <form
          onSubmit={savePassword}
          className="flex flex-col gap-4 w-full py-4 items-center"
        >
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={form.website}
            required={true}
            onChange={handleChange}
            className="border border-green-400 rounded-2xl px-2 py-1 w-[100%]"
          />

          <div className="md:flex gap-3 w-[100%] ">
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={form.username}
              required={true}
              onChange={handleChange}
              className="border border-green-400 rounded-2xl px-2 py-1 w-[100%] md:w-[70%] mb-3"
            />

            <input
              type="password"
              placeholder="Password"
              name="password"
              value={form.password}
              required={true}
              onChange={handleChange}
              className="border border-green-400 rounded-2xl px-2 py-0 w-full"
             
            />
          </div>

          <button
            onClick={savePassword}
            className="font-semibold flex justify-center items-center px-2 rounded-full gap-2 border border-white bg-green-500 hover:bg-green-400 w-fit "
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
        </form>
      </div>

      <div className="allPasswords ">
        {allPasswords.length == 0 && (
          <div className="m-5">No passwored to show</div>
        )}
        {allPasswords.length != 0 && (
          <table className="table-auto border border-green-700 w-full  rounded-lg overflow-hidden mb-3">
            <thead className="bg-green-800 text-white py-6">
              <tr>
                <th className="py-2 font-semibold">Site</th>
                <th className="py-2 font-semibold">Username</th>
                <th className="py-2 font-semibold">Password</th>
                <th className="py-2 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-green-100">
              {allPasswords.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="border border-white w-300 py-2 px-1  ">
                      <div className="flex justify-center items-center gap-1 ">
                        <a href={item.website} target="_blank" className="cursor-pointer">
                          {item.website}
                        </a>
                        <img
                          onClick={() => {
                              copyText(item.website);
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
                          editPassword(item);
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
                          deletePassword(item._id);
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

export default SavePassword;
