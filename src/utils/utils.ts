
export const throttle = (func:()=>void, limit:number) => {
    let inThrottle:boolean;
    return function () {
        const args = arguments;
        // @ts-ignore
        const context = this;
        if (!inThrottle) {
            // @ts-ignore
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};
