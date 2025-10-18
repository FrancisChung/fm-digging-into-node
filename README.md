# fm-digging-into-node
### Coursework for FrontendMaster's Digging into Node.js by Kyle Simpson

Node.js has taken the JavaScript world by storm, but where do you start when all you see are tens of thousands of packages/frameworks on npm? The best place to start is always at the foundation, and that's what this course focuses on. In this course, you’ll get to know the fundamental concepts in Node.js: CLI programming, file system access, asynchrony, streams, HTTP servers & routing, database persistence, and child processes.

![image](https://github.com/user-attachments/assets/298ac327-69ec-4ce7-95e6-c16d2fb3c08b)

### Notes

1. use src/
2. sqlite3 errors - npm install sqlite3@latest
3. For exercise 7, make sure you have node running in the background (i.e node ex6.js)
4. To test a process's exit code, you can chain another command behind it. <br />If it returns 0, it should run the following command. <br /> e.g node ex7-child.js && ls -la