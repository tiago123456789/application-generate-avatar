
class Avatar {

    constructor() {
        this.colors = ["red", "green", "yellow", "blue", "pink", "purple", "gray"]
    }

    getInitials(name, howManyInitails = 2) {
        let text = name;
        text = text.toLocaleUpperCase();
        text = text.split(" ")
        return text.filter((_, index) => index <= (howManyInitails - 1)).map(item => item[0]).join("")
    }

    getBackgroundColor() {
        const position = Math.floor(Math.random() * (this.colors.length - 1));
        return this.colors[position] || "red"
    }

    generate(name, size = 100, fontSize = 18) {
        let seedInitials = this.getInitials(name, 2)
        const fontFamily = "Arial"
        const backgroundColor = this.getBackgroundColor()
        const svg = [
            `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" version="1.1" `,
            `xmlns="http://www.w3.org/2000/svg"><g><rect fill="${backgroundColor}" width="${size}" `,
            `height="${size}" y="0" x="0"/><text x="50%" y="49%" alignment-baseline="middle" `,
            `dominant-baseline="middle" text-anchor="middle" fill="#fff" font-family="${fontFamily}" `,
            `font-weight="400" font-size="${fontSize}px" dy=".35em">${seedInitials}</text></g></svg>`,
        ].join('');

        return Buffer.from(svg)
    }

}

module.exports = Avatar