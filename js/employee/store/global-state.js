let list = [];

export const employeeState = {

    getState() {
        return [...list];
    },

    setState(next) {
        list = [...next];
    },
     add(item) {
        list.push(item);
    },
};