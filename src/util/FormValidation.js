export default class FormValidation {
    static validateEmail(inputEmail) {
        return String(inputEmail)
            .toLowerCase()
            .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    }

   static confirmPasswordValid(password, confirmPassword) {
        return '' !== password && '' !== confirmPassword &&  password === confirmPassword;
    }
     static confirmUserInformation(name, address){
        return '' !== name && '' !== address
     }
}
