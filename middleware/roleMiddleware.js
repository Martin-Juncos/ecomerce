const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    // console.log("User Role:", req.user.role); // Agregar para depuración
    if (req.user.role !== requiredRole) {
      return res.status(403).json({
        message:
          "Forbidden: You do not have the required role to access this resource",
      });
    }
    next();
  };
};

module.exports = roleMiddleware;
