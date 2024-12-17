const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Pasona API",
    description: "Auto-generated Swagger documentation",
  },
  host: "localhost:5001", // Adjust the port to match your server
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./server.js", "./routes/auth.js", "./routes/upload.js", "./routes/generate.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log("Swagger documentation generated successfully!");
});
