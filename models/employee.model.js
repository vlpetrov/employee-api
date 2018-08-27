const Gender = Object.freeze({"male": 1, "female": 2});
const Title = Object.freeze({"mr": 1, "ms": 2, "mrs": 3, "dr": 4});
const NameRegex = /^[a-zA-Z ]{2,30}$/;

class Employee {
    static isValid(employee) {
        if (!employee) {
            return false;
        } else if (+employee.gender !== Gender.male && +employee.gender !== Gender.female) {
            return false;
        } else if (!Object.values(Title).includes(+employee.title)) {
            return false;
        } else if (!employee.firstName || !NameRegex.test(employee.firstName)) {
            return false;
        } else if (!employee.surname || !NameRegex.test(employee.surname)) {
            return false;
        } else if (isNaN(+employee.salary) || isNaN(+employee.takeHome || isNaN(+employee.incomeTax) || isNaN(+employee.nationalInsurance))) {
            return false;
        } else {
            return true;
        }
    }
}

module.exports = Employee;
