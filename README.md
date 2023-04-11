# System_calls

We can use JavaScript to make system calls using the Node child_process module. This module allows us to spawn new processes, execute shell commands, and manage child processes. One of the most commonly used functions in this module is <b>child_process.exec()</b>, which runs a command in a shell and buffers the output.

The code in the above Repo executes a System Call that backsup a folder by creating a zip file of it. It is a Command Line Utility that takes Absolute Path of the folder as input by the user.
Not only that, it also gives performance metrics of Time of Execution and Memory used by a program. The perfhooks module in Node.js allows you to measure the performance of your JavaScript code using the Performance and PerformanceObserver objects. This can be used for example to measure the performance of a certain function. It has been used in making our Web Compiler.
### Steps to Execute
```
npm install
npm start
```