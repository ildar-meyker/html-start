const iconStyles = " font-size:50px;";
const titleStyles = "font-size:12px; font-weight: bold;";
const textStyles = "font-size:12px;";
const pubdate = new Date("2023-09-21");

const log = console.log;

function print() {
    log("%c😼", iconStyles);
    log("%cDeveloped by:", titleStyles);
    log("%cFront-end: ildar.meyker@gmail.com, +79297287297", textStyles);
}

if (pubdate < new Date()) {
    print();
}
