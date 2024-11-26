// argv
console.log(process.argv);
// run node processDemo.js hoppala
// -> [
//     '/usr/local/bin/node',
//     '/Users/talhaozbek61/Desktop/nodejs-crash/processDemo.js',
//     'hoppala'
//   ]

console.log(process.argv[3]);
// run node processDemo.js hoppala whatsup
// -> whatup

// pid
console.log(process.pid);

// cwd()
console.log(process.cwd());
// -> /Users/talhaozbek61/Desktop/nodejs-crash

// title
console.log(process.title);
// -> node

// memoryUsage()
console.log(process.memoryUsage());

// uptime()
console.log(process.uptime());

process.on("exit", (code) => {
  console.log(`About to exit with code: ${code}`);
});

// exit()
process.exit(0);

console.log("Hello from after exit");
