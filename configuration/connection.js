//Connecting to mongo Atlas also need to do it locally as well! 



mongoose.connect(
    process.env.MONGODB_URI || 'mongodb+srv://owner:V0A9gD2VOncz9zGq@cluster0.oa5wy.mongodb.net/gymnasium?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  );

// Do I need to export the above as a variable?
const db = mongojs('mongodb+srv://owner:V0A9gD2VOncz9zGq@cluster0.oa5wy.mongodb.net/gymnasium?retryWrites=true&w=majority', ['gymnasium'])

