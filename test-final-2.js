function getUserInfo(userId) {
    // Bug 1: SQL Injection vulnerability
    const query = "SELECT * FROM users WHERE id = " + userId;
    
    // Bug 2: Undefined variable usage (will crash the app)
    const role = userRole;
    
    // Bug 3: Potential null pointer error (user object might be empty)
    const name = user.profile.name;
    
    // Bug 4: Console log left in production code
    console.log("Query executed:", query);
    
    return query;
}
