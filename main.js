"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
class Window {
    constructor() {
    }
    initailizedWindow() {
        const win = new electron_1.BrowserWindow({
            width: 800,
            height: 600,
            icon: "./assets/speed_icon.png"
        });
        win.loadFile("index.html");
    }
    createWindow() {
        electron_1.app.whenReady().then(this.initailizedWindow);
    }
}
const window = new Window();
window.createWindow();
