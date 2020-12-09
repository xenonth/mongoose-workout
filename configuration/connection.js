//Connecting to mongo Atlas also need to do it locally as well! 
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/deep-thoughts',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  );

// Do I need to export the above as a variable?

