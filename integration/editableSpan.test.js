describe('editableSpan', () => {
    it('EditableSpan example, visually looks correct', async () => {
        //Api from jest-puppeter
        await page.setDefaultNavigationTimeout(0)
        await page.goto('http://localhost:9009/iframe.html?id=todolist-editablespan--editable-span-example&args=&viewMode=story');
        const image = await page.screenshot();

        //Api from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    })
})