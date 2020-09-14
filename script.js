const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");//rendering context that allows you draw only accessing 2d feature
//ctx.fillText('Canvas text!!!', 100, 50); //two values are width and height
//ctx.fillRect(0, 0, 50, 100); //ctx.strokeRect to use a lighter strike
//ctx.fillStyle = "#42e9f5";
//ctx.fillRect(0, 0, 50, 50);
//canvas is default 300px wide , 100px tall
const img = new Image();


const reader = new FileReader(); //let's you read content of any file

function uploadImage(e) {
    //need to pass image data stored in e variable
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
        img.src = reader.result;
        img.onload = () => { //display image on canvas
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        };
    };
}
function greyscale () {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    //grab pixel data and play with the values
    const data = imageData.data;
    for(let i = 0; i < data.length; i += 4) {
        const grey = data[i] * 0.21 + data[i + 1] * 0.71 + data[i + 2] * 0.07;
        data[i] = grey;
        data[i + 1] = grey;
        data[i + 2] = grey;
    }
    ctx.putImageData(imageData, 0, 0);
}

function sepia () {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    //grab pixel data and play with the values
    const data = imageData.data;
    for(let i = 0; i < data.length; i += 4) {
        const grey = data[i] * 0.21 + data[i + 1] * 0.71 + data[i + 2] * 0.07;
        data[i] = grey + 95;
        data[i + 1] = grey + 58;
        data[i + 2] = grey;
    }
    ctx.putImageData(imageData, 0, 0);
}

function invert () {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    //grab pixel data and play with the values
    const data = imageData.data;
    for(let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
    }
    ctx.putImageData(imageData, 0, 0);
}

function rbg () {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    //grab pixel data and play with the values
    const data = imageData.data;
    for(let i = 0; i < data.length; i += 4) {
        const green = data[i + 1];
        data[i] = data[i];
        data[i + 1] = data[i + 2];
        data[i + 2] = green;
    }
    ctx.putImageData(imageData, 0, 0);
}

function bgr () {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    //grab pixel data and play with the values
    const data = imageData.data;
    for(let i = 0; i < data.length; i += 4) {
        const red = data[i];
        data[i] = data[i + 2];
        data[i + 1] = data[i + 1];
        data[i + 2] = red;
    }
    ctx.putImageData(imageData, 0, 0);
}

function gbr () {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    //grab pixel data and play with the values
    const data = imageData.data;
    for(let i = 0; i < data.length; i += 4) {
        const red = data[i];
        data[i] = data[i + 1];
        data[i + 1] = data[i + 2];
        data[i + 2] = red;
    }
    ctx.putImageData(imageData, 0, 0);
}

function grb () {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    //grab pixel data and play with the values
    const data = imageData.data;
    for(let i = 0; i < data.length; i += 4) {
        const red = data[i];
        data[i] = data[i + 1];
        data[i + 1] = red;
        data[i + 2] = data[i + 2];
    }
    ctx.putImageData(imageData, 0, 0);
}

function clearChanges () {
    img.src = reader.result;
}

function download() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "image.png";
    link.click();
}

document.querySelectorAll('button')[0].addEventListener('click', greyscale);
document.querySelectorAll('button')[1].addEventListener('click', sepia);
document.querySelectorAll('button')[2].addEventListener('click', invert);
document.querySelectorAll('button')[3].addEventListener('click', rbg);
document.querySelectorAll('button')[4].addEventListener('click', bgr);
document.querySelectorAll('button')[5].addEventListener('click', gbr);
document.querySelectorAll('button')[6].addEventListener('click', grb);
document.querySelectorAll('button')[7].addEventListener('click', clearChanges);
document.querySelectorAll('button')[8].addEventListener('click', download);
const imageLoader = document.getElementById('uploader');
imageLoader.addEventListener('change', uploadImage);