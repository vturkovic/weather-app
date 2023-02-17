const formValidationService = {

    validateEmail (email: string) {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(String(email).toLowerCase());
    },
    
    validetePasswordUppercase (password: string) {
        const regex = /^(?=.*[A-Z])/;
        return regex.test(password);
    },

    validetePasswordSpecial (password: string) {
        const regex = /^(?=.*[@$!%*?&])/;
        return regex.test(password);
    },

    validateField (fieldName: string, value: string) {
        let errorMessage = "";
        
        switch (fieldName) {
            case "email":
            errorMessage = value === "" ? "Required!" : "";
            if (!this.validateEmail(value)) {
                errorMessage = "Invalid email!";
            }
            break;
            case "password":
            if (!this.validetePasswordUppercase(value)) {
                errorMessage = "At least 1 uppercase character!";
            } 
            if (!this.validetePasswordSpecial(value)) {
                errorMessage = "At least 1 special character!";
            } 
            if (value.length < 7 ) {
                errorMessage = "At least 8 characters long!";
            }
            if (!value) {
                errorMessage = "Required!";
            }
            break;
            default:
            break;
        }

        return errorMessage
    }
}

export default formValidationService;