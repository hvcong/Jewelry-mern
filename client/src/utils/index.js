export function parsePriceToString(price) {
    if (!price) return price

    let arr = Array.from(String(parseInt(price)), Number).reverse()

    let newPrice = arr.map((item, index, arr) => {
        if (index !== 0 && index % 3 === 0) {
            return item + ','
        }
        return item
    }).reverse().join('')

    return newPrice

}

export function findParentElement(child, parentSelector) {
    if (!child || !parentSelector) return false

    let children = child
    let parentElement
    while (true) {
        parentElement = children.parentElement
        if (parentElement.matches('html')) return false
        if (parentElement.matches(parentSelector)) {
            return parentElement
        }
        children = parentElement;
    }
}