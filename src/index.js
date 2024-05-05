var exportExcel = (function () {
    // Default configuration options
    var defaultConfig = {
        headerColor: '#64b92a', // Default header color
        rowSize: 'normal' // Default row size
    };

    return function (tableId, name, config) {
        // Merge default config with user-provided config or use default config if not provided
        var mergedConfig = Object.assign({}, defaultConfig, config);

        var uri = 'data:application/vnd.ms-excel;base64,';
        var template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head>' +
            '<style>th{ color: #fff; padding: 10px; background-color: ' + mergedConfig.headerColor + '; } thead{ background-color: ' + mergedConfig.headerColor + '; }</style>' +
            '<meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table style="font-weight:500;" border="1px" cellpadding="0" cellspacing="0" >{table}</table></body></html>';

        var table = document.getElementById(tableId);
        if (!table) {
            console.error('Table with id ' + tableId + ' not found.');
            return;
        }

        var blob = new Blob([template.replace('{worksheet}', name || 'Worksheet').replace('{table}', table.innerHTML)], {
            type: 'application/vnd.ms-excel'
        });

        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = name + '.xls';
        link.click();
    };
})();
