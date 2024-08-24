const mongoose = require('mongoose');
const { TaskUserModel } = require('./user.model');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending',
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium',
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: TaskUserModel,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: TaskUserModel,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}, { 
  timestamps: true 
});



const TaskModel = mongoose.model('Task', TaskSchema);

module.exports = {TaskModel};
