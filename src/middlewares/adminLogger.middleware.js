export const adminLogger = (req, res, next) => {
  if (req.user.role === "ADMIN") {
    const now = new Date().toISOString();
    console.log(`[${now}] ${req.method} ${req.url}`);
  }

  next();
};
