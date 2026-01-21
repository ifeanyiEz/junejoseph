
const toolbarOptions = [
  [{ header: [2, 3, 4, 5, 6, false] }],

  ['bold', 'italic', 'underline', 'strike'],
  [{ color: [] }, { background: [] }],

  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ align: [] }],

  ['blockquote', 'code-block'],

  ['link', 'image', 'video'],

  ['clean']
];

const quill = new Quill('#blogBody', {
    theme: 'snow', // Or 'bubble'
    placeholder: 'Write your blog post here...',
    modules: {
        toolbar: toolbarOptions
    }
});

// const toolbar = quill.getModule('toolbar');
// toolbar.addHandler('image', imageHandler);

// function imageHandler() {
//   const input = document.createElement('input');
//   input.setAttribute('type', 'file');
//   input.setAttribute('accept', 'image/*');
//   input.click();

//   input.onchange = async () => {
//     const file = input.files[0];
//     if (!file) return;

//     if (!file.type.startsWith('image/')) {
//       alert('Please select an image file');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('image', file);

//     try {
//       const response = await fetch('/upload-image', {
//         method: 'POST',
//         body: formData
//       });

//       if (!response.ok) {
//         throw new Error('Upload failed');
//       }

//       const data = await response.json();

//       if (!data.url) {
//         throw new Error('Invalid upload response');
//       }

//       insertImageToEditor(data.url);

//     } catch (err) {
//       console.error(err);
//       alert('Image upload failed. Please try again.');
//     }
//   };
// }

// function insertImageToEditor(imageUrl) {
//   const range = quill.getSelection(true);

//   quill.insertEmbed(range.index, 'image', imageUrl);
//   quill.setSelection(range.index + 1);
// }