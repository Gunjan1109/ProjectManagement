const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

let tokenSchema = new mongoose.Schema({
  workspaceId: { type: ObjectId, ref: "WorkSpace" }
});

module.exports = mongoose.model("WorkspaceToken", tokenSchema);
