// export default store => next => action => {
//     if (!action.payload || !action.payload.then) {
//         return next(action);
//     }

//     action.payload.then((res) => {
//         const newAction = {
//             ...action,
//             payload: res
//         };

//         store.dispatch(newAction);
//     })
// };

export default store => next => async action => {
    if (!action.payload || !action.payload.then) {
        return next(action);
    }

    const resp = await action.payload;

    const newAction = {
        ...action,
        payload: resp
    };

    store.dispatch(newAction);
};