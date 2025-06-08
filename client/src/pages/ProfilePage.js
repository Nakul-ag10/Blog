import { useState, useEffect } from "react";
import api from "../api/axios";
import { useAuth } from "../context/authcontext";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState("");
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await api.get("/users/profile");
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching your Profile");
        navigate("/login");
      }
    };

    const fetchPosts = async () => {
      try {
        const res = await api.get("users/my-posts");
        //console.log(posts);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();
    fetchPosts();
  }, [token, navigate]);

  if (!profile) return <p>Fetching profile details.... </p>;
  return (
    <>
    <Navbar/>
     <div className="min-h-screen bg-gray-900 text-gray-100 px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* User Info */}
        <div>
          <div className="flex flex-row">
          <div className="sm:px-0 px-4 flex-1">
            <h3 className="text-lg font-semibold text-gray-200">Profile Information</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-400">Details of your account.</p>
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
                <dt className="text-sm font-medium text-gray-300">Full name</dt>
                <dd className="mt-1 text-sm text-gray-400 sm:col-span-2 sm:mt-0">{profile.name}</dd>
              </div>
              <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 px-4 sm:px-0">
                <dt className="text-sm font-medium text-gray-300">Email address</dt>
                <dd className="mt-1 text-sm text-gray-400 sm:col-span-2 sm:mt-0">{profile.email}</dd>
              </div>
              <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 px-4 sm:px-0">
                <dt className="text-sm font-medium text-gray-300">About</dt>
                <dd className="mt-1 text-sm text-gray-400 sm:col-span-2 sm:mt-0 break-all">{profile.bio}</dd>
              </div>
            </dl>
          </div>

          {/*edit button*/}
          <div className="mt-5 flex justify-end">
            <Link to={`/profile/edit`} className= " rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Edit Profile </Link>
          </div>
        </div>

        {/* User Posts */}
        <div>
          <h3 className="text-lg font-semibold text-gray-200 mb-4">Recent Posts</h3>
          {posts.length === 0 ? (
            <p className="text-sm text-gray-400">You haven’t created any posts yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="bg-gray-800 border border-gray-700 rounded-lg p-5 hover:shadow-md transition duration-300"
                >
                  <h4 className="text-xl font-semibold text-indigo-400 mb-2">{post.title}</h4>
                  <p className="text-sm text-gray-300 line-clamp-3">{post.content}</p>
                  <div className="mt-4 flex justify-end">
                    <Link
                      to={`/posts/${post._id}`}
                      className="text-sm text-indigo-500 hover:underline font-medium"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}

export default ProfilePage;
