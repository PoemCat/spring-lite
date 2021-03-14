import { SpringContext } from "./spring-context";

class SpingApplication {
    private springContext: SpringContext;
    constructor() {}

    getContext() {
        return this.springContext;
    }
}

function initGlobalEnv() {
    globalThis
}