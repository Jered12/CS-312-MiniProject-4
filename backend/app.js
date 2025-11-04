// Import everything that is needed
//express = routes, and http requests
import express from "express";

//import the pg package which is the postgreSQL 
import pg from "pg";
//import cinet from pg wich will be used to crate a connection to the posgresql
import {Client} from "pg";



//initilize function that will be used
const app=express();
const PORT=4010;
const POSTS="posts.json";



//middleware that will be redaing the form data
app.use(express.urlencoded({ extended: true }));
//parse json bodies
app.use(express.json());
//make sure that everything in the publix folder is avalable to browser
app.use(express.static("public"));



//create a connection db to the postgre database
const db = new Client
({
  //username used to connect
  user: "postgres",
  //where the server will run
  host: "localhost",
  //name of the database to connect to
  database: "BlogDB",
  //the password of the postgre account
  password: "Gramatka@123",
  //the port number the postre is listening
  port: 5432,
});

//connect to the database
await db.connect();



// route for the homepage
app.get("/api/posts", async (req, res) => {
  //runa query to get all the posts from the blog table
  const result =await db.query("SELECT * FROM blogs ORDER BY date_created DESC");
  //send the rows as JSON
  res.json(result.rows);

});

// route for creating a new post
app.post("/api/posts", async (req, res) => 
{
  //from the req.body take out creators name, id, title, and content
  const { creatorName, creatorUserId, title, content } = req.body;
  //new post object
  const dateCreated =new Date();

  // insert the blog into the Postgresql
  await db.query
  (
    "INSERT INTO blogs (creator_name, creator_user_id, title, body, date_created) VALUES ($1, $2, $3, $4, $5)",
    [creatorName, creatorUserId, title, content, dateCreated]
  );
});

// when the user wants to edit this will show up
app.get("/api/posts/:id", async (req, res) =>
{
  //chnage the id into a number
  const id =Number(req.params.id); 
  // get the blog posts from the postgresql so they can be edited
  const result = await db.query("SELECT * FROM blogs WHERE blog_id = $1", [id]);
  //get the first row from the quiry since the id is unique
  res.json(result.rows[0]);


});

// Save edited post
app.put("/api/posts/:id", async (req, res) => 
{
  //chnage the id into a number
  const id= Number(req.params.id); 
  
  //get the updated title and content
  const { title,content} = req.body;

  // update the post in the postgre database
  await db.query
  (
    "UPDATE blogs SET title = $1, body = $2 WHERE blog_id = $3",
    [title, content, id]
  );
});

// delete post route
app.delete("/api/posts/:id", async (req, res) => 
{
  // change the id to a number
  const id =Number(req.params.id);  
  
   // delete the post from the postgresql
  await db.query("DELETE FROM blogs WHERE blog_id = $1", [id]);
  res.json({ message: "Post deleted successfully" });

});



//finally start the server
app.listen(PORT, () => 
{
  //and write that its good in the terminal
  console.log(`Server running on port ${PORT}`);
});