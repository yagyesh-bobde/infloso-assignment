"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const __1 = require("..");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
// Helper function to send verification email
function sendVerificationEmail(email, token) {
    return __awaiter(this, void 0, void 0, function* () {
        // Implementation depends on your email service
        // This is a placeholder
        console.log(`Sending verification email to ${email} with token ${token}`);
    });
}
// Helper function to send password reset email
function sendPasswordResetEmail(email, token) {
    return __awaiter(this, void 0, void 0, function* () {
        // Implementation depends on your email service
        // This is a placeholder
        console.log(`Sending password reset email to ${email} with token ${token}`);
    });
}
exports.default = (app) => {
    app.get("/", (req, res) => {
        return res.send("Health Check API!");
    });
    app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { username, email, password } = req.body;
        try {
            let user = yield __1.prismaClient.user.findFirst({
                where: { OR: [{ username }, { email }] },
            });
            let isNewUser = false;
            let emailToken = "";
            if (!user) {
                // Create new user
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const emailVerificationToken = (0, uuid_1.v4)();
                emailToken = emailVerificationToken;
                user = yield __1.prismaClient.user.create({
                    data: {
                        username,
                        email,
                        password: hashedPassword,
                        emailVerificationToken,
                    },
                });
                // Send verification email
                yield sendVerificationEmail(email, emailVerificationToken);
                isNewUser = true;
            }
            if (!emailToken) {
                emailToken = user.emailVerificationToken;
            }
            // Generate token for both new and existing users
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });
            // Create a new session
            yield __1.prismaClient.session.create({
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
        }
        catch (error) {
            res.status(500).json({ message: "Error processing signup", error });
        }
    }));
    // Login route
    app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const user = yield __1.prismaClient.user.findUnique({ where: { email } });
            if (!user || !(yield bcrypt_1.default.compare(password, user.password))) {
                return res.status(401).json({ message: "Invalid credentials" });
            }
            if (!user.emailVerified) {
                return res.status(401).json({ message: "Email not verified" });
            }
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });
            // Create a new session
            yield __1.prismaClient.session.create({
                data: {
                    userId: user.id,
                    token,
                    expiresAt: new Date(Date.now() + 3600000), // 1 hour from now
                },
            });
            res.json({ token });
        }
        catch (error) {
            res.status(500).json({ message: "Error logging in", error });
        }
    }));
    // Email verification route
    app.get("/verify-email/:token", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { token } = req.params;
        try {
            const user = yield __1.prismaClient.user.findFirst({
                where: { emailVerificationToken: token },
            });
            if (!user) {
                return res.status(400).json({ message: "Invalid verification token" });
            }
            yield __1.prismaClient.user.update({
                where: { id: user.id },
                data: { emailVerified: true, emailVerificationToken: null },
            });
            res.json({ message: "Email verified successfully" });
        }
        catch (error) {
            res.status(500).json({ message: "Error verifying email", error });
        }
    }));
    // Password reset request route (now requires authentication)
    app.get("/reset-password-request", auth_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = res.locals.user;
            const resetToken = (0, uuid_1.v4)();
            const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now
            yield __1.prismaClient.user.update({
                where: { id: user.id },
                data: {
                    resetPasswordToken: resetToken,
                    resetPasswordExpires: resetTokenExpiry,
                },
            });
            // Send password reset email
            yield sendPasswordResetEmail(user.email, resetToken);
            res.json({ message: "Password reset email sent", resetToken });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Error requesting password reset", error });
        }
    }));
    // Password reset route (now requires authentication)
    app.post("/reset-password", auth_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { newPassword, resetToken } = req.body;
        try {
            const user = yield __1.prismaClient.user.findFirst({
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
            const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
            yield __1.prismaClient.user.update({
                where: { id: user.id },
                data: {
                    password: hashedPassword,
                    resetPasswordToken: null,
                    resetPasswordExpires: null,
                },
            });
            res.json({ message: "Password reset successfully" });
        }
        catch (error) {
            res.status(500).json({ message: "Error resetting password", error });
        }
    }));
};
