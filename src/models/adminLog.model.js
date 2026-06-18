import mongoose from "mongoose";

const AdminLogSchema = new mongoose.Schema(
  {
    adminId: { type: String, required: true },
    action: { type: String, required: true },
    resource: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const AdminLog = mongoose.model("AdminLog", AdminLogSchema);
