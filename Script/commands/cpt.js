module.exports.config = {
  name: "leave",
  eventType: ["log:unsubscribe"],
  version: "1.0.1",
  credits: "Haydar",
  description: "Someone leaves or is removed from the group",
  dependencies: {
    "fs-extra": "",
    "path": ""
  }
};

module.exports.run = async function({ api, event, Users, Threads }) {
  // If bot leaves, don't send message
  if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;

  const { createReadStream, existsSync, mkdirSync } = global.nodemodule["fs-extra"];
  const { join } = global.nodemodule["path"];
  const { threadID } = event;

  // Thread & user data
  const data = global.data.threadData.get(parseInt(threadID)) 
        || (await Threads.getData(threadID)).data;

  const userID = event.logMessageData.leftParticipantFbId;
  const name = global.data.userName.get(userID) || await Users.getNameUser(userID);

  // Message type: left vs removed
  const type = (event.author == userID)
    ? "😡 তোর এত সাহস! এডমিনের অনুমতি ছাড়া লিভ নিয়ে বেরিয়ে গেছিস? \n✦──⟢ Haydar Bot ⟣──✦"
    : "🤪 তোমার এই গ্রুপে থাকার কোনো যোগ্যতা নেই! তাই লাথি মেরে বের করে দেওয়া হলো! \n✦──⟢ Haydar Bot ⟣──✦";

  // GIF path
  const folderPath = join(__dirname, "Haydar", "leaveGif");
  const gifPath = join(folderPath, "leave1.gif");

  if (!existsSync(folderPath)) mkdirSync(folderPath, { recursive: true });

  // Default leave message (custom হলে সেটাই নেবে)
  let msg = (typeof data.customLeave == "undefined")
    ? "ইস {name} {type}"
    : data.customLeave;

  // Replace name & type
  msg = msg.replace(/\{name}/g, name).replace(/\{type}/g, type);

  // Message with/without GIF
  const sendContent = existsSync(gifPath)
    ? { body: msg, attachment: createReadStream(gifPath) }
    : { body: msg };

  return api.sendMessage(sendContent, threadID);
};
