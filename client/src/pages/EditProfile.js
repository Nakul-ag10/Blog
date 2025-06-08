import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/authcontext";

function EditProfile() {
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    bio: "",
    avatar: "",
  });
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormdata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put("/users/profile", formdata);
      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/users/profile");
        setFormdata(res.data);
        console.log(formdata);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfile();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* User Info */}
        <form onSubmit={handleSubmit}>
          <div>
            <div className="flex flex-row">
              <div className="sm:px-0 px-4 flex-1">
                <h3 className="text-lg font-semibold text-gray-200">
                  Profile Information
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-400">
                  Details of your account.
                </p>
              </div>
              <img
                className="h-20 w-20 rounded-full object-cover ring-2 ring-indigo-500"
                src="https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=John" // use your static/dynamic avatar
                alt="User Avatar"
              />
            </div>
            <div className="mt-6 border-t border-gray-700">
              <dl className="divide-y divide-gray-700">
                <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 px-4 sm:px-0">
                  <dt className="flex items-center text-sm font-medium text-gray-300">
                    Full name
                  </dt>
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Username"
                      onChange={handleChange}
                      value={formdata.name}
                      className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                    />
                  </div>
                </div>
                <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 px-4 sm:px-0">
                  <dt className="flex items-center text-sm font-medium text-gray-300">
                    Email address
                  </dt>
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email"
                      onChange={handleChange}
                      value={formdata.email}
                      disabled
                      className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                    />
                  </div>
                </div>

                <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 px-4 sm:px-0">
                  <dt className="text-sm font-medium text-gray-300">About</dt>
                  <div className="mt-2">
                    <textarea
                      id="bio"
                      name="bio"
                      rows={3}
                      onChange={handleChange}
                      value={formdata.bio}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                    <p className="mt-3 text-sm/6 text-gray-600">
                      Write a few sentences about yourself.
                    </p>
                  </div>
                </div>
              </dl>
            </div>

            {/*edit button*/}
            <div className="mt-5 flex justify-end">
              <button
                className=" rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                type="submit"
              >
                Apply Changes{" "}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
