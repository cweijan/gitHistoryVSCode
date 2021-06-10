function adjustPosition(menu: HTMLElement, event: MouseEvent): void {
    const frameElem = document.getElementById('root');
    const menuBounds = menu.getBoundingClientRect(), frameBounds = frameElem.getBoundingClientRect();
    const relativeX = event.pageX + menuBounds.width < frameBounds.right
        ? -2 // context menu fits to the right
        : event.pageX - menuBounds.width > frameBounds.left
            ? 2 - menuBounds.width // context menu fits to the left
            : -2 - (menuBounds.width - (frameBounds.width - (event.pageX - frameBounds.left))); // Overlap the context menu horizontally with the cursor
    const relativeY = event.pageY + menuBounds.height < frameBounds.bottom
        ? -2 // context menu fits below
        : event.pageY - menuBounds.height > frameBounds.top
            ? 2 - menuBounds.height // context menu fits above
            : -2 - (menuBounds.height - (frameBounds.height - (event.pageY - frameBounds.top))); // Overlap the context menu vertically with the cursor
    menu.style.left = (frameElem.scrollLeft + Math.max(event.pageX - frameBounds.left + relativeX, 2)) + 'px';
    menu.style.top = (frameElem.scrollTop + Math.max(event.pageY - frameBounds.top + relativeY, 2)) + 'px';
}

export class ContextMenu {
    public static create(event: MouseEvent): void {
        let menu = document.getElementById('menu');
        if (menu != null) {
            adjustPosition(menu, event);
            return;
        }
        menu = document.createElement('ul');
        menu.className = 'contextMenu'
        menu.id = "menu"
        const html = `
<li class="contextMenuItem" m-action="copyHash" data-index="8">Copy Commit Hash</li>
<li class="contextMenuDivider"></li>
<li class="contextMenuItem" m-action="addTag" data-index="0">Add Tag…</li>
<li class="contextMenuItem" m-action="createBranch" data-index="1">Create Branch…</li>
`
        menu.innerHTML = html.trim();
        adjustPosition(menu, event)
        document.getElementById('root').appendChild(menu);
    }


    public static click(event: Event, callback: (action: string) => void): void {

        const target = event.target as HTMLElement;

        const action = target?.getAttribute("m-action")

        const menu = document.getElementById('menu');
        if (menu != null) {
            document.getElementById('root').removeChild(menu)
        }

        callback && action && callback(action as string);

    }


}