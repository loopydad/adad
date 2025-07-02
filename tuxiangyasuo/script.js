// 获取页面元素
const fileInput = document.getElementById('file-input');
const uploadArea = document.getElementById('upload-area');
const previewArea = document.getElementById('preview-area');
const originalImg = document.getElementById('original-img');
const originalSize = document.getElementById('original-size');
const compressBtn = document.getElementById('compress-btn');
const resultArea = document.getElementById('result-area');
const compressedImg = document.getElementById('compressed-img');
const compressedSize = document.getElementById('compressed-size');
const downloadBtn = document.getElementById('download-btn');

let originalFile = null;
let compressedBlob = null;
let originalFileSize = 0;

// 拖拽上传支持
uploadArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadArea.classList.add('dragover');
});
uploadArea.addEventListener('dragleave', (e) => {
  e.preventDefault();
  uploadArea.classList.remove('dragover');
});
uploadArea.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadArea.classList.remove('dragover');
  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
    handleFile(e.dataTransfer.files[0]);
  }
});

fileInput.addEventListener('change', (e) => {
  if (e.target.files && e.target.files[0]) {
    handleFile(e.target.files[0]);
  }
});

// 处理上传的图片文件
function handleFile(file) {
  if (!file.type.startsWith('image/')) {
    alert('请上传图片文件');
    return;
  }
  originalFile = file;
  originalFileSize = file.size;
  const reader = new FileReader();
  reader.onload = function (e) {
    originalImg.src = e.target.result;
    previewArea.style.display = 'block';
    originalSize.textContent = `原图大小：${(file.size/1024).toFixed(2)} KB`;
    resultArea.style.display = 'none';
  };
  reader.readAsDataURL(file);
}

// 压缩图片
compressBtn.addEventListener('click', () => {
  if (!originalFile) return;
  const img = new window.Image();
  img.onload = function () {
    // 创建canvas绘制图片
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);

    // 判断图片类型，PNG转为JPEG压缩
    let outputType = 'image/jpeg';
    let ext = 'jpg';
    let quality = 0.6; // 更低质量以保证压缩效果
    if (originalFile.type === 'image/jpeg') {
      outputType = 'image/jpeg';
      ext = 'jpg';
      quality = 0.6;
    }
    // PNG一律转为JPEG

    canvas.toBlob(function(blob) {
      compressedBlob = blob;
      const url = URL.createObjectURL(blob);
      compressedImg.src = url;
      compressedSize.textContent = `压缩后大小：${(blob.size/1024).toFixed(2)} KB`;
      downloadBtn.href = url;
      downloadBtn.download = `compressed.${ext}`;
      resultArea.style.display = 'block';
      // 压缩后体积更大时提示
      if (blob.size >= originalFileSize) {
        alert('⚠️ 压缩后图片体积未减小，建议尝试更小的原图或使用JPEG格式上传。');
      }
    }, outputType, quality);
  };
  img.src = URL.createObjectURL(originalFile);
}); 