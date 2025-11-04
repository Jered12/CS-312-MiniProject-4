//import react library postlist, blogform, and the styles.css
import React from "react";
import PostList from "./components/PostList";
import BlogForm from "./components/BlogForm";
import "./styles.css"; 

//set up the main structure if the blog app
function App() {
  return (
    <div className="container">
      <div className="heading">
        <h1>My Blog</h1>
      </div>
      <BlogForm />
      <PostList />
    </div>
  );
}

//export the app components
export default App;