import dns from "dns";

// Google aur Cloudflare ka DNS set kar rahe hain
dns.setServers(["8.8.8.8", "1.1.1.1"]);
console.log("dns setup ho gaya hai \n");

export default dns;