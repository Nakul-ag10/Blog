Day 1
Server: Made all directories
        install Mongoose express dotenv cors
        Connected to DB
        Basic server

Day 2 login/register
JWt : xxxxxx.yyyyyyy.zzzzzzz
      x and y are the encrypted user data using hashing algo
      z is encryption using secret key
      jwt is stored with the user
      when a request is sent to the server it just needs to decrypt x and y and compare it with z
Schema: name, email, password
        trim to remove white spaces
        lowecase for email

AuthController: 
      register: first check is user exists
                if already exists return with error message
                else hash password
                generate token
     login:  first find user via email
             if user doesnt exist: invalid creds
             compare password with hashed password
             generate token

authRoutes:  create router using express
             make post routes for login, register

index.js:    app.use(path, import router from authRoutes)

DAY3 POST and CRUD

Post.js: created post schema
         author had reference to user id

authMiddleware: Middleware that protects protected routes and authenticates tokens before granting access

postControls.js: Made the crud to getallposts getpostbyid create delete and update
                 used .populate() to populate the author field with user data

postRoutes.js : All the post routes


Day4: User profiles
     Update User.js: Add bio and avatar
     Make userController.js: getUserProfile
                             updateUserProfile
                             getallmyposts
     Add all the routes

Day5: Frontend
      Install axios react-router-dom
      

export default function Example() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <p className="mt-2 text-lg/8 text-gray-600">Your recent posts.</p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.length === 0 ? (<p> No posts yet.) :
                (posts.map((post) => (
            <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={post.datetime} className="text-gray-500">
                  {new Date(post.createdAt).toLocaleString()}
                </time>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                  <a href={post.href}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">{post.description}</p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <img alt="" src={post.author.imageUrl} className="size-10 rounded-full bg-gray-50" />
                <div className="text-sm/6">
                  <p className="font-semibold text-gray-900">
                    <a href={post.author.href}>
                      <span className="absolute inset-0" />
                      {post.author.name}
                    </a>
                  </p>
                </div>
              </div>
            </article>
  )))}
        </div>
      </div>
    </div>
  )
}
