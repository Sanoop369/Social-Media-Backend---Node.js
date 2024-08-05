import mongoose from "../db.js";
import Blog from "../models/Blog.js";
import User from "../models/user.js";

export const getAllBlogs=async (req,res,next)=>{
    let blogs;
  try{
    blogs=await Blog.find().populate('user', 'name email');;

  }catch(err){
    return console.log(err)
  }  
  if(!blogs){
    return res.status(404).json({message:"No Blogs Found"})
  }
  return res.status(200).json({blogs})
}
export const addBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body;
    const blog = new Blog({
      title, description, image, user
    });
  
    let existingUser;
    try {
      existingUser = await User.findById(user);
    } catch (err) {
      return console.log(err);
    }
  
    if (!existingUser) {
      return res.status(400).json({ message: "Unable to find user by this id" });
    }
  
    try {
      await blog.save();
      existingUser.blogs.push(blog);
      await existingUser.save();
    } catch (err) {
      return console.log(err);
    }
  
    return res.status(201).json({ blog });
  }

export const updateBlog=async (req,res,next)=>{
    const blogId=req.params.id;
    let blog;
    try{
    blog=await Blog.findByIdAndUpdate(blogId,req.body)
    }catch(err){
        return console.log(err)
    }
    if(!blog){
        return res.status(500).json({message:"Unable to Update The Blog"})
    }
    return res.status(200).json({blog})
}

export const getBlogById=async(req,res,next)=>{
const blogId=req.params.id;
let blog;
try{
blog=await Blog.findById(blogId).populate('user', 'name email');
}
catch(err){
    return console.log(err)
}
if (!blog){
    return res.status(404).json({message:"Blog Not Found"})

}
return res.status(200).json({blog})
}

export const deleteBlog=async (req,res,next)=>{
    const id=req.params.id;
    let blog;
    try{
        blog=await Blog.findByIdAndDelete(id).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save()
    }catch(err){
        return console.log(err)
    }
    if(!blog){
        return res.status(400).json({message:"unable to delete"})

    }
    return res.status(200).json({message:"Blog Deleted Succesfully"})
}