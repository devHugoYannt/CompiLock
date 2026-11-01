// Reduz a foto antes de enviar (≈100 KB): o 1 GB grátis rende milhares de fotos.
export async function comprimirImagem(arquivo, maxLado = 800, qualidade = 0.7) {
  const bmp = await createImageBitmap(arquivo);
  const escala = Math.min(1, maxLado / Math.max(bmp.width, bmp.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bmp.width * escala);
  canvas.height = Math.round(bmp.height * escala);
  canvas.getContext('2d').drawImage(bmp, 0, 0, canvas.width, canvas.height);
  return new Promise((ok) => canvas.toBlob(ok, 'image/jpeg', qualidade));
}
