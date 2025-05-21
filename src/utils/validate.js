export const checkValidData = (email, password) => {
    
    // const isNameValid = /(^ [A - Za - z]{ 3, 16})([]{ 0, 1 }) ([A - Za - z]{ 3, 16 })?([]{ 0, 1 })?([A - Za - z]{ 3, 16 })?([]{ 0, 1 })?([A - Za - z]{ 3, 16 })/.test(name);

    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);

    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    
    // if (!isNameValid) return "Please enter Full name";
    if (!isEmailValid) return "Please enter a valid Email Id";
    if (!isPasswordValid) return "Please enter a valid Password";

    return null;
};