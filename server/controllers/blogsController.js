// Retrieve all blogs
// Retrieve blogs by query for title(slug)    (like getStudentBySport or whatever)
// Retrieve all blogs by query for a tag      (same as above)
// Retrieve a blog by id
// Edit a blog by id
// Delete a blog by id


import express from 'express'
import _blogsService from '../services/blogsService'

export default class BlogsController {
  async createBlog(req, res, next) {
    try {
      let blog = await _blogsService.create(req.body)
      res.send(blog)
    } catch (err) { next(err) }
  }
  async getBlogById(req, res, next) {
    try {
      let blog = await _blogsService.findById(req.params.blogId)
      res.send(blog)
    } catch (err) { next(err) }
  }
  async getBlogBySlug(req, res, next) {
    try {
      if (!req.query.slug) { //title or slug
        return next()
      }
      let blog = await _blogsService.findOne({ slug: req.query.slug }) //title or slug
      if (!blog) {
        return res.status(400).send('No blogs by that title')
      }
      res.send(blog)
    } catch (err) { next(err) }
  }
  async getBlogsByTag(req, res, next) {
    try {
      if (!req.query.tag) {
        return next()
      }
      let blogs = await _blogsService.find({ tags: { $in: [req.query.tag] } })
      res.send(blogs)
    } catch (err) { next(err) }
  }
  async editBlog(req, res, next) {
    try {
      let editedBlog = await _blogsService.findByIdAndUpdate(req.params.blogId, req.body, { new: true })
      res.send(editedBlog)
    } catch (err) { next(err) }
  }
  async getAllBlogs(req, res, next) {
    try {
      let blogs = await _blogsService.find()
      res.send(blogs)
    } catch (err) { next(err) }
  }
  async deleteBlog(req, res, next) {
    try {
      await _blogsService.findByIdAndDelete(req.params.blogId)
      res.send('Blog removed')
    } catch (err) { next(err) }
  }
  constructor() {
    this.router = express.Router()
      // server.get('/', express.static(__dirname + '/../public'))
      .get('', this.getBlogBySlug)// by query .findOne()
      .get('', this.getBlogsByTag) //by query .find()
      .get('', this.getAllBlogs)
      .get('/:blogId', this.getBlogById) //by ID
      .post('', this.createBlog)
      .put('/:blogId', this.editBlog) //by ID
      .delete('/:blogId', this.deleteBlog) //by ID
  }
}