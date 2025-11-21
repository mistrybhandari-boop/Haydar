module.exports.config = { name: "info", version: "1.2.6", hasPermssion: 0, credits: "𝐒𝐡𝐚𝐡𝐚𝐝𝐚𝐭 𝐈𝐬𝐥𝐚𝐦", description: "Bot information command (Islamic Styled)", commandCategory: "For users", hide: true, usages: "", cooldowns: 5, };

module.exports.run = async function ({ api, event, args, Users, Threads }) { const { threadID } = event; const request = global.nodemodule["request"]; const fs = global.nodemodule["fs-extra"]; const moment = require("moment-timezone");

const { configPath } = global.client; delete require.cache[require.resolve(configPath)]; const config = require(configPath);

const { commands } = global.client; const threadSetting = (await Threads.getData(String(threadID))).data || {}; const prefix = threadSetting.hasOwnProperty("PREFIX") ? threadSetting.PREFIX : config.PREFIX;

const uptime = process.uptime(); const hours = Math.floor(uptime / 3600); const minutes = Math.floor((uptime % 3600) / 60); const seconds = Math.floor(uptime % 60);

const totalUsers = global.data.allUserID.length; const totalThreads = global.data.allThreadID.length;

const msg = `╭──⭓ ✨ 𝗜𝗦𝗟𝗔𝗠𝗜𝗖 𝗕𝗢𝗧 𝗜𝗡𝗙𝗢 ✨ │ "﷽ 𝐁𝐢𝐬𝐦𝐢𝐥𝐥𝐚𝐡 𝐢𝐫 𝐑𝐚𝐡𝐦𝐚𝐧 𝐢𝐫 𝐑𝐚𝐡𝐢𝐦" │ ├─ 🤖 𝗕𝗼𝘁 𝗡𝗮𝗺𝗲 : ─꯭─⃝‌‌𝐇𝐚𝐲𝐝𝐚𝐫 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭 ├─ ☪️ 𝗣𝗿𝗲𝗳𝗶𝘅 : ${config.PREFIX} ├─ 🕌 𝗣𝗿𝗲𝗳𝗶𝘅 𝗕𝗼𝘅 : ${prefix} ├─ 📘 𝗠𝗼𝗱𝘂𝗹𝗲𝘀 : ${commands.size} ├─ 🌙 𝗣𝗶𝗻𝗴 : ${Date.now() - event.timestamp}ms │ ╰──────⭓

╭──⭓ 👑 𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢 (𝐇𝐚𝐲𝐝𝐚𝐫) │ ├─ 🌟 𝗡𝗮𝗺𝗲 : 𝐇𝐚𝐲𝐝𝐚𝐫 ├─ 🕋 𝗤𝘂𝗼𝘁𝗲 : "আল্লাহ যার সাথে, তার বিরুদ্ধে কেউ নয়।" ├─ 📲 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 : facebook.com/61575698041722 ├─ 💬 𝗠𝗲𝘀𝘀𝗲𝗻𝗴𝗲𝗿 : m.me/61575698041722 ├─ ☎️ 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 : wa.me/+8801882333052 │ ╰──────⭓

╭──⭓ 📊 𝗔𝗖𝗧𝗜𝗩𝗜𝗧𝗬 │ ├─ ⏳ 𝗔𝗰𝘁𝗶𝘃𝗲 : ${hours}h ${minutes}m ${seconds}s ├─ 🕌 𝗚𝗿𝗼𝘂𝗽𝘀 : ${totalThreads} ├─ 👥 𝗨𝘀𝗲𝗿𝘀 : ${totalUsers} │ ╰──────⭓

🌺 "আল্লাহ তোমার দিনটা সহজ করুক।" 🌟 𝗧𝗵𝗮𝗻𝗸𝘀 𝗳𝗼𝗿 𝘂𝘀𝗶𝗻𝗴 𝐇𝐚𝐲𝐝𝐚𝐫 𝗖𝗵𝗮𝘁 𝗕𝗼𝘁 ✨`;

const imgLinks = [ "https://i.imgur.com/zqsuJnX.jpeg", "https://i.imgur.com/sxSn1K3.jpeg", "https://i.imgur.com/wu0iDqS.jpeg", "https://i.imgur.com/Huz3nAE.png" ];

const imgLink = imgLinks[Math.floor(Math.random() * imgLinks.length)];

const callback = () => { api.sendMessage({ body: msg, attachment: fs.createReadStream(__dirname + "/cache/info.jpg") }, threadID, () => fs.unlinkSync(__dirname + "/cache/info.jpg")); };

return request(encodeURI(imgLink)).pipe(fs.createWriteStream(__dirname + "/cache/info.jpg")).on("close", callback); };
