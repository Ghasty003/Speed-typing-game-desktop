import { app, BrowserWindow } from "electron";


class Window {

    public constructor() {

    }

    private initailizedWindow(): void {
        const win = new BrowserWindow({
            width: 800,
            height: 600,
            icon: "./assets/speed_icon.png"
        })

        win.loadFile("index.html");
    }

    public createWindow(): void {
        app.whenReady().then(this.initailizedWindow);
    }

    public closeWindow() {
        app.on("window-all-closed", () => {
            if (process.platform != "darwin") {
                app.quit();
            }
        })
    }

    public makeWindow(): void {
        this.createWindow();
        this.closeWindow();
    }
}

const window = new Window();
window.makeWindow();