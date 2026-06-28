function bfCompiler(bfcode) {
    let arr = new Array(30000).fill(0);
    let currentCell = 0;
    let codeIndex = 0;

    const output = document.getElementById("output");
    output.textContent = "";

    // Build loop map for faster jump execution
    const loopMap = {};
    const stack = [];
    for (let i = 0; i < bfcode.length; i++) {
        if (bfcode[i] === "[") {
            stack.push(i);
        } else if (bfcode[i] === "]") {
            if (stack.length > 0) {
                const matchingBracket = stack.pop();
                loopMap[matchingBracket] = i;
                loopMap[i] = matchingBracket;
            }
        }
    }

    while (codeIndex < bfcode.length) {
        const char = bfcode[codeIndex];
        switch (char) {
            case ">":
                currentCell++;
                if (currentCell >= arr.length)
                    currentCell = arr.length - 1;
                break;

            case "<":
                currentCell--;
                if (currentCell < 0)
                    currentCell = 0;
                break;

            case "+":
                arr[currentCell] = (arr[currentCell] + 1) % 256;
                break;

            case "-":
                arr[currentCell] = (arr[currentCell] - 1 + 256) % 256;
                break;

            case ".":
                output.textContent += String.fromCharCode(arr[currentCell]);
                break;

            case ",":
                const input = prompt("Enter a character:");
                if (input !== null && input.length > 0) {
                    arr[currentCell] = input.charCodeAt(0);
                }
                break;

            case "[":
                if (arr[currentCell] === 0) {
                    codeIndex = loopMap[codeIndex];
                }
                break;

            case "]":
                if (arr[currentCell] !== 0) {
                    codeIndex = loopMap[codeIndex];
                }
                break;
        }
        codeIndex++;
    }
}

function run() {
    const ta = document.getElementById("textArea");
    bfCompiler(ta.value);
}

function clearOutput() {
    document.getElementById("output").textContent = "Output will be displayed here.";
}