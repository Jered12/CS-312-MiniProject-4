//import reach library and useState, useEffect hook 
//the useEffect hook is needed to fetch data from the backend
import React, { useEffect, useState } from "react";


function PostList() 
{
  //need a state to store the blog content
  const [Content,setContent] = useState([]);
  //state to track what is being edited
  const [editingPostId,setEditId] = useState("");
  //state to hold the temp edited totle
  const [editTitle,setEditTitle] = useState("");
  //state to hold the temp edited content
  const [editBody,setEditBody] = useState("");

  // now a function that will fetch the posts form backend
  const fetchPosts=async () => {
    //first make a get request from the api
    const res=await fetch("/api/posts");
    //parse the json response
    const data=await res.json();
    //upadte the state
    setContent(data);
  };

  //use useeffect hook to make sure that the fetchposts function runs 
  useEffect(() => 
  {
    fetchPosts();
  });

  // function to delte a post
  const handleDelete=async (id) => 
  {
    //send a delete request
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    //then just remove the delted post from the state
    setContent(Content.filter((post) => post.blog_id!==id));

  };

  // now a function to edit a post
  const handleEdit=(post) => 
  {
    //give the post that you are editing an id
    setEditId(post.blog_id);
  };

  // a function that will save after an edit has happend but i cant get it to work
  const handleSave=async (id) => 
  {
    //first send a put request to the backend to get the post that will be edited
    await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editTitle, content: editBody }),
    });

    // using map loop through all the posts and update the one being edited
    const updatedContent = Content.map((post) => 
    {
      // if the blog post matches 
      if (post.blog_id===id)
      {
        //update the totle and the content
        return {title: editTitle, body: editBody };
      }
      //else just levae everything unchanged
      return post;
    });

    // then update the state of the changed array
    setContent(updatedContent);


  };

  //this return takes cae of the main container,the mapping thorugh post, 
  //the edit block , the poat block so basicaly everything
  return (
    <div className="container">
      {Content.map((post) => (
        <div key={post.blog_id} className="blog-post">

          {editingPostId===post.blog_id ? 
          (
            <div className="edit-form">
              <input
                type="text"
                value={editTitle}
                onChange={(event) => setEditTitle(event.target.value)}
              />
              <textarea
                value={editBody}
                onChange={(event) => setEditBody(event.target.value)}
              />
              <button onClick={() => handleSave(post.blog_id)}>
                <span>Save</span>
              </button>
              <button onClick={() => setEditId(null)}>
                <span>Cancel</span>
              </button>
            </div>

          )  :
          (
            <>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <p>
                <strong>Author:</strong> {post.creator_name}
              </p>

              <div className="button-group">
                <button onClick={() => handleDelete(post.blog_id)}>
                  <span>Delete</span>
                </button>
                <button onClick={() => handleEdit(post)}>
                  <span>Edit</span>
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

//then export the component so it can be importabt in the App.js
export default PostList;