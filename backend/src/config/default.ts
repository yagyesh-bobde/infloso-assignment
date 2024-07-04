const JWT_SECRET = process.env.JWT_SECRET || "thisisasamplesecretkey";
const SALT_ROUNDS = parseInt(`${process.env.SALT_ROUNDS}`) || 10;
const MIN_PASSWORD_LENGTH = parseInt(`${process.env.MIN_PASSWORD_LENGTH}`) || 6;
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID!;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET!;
const DB_URL = process.env.DB_URL!;
const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL!;
const DIRECT_URL = process.env.DIRECT_URL!;

export default {
  PORT,
  DATABASE_URL,
  DIRECT_URL,
  logLevel: "info",
  JWT_SECRET,
  SALT_ROUNDS,
};
