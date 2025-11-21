module.exports.config = {
  name: "leave",
  eventType: ["log:unsubscribe"],
  version: "1.0.0",
  credits: "Haydar Bot",
  description: "Funny roast message when someone leaves or is removed",
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
  const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) 
              || await Users.getNameUser(event.logMessageData.leftParticipantFbId);

  // Funny Roast Type
  const type = (event.author == event.logMessageData.leftParticipantFbId)
    ? `ওহ! দেখো দেখো… ${name} নিজেই গ্রুপ ছাড়লো 😹  
ভাই, ভয় পেয়ে গেলে আগে বলতেও তো পারতে!  
Next time গ্রুপে আসলে চা-নাস্তা রেডি রাখব 😎  
✦──꯭⃝ Haydar Chat Bot ──✦`
    : `Attention Everyone! 😹  
${name} কে গ্রুপ থেকে VIP স্টাইলে রিমুভ করা হয়েছে!  
ভাই, গ্রুপ তোমাকে মিস করবে না… কিন্তু তোমার ডায়লগগুলো অবশ্যই করবে 🤣  
আবার আসিও, রাগ করো না 😎  
✦──꯭⃝ Haydar Chat Bot ──✦`;

  const path = join(__dirname, "Haydar", "leaveGif");
  const gifPath = join(path, `leave1.gif`);

  if (!existsSync(path)) mkdirSync(path, { recursive: true });

  let msg = (typeof data.customLeave == "undefined")
    ? `${type}`
    : data.customLeave;

  const formPush = existsSync(gifPath)
    ? { body: msg, attachment: createReadStream(gifPath) }
    : { body: msg };

  return api.sendMessage(formPush, threadID);
};
