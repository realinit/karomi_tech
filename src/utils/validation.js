const validation = {
    checkEmptyObjectKey: function (payload) {
        if (!payload) return false
        if (!payload.length) return false
        let isValid = true;
        payload.forEach(element => {
            if (Object.keys(element).length) {
                for (let prop in element) {
                    if (!element[prop]) {
                        isValid = false;
                    }
                }
            } else {
                isValid = false;
            }
        });
        return isValid;
    },
    checkEmptyKey_fromObject: function (payload) {
        if (!payload) return false
        if (!Object.keys(payload).length) return false
        let isValid = true;
        if (Object.keys(payload).length) {
            for (let prop in payload) {
                if (!payload[prop]) {
                    isValid = false;
                }
            }
        } else {
            isValid = false;
        }
        return isValid;
    },
    

};

export default validation;