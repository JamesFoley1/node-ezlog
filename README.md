# Node-ezLog

## This is a simple logging utility to enable verbosity in logging

## How To Install

`npm i node-ezlog`

## Usage
```
let ezLog = require('node-ezlog');

ezLog.enableWriteLog(true, "./outlog.log");
ezLog.log("SUCCESS", "API call successful!");
ezLog.log("WARN", "low resources");
ezLog.log("INFO", "message process");
ezLog.log("ERROR", "directory does not exist");
ezLog.log("CRITICAL", "The server is out of memory!");
ezLog.log("default", "some simple message");
ezLog.log();
ezLog.log("", "log me!", "\x1b[31m");
ezLog.disableWriteLog();
ezLog.log("default", "don't log me!", "\x1b[32m");
```

By default ezLog does not require any input and will output a single line. Additionally, the logger will not output to a file until the enableWriteLog function is invoked and provided a boolean and a filepath to the logfile location. If no file currently exists, it will be created for you. You can disable any logs at any point in your code base by invoking the disableWriteLog function. Additionally, the third parameter for the log function allows the user to pick an ansi color for the log text if the user wishes to do so while using their own terminal.

You may find a list of ansi colors here: https://telepathy.freedesktop.org/doc/telepathy-glib/telepathy-glib-debug-ansi.html

## Sample Terminal Output
```
 ✓  [2022-10-31T14:15:06.733Z] [SUCCESS]: API call successful! 
 ⚠  [2022-10-31T14:15:06.742Z] [WARNING]: Warning: low resources 
 i  [2022-10-31T14:15:06.744Z] [INFO]: INFO: message process 
 ✘  [2022-10-31T14:15:06.745Z] [ERROR]: ERROR: directory does not exist 
 ✘✘✘  [2022-10-31T14:15:06.745Z] [CRITICAL]: ERROR: directory does not exist 
some simple message 
 
log me! 
don't log me!
```

## Sample File Output
```
API call successful!
Warning: low resources
INFO: message process
ERROR: directory does not exist
ERROR: directory does not exist
some simple message
log me!
```