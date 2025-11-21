
module.exports.config = {
  name: "leave",
  eventType: ["log:unsubscribe"],
  version: "1.1.0",
  credits: "Haydar BOT",
  description: "Member leave warning + Islamic touch",
  dependencies: {
    "fs-extra": "",
    "path": ""
  }
};

module.exports.run = async function({ api, event, Users, Threads }) {
  if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;

  const { createReadStream, existsSync, mkdirSync } = global.nodemodule["fs-extra"];
  const { join } = global.nodemodule["path"];
  const { threadID } = event;

  const data = global.data.threadData.get(parseInt(threadID)) || (await Threads.getData(threadID)).data;
  const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);

  // =======================
  //        TYPE MESSAGE
  // =======================
  const type = (event.author == event.logMessageData.leftParticipantFbId)
    ? `😔 **${name}** গ্রুপ ছেড়ে চলে গেছে…

🕌 *“আল্লাহ উত্তম প্রতিদান দিক”*  
🙂 নিজের খেয়াল রেখো ভাই/আপু ❤️  
━━━━━━━━━━━━━━━
🔥 𝐇𝐚𝐲𝐝𝐚𝐫 𝐁𝐎𝐓 🔥`
    : `⚠️ **${name}** কে গ্রুপ থেকে রিমুভ করা হয়েছে!

🤣 মনে হয় গ্রুপের নিয়ম মানতে পারেনি!  
🕌 আল্লাহ হেদায়েত দান করুন 🤲  
━━━━━━━━━━━━━━━
🔥 𝐇𝐚𝐲𝐝𝐚𝐫 𝐁𝐎𝐓 🔥`;

  // =======================
  //     FILE / PATH SETUP
  // =======================
  const path = join(__dirname, "Haydar", "leaveGif");
  const gifPath = join(path, `leave1.gif`);

  if (!existsSync(path)) mkdirSync(path, { recursive: true });

  // =======================
  //        MAIN MESSAGE
  // =======================
  let msg = (typeof data.customLeave == "undefined")
    ? `{type}`
    : data.customLeave;

  msg = msg.replace(/\{name}/g, name).replace(/\{type}/g, type);

  const formPush = existsSync(gifPath)
    ? { body: msg, attachment: createReadStream(gifPath) }
    : { body: msg };

  return api.sendMessage(formPush, threadID);
};
