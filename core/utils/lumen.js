export const validateErr = function (errObj, c) {
    return Object.keys(errObj).map(v => {
        return errObj[v].map(q => `<li class=${c}>${q}</li>`).join();
    }).join();
};

export default {
    validateErr
};