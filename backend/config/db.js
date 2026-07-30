import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("=================================");
    console.log("✅ MongoDB Connected Successfully");
    console.log("Database :", conn.connection.name);
    console.log("Host     :", conn.connection.host);
    console.log("=================================");
  } catch (error) {
    console.error("❌ Database Connection Failed");
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;