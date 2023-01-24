import { app, BrowserWindow } from "electron";


class Window {

    public constructor() {

    }

    private initailizedWindow(): void {
        const win = new BrowserWindow({
            width: 800,
            height: 600
        })
    }

    public createWindow(): void {
        app.whenReady().then(this.initailizedWindow)
    }
}

const window = new Window();
window.createWindow()