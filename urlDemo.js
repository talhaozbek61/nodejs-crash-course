import url from "url";

const urlString = "https://www.google.com/search?q=hello+world";

// URL Object
const urlObj = new URL(urlString);

console.log(urlObj);
// -> URL {
//     href: 'https://www.google.com/search?q=hello+world',
//     origin: 'https://www.google.com',
//     protocol: 'https:',
//     username: '',
//     password: '',
//     host: 'www.google.com',
//     hostname: 'www.google.com',
//     port: '',
//     pathname: '/search',
//     search: '?q=hello+world',
//     searchParams: URLSearchParams { 'q' => 'hello world' },
//     hash: ''
//   }

// format()
console.log(url.format(urlObj));
// -> https://www.google.com/search?q=hello+world

// import.meta.url
console.log(import.meta.url);
// -> file:///Users/talhaozbek61/Desktop/nodejs-crash/urlDemo.js

// fileURLToPath()
console.log(url.fileURLToPath(import.meta.url));
// -> /Users/talhaozbek61/Desktop/nodejs-crash/urlDemo.js

console.log(urlObj.search);
// -> ?q=hello+world

const params = new URLSearchParams(urlObj.search);
console.log(params);
// -> URLSearchParams { 'q' => 'hello world' }

console.log(params.get("q"));
// -> hello world

params.append("limit", "5");
console.log(params);
// -> URLSearchParams { 'q' => 'hello world', 'limit' => '5' }

params.delete("limit");
console.log(params);
// -> URLSearchParams { 'q' => 'hello world' }
