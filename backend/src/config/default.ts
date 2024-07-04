const JWT_SECRET = process.env.JWT_SECRET || "thisisasamplesecretkey";
const SALT_ROUNDS = parseInt(`${process.env.SALT_ROUNDS}`) || 10;
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
