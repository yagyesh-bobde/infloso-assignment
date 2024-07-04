import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import { prismaClient } from "..";
import authenticateUser from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", (req, res) => res.send("Health Check API!"));

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await prismaClient.user.findFirst({
      where: { OR: [{ username }, { email }] },
    });

    let isNewUser = false;
    let emailToken = "";
    if (!user) {
      // Create new user
      const hashedPassword = await bcrypt.hash(password, 10);
      const emailVerificationToken = uuidv4();
      emailToken = emailVerificationToken;
      user = await prismaClient.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          emailVerificationToken,
        },
      });

      // Send verification email
      await sendVerificationEmail(email, emailVerificationToken);
      isNewUser = true;
    }

    if (!emailToken) {
      emailToken = user.emailVerificationToken;
    }

    // Generate token for both new and existing users
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    // Create a new session
    await prismaClient.session.create({
      data: {
        userId: user.id,
        token,
        expiresAt: new Date(Date.now() + 3600000), // 1 hour from now
      },
    });

    // Determine the appropriate response message
    let message = isNewUser
      ? "User created successfully. Please check your email for verification."
      : "User already exists. Logged in successfully.";

    res
      .status(isNewUser ? 201 : 200)
      .json({ message, token, isNewUser, emailToken });
  } catch (error) {
    res.status(500).json({ message: "Error processing signup", error });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prismaClient.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!user.emailVerified) {
      return res.status(401).json({ message: "Email not verified" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    // Create a new session
    await prismaClient.session.create({
      data: {
        userId: user.id,
        token,
        expiresAt: new Date(Date.now() + 3600000), // 1 hour from now
      },
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

// Email verification route
router.get("/verify-email/:token", async (req, res) => {
  const { token } = req.params;

  try {
    const user = await prismaClient.user.findFirst({
      where: { emailVerificationToken: token },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid verification token" });
    }

    await prismaClient.user.update({
      where: { id: user.id },
      data: { emailVerified: true, emailVerificationToken: null },
    });

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error verifying email", error });
  }
});

// Password reset request route (now requires authentication)
router.get("/reset-password-request", authenticateUser, async (req, res) => {
  try {
    const user = res.locals.user;
    const resetToken = uuidv4();
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    await prismaClient.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: resetToken,
        resetPasswordExpires: resetTokenExpiry,
      },
    });

    // Send password reset email
    await sendPasswordResetEmail(user.email, resetToken);

    res.json({ message: "Password reset email sent", resetToken });
  } catch (error) {
    res.status(500).json({ message: "Error requesting password reset", error });
  }
});

// Password reset route (now requires authentication)
router.post("/reset-password", authenticateUser, async (req, res) => {
  const { newPassword, resetToken } = req.body;

  try {
    const user = await prismaClient.user.findFirst({
      where: {
        id: res.locals.user.id,
        resetPasswordToken: resetToken,
        resetPasswordExpires: { gt: new Date() },
      },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prismaClient.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    });

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password", error });
  }
});

// Helper function to send verification email
async function sendVerificationEmail(email: string, token: string) {
  // Implementation depends on your email service
  // This is a placeholder
  console.log(`Sending verification email to ${email} with token ${token}`);
}

// Helper function to send password reset email
async function sendPasswordResetEmail(email: string, token: string) {
  // Implementation depends on your email service
  // This is a placeholder
  console.log(`Sending password reset email to ${email} with token ${token}`);
}

export default router;
