window.dom = {
    // 增
    create(string) {
        const container = document.createElement('template')
        container.innerHTML = string.trim()
        return container.content.firstChild
    },
    after(node, node2) {
        node.parentNode.insertBefore(node2, node.nextSiblings)
    },
    before(node, node2) {
        node.parentNode.insertBefore(node2, node)
    },
    append(parent, node) {
        parent.appendChild(node)
    },
    wrap(node, parent) {
        dom.before(node, parent)
        dom.append(parent, node)
    },
    // 删
    remove(node) {
        node.parentNode.removeChild(node)
        return node
    },
    empty(node) {
        const { childNodes } = node
        const array = []
        console.log(childNodes)
        let x = node.firstChild
        while (x) {
            array.push(dom.remove(x))
            x = node.firstChild
        }
        return array
    },
    // 改
    attr(node, name, value) {// 重载
        if (node.name) {
            return node.name
        }
        if (arguments.length === 3) {
            node.setAttribute(name, value)
        } else if (arguments.length === 2) {
            return node.getAttribute(name)
        }
    },
    text(node, content) { // 适配
        if (arguments.length === 2) {
            if ('innerText' in node) {
                node.innerText = content
            } else {
                node.textContent = content
            }
        } else if (arguments.length === 1) {
            if ('innerText' in node) {
                return node.innerText
            } else {
                return node.textContent
            }
        }
    },
    html(node, html) {
        if (arguments.length === 2) {
            node.innerHTML = html
        } else if (arguments.length === 1) {
            return node.innerHTML
        }
    },
    style(node, name, value) {
        if (arguments.length === 3) {
            // dom.style(div, 'color', 'red')
            node.style[name] = value
        } else if (arguments.length === 2) {
            if (typeof name === 'string') {
                // dom.style(div, 'color')
                return node.style[name]
            } else if (name instanceof Object) {
                for (let key in name) {
                    node.style[key] = name[key]
                }
            }
        }
    },
    class: {
        add(node, className) {
            node.classList.add(className)
        },
        remove(node, className) {
            node.classList.remove(className)
        },
        has(node, className) {
            return node.classList.contains(className)
        }
    },
    on(node, eventName, fn) {
        node.addEventListener(eventName, fn)
    },
    off(node, eventName, fn) {
        node.removeEventListener(eventName, fn)
    },
    // 查
    find(selector, scope) {
        return (scope || document).querySelectorAll(selector)
    },
    parent(node) {
        return node.parentNode
    },
    children(node) {
        return node.children
    },
    siblings(node) {
        return Array.from(node.parentNode.children).filter(n => n !== node)
    },
    next(node) {
        return node.nextElementSibling
    },
    previous(node) {
        return node.previousElementSibling
    },
    each(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i])
        }
    },
    index(node) {
        const siblings = node.parentNode.children
        let i
        for (i = 0; i < siblings.length; i++) {
            console.log(siblings.length)
            if (siblings[i] === node) { break }
        }
        return i
    }
}
