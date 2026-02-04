const role = (requiredRole) => {
  return (req, res, next) => {
    console.log("ROLE MIDDLEWARE =>", req.user); 
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
