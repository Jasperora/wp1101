const images = [
  [
    "https://images.unsplash.com/photo-1470004914212-05527e49370b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
    "https://images.unsplash.com/photo-1552993873-0dd1110e025f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    "https://images.unsplash.com/photo-1508248467877-aec1b08de376?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    "https://images.unsplash.com/photo-1599578705716-8d3d9246f53b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1583395145517-1e3177037600?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80",
  ],
  [
    "https://images.unsplash.com/photo-1521379124646-d4fa8375b386?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1333&q=80",
    "https://images.unsplash.com/photo-1616595286596-f0b561c76bc5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
    "https://images.unsplash.com/photo-1502951364727-7acb8ea79a39?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
    "https://images.unsplash.com/photo-1526682847805-721837c3f83b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    "https://images.unsplash.com/photo-1600003618858-31f6e8089e76?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
  ],
  [
    "https://images.unsplash.com/photo-1611037114947-0b436af42ed9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=388&q=80",
    "https://images.unsplash.com/photo-1604214896221-b13d964b214a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    "https://images.unsplash.com/photo-1519181245277-cffeb31da2e3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1598893725512-04a8d70d3e3a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1587108639646-c6ea7b46b247?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  ],
];

let emptyAlbum = document.getElementById("empty-album"),
  albumPhoto = document.getElementById("album-photo"),
  previewPhoto = document.getElementById("preview-photo"),
  displayPhoto = document.getElementById("display-photo");

var albumPhotos = [],
  previewPhotos = [];

let albumIndex = 0,
  previewIndex = 0;

function setAlbumPhoto() {
  for (let i = 0; i < images.length; i++) {
    let photo = document.createElement("img");
    albumPhoto.appendChild(photo);
    photo.src = images[i][0];
    photo.classList.add("album-photo");
    albumPhotos[i] = photo;
  }
}

function setPreviewPhoto(albumIndex) {
  for (let i = 0; i < images[albumIndex].length; i++) {
    let photo = document.createElement("img");
    previewPhoto.appendChild(photo);
    photo.src = images[albumIndex][i];
    photo.classList.add("preview-photo");
    previewPhotos[i] = photo;
  }
}

function setDisplayPhoto(albumIndex, previewIndex) {
  let photo = document.createElement("img");
  displayPhoto.appendChild(photo);
  photo.src = images[albumIndex][previewIndex];
  photo.classList.add("display-photo");
}

setAlbumPhoto();
setPreviewPhoto(albumIndex);
setDisplayPhoto(albumIndex, previewIndex);
emptyAlbum.onclick = () => alert("警告!!這是空相簿");
