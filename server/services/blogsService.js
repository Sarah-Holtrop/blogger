import mongoose from 'mongoose'

let _schema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 60 },
  slug: { type: String, required: true, unique: true, lowercase: true },
  summary: { type: String, maxlength: 120 },
  author: { type: String, required: true },
  body: { type: String },
  tags: [{ type: String, required: true }]
}, { timestamps: true })

export default mongoose.model('blogPost', _schema)