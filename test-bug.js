function getUserData(userId) {
    // Bug 1: SQL Injection vulnerability
    const query = "SELECT * FROM users WHERE id = " + userId;
    
    // Bug 2: Using a variable that is not defined
    console.log(userRole);
    
    return query;
}

// Bug 3: Console log left in production code
console.log("User data fetched");
