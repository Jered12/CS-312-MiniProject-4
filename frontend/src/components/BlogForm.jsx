//import reach library and useState hook 
import React, { useState } from "react";

//create the function BlogForm and i need to import it in 
//App.js so creat it as an export default
export default function BlogForm({ onAddPost }) 
{
  //useState hook to store the title of the post and the content of the post
  const [title,setTitle] = useState("");
  const [content,setContent] = useState("");

  const handleSubmit=async (event) => 
  {
    //nees to send a POST request to the nackend to create a new post
    const res=await fetch("/api/posts", 
    {
      method: "POST",
      //sending a JSON
      headers: { "Content-Type": "application/json" },
    });
    //if the request works
    if (res.ok) 
    {
      //give a msg to the user
      alert("Post created!");
    }
    
  };

  return (
    //wrap the input fields into form so it van be styled
    //and call handlesubmit when submutted
    //they can add a title and the content and clicj submuit
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Blog Content"
        required
      />
      <button type="submit">
        <span>Create Blog</span>
      </button>
    </form>
  );
}