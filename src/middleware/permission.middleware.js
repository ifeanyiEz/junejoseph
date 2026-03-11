
export const requirePermission = (requiredAction) => {
    return (req, res, next) => {
        const user = req.session.user;

        if (!user || !user.permissions) {
            return res.status(401).redirect("/login"); 
        }

        if (user.permissions.includes("bypass_all")) {
            return next();
        }

        if (user.permissions.includes(requiredAction)) {
            return next();
        } else {
            
            return res.status(403).send("Access Denied: You do not have permission to perform this action.");
        }
    };
};