import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import ReactMarkdown from "react-markdown";

function EditPost() {
  const [formdata, setFormdata] = useState({ title: "", content: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  //Fetching post
  useEffect(() => {
    const fetchPost = async () => {
      const res = await api.get(`/posts/${id}`);
      setFormdata({ title: res.data.title, content: res.data.content });
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setFormdata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/posts/${id}`, formdata);
      navigate(`/posts/${id}`);
    } catch (err) {
      console.log("Unable to update post", err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Edit Post</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Post Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={formdata.title}
              onChange={handleChange}
              placeholder="Enter your post title"
              required
              className="w-full px-4 py-2 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Editor and Preview side-by-side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Markdown Textarea */}
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Markdown Content
              </label>
              <textarea
                name="content"
                id="content"
                rows="15"
                value={formdata.content}
                onChange={handleChange}
                placeholder="Write using Markdown..."
                required
                className="w-full px-4 py-2 bg-white text-gray-900 rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Live Markdown Preview */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Live Preview
              </label>
              <div className="prose prose-invert bg-gray-800 p-4 rounded-md overflow-auto max-h-[500px]">
                <ReactMarkdown
                  components={{
                    h1: ({ node, ...props }) => (
                      <h1 className="text-2xl font-bold mt-6 mb-2" {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2
                        className="text-xl font-semibold mt-4 mb-2"
                        {...props}
                      />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3
                        className="text-lg font-semibold mt-3 mb-2"
                        {...props}
                      />
                    ),
                    p: ({ node, ...props }) => (
                      <p className="text-base my-2" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul
                        className="list-disc list-inside pl-4 my-2"
                        {...props}
                      />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol
                        className="list-decimal list-inside pl-4 my-2"
                        {...props}
                      />
                    ),
                    li: ({ node, ...props }) => (
                      <li className="ml-2" {...props} />
                    ),
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
                      <a
                        className="text-indigo-400 hover:underline"
                        {...props}
                      />
                    ),
                  }}
                >
                  {formdata.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPost;
