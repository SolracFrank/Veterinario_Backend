export default function generarId() {
    const random = Math.random().toString(32).slice(2) + Date.now().toString(32);
    return random;
}
