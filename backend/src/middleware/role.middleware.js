const role = (requiredRole) => {
  return (req, res, next) => {
    // auth.middleware ke baad yahan req.user hota hai
    if (!req.user || req.user.role !== requiredRole) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    next();
  };
};

export default role;
