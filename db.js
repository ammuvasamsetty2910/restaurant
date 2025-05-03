const mongoose = require('mongoose');

module.exports = async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://buragaravi:qzlCHauz9boCgeCK@cluster0.aow0j7e.mongodb.net/SampleDB?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection failed', err);
    process.exit(1);
  }
};
