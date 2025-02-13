"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClient = void 0;
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const default_1 = __importDefault(require("./config/default"));
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = default_1.default.PORT;
exports.prismaClient = new client_1.PrismaClient({
    log: ["query", "info", "warn", "error"],
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: "*",
}));
app.get("/", (req, res) => {
    return res.json({
        message: "Hello World",
        title: "Infloso",
        version: "0.0.0",
    });
});
// app.use("/api/", router);
(0, routes_1.default)(app);
app.listen(port, () => {
    // log.info(`Server started on http://localhost:${port}`);
    console.log(`Server started on http://localhost:${port}`);
});
module.exports = app;
