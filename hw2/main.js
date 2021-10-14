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
    "https://images.unsplash.com/photo-1571474004502-c1def214ac6d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1331&q=80",
    "https://images.unsplash.com/photo-1571555788467-71d9e3add426?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1600003618858-31f6e8089e76?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
  ],
  [
    "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1488747279002-c8523379faaa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1519181245277-cffeb31da2e3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1598893725512-04a8d70d3e3a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1587108639646-c6ea7b46b247?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  ],
];

let emptyAlbum = document.getElementById("empty-album"),
  albumPhoto = document.getElementById("album-photo"),
  previewPhoto = document.getElementById("preview-photo"),
  displayPhoto = document.getElementById("display-photo");

let allPhotoText = document.getElementById("description"),
  albumText = document.getElementById("album-text"),
  previewText = document.getElementById("preview-text"),
  caption = document.getElementById("caption");

let deleteButton = document.getElementById("delete-button");
addPhotoButton = document.getElementById("add-photo");

let albumIndex = 0,
  previewIndex = 0;

function addPhoto() {
  addPhotoButton.onclick = () => {
    var url = prompt("請問要新增的照片的url是?");
    images[albumIndex].push(url);
    let photo = document.createElement("img");
    previewPhoto.appendChild(photo);
    photo.src = url;
    photo.classList.add("preview-photo");
    photo.addEventListener("click", () => {
      var count = 0;
      var photos = previewPhoto.childNodes;
      for (var i = 0; i < photos.length; i++) {
        if (photos[i].src === url) count = i;
      }
      previewIndex = count;
      setDisplayPhoto(albumIndex, previewIndex);
    });
    setPreviewText();
    setAllPhotoText();
  };
}

function deletePhoto() {
  deleteButton.onclick = () => {
    for (let i = 0; i < images.length; i++) {
      for (let j = 0; j < images[i].length; j++) {
        if (images[i][j] === displayPhoto.src) {
          images[i].splice(j, 1);
          var photos = previewPhoto.childNodes;
          for (let i = 0; i < photos.length; i++)
            photos[i].classList.add("hide");
          setPreviewPhoto(i);
          setPreviewText();
          setAllPhotoText();
        }
      }
    }
  };
}

function setAlbumPhoto() {
  for (let i = 0; i < images.length; i++) {
    let photo = document.createElement("img");
    albumPhoto.appendChild(photo);
    photo.src = images[i][0];
    photo.classList.add("album-photo");
    photo.addEventListener("click", () => {
      albumIndex = i;
      changePreviewPhoto(albumIndex);
      setPreviewText();
    });
  }
}

function setPreviewPhoto(index) {
  for (let i = 0; i < images[index].length; i++) {
    let photo = document.createElement("img");
    previewPhoto.appendChild(photo);
    photo.src = images[index][i];
    photo.classList.add("preview-photo");
    photo.addEventListener("click", () => {
      previewIndex = i;
      setDisplayPhoto(albumIndex, previewIndex);
    });
  }
}

function setDisplayPhoto(index1, index2) {
  for (let i = 0; i < previewPhoto.children.length; i++) {
    let photos = previewPhoto.children;
    photos[i].classList.remove("selected");
  }
  displayPhoto.src = images[index1][index2];
  displayPhoto.classList.add("display-photo");
  var displayingPhotos = [];
  var count = 0;
  for (let i = 0; i < previewPhoto.children.length; i++) {
    var photos = previewPhoto.children;
    if (!hasClass(photos[i], "hide")) {
      displayingPhotos[count] = photos[i];
      count++;
    }
    if (photos[i].src === images[index1][index2]) {
      photos[i].classList.add("selected");
    }
  }
  for (let i = 0; i < count; i++) {
    if (displayingPhotos[i].src === images[index1][index2]) {
      caption.innerText =
        "This photo is the " + (i + 1) + "-th photo in album.";
    }
  }
}

function changePreviewPhoto(index) {
  var photos = previewPhoto.childNodes;
  for (let i = 0; i < photos.length; i++) photos[i].classList.add("hide");
  setPreviewPhoto(index);
}

function setAlbumText() {
  albumText.innerText = "Album(" + albumPhoto.childElementCount + ")";
}

function setPreviewText() {
  var photos = previewPhoto.childNodes;
  var count = 0;
  for (let i = 0; i < photos.length; i++) {
    if (!hasClass(photos[i], "hide")) {
      count++;
    }
  }
  previewText.innerText = "Preview photo(" + count + ")";
}

function setAllPhotoText() {
  var count = 0;
  for (let i = 0; i < images.length; i++) {
    for (let j = 0; j < images[i].length; j++) count++;
  }
  allPhotoText.innerText = "Photograph(" + count + ")";
}

function hasClass(element, cls) {
  return element.className.indexOf(cls) > -1;
}

setAlbumPhoto();
setPreviewPhoto(albumIndex);
setDisplayPhoto(albumIndex, previewIndex);

setAlbumText();
setPreviewText();
setAllPhotoText();

addPhoto();
deletePhoto();

emptyAlbum.onclick = () => alert("警告!!這是空相簿");
