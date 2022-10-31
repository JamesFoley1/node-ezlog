const fs = require('fs');

class ezLogger {
    constructor() {}

    writeFile = false;
    path = "";
    colors = {
        reset: "\x1b[0m",

        foreground: {
            black: "\x1b[30m",
            blue: "\x1b[34m",
            cyan: "\x1b[36m",
            green: "\x1b[32m",
            red: "\x1b[31m",
            yellow: "\x1b[33m",
            white: "\x1b[37m"
        },
        background: {
            black: "\x1b[40m",
            blue: "\x1b[44m",
            cyan: "\x1b[46m",
            green: "\x1b[42m",
            red: "\x1b[41m",
            yellow: "\x1b[43m",
            white: "\x1b[47m"
        }
    };

    // Logging function with color coded messages. Can find ansi colors here:
    // https://telepathy.freedesktop.org/doc/telepathy-glib/telepathy-glib-debug-ansi.html
    // logType will default to standard console.log output, but color can be changed as desired.
    // If no input is provided, this will give a new line.
    // If writeFile is true, any input provided to this log function will be written to the path provided.
    log(logType, input, inputColor = "\x1b[0m") {
        if(input !== undefined && input.length > 0) {
            switch (logType) {
                case "SUCCESS":
                    console.log(this.colors.background.green + this.colors.foreground.white, "\u2713", this.colors.reset, this.colors.foreground.green + `[${new Date().toISOString()}] [SUCCESS]: ${input}`, this.colors.reset);
                    break;
                case "INFO":
                    console.info(this.colors.background.blue + this.colors.foreground.white, "i", this.colors.reset, this.colors.foreground.blue + `[${new Date().toISOString()}] [INFO]: ${input}`, this.colors.reset);
                    break;
                case "WARN":
                    console.warn(this.colors.background.yellow + this.colors.foreground.white, "\u26A0", this.colors.reset, this.colors.foreground.yellow + `[${new Date().toISOString()}] [WARNING]: ${input}`, this.colors.reset);
                    break;
                case "ERROR":
                    console.error(this.colors.background.red + this.colors.foreground.white, "✘", this.colors.reset, this.colors.foreground.red + `[${new Date().toISOString()}] [ERROR]: ${input}`, this.colors.reset);
                    break;
                case "CRITICAL":
                    console.error(this.colors.background.red + this.colors.foreground.white, "✘✘✘", this.colors.reset, this.colors.foreground.red + `[${new Date().toISOString()}] [CRITICAL]: ${input}`, this.colors.reset);
                    break;
                default:
                    console.log(inputColor + input, this.colors.reset);
                    break;
            };

            if(this.writeFile && this.path.length > 0) {
                // Append to existing file.
                fs.appendFileSync(this.path, input + "\n", err => {
                    if (err) {
                        console.error(this.colors.background.red + this.colors.foreground.white, "✘", this.colors.reset, this.colors.foreground.red + err, this.colors.reset);
                    }
                });
            }

        }
        else {
            console.warn(inputColor, this.colors.reset);
        }
    }

    // Enables logging upon execution when provided a boolean value and a file path for logging.
    enableWriteLog(allowWriteFile, filePath) {
        if((typeof(allowWriteFile) !== typeof(true) || typeof(filePath) !== typeof("")) || filePath.length === 0) {
            console.error(this.colors.background.red + this.colors.foreground.white, "✘", this.colors.reset, this.colors.foreground.red + "The enableWriteLog function accepts true/false values for the first input and a filepath for the second.", this.colors.reset);
        }
        else {
            this.writeFile = allowWriteFile;
            this.path = filePath;

            // Check if file exists at this location, otherwise create it.
            // The directory must already exist
            if(!fs.existsSync(filePath)) {
                fs.writeFile(filePath, "", err => {
                    if (err) {
                        console.error(this.colors.background.red + this.colors.foreground.white, "✘", this.colors.reset, this.colors.foreground.red + err.message, this.colors.reset);
                    }
                    else {
                        console.log(this.colors.background.green + this.colors.foreground.white, "\u2713", this.colors.reset, this.colors.foreground.green + `Log file created: ${filePath}`, this.colors.reset);
                    }
                });
            }
        }
    }

    // Disables writelog and removes filepath.
    disableWriteLog() {
        this.writeFile = false;
        this.path = "";
    }
}

module.exports = new ezLogger();