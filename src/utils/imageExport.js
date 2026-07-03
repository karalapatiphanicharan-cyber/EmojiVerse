import html2canvas from 'html2canvas';

/**
 * Downloads the emoji conversion as a PNG image.
 */
export const downloadConversionAsPng = async (elementId, filename = 'emoji-conversion.png') => {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    const canvas = await html2canvas(element, {
      backgroundColor: '#fdfbf7', // Match app background
      useCORS: true,
      scale: 2,
    });

    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = filename;
    link.click();
  } catch (error) {
    console.error("Error generating conversion PNG:", error);
  }
};

/**
 * Downloads the emoji conversion as a TXT file.
 */
export const downloadConversionAsTxt = (matrix, filename = 'emoji-conversion.txt') => {
  const text = matrix.map(row => row.join('')).join('\n');
  const element = document.createElement("a");
  const file = new Blob([text], { type: 'text/plain' });
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

/**
 * Copies emoji art to clipboard
 */
export const copyToClipboard = async (matrix) => {
  const text = matrix.map(row => row.join('')).join('\n');
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy: ', err);
    return false;
  }
};
