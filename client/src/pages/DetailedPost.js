import { useState, useEffect } from "react";
import api from "../api/axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/authcontext";
import ReactMarkdown from "react-markdown";

function DetailedPost() {
  const [post, setPost] = useState("");
  const { id } = useParams(); //Fetches id from url
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post")) return;

    try {
      await api.delete(`/posts/${id}`);
      navigate("/profile");
    } catch (err) {
      console.log("error deleting the post", err.message);
    }
  };

  const handleEdit = async () => {
    navigate(`/posts/${id}/edit`);
  };
  if (!post) return <p>Loading post...</p>;

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-12 text-gray-100">
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-xl shadow-md p-6 space-y-6">
        {/* Title */}
        <h1 className="text-3xl font-bold text-indigo-400">{post.title}</h1>

        {/* Author & Date */}
        <p className="text-sm text-gray-400">
          By{" "}
          <span className="font-medium text-gray-300">{post.author.name}</span>{" "}
          · {new Date(post.createdAt).toLocaleDateString()}
        </p>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
        <ReactMarkdown
          components={{
            h1: ({ node, ...props }) => (
              <h1 className="text-2xl font-bold mt-6 mb-2" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="text-xl font-semibold mt-4 mb-2" {...props} />
            ),
            h3: ({ node, ...props }) => (
              <h3 className="text-lg font-semibold mt-3 mb-2" {...props} />
            ),
            p: ({ node, ...props }) => (
              <p className="text-base my-2" {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul className="list-disc list-inside pl-4 my-2" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="list-decimal list-inside pl-4 my-2" {...props} />
            ),
            li: ({ node, ...props }) => <li className="ml-2" {...props} />,
            code: ({ node, ...props }) => (
              <code
                className="bg-gray-800 px-1 py-0.5 rounded text-sm font-mono text-yellow-300"
                {...props}
              />
            ),
            blockquote: ({ node, ...props }) => (
              <blockquote
                className="border-l-4 border-gray-500 pl-4 italic text-gray-400 my-4"
                {...props}
              />
            ),
            a: ({ node, ...props }) => (
              <a className="text-indigo-400 hover:underline" {...props} />
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
        </div>

        {/* Buttons if post owner */}
        {user.id === post.author._id && (
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleEdit}
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:cursor-pointer hover:bg-indigo-500"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:cursor-pointer hover:bg-red-500"
            >
              Delete
            </button>
          </div>
        )}

        {/* Back to profile */}
        <div className="pt-8">
          <Link
            to="/profile"
            className="text-indigo-400 hover:text-indigo-300 text-sm font-medium"
          >
            ← Back to Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DetailedPost;
