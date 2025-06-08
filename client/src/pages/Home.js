import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/posts");
        // Sort by newest first
        const sorted = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setPosts(sorted);
      } catch (err) {
        console.log("Error fetching posts", err.message);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-white px-4 py-12">
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-6 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
            <svg
              viewBox="0 0 1024 1024"
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 -z-10 size-256 -translate-y-1/2 mask-[radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            >
              <circle
                r={512}
                cx={512}
                cy={512}
                fill="#6366F1"
                fillOpacity="0.7"
              />
              <defs>
                <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                  <stop stopColor="#7775D6" />
                  <stop offset={1} stopColor="#E935C1" />
                </radialGradient>
              </defs>
            </svg>
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
              <h2 className="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
                Welcome to Blogsy.
              </h2>
              <p className="mt-6 text-lg/8 text-pretty text-gray-300">
                This is where your ideas find a voice. Start with us today,
                share your ideas with the world and write endlessly..
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                <a
                  href="/create"
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-xs transition delay-100 duration-200 hover:bg-indigo-500 hover:text-gray-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Get started
                </a>
                <a href="#" className="text-sm/6 font-semibold text-white">
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
            <div className="relative mt-16 h-80 lg:mt-8">
              <img
                alt="App screenshot"
                src="https://tailwindcss.com/plus-assets/img/component-images/dark-project-app-screenshot.png"
                width={1824}
                height={1080}
                className="absolute top-0 left-0 w-228 max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
              />
            </div>
          </div>
        </div>

          <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-7 ">
            <div className="mx-auto max-w-2xl lg:mx-0 ">
              <h2 className="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
                Latest Blogs.
              </h2>
            </div>
            <div className="mx-auto mt-2 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post._id}
                  className="flex max-w-xl p-6 rounded-md flex-col items-start border-gray-900 justify-between transition delay-100 duration-500 ease-in-out hover:border-indigo-400 hover:border-b hover:shadow-lg "
                >
                  <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime={post.createdAt} className="text-gray-200">
                      {new Date(post.createdAt).toDateString().split(' ')[0]} , {new Date(post.createdAt).toDateString().split(' ')[1]} {new Date(post.createdAt).toDateString().split(' ')[2]} {new Date(post.createdAt).toDateString().split(' ')[3]}
                    </time>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg/6 font-semibold text-gray-200 group-hover:text-indigo-400 hover:cursor-pointer">
                      <a href = {`/posts/${post._id}`}>
                        <span className="absolute inset-0" />
                        {post.title}
                      </a>
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm/6 text-gray-300">
                      {post.content}
                    </p>
                  </div>
                  <div className="relative mt-8 flex items-center gap-x-4">
                    <div className="text-sm/6">
                      <p className="font-semibold text-gray-200">
                        <p>
                          <span className="absolute inset-0" />
                          {post.author.name}
                        </p>
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
    </>
  );
}

export default Home;
