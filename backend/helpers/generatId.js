const generateId = () => {
    const random = Math.random().toString(32).substring(2);
    const date = Date.now().toString(32);
}

export default generateId;