import html2canvas from 'html2canvas';

/**
 * Downloads the emoji art as a TXT file.
 */
export const downloadAsTxt = (art, filename = 'my-emojiverse-art.txt') => {
  const element = document.createElement("a");
  const file = new Blob([art], { type: 'text/plain' });
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

/**
 * Downloads the canvas as a PNG image.
 */
export const downloadAsPng = async (elementId, filename = 'my-emojiverse-art.png') => {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    const canvas = await html2canvas(element, {
      backgroundColor: null,
      useCORS: true,
      scale: 2, // Higher quality
    });

    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = filename;
    link.click();
  } catch (error) {
    console.error("Error generating PNG:", error);
  }
};
