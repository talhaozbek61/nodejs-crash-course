// import fs from "fs";
import fs from "fs/promises";

// readFile() - callback
// fs.readFile("./text.txt", "utf8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// readFileSync() - Sync version
// const data = fs.readFileSync("./text.txt", "utf8");
// console.log(data);

// readFile() - Promises .then()
// fs.readFile("./text.txt", "utf8")
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));

// readFile() - async/await
const readFile = async () => {
  try {
    const data = await fs.readFile("./text.txt", "utf8");
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

// writeFile()
const writeFile = async (text) => {
  try {
    await fs.writeFile("./text.txt", text);
    console.log("File written to..");
  } catch (error) {
    console.log(error);
  }
};

// appendFile()
const appendFile = async (text) => {
  try {
    await fs.appendFile("./text.txt", `\n${text}`);
    console.log("File appended to..");
  } catch (error) {
    console.log(error);
  }
};

writeFile("Hello, i am writing...");
appendFile("This is appended text");
readFile();
