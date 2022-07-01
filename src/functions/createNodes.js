export function createNodeNum(editor) {
    const html = `
    <div><label>Número</label><input type="number" df-value></div>
    `;
    const data = { "value": '0' };
    editor.addNode('num', 0, 1, 50, 100, 'nodeNum nodeDraw', data, html);
}

export function createNodeSum(editor) {
    const html = `
    <div><label>Suma</label><input id='uno' type="text" disabled=true df-value></div>
    `;
    const data = { "value": '0' };
    editor.addNode('sum', 2, 1, 200, 100, 'nodeSum nodeDraw', data, html);

}

export function createNodeMultiplication(editor) {
    const html = `
    <div><label>Multiplicación</label><input type="text" disabled=true df-value></div>
    `;
    const data = { "value": '0' };
    editor.addNode('multiplication', 2, 1, 250, 100, 'nodeMultiplication nodeDraw', data, html);
}

export function createNodeDivision(editor) {
    const html = `
    <div><label>División</label><input type="text" disabled=true df-value></div>
    `;
    const data = { "value": '0' };
    editor.addNode('division', 2, 1, 300, 100, 'nodedivision nodeDraw', data, html);
}

export function createNodeVari(editor) {
    const html = `
    <div>
        <label>Variable</label>
        <hr>
        <div><label>Nombre</label><input type="text" df-name></div>
        <div><label>Valor</label><input type="text" disabled=true df-value></div>
    </div>
    `;
    const data = { "name": '', "value" : '0' };
    editor.addNode('vari', 1, 0, 100, 100, 'nodevari nodeDraw', data, html);
}

export function createNodeAssign(editor) {
    const html = `
    <div><label>Asignación</label></div>
    `;
    const data = { data : 0}
    editor.addNode('assign', 1, 1, 150, 100, 'nodeassign nodeDraw', data, html);
}

