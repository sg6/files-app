function initUpload() {
    const uploadButton = document.querySelector('#upload-button');

    uploadButton.addEventListener('click', (event) => {
        event.preventDefault();
        const formData = new FormData(document.querySelector('form'));

        for (var [key, value] of formData.entries()) { 
            console.log(key, value);
        }
    })
}


function getFiles() {
    const list = document.querySelector('#list');

    fetch('/files')
        .then((response) => {
            return response.json();
        })
        .then(response => {
            if (response && response.files && Array.isArray(response.files) && response.files.length > 0) {
                response.files.forEach(file => addLink(file));
            }
        })

    function addLink(url) {
        const node = document.createElement('li');
        node.innerHTML = `<a href="/uploads/${url}" target="_blank">${url}</a>`
        list.append(node);
    }
}